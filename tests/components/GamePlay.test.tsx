import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { GamePlay } from "@/components/game/GamePlay";
import { useGameStore } from "@/stores/gameStore";
import type { Game } from "@/types";

function gameFor(phase: Game["phase"]): Game {
  return {
    id: "game-1",
    players: [
      { id: "player-1", name: "Ava", score: 0, joinedAt: 0, isHost: true, isActive: true, hasGuessedCorrectly: false },
      { id: "player-2", name: "Ben", score: 0, joinedAt: 0, isHost: false, isActive: true, hasGuessedCorrectly: false },
    ],
    phase,
    currentRound: 0,
    currentPlayerIndex: 0,
    currentCategory: "draw",
    currentWord: { id: "low-draw-001", text: "apple", categories: ["draw"], difficulty: "lowEnglish", length: 5, tags: ["food"] },
    settings: {
      packId: "easy-energy-english",
      roundsPerPlayer: 1,
      totalRounds: 2,
      difficulty: "lowEnglish",
      categories: ["draw"],
      roundDuration: 30000,
      wordRevealDuration: 3000,
      language: "en",
    },
    usedWordIds: ["apple"],
    roundEndsAt: phase === "playing" ? Date.now() + 30000 : null,
    pausedRemainingMs: null,
    createdAt: 0,
    startedAt: 0,
    endedAt: null,
  };
}

describe("GamePlay task reveal", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.setState({
      game: gameFor("playing"),
      language: "en",
      lastResult: null,
      roundHistory: [],
    });
  });

  it("uses a tap toggle and puts the answer in a separate live card", () => {
    render(<GamePlay />);

    const toggle = screen.getByRole("button", { name: "Show task" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    fireEvent.pointerDown(toggle);
    expect(screen.queryByText("apple")).not.toBeInTheDocument();

    fireEvent.click(toggle);
    const card = document.getElementById("active-task-card");
    expect(card?.nextElementSibling).toBe(toggle);
    expect(toggle).toHaveAccessibleName("Hide task");
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(card).toHaveAttribute("aria-live", "polite");
    expect(within(card!).getByText("apple")).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(toggle).toHaveAccessibleName("Show task");
    expect(screen.queryByText("apple")).not.toBeInTheDocument();
  });

  it("only offers task help after the player explicitly reveals the private task", () => {
    useGameStore.setState({ game: gameFor("wordReveal") });
    render(<GamePlay />);

    expect(screen.queryByRole("button", { name: "Show help" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reveal task" }));
    fireEvent.click(screen.getByRole("button", { name: "Show help" }));

    expect(screen.getByRole("heading", { name: "Task help" })).toBeInTheDocument();
    expect(screen.getByText("Hungarian meaning: alma")).toBeInTheDocument();
    expect(screen.getByText("Only reviewed meaning and verified task metadata are shown.")).toBeInTheDocument();
    expect(screen.getByText("Tags: food")).toBeInTheDocument();
  });
});
