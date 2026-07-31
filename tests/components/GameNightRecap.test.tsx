import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GameNightRecap, type GameNightRecapLabels } from "@/components/recap/GameNightRecap";
import { buildGameNightRecap } from "@/lib/recap/buildGameNightRecap";
import type { GameNightRecapInputV1 } from "@/types/recap";

const labels: GameNightRecapLabels = {
  title: "Game night recap",
  winner: (name) => `${name} wins!`,
  tiedWinners: (names) => `Tie: ${names}`,
  noWinner: "No winner",
  tasksPlayed: "Tasks played",
  correct: "Correct",
  passed: "Passed",
  timedOut: "Timed out",
  finalStandings: "Final standings",
  points: "points",
  awards: "Awards",
  bestPresenter: "Best presenter",
  bestGuesser: "Best guesser",
  strongestPairing: "Strongest pairing",
  unavailableAward: "Not enough data yet",
  presenterValue: (correct, attempts) => `${correct}/${attempts} correct`,
  guesserValue: (correct) => `${correct} correct guesses`,
  pairingValue: (correct) => `${correct} shared correct answers`,
  share: {
    nativeShare: "Share recap",
    downloadPng: "Download PNG",
    shareText: "Copy recap text",
    unavailable: "Sharing is unavailable",
    failed: "Sharing failed",
  },
};

const input: GameNightRecapInputV1 = {
  schemaVersion: 1,
  gameId: "game-1",
  language: "en",
  startedAt: 0,
  endedAt: 10_000,
  players: [
    { id: "a", name: "Anna", score: 6 },
    { id: "b", name: "Bela", score: 2 },
  ],
  rounds: [
    { schemaVersion: 1, roundIndex: 0, completedAt: 1, category: "draw", outcome: "correct", presenterId: "a", guesserId: "b", presenterPoints: 2, guesserPoints: 1 },
    { schemaVersion: 1, roundIndex: 1, completedAt: 2, category: "draw", outcome: "correct", presenterId: "a", guesserId: "b", presenterPoints: 2, guesserPoints: 1 },
    { schemaVersion: 1, roundIndex: 2, completedAt: 3, category: "signal", outcome: "timedOut", presenterId: "a", guesserId: null, presenterPoints: 0, guesserPoints: 0 },
  ],
};

describe("GameNightRecap", () => {
  it("renders recap stats, awards, and accessible standings from a view model", () => {
    render(
      <GameNightRecap
        recap={buildGameNightRecap(input)}
        labels={labels}
        shareCapabilities={{ nativeShare: false, pngDownload: false, textShare: false }}
        shareCallbacks={{}}
      />,
    );

    expect(screen.getByRole("heading", { name: "Anna wins!" })).toBeInTheDocument();
    expect(screen.getByText("Tasks played").nextElementSibling).toHaveTextContent("3");
    expect(screen.getByText("Best presenter").parentElement).toHaveTextContent("Anna - 2/3 correct");
    expect(screen.getByRole("heading", { name: "Final standings" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Sharing is unavailable");
  });

  it("omits the awards section when every award lacks enough data", () => {
    render(
      <GameNightRecap
        recap={buildGameNightRecap({
          ...input,
          rounds: [
            { schemaVersion: 1, roundIndex: 0, completedAt: 1, category: "draw", outcome: "passed", presenterId: "a", guesserId: null, presenterPoints: 0, guesserPoints: 0 },
          ],
        })}
        labels={labels}
        shareCapabilities={{ nativeShare: false, pngDownload: false, textShare: false }}
        shareCallbacks={{}}
      />,
    );

    expect(screen.queryByRole("heading", { name: "Awards" })).not.toBeInTheDocument();
    expect(screen.queryByText("Not enough data yet")).not.toBeInTheDocument();
  });

  it("uses only injected share capabilities and callbacks", () => {
    const nativeShare = vi.fn();
    const downloadPng = vi.fn();
    const shareText = vi.fn();

    render(
      <GameNightRecap
        recap={buildGameNightRecap(input)}
        labels={labels}
        shareCapabilities={{ nativeShare: true, pngDownload: true, textShare: true }}
        shareCallbacks={{
          onNativeShare: nativeShare,
          onDownloadPng: downloadPng,
          onShareText: shareText,
        }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Share recap" }));
    fireEvent.click(screen.getByRole("button", { name: "Download PNG" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy recap text" }));

    expect(nativeShare).toHaveBeenCalledOnce();
    expect(downloadPng).toHaveBeenCalledOnce();
    expect(shareText).toHaveBeenCalledOnce();
  });
});
