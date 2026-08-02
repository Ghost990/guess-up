import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { GameOver } from "@/components/game/GameOver";
import { RECAP_EVENT_SCHEMA_VERSION } from "@/types/recap";
import { useGameStore } from "@/stores/gameStore";

const players = [
  {
    id: "anna",
    name: "Anna",
    score: 2,
  },
  {
    id: "bela",
    name: "Béla",
    score: 1,
  },
];

beforeEach(() => {
  useGameStore.setState({
    language: "hu",
    lastResult: null,
    game: {
      id: "game-over-test",
      players,
      phase: "gameOver",
      currentRound: 0,
      currentPlayerIndex: 0,
      currentCategory: "draw",
      currentWord: {
        id: "word-1",
        text: "alma",
        categories: ["draw"],
        difficulty: "easy",
        length: 4,
        tags: ["food"],
      },
      settings: {
        packId: "classic-hungarian",
        roundsPerPlayer: 1,
        totalRounds: 2,
        difficulty: "easy",
        categories: ["draw"],
        roundDuration: 60000,
        language: "hu",
      },
      usedWordIds: ["word-1"],
      roundEndsAt: null,
      pausedRemainingMs: null,
      startedAt: 1000,
      endedAt: 7000,
    },
    roundHistory: [
      {
        schemaVersion: RECAP_EVENT_SCHEMA_VERSION,
        roundIndex: 0,
        completedAt: 6000,
        category: "draw",
        outcome: "correct",
        presenterId: "anna",
        guesserId: "bela",
        presenterPoints: 2,
        guesserPoints: 1,
      },
    ],
  });
});

describe("GameOver recap integration", () => {
  it("builds and renders the recap from persisted round history", () => {
    render(<GameOver />);

    const recap = screen.getByRole("region", { name: "Játékesti összefoglaló" });
    expect(within(recap).getByRole("heading", { name: "Anna vitte az estét" }))
      .toBeInTheDocument();
    expect(within(recap).getByText("1. Anna")).toBeInTheDocument();
    expect(within(recap).getByText("2. Béla")).toBeInTheDocument();
    expect(screen.getByText("1 feladat teljesítve")).toBeInTheDocument();
  });
});
