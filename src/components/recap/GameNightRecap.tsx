"use client";

import type { GameNightRecapViewModelV1 } from "@/types/recap";
import {
  RecapShareActions,
  type RecapShareCallbacks,
  type RecapShareCapabilities,
  type RecapShareLabels,
} from "./RecapShareActions";

export interface GameNightRecapLabels {
  title: string;
  winner: (name: string) => string;
  tiedWinners: (names: string) => string;
  noWinner: string;
  tasksPlayed: string;
  correct: string;
  passed: string;
  timedOut: string;
  finalStandings: string;
  points: string;
  awards: string;
  bestPresenter: string;
  bestGuesser: string;
  strongestPairing: string;
  unavailableAward: string;
  presenterValue: (correct: number, attempts: number) => string;
  guesserValue: (correct: number) => string;
  pairingValue: (correct: number) => string;
  share: RecapShareLabels;
}

interface GameNightRecapProps {
  recap: GameNightRecapViewModelV1;
  labels: GameNightRecapLabels;
  shareCapabilities: RecapShareCapabilities;
  shareCallbacks: RecapShareCallbacks;
}

export function GameNightRecap({
  recap,
  labels,
  shareCapabilities,
  shareCallbacks,
}: GameNightRecapProps) {
  const winnerText = recap.winner.kind === "winner"
    ? labels.winner(recap.winner.playerNames[0])
    : recap.winner.kind === "tie"
      ? labels.tiedWinners(recap.winner.playerNames.join(", "))
      : labels.noWinner;
  const presenter = recap.awards.bestPresenter;
  const guesser = recap.awards.bestGuesser;
  const pairing = recap.awards.strongestPairing;
  const availableAwards = [
    presenter.availability === "insufficientData" ? null : {
      id: "presenter",
      label: labels.bestPresenter,
      value: `${presenter.playerNames.join(", ")} - ${labels.presenterValue(presenter.correct, presenter.attempts)}`,
    },
    guesser.availability === "insufficientData" ? null : {
      id: "guesser",
      label: labels.bestGuesser,
      value: `${guesser.playerNames.join(", ")} - ${labels.guesserValue(guesser.correct)}`,
    },
    pairing.availability === "insufficientData" ? null : {
      id: "pairing",
      label: labels.strongestPairing,
      value: `${pairing.presenterNames.map((name, index) => `${name} + ${pairing.guesserNames[index]}`).join(", ")} - ${labels.pairingValue(pairing.correct)}`,
    },
  ].filter((award): award is NonNullable<typeof award> => award !== null);

  return (
    <section
      aria-label={labels.title}
      className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 text-[var(--ink)] sm:p-7"
    >
      <header className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--accent)]">{labels.title}</p>
        <h2 id="game-night-recap-title" className="text-2xl font-black tracking-tight sm:text-3xl">
          {winnerText}
        </h2>
      </header>

      <dl className="mt-6 grid grid-cols-4 divide-x divide-[var(--line)] rounded-xl border border-[var(--line)] bg-[var(--surface-raised)] px-1 py-3">
        <div className="min-w-0 px-2 text-center">
          <dt className="text-xs text-[var(--muted)] sm:text-sm">{labels.tasksPlayed}</dt>
          <dd className="mt-1 text-xl font-black">{recap.roundCounts.tasksPlayed}</dd>
        </div>
        <div className="min-w-0 px-2 text-center">
          <dt className="text-xs text-[var(--muted)] sm:text-sm">{labels.correct}</dt>
          <dd className="mt-1 text-xl font-black">{recap.roundCounts.correct}</dd>
        </div>
        <div className="min-w-0 px-2 text-center">
          <dt className="text-xs text-[var(--muted)] sm:text-sm">{labels.passed}</dt>
          <dd className="mt-1 text-xl font-black">{recap.roundCounts.passed}</dd>
        </div>
        <div className="min-w-0 px-2 text-center">
          <dt className="text-xs text-[var(--muted)] sm:text-sm">{labels.timedOut}</dt>
          <dd className="mt-1 text-xl font-black">{recap.roundCounts.timedOut}</dd>
        </div>
      </dl>

      {availableAwards.length > 0 ? (
        <section aria-labelledby="recap-awards-title" className="mt-6">
          <h3 id="recap-awards-title" className="text-lg font-black">{labels.awards}</h3>
          <dl className="mt-3 grid gap-3 md:grid-cols-3">
            {availableAwards.map((award) => (
              <div key={award.id} className="rounded-xl border border-[var(--line)] p-4">
                <dt className="font-bold">{award.label}</dt>
                <dd className="mt-1 text-[var(--muted)]">{award.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section aria-labelledby="recap-standings-title" className="mt-6">
        <h3 id="recap-standings-title" className="text-lg font-black">{labels.finalStandings}</h3>
        <ol className="mt-3 space-y-2">
          {recap.rankings.map((entry) => (
            <li key={entry.playerId} className="flex items-center justify-between gap-3 rounded-xl bg-[var(--surface-raised)] px-4 py-3">
              <span className="min-w-0 truncate font-bold">{entry.rank}. {entry.playerName}</span>
              <strong>{entry.score} <span className="text-sm font-semibold text-[var(--muted)]">{labels.points}</span></strong>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-6">
        <RecapShareActions
          labels={labels.share}
          capabilities={shareCapabilities}
          callbacks={shareCallbacks}
        />
      </div>
    </section>
  );
}
