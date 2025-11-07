'use client';

import { useState, useEffect } from 'react';
import { PlayerSetup } from '@/components/game/PlayerSetup';
import { GamePlay } from '@/components/game/GamePlay';
import { useGameStore } from '@/stores/gameStore';

export default function Home() {
  const { game, startRound } = useGameStore();
  const [showSetup, setShowSetup] = useState(true);

  // Auto-start first round when game is set up
  useEffect(() => {
    if (game && game.phase === 'setup') {
      startRound();
    }
  }, [game, startRound]);

  // Show setup screen if no game exists
  if (!game || showSetup) {
    return <PlayerSetup onStart={() => setShowSetup(false)} />;
  }

  // Show gameplay for playing and roundEnd phases
  if (game.phase === 'playing' || game.phase === 'roundEnd') {
    return <GamePlay />;
  }

  // Game over screen
  if (game.phase === 'gameOver') {
    const players = useGameStore.getState().players;
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const winner = sortedPlayers[0];

    return (
      <main className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-extrabold" style={{ color: 'var(--color-primary)' }}>
            Game Over!
          </h1>
          <div className="space-y-4">
            <div className="text-3xl font-bold" style={{ color: 'var(--color-success)' }}>
              🏆 {winner.name} Wins!
            </div>
            <div className="text-xl font-semibold">Score: {winner.score}</div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Final Scores</h2>
            {sortedPlayers.map((player, index) => (
              <div key={player.id} className="flex justify-between items-center px-6 py-3 rounded-lg" style={{ backgroundColor: 'var(--color-muted)' }}>
                <span className="font-semibold">{index + 1}. {player.name}</span>
                <span className="font-bold">{player.score} points</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              useGameStore.getState().resetGame();
              setShowSetup(true);
            }}
            className="px-8 py-4 rounded-lg font-bold text-lg text-white shadow-lg"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Play Again
          </button>
        </div>
      </main>
    );
  }

  return null;
}
