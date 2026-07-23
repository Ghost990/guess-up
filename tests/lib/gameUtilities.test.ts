import { describe, expect, it, vi } from "vitest";
import {
  generateGameId,
  generatePlayerId,
  isGuessCorrect,
  isValidPhaseTransition,
  normalizeText,
  shouldEndGame,
  shouldEndRound,
} from "@/lib/game/gameLogic";
import { fisherYatesShuffle, getRandomItem, getRandomItems } from "@/lib/game/randomization";
import {
  getCategoryForRound,
  getNextCategory,
  getNextPlayerIndex,
  initializePlayerOrder,
} from "@/lib/game/turnRotation";
import { cn } from "@/lib/utils";
import type { Player } from "@/types";

const players: Player[] = ["A", "B", "C"].map((name, index) => ({
  id: `${index}`,
  name,
  score: 0,
  joinedAt: 0,
  isHost: index === 0,
  isActive: true,
  hasGuessedCorrectly: false,
}));

describe("game logic utilities", () => {
  it("normalizes localized answers and validates guesses", () => {
    expect(normalizeText("  Árvíztűrő  ")).toBe("arvizturo");
    expect(isGuessCorrect("KÖRTE", "körte")).toBe(true);
    expect(isGuessCorrect("alma", "körte")).toBe(false);
  });

  it("validates phase and completion rules", () => {
    expect(isValidPhaseTransition("wordReveal", "playing")).toBe(true);
    expect(isValidPhaseTransition("gameOver", "playing")).toBe(false);
    expect(shouldEndRound(0, false)).toBe(true);
    expect(shouldEndRound(10, true)).toBe(true);
    expect(shouldEndRound(10, false)).toBe(false);
    expect(shouldEndGame(3, 3)).toBe(true);
    expect(shouldEndGame(2, 3)).toBe(false);
  });

  it("generates game and player identifiers", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    expect(generateGameId()).toHaveLength(6);
    expect(generatePlayerId()).toMatch(/^[0-9a-f-]{36}$/i);
    vi.restoreAllMocks();
  });
});

describe("randomization and rotation utilities", () => {
  it("shuffles without mutating the input", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const original = [1, 2, 3, 4];
    const shuffled = fisherYatesShuffle(original);
    expect(shuffled).toEqual([2, 3, 4, 1]);
    expect(original).toEqual([1, 2, 3, 4]);
    expect(initializePlayerOrder(players)).not.toBe(players);
    vi.restoreAllMocks();
  });

  it("selects one or multiple random items safely", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(getRandomItem(["a", "b"])).toBe("a");
    expect(getRandomItem([])).toBeUndefined();
    expect(getRandomItems([1, 2, 3], 2)).toHaveLength(2);
    expect(getRandomItems([1, 2], 5)).toHaveLength(2);
    vi.restoreAllMocks();
  });

  it("rotates players and categories", () => {
    expect(getNextPlayerIndex(2, 3)).toBe(0);
    expect(getNextCategory("draw", ["draw", "explain", "signal"])).toBe("explain");
    expect(getCategoryForRound(3, ["draw", "explain", "signal"])).toBe("signal");
  });
});

describe("class name utility", () => {
  it("merges conditional Tailwind classes", () => {
    expect(cn("px-2", false && "hidden", "px-4")).toBe("px-4");
  });
});
