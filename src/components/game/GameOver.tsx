"use client";

import { RotateCcw, Trophy } from "lucide-react";
import { Scoreboard } from "./Scoreboard";
import { messages } from "@/i18n/translations";
import { useGameStore } from "@/stores/gameStore";

export function GameOver() {
  const game = useGameStore((state) => state.game);
  const resetGame = useGameStore((state) => state.resetGame);

  if (!game) return null;

  const language = game.settings.language;
  const copy = messages[language];
  const sorted = [...game.players].sort((a, b) => b.score - a.score);
  const leaders = sorted.filter((player) => player.score === sorted[0]?.score);

  return (
    <main className="game-over-page">
      <section className="winner-panel" aria-labelledby="game-over-title">
        <span className="winner-icon"><Trophy aria-hidden="true" /></span>
        <p>{copy.gameOver.title}</p>
        <h1 id="game-over-title">
          {leaders.length > 1 ? copy.gameOver.tie : copy.gameOver.winner(leaders[0].name)}
        </h1>
        <span>{copy.gameOver.tasksPlayed(game.currentRound + 1)}</span>
        <button className="primary-button" type="button" onClick={resetGame}>
          <RotateCcw aria-hidden="true" size={20} />
          {copy.common.playAgain}
        </button>
      </section>

      <Scoreboard
        players={game.players}
        language={language}
        title={copy.gameOver.finalStandings}
      />
    </main>
  );
}
