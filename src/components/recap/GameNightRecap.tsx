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
      className="recap-sheet"
    >
      <header className="recap-sheet__header">
        <p>{labels.title}</p>
        <h2 id="game-night-recap-title">
          {winnerText}
        </h2>
      </header>

      <dl className="recap-stats">
        <div>
          <dt>{labels.tasksPlayed}</dt>
          <dd>{recap.roundCounts.tasksPlayed}</dd>
        </div>
        <div>
          <dt>{labels.correct}</dt>
          <dd>{recap.roundCounts.correct}</dd>
        </div>
        <div>
          <dt>{labels.passed}</dt>
          <dd>{recap.roundCounts.passed}</dd>
        </div>
        <div>
          <dt>{labels.timedOut}</dt>
          <dd>{recap.roundCounts.timedOut}</dd>
        </div>
      </dl>

      {availableAwards.length > 0 ? (
        <section aria-labelledby="recap-awards-title" className="recap-awards">
          <h3 id="recap-awards-title">{labels.awards}</h3>
          <dl>
            {availableAwards.map((award) => (
              <div key={award.id}>
                <dt>{award.label}</dt>
                <dd>{award.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section aria-labelledby="recap-standings-title" className="recap-standings">
        <h3 id="recap-standings-title">{labels.finalStandings}</h3>
        <ol>
          {recap.rankings.map((entry) => (
            <li key={entry.playerId}>
              <span>{entry.rank}. {entry.playerName}</span>
              <strong>{entry.score} <small>{labels.points}</small></strong>
            </li>
          ))}
        </ol>
      </section>

      <div className="recap-sheet__actions">
        <RecapShareActions
          labels={labels.share}
          capabilities={shareCapabilities}
          callbacks={shareCallbacks}
        />
      </div>
    </section>
  );
}
