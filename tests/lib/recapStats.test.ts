import { describe, expect, it } from "vitest";
import { buildGameNightRecap } from "@/lib/recap/buildGameNightRecap";
import type { GameNightRecapInputV1 } from "@/types/recap";

function createInput(): GameNightRecapInputV1 {
  return {
    schemaVersion: 1,
    gameId: "game-1",
    language: "en",
    startedAt: 1_000,
    endedAt: 9_000,
    players: [
      { id: "a", name: "Anna", score: 7 },
      { id: "b", name: "Bela", score: 4 },
      { id: "c", name: "Csilla", score: 4 },
    ],
    rounds: [
      { schemaVersion: 1, roundIndex: 0, completedAt: 2_000, category: "draw", outcome: "correct", presenterId: "a", guesserId: "b", presenterPoints: 2, guesserPoints: 1 },
      { schemaVersion: 1, roundIndex: 1, completedAt: 3_000, category: "explain", outcome: "correct", presenterId: "a", guesserId: "b", presenterPoints: 2, guesserPoints: 1 },
      { schemaVersion: 1, roundIndex: 2, completedAt: 4_000, category: "signal", outcome: "passed", presenterId: "a", guesserId: null, presenterPoints: 0, guesserPoints: 0 },
      { schemaVersion: 1, roundIndex: 3, completedAt: 5_000, category: "draw", outcome: "correct", presenterId: "b", guesserId: "a", presenterPoints: 2, guesserPoints: 1 },
      { schemaVersion: 1, roundIndex: 4, completedAt: 6_000, category: "signal", outcome: "timedOut", presenterId: "c", guesserId: null, presenterPoints: 0, guesserPoints: 0 },
    ],
  };
}

describe("buildGameNightRecap", () => {
  it("builds deterministic rankings, round counts, and awards without mutating input", () => {
    const input = createInput();
    const original = structuredClone(input);

    const recap = buildGameNightRecap(input);

    expect(input).toEqual(original);
    expect(recap).toMatchObject({
      schemaVersion: 1,
      durationMs: 8_000,
      roundCounts: { tasksPlayed: 5, correct: 3, passed: 1, timedOut: 1 },
      winner: { kind: "winner", playerIds: ["a"] },
      rankings: [
        { rank: 1, playerId: "a", score: 7 },
        { rank: 2, playerId: "b", score: 4 },
        { rank: 2, playerId: "c", score: 4 },
      ],
      awards: {
        bestPresenter: {
          availability: "available",
          playerIds: ["a"],
          correct: 2,
          attempts: 3,
          successRate: 2 / 3,
          minimumAttempts: 2,
        },
        bestGuesser: { availability: "available", playerIds: ["b"], correct: 2, minimumCorrect: 2 },
        strongestPairing: {
          availability: "available",
          presenterIds: ["a"],
          guesserIds: ["b"],
          correct: 2,
          minimumCorrect: 2,
        },
      },
    });
  });

  it("keeps equal top scores and equal award metrics as explicit ties", () => {
    const input = createInput();
    input.players = [
      { id: "a", name: "Anna", score: 4 },
      { id: "b", name: "Bela", score: 4 },
      { id: "c", name: "Csilla", score: 1 },
    ];
    input.rounds = [
      { schemaVersion: 1, roundIndex: 0, completedAt: 1, category: "draw", outcome: "correct", presenterId: "a", guesserId: "b", presenterPoints: 2, guesserPoints: 1 },
      { schemaVersion: 1, roundIndex: 1, completedAt: 2, category: "draw", outcome: "correct", presenterId: "a", guesserId: "b", presenterPoints: 2, guesserPoints: 1 },
      { schemaVersion: 1, roundIndex: 2, completedAt: 3, category: "draw", outcome: "correct", presenterId: "c", guesserId: "a", presenterPoints: 2, guesserPoints: 1 },
      { schemaVersion: 1, roundIndex: 3, completedAt: 4, category: "draw", outcome: "correct", presenterId: "c", guesserId: "a", presenterPoints: 2, guesserPoints: 1 },
    ];

    const recap = buildGameNightRecap(input);

    expect(recap.winner).toMatchObject({ kind: "tie", playerIds: ["a", "b"] });
    expect(recap.rankings.map((entry) => entry.rank)).toEqual([1, 1, 3]);
    expect(recap.awards.bestPresenter).toMatchObject({
      availability: "tie",
      playerIds: ["a", "c"],
      correct: 2,
      attempts: 2,
    });
    expect(recap.awards.bestGuesser).toMatchObject({ availability: "tie", playerIds: ["a", "b"] });
    expect(recap.awards.strongestPairing).toMatchObject({
      availability: "tie",
      presenterIds: ["a", "c"],
      guesserIds: ["b", "a"],
    });
  });

  it("withholds awards when the recorded sample is too small", () => {
    const input = createInput();
    input.rounds = [input.rounds[0]];

    const recap = buildGameNightRecap(input);

    expect(recap.awards.bestPresenter).toMatchObject({
      availability: "insufficientData",
      minimumAttempts: 2,
      successRate: null,
    });
    expect(recap.awards.bestGuesser).toMatchObject({
      availability: "insufficientData",
      minimumCorrect: 2,
    });
    expect(recap.awards.strongestPairing).toMatchObject({
      availability: "insufficientData",
      minimumCorrect: 2,
    });
  });
});
