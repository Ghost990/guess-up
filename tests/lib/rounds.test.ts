import { describe, expect, it } from "vitest";
import {
  applyScore,
  getCategoryForTurn,
  getPlayerIndexForRound,
  getTotalRounds,
  GUESSER_POINTS,
  PRESENTER_POINTS,
} from "@/lib/game/rounds";
import type { Player } from "@/types";

const players: Player[] = ["Anna", "Béla", "Csilla"].map((name, index) => ({
  id: `p${index}`,
  name,
  score: 0,
  joinedAt: 0,
  isHost: index === 0,
  isActive: true,
  hasGuessedCorrectly: false,
}));

describe("round scheduling", () => {
  it("creates equal turns for every player", () => {
    expect(getTotalRounds(2, 1)).toBe(2);
    expect(getTotalRounds(3, 3)).toBe(9);
    expect(getTotalRounds(8, 2)).toBe(16);
    expect(getTotalRounds(1, 2)).toBe(0);
  });

  it("rotates presenters without skipping anyone", () => {
    expect(Array.from({ length: 6 }, (_, round) => getPlayerIndexForRound(round, 3)))
      .toEqual([0, 1, 2, 0, 1, 2]);
    expect(() => getPlayerIndexForRound(0, 0)).toThrow();
  });

  it("balances categories per presenter across cycles", () => {
    const categories = ["draw", "explain", "signal"] as const;
    const schedule = Array.from({ length: 9 }, (_, round) =>
      getCategoryForTurn(round, 3, [...categories]),
    );

    expect(schedule).toEqual([
      "draw", "explain", "signal",
      "explain", "signal", "draw",
      "signal", "draw", "explain",
    ]);
    expect(() => getCategoryForTurn(0, 2, [])).toThrow();
  });
});

describe("scoring", () => {
  it("awards two points to the presenter and one to the guesser", () => {
    const scored = applyScore(players, "p0", "p1");
    expect(scored.map((player) => player.score)).toEqual([
      PRESENTER_POINTS,
      GUESSER_POINTS,
      0,
    ]);
    expect(players.map((player) => player.score)).toEqual([0, 0, 0]);
  });

  it("does not score a missing or self guess", () => {
    expect(applyScore(players, "p0", null)).toBe(players);
    expect(applyScore(players, "p0", "p0")).toBe(players);
  });
});
