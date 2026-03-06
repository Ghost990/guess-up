'use client';

import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { StunningTimer } from './StunningTimer';

export function GamePlay() {
  const { game, players, currentWord, startRound, endRound, finishGame } = useGameStore();
  const [timeLeft, setTimeLeft] = useState(60);
  const [showPlayerReady, setShowPlayerReady] = useState(true);
  const [readyCountdown, setReadyCountdown] = useState(10);
  const [showWord, setShowWord] = useState(false);
  const [wordRevealTimer, setWordRevealTimer] = useState(3);
  const [showPlayerSelect, setShowPlayerSelect] = useState(false);
  const [showWordPeek, setShowWordPeek] = useState(false);
  const [peekTimeLeft, setPeekTimeLeft] = useState(5);
  const [showTimesUp, setShowTimesUp] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const revealRef = useRef<NodeJS.Timeout | null>(null);
  const peekTimerRef = useRef<NodeJS.Timeout | null>(null);
  const readyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPlayer = players[game?.currentPlayerIndex ?? 0];
  const totalRounds = game?.settings.totalRounds ?? 0;
  const currentRoundNumber = Math.min((game?.currentRound ?? 0) + 1, totalRounds || 1);
  const selectablePlayers = currentPlayer
    ? players.filter((player) => player.id !== currentPlayer.id)
    : [];

  // Debug logging
  useEffect(() => {
    if (game) {
      console.log('[GamePlay] State update:', {
        phase: game.phase,
        currentPlayerIndex: game.currentPlayerIndex,
        currentPlayer: currentPlayer?.name,
        allPlayers: players.map(p => p.name),
        currentRound: game.currentRound,
        totalRounds: game.settings.totalRounds
      });
    }
  }, [game?.phase, game?.currentPlayerIndex, currentPlayer?.name, players, game?.currentRound, game?.settings.totalRounds, game]);

  // Handle round end transition
  useEffect(() => {
    if (game?.phase === 'roundEnd') {
      console.log('[GamePlay] Round end transition starting, will call startRound() in 3s');
      const timer = setTimeout(() => {
        console.log('[GamePlay] Calling startRound() now');
        setShowPlayerReady(true);
        setReadyCountdown(10);
        setShowWord(false);
        setWordRevealTimer(3);
        setTimeLeft(60);       // Pre-reset to avoid false Times Up trigger
        setShowTimesUp(false); // Clear previous round's Times Up state
        setShowPlayerSelect(false);
        startRound();
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.phase]);

  // Handle player ready countdown (10 seconds)
  useEffect(() => {
    if (game?.phase === 'playing' && showPlayerReady && readyCountdown > 0) {
      readyTimerRef.current = setInterval(() => {
        setReadyCountdown(prev => {
          if (prev <= 1) {
            setShowPlayerReady(false);
            setShowWord(true);
            if (readyTimerRef.current) clearInterval(readyTimerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (readyTimerRef.current) clearInterval(readyTimerRef.current);
      };
    }
  }, [game?.phase, showPlayerReady, readyCountdown]);

  // Function to skip player ready countdown
  const handleSkipReady = () => {
    if (showPlayerReady) {
      setShowPlayerReady(false);
      setShowWord(true);
      if (readyTimerRef.current) clearInterval(readyTimerRef.current);
    }
  };

  // Handle word reveal countdown
  useEffect(() => {
    if (game?.phase === 'playing' && !showPlayerReady && showWord && wordRevealTimer > 0) {
      revealRef.current = setInterval(() => {
        setWordRevealTimer(prev => {
          if (prev <= 1) {
            setShowWord(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (revealRef.current) clearInterval(revealRef.current);
      };
    }
  }, [game?.phase, showPlayerReady, showWord, wordRevealTimer]);

  // Handle gameplay timer — only starts after player ready countdown and word reveal are done
  useEffect(() => {
    if (game?.phase === 'playing' && !showWord && !showPlayerReady) {
      const duration = Math.floor(game.settings.roundDuration / 1000);
      setTimeLeft(duration);

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [game?.phase, showWord, showPlayerReady, game?.settings.roundDuration]);

  // Handle timer expiration - show time's up screen
  // Guard: only fire if timeLeft was previously > 0 (timer actually ran, not stale 0 from prev round)
  const prevTimeLeftRef = useRef<number>(60);
  useEffect(() => {
    if (game?.phase === 'playing' && !showWord && !showPlayerReady && timeLeft === 0 && !showTimesUp) {
      if (prevTimeLeftRef.current > 0) {
        setShowTimesUp(true);
      }
    }
    prevTimeLeftRef.current = timeLeft;
  }, [timeLeft, game?.phase, showWord, showPlayerReady, showTimesUp]);

  // Handle word peek timer (5 seconds)
  useEffect(() => {
    if (showWordPeek && peekTimeLeft > 0) {
      peekTimerRef.current = setInterval(() => {
        setPeekTimeLeft(prev => {
          if (prev <= 1) {
            setShowWordPeek(false);
            setPeekTimeLeft(5);
            if (peekTimerRef.current) clearInterval(peekTimerRef.current);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (peekTimerRef.current) clearInterval(peekTimerRef.current);
      };
    }
  }, [showWordPeek, peekTimeLeft]);

  // Function to handle word peek
  const handleWordPeek = () => {
    if (!showWordPeek && !showWord) {
      setShowWordPeek(true);
      setPeekTimeLeft(5);
    }
  };

  // Function to handle manual next round
  const handleNextRound = () => {
    setShowTimesUp(false);
    endRound(false);
  };

  if (!game || !currentWord) return null;

  const categoryColor =
    game.currentCategory === 'draw' ? '#FFD60A' :
    game.currentCategory === 'explain' ? '#00E5FF' :
    '#FF3A8F';

  const progressPercent = (timeLeft / (game.settings.roundDuration / 1000)) * 100;
  const timerColor =
    progressPercent > 50 ? 'var(--color-success)' :
    progressPercent > 25 ? 'var(--color-warning)' :
    'var(--color-error)';

  if (game.phase === 'roundEnd') {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6" style={{ background: '#0A0A12' }}>
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="text-6xl">✨</div>
          <h2 className="text-4xl font-black text-white" style={{ fontFamily: 'var(--font-syne)' }}>
            Round Complete!
          </h2>
          <p className="text-lg text-white/50">
            Next up: <span className="font-bold text-white" style={{ color: categoryColor }}>{players[game.currentPlayerIndex]?.name}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {sortedPlayers.map((p) => (
              <div key={p.id} className="px-5 py-3 rounded-xl text-center" style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <div className="text-white/60 text-sm font-medium">{p.name}</div>
                <div className="text-white text-xl font-black">{p.score}</div>
              </div>
            ))}
          </div>
          <div className="space-y-3 pt-4">
            <button
              onClick={() => {}}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white active:scale-95 transition-transform"
              style={{
                background: 'linear-gradient(135deg, rgba(0,230,118,0.2), rgba(0,200,83,0.2))',
                border: '1px solid rgba(0,230,118,0.4)',
                backdropFilter: 'blur(16px)',
              }}
            >
              Continue →
            </button>
            <button
              onClick={() => finishGame()}
              className="w-full py-3 rounded-2xl font-bold text-sm text-white/70 active:scale-95 transition-transform"
              style={{
                background: 'rgba(255,68,68,0.1)',
                border: '1px solid rgba(255,68,68,0.3)',
                backdropFilter: 'blur(16px)',
              }}
            >
              Finish Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showTimesUp) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-6 relative" style={{ background: '#0A0A12' }}>
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,68,68,0.15), transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none'
        }} />
        <div className="w-full max-w-md text-center space-y-8" style={{
          background: 'rgba(15,15,20,0.95)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          padding: '40px 32px',
        }}>
          <div className="space-y-3">
            <div className="text-6xl">⏱️</div>
            <h1 className="text-4xl font-black text-white" style={{ fontFamily: 'var(--font-syne)' }}>
              Time&apos;s Up!
            </h1>
            <p className="text-white/40 text-sm">
              Round {currentRoundNumber} / {game.settings.totalRounds}
            </p>
          </div>

          <p className="text-lg font-bold text-white/60">Who guessed it?</p>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {selectablePlayers.map((player) => (
              <button
                key={player.id}
                onClick={() => {
                  setShowTimesUp(false);
                  endRound(true, player.id);
                }}
                className="w-full px-6 py-4 rounded-xl font-bold text-lg text-white transition-all active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {player.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextRound}
            className="w-full py-4 rounded-xl font-bold text-base active:scale-95 transition-transform"
            style={{
              background: 'rgba(255,68,68,0.12)',
              border: '1px solid rgba(255,68,68,0.3)',
              color: '#FF6B6B',
            }}
          >
            No one guessed it
          </button>
        </div>
      </div>
    );
  }

  if (showPlayerReady) {
    const readyCategoryEmoji =
      game.currentCategory === 'draw' ? '🎨' :
      game.currentCategory === 'explain' ? '💬' : '👋';
    const readyCategoryLabel =
      game.currentCategory === 'draw' ? 'DRAW' :
      game.currentCategory === 'explain' ? 'EXPLAIN' : 'SIGNAL';

    return (
      <div
        className="min-h-[100dvh] flex flex-col items-center justify-center p-6"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${categoryColor}15 0%, transparent 60%), #0A0A12`,
        }}
      >
        <div className="text-center space-y-10">
          {/* Category emoji + pill */}
          <div className="space-y-3">
            <div className="text-6xl">{readyCategoryEmoji}</div>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wider"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: categoryColor,
              }}
            >
              {readyCategoryLabel}
            </div>
          </div>

          {/* Get Ready heading */}
          <h1
            className="text-5xl font-black text-white"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Get Ready!
          </h1>

          {/* Player name */}
          <div className="text-xl text-white/60 font-medium">
            {currentPlayer?.name}&apos;s Turn
          </div>

          {/* Countdown number */}
          <div className="relative">
            <div
              className="text-[8rem] leading-none font-thin text-white/80"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {readyCountdown}
            </div>
            <div className="text-base text-white/40 mt-4">
              Starting in {readyCountdown} seconds...
            </div>
          </div>

          {/* Start Now button */}
          <button
            onClick={handleSkipReady}
            className="px-12 py-5 rounded-2xl font-bold text-xl text-white active:scale-95 transition-transform"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            Start Now!
          </button>

          <div className="text-white/30 text-sm">
            Only {currentPlayer?.name} should see the word
          </div>
        </div>
      </div>
    );
  }

  if (!showPlayerReady && showWord && wordRevealTimer > 0) {
    const categoryEmoji = game.currentCategory === 'draw' ? '🎨' : game.currentCategory === 'explain' ? '💬' : '👋';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative"
        style={{ background: `linear-gradient(160deg, ${categoryColor} 0%, ${categoryColor}99 45%, #0A0A12 100%)` }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.15)',
          pointerEvents: 'none'
        }} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 24px', borderRadius: '999px',
          background: `${categoryColor}20`,
          border: `1px solid ${categoryColor}60`,
          backdropFilter: 'blur(20px)',
          marginBottom: '32px'
        }}>
          <span style={{ fontSize: '1.5rem' }}>{categoryEmoji}</span>
          <span style={{ color: categoryColor, fontWeight: 700, fontFamily: 'var(--font-syne)', letterSpacing: '0.1em' }}>
            {game.currentCategory.toUpperCase()}
          </span>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '24px',
          padding: '48px 40px',
          textAlign: 'center',
          width: '100%',
          maxWidth: '400px'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', letterSpacing: '0.15em', marginBottom: '16px', fontFamily: 'var(--font-syne)' }}>YOUR WORD</p>
          <p style={{ color: '#FFFFFF', fontSize: 'clamp(2rem,8vw,3rem)', fontWeight: 900, fontFamily: 'var(--font-syne)', lineHeight: 1.1 }}>
            {currentWord?.text.toUpperCase()}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem', marginTop: '20px' }}>
            Others will {game.currentCategory} this
          </p>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem', marginTop: '32px' }}>
          Starting in {wordRevealTimer}s...
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Word peek floating button - overlays on top of timer */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
        <button
          onClick={handleWordPeek}
          className="px-6 py-3 rounded-full text-white font-bold text-lg shadow-2xl hover:opacity-90 transition-all active:scale-95 backdrop-blur-xl border-2"
          style={{
            backgroundColor: `${categoryColor}cc`,
            borderColor: categoryColor,
            boxShadow: `0 10px 30px ${categoryColor}60`,
          }}
        >
          {showWordPeek ? '👁️ ' + currentWord.text.toUpperCase() : '👁️ ' + game.currentCategory.toUpperCase()}
        </button>
        {showWordPeek && (
          <div className="absolute top-full mt-2 text-sm font-semibold text-white bg-black bg-opacity-50 px-3 py-1 rounded-full backdrop-blur-sm">
            Hiding in {peekTimeLeft}s...
          </div>
        )}
      </div>

      {/* Stunning Timer Component */}
      <StunningTimer
        timeLeft={timeLeft}
        totalDuration={Math.floor(game.settings.roundDuration / 1000)}
        category={game.currentCategory}
        currentPlayer={currentPlayer?.name || ''}
        currentTurn={currentRoundNumber}
        totalTurns={game.settings.totalRounds}
        onGotIt={() => setShowPlayerSelect(true)}
        onPass={() => endRound(false)}
      />

      {/* Player selection modal - Enhanced with better visibility */}
      {showPlayerSelect && (
        <div
          className="fixed inset-0 flex items-end justify-center z-50 p-4 pb-8"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
        >
          <div
            className="w-full max-w-md space-y-4"
            style={{
              background: 'rgba(12,12,20,0.97)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '28px',
              padding: '32px 24px',
            }}
          >
            <div className="text-center space-y-1 pb-2">
              <div className="text-5xl">🎉</div>
              <h3 className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-syne)' }}>
                Who guessed it?
              </h3>
              <p className="text-white/40 text-sm">
                {currentPlayer?.name} was presenting
              </p>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {selectablePlayers.map((player) => (
                <button
                  key={player.id}
                  type="button"
                  onClick={() => {
                    endRound(true, player.id);
                    setShowPlayerSelect(false);
                  }}
                  className="w-full py-4 rounded-2xl font-bold text-xl text-white active:scale-95 transition-transform"
                  style={{
                    background: `${categoryColor}18`,
                    border: `1px solid ${categoryColor}50`,
                    color: '#fff',
                  }}
                >
                  {player.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowPlayerSelect(false)}
              type="button"
              className="w-full py-4 rounded-2xl font-bold text-base active:scale-95 transition-transform"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

    </>
  );
}
