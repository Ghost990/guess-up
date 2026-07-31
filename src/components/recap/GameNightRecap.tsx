"use client";

import type {
  GameNightRecapViewModelV1,
  RecapPairingAward,
  RecapPresenterAward,
  RecapGuesserAward,
} from "@/types/recap";
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

function AwardValue({
  award,
  unavailable,
  value,
}: {
  award: RecapPresenterAward | RecapGuesserAward | RecapPairingAward;
  unavailable: string;
  value: string | null;
}) {
  if (award.availability === "insufficientData" || !value) {
    return <p>{unavailable}</p>;
  }

  return <p>{value}</p>;
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

  return (
    <section aria-labelledby="game-night-recap-title" className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 text-[var(--ink)] sm:p-7">
      <header className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--accent)]">{labels.title}</p>
        <h2 id="game-night-recap-title" className="text-2xl font-black tracking-tight sm:text-3xl">
          {winnerText}
        </h2>
      </header>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-[var(--surface-raised)] p-3">
          <dt className="text-sm text-[var(--muted)]">{labels.tasksPlayed}</dt>
          <dd className="mt-1 text-xl font-black">{recap.roundCounts.tasksPlayed}</dd>
        </div>
        <div className="rounded-xl bg-[var(--surface-raised)] p-3">
          <dt className="text-sm text-[var(--muted)]">{labels.correct}</dt>
          <dd className="mt-1 text-xl font-black">{recap.roundCounts.correct}</dd>
        </div>
        <div className="rounded-xl bg-[var(--surface-raised)] p-3">
          <dt className="text-sm text-[var(--muted)]">{labels.passed}</dt>
          <dd className="mt-1 text-xl font-black">{recap.roundCounts.passed}</dd>
        </div>
        <div className="rounded-xl bg-[var(--surface-raised)] p-3">
          <dt className="text-sm text-[var(--muted)]">{labels.timedOut}</dt>
          <dd className="mt-1 text-xl font-black">{recap.roundCounts.timedOut}</dd>
        </div>
      </dl>

      <section aria-labelledby="recap-awards-title" className="mt-6">
        <h3 id="recap-awards-title" className="text-lg font-black">{labels.awards}</h3>
        <dl className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-[var(--line)] p-4">
            <dt className="font-bold">{labels.bestPresenter}</dt>
            <dd className="mt-1 text-[var(--muted)]">
              <AwardValue
                award={presenter}
                unavailable={labels.unavailableAward}
                value={presenter.availability === "insufficientData"
                  ? null
                  : `${presenter.playerNames.join(", ")} — ${labels.presenterValue(presenter.correct, presenter.attempts)}`}
              />
            </dd>
          </div>
          <div className="rounded-xl border border-[var(--line)] p-4">
            <dt className="font-bold">{labels.bestGuesser}</dt>
            <dd className="mt-1 text-[var(--muted)]">
              <AwardValue
                award={guesser}
                unavailable={labels.unavailableAward}
                value={guesser.availability === "insufficientData"
                  ? null
                  : `${guesser.playerNames.join(", ")} — ${labels.guesserValue(guesser.correct)}`}
              />
            </dd>
          </div>
          <div className="rounded-xl border border-[var(--line)] p-4">
            <dt className="font-bold">{labels.strongestPairing}</dt>
            <dd className="mt-1 text-[var(--muted)]">
              <AwardValue
                award={pairing}
                unavailable={labels.unavailableAward}
                value={pairing.availability === "insufficientData"
                  ? null
                  : `${pairing.presenterNames.map((name, index) => `${name} + ${pairing.guesserNames[index]}`).join(", ")} — ${labels.pairingValue(pairing.correct)}`}
              />
            </dd>
          </div>
        </dl>
      </section>

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
