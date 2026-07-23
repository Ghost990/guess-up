import { beforeEach, describe, expect, it, vi } from "vitest";
import { getWordPack } from "@/lib/game/wordPacks";
import { useGameStore } from "@/stores/gameStore";

function setup(playerNames = ["Anna", "Béla", "Csilla"], roundsPerPlayer = 2) {
  useGameStore.getState().setupGame({
    playerNames,
    difficulty: "medium",
    roundsPerPlayer,
    roundDuration: 60000,
    language: "en",
  });
}

describe("game store", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.setState({ game: null, language: "hu", lastResult: null });
    vi.useRealTimers();
  });

  it("creates a fair localized game and freezes its language", () => {
    setup();
    const state = useGameStore.getState();

    expect(state.game?.settings.totalRounds).toBe(6);
    expect(state.game?.settings.language).toBe("en");
    expect(state.game?.phase).toBe("wordReveal");
    expect(state.game?.currentPlayerIndex).toBe(0);
    expect(getWordPack("en").words).toContainEqual(state.game?.currentWord);

    state.setLanguage("hu");
    expect(useGameStore.getState().language).toBe("en");
  });

  it("rejects invalid and duplicate player lists", () => {
    expect(() => setup(["Anna"])).toThrow();
    expect(() => setup(["Anna", "anna"])).toThrow();
    expect(() => setup(Array.from({ length: 9 }, (_, index) => `${index}`))).toThrow();
  });

  it("rejects Low English tasks for a non-English game", () => {
    expect(() =>
      useGameStore.getState().setupGame({
        playerNames: ["Anna", "Béla"],
        difficulty: "lowEnglish",
        roundsPerPlayer: 1,
        roundDuration: 60000,
        language: "hu",
      }),
    ).toThrow("Low English difficulty requires the English language.");
  });

  it("uses an absolute deadline and supports pause/resume", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T12:00:00Z"));
    setup(["Anna", "Béla"], 1);
    useGameStore.getState().startPlaying();

    const initialDeadline = useGameStore.getState().game?.roundEndsAt;
    expect(initialDeadline).toBe(Date.now() + 60000);

    vi.advanceTimersByTime(12000);
    useGameStore.getState().pauseRound();
    expect(useGameStore.getState().game?.phase).toBe("paused");
    expect(useGameStore.getState().game?.pausedRemainingMs).toBe(48000);

    vi.advanceTimersByTime(5000);
    useGameStore.getState().resumeRound();
    expect(useGameStore.getState().game?.roundEndsAt).toBe(Date.now() + 48000);
  });

  it("validates the guesser and applies the canonical score once", () => {
    setup(["Anna", "Béla"], 1);
    useGameStore.getState().startPlaying();
    const game = useGameStore.getState().game!;
    const presenter = game.players[0];
    const guesser = game.players[1];

    useGameStore.getState().endRound(true, "missing");
    expect(useGameStore.getState().game?.phase).toBe("playing");

    useGameStore.getState().endRound(true, presenter.id);
    expect(useGameStore.getState().game?.phase).toBe("playing");

    useGameStore.getState().endRound(true, guesser.id);
    const result = useGameStore.getState();
    expect(result.game?.phase).toBe("roundEnd");
    expect(result.game?.players.map((player) => player.score)).toEqual([2, 1]);

    result.endRound(true, guesser.id);
    expect(useGameStore.getState().game?.players.map((player) => player.score))
      .toEqual([2, 1]);
  });

  it("advances explicitly and finishes after every player had an equal turn", () => {
    setup(["Anna", "Béla"], 1);
    useGameStore.getState().startPlaying();
    useGameStore.getState().endRound(false);
    expect(useGameStore.getState().game?.phase).toBe("roundEnd");

    useGameStore.getState().startNextRound();
    expect(useGameStore.getState().game).toMatchObject({
      phase: "wordReveal",
      currentRound: 1,
      currentPlayerIndex: 1,
    });

    useGameStore.getState().startPlaying();
    useGameStore.getState().endRound(false);
    expect(useGameStore.getState().game?.phase).toBe("gameOver");
    expect(useGameStore.getState().game?.currentRound).toBe(1);
  });

  it("resets the game while keeping the selected language", () => {
    setup(["Anna", "Béla"], 1);
    useGameStore.getState().resetGame();

    expect(useGameStore.getState()).toMatchObject({
      game: null,
      lastResult: null,
      language: "en",
    });
  });
});
