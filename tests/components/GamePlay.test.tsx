import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { GamePlay } from "@/components/game/GamePlay";
import { useGameStore } from "@/stores/gameStore";
import type { Game } from "@/types";

function gameFor(phase: Game["phase"]): Game {
  return {
    id: "game-1",
    players: [
      { id: "player-1", name: "Ava", score: 0 },
      { id: "player-2", name: "Ben", score: 0 },
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
      language: "en",
    },
    usedWordIds: ["apple"],
    roundEndsAt: phase === "playing" ? Date.now() + 30000 : null,
    pausedRemainingMs: null,
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
    expect(card?.parentElement).toHaveClass("prompt-ticket");
    expect(card?.nextElementSibling).toBe(toggle);
    expect(toggle).toHaveAccessibleName("Hide task");
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(card).toHaveAttribute("aria-live", "polite");
    expect(within(card!).getByText("apple")).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(toggle).toHaveAccessibleName("Show task");
    expect(screen.queryByText("apple")).not.toBeInTheDocument();
  });

  it("inherits the selected pack surface and accent on the question screen", () => {
    render(<GamePlay />);

    const gamePage = document.querySelector("main.game-page");
    expect(gamePage).toHaveAttribute("data-pack-surface", "city");
    expect(gamePage).toHaveStyle({ "--pack-accent": "#9fe870" });
  });

  it("keeps the live standings collapsed until the players request them", () => {
    render(<GamePlay />);

    const standings = screen.getByText("Standings").closest("details");
    expect(standings).not.toHaveAttribute("open");
    expect(within(standings!).getAllByText("Ava")).toHaveLength(2);

    fireEvent.click(within(standings!).getByText("Standings"));
    expect(standings).toHaveAttribute("open");
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
