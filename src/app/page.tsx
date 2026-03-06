'use client';

import { useState, useEffect } from 'react';
import { PlayerSetup } from '@/components/game/PlayerSetup';
import { GamePlay } from '@/components/game/GamePlay';
import { useGameStore } from '@/stores/gameStore';
import { useHasHydrated } from '@/hooks/useHasHydrated';

export default function Home() {
  const { game, startRound } = useGameStore();
  const [showSetup, setShowSetup] = useState(true);
  const hasHydrated = useHasHydrated();

  // Auto-start first round when game is set up
  useEffect(() => {
    if (!hasHydrated) return;
    if (game && game.phase === 'setup') {
      startRound();
    }
  }, [game, startRound, hasHydrated]);

  if (!hasHydrated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold tracking-tight">GuessUp</div>
          <div className="text-sm text-white/70">Loading game state…</div>
        </div>
      </main>
    );
  }

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
    const medals = ['🥇', '🥈', '🥉'];

    return (
      <main className="min-h-[100dvh] flex flex-col items-center justify-center p-6 relative" style={{ background: '#0A0A12' }}>
        <div style={{
          position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,214,10,0.12), transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none'
        }} />
        <div className="w-full max-w-md text-center space-y-8 relative z-10">
          <div className="text-7xl">🏆</div>
          <h1 className="text-4xl font-black text-white" style={{ fontFamily: 'var(--font-syne)' }}>
            Game Over!
          </h1>
          <div className="space-y-1">
            <p className="text-3xl font-black" style={{ color: '#FFD60A', fontFamily: 'var(--font-syne)' }}>
              {winner.name}
            </p>
            <p className="text-white/40 text-sm">Winner with {winner.score} points</p>
          </div>
          <div className="space-y-3">
            {sortedPlayers.map((player, index) => (
              <div key={player.id} className="flex items-center justify-between px-5 py-4 rounded-xl" style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{medals[index] || `${index + 1}.`}</span>
                  <span className="text-white font-bold">{player.name}</span>
                </div>
                <span className="text-white font-black text-lg">{player.score}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              useGameStore.getState().resetGame();
              setShowSetup(true);
            }}
            className="w-full py-5 rounded-2xl font-black text-xl text-white active:scale-95 transition-transform"
            style={{
              fontFamily: 'var(--font-syne)',
              background: 'linear-gradient(135deg, #00E676 0%, #00C853 100%)',
              boxShadow: '0 8px 32px rgba(0,230,118,0.3)',
            }}
          >
            Play Again
          </button>
        </div>
      </main>
    );
  }

  return null;
}
