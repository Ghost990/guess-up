"use client";

import { ArrowRight, Check, SkipForward } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { Scoreboard } from "./Scoreboard";
import { messages } from "@/i18n/translations";
import { useGameStore } from "@/stores/gameStore";

export function RoundResultScreen() {
  const game = useGameStore((state) => state.game);
  const result = useGameStore((state) => state.lastResult);
  const startNextRound = useGameStore((state) => state.startNextRound);
  const finishGame = useGameStore((state) => state.finishGame);

  if (!game || !result) return null;

  const language = game.settings.language;
  const copy = messages[language];
  const presenter = game.players.find((player) => player.id === result.presenterId);
  const guesser = game.players.find((player) => player.id === result.guesserId);
  const nextPlayer = game.players[(game.currentRound + 1) % game.players.length];

  return (
    <main className="game-page">
      <div className="result-layout">
        <section className="result-stage" aria-labelledby="result-title">
          <CategoryBadge category={result.category} language={language} />
          <span className="result-status" data-success={result.success}>
            {result.success ? <Check aria-hidden="true" /> : <SkipForward aria-hidden="true" />}
          </span>
          <h1 id="result-title">
            {result.success ? copy.result.successTitle : copy.result.passTitle}
          </h1>
          <p className="result-word">{result.word.text}</p>

          {result.success && (
            <div className="points-awarded">
              <div>
                <span>{copy.result.presenterScore}</span>
                <strong>{presenter?.name}</strong>
                <b>+{result.presenterPoints}</b>
              </div>
              <div>
                <span>{copy.result.guesserScore}</span>
                <strong>{guesser?.name}</strong>
                <b>+{result.guesserPoints}</b>
              </div>
            </div>
          )}

          <div className="next-player">
            <span>{copy.result.nextUp(nextPlayer.name)}</span>
            <button className="primary-button" type="button" onClick={startNextRound}>
              {copy.common.continue}
              <ArrowRight aria-hidden="true" size={20} />
            </button>
            <button className="quiet-button" type="button" onClick={finishGame}>
              {copy.common.finishGame}
            </button>
          </div>
        </section>

        <Scoreboard players={game.players} language={language} />
      </div>
    </main>
  );
}
