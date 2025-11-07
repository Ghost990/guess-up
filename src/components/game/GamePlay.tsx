'use client';

import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { StunningTimer } from './StunningTimer';

export function GamePlay() {
  const { game, players, currentWord, startRound, endRound } = useGameStore();
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

  // Debug logging
  useEffect(() => {
    if (game) {
      console.log('[GamePlay] State update:', {
        phase: game.phase,
        currentPlayerIndex: game.currentPlayerIndex,
        currentPlayer: currentPlayer?.name,
        allPlayers: players.map(p => p.name),
        currentRound: game.currentRound,
        currentQuestion: game.currentQuestionInRound
      });
    }
  }, [game?.phase, game?.currentPlayerIndex, currentPlayer?.name, players, game?.currentRound, game?.currentQuestionInRound, game]);

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

  // Handle gameplay timer
  useEffect(() => {
    if (game?.phase === 'playing' && !showWord) {
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
  }, [game?.phase, showWord, game?.settings.roundDuration]);

  // Handle timer expiration - show time's up screen
  useEffect(() => {
    if (game?.phase === 'playing' && !showWord && !showPlayerReady && timeLeft === 0 && !showTimesUp) {
      setShowTimesUp(true);
    }
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
    game.currentCategory === 'draw' ? 'var(--color-draw)' :
    game.currentCategory === 'explain' ? 'var(--color-explain)' :
    'var(--color-signal)';

  const progressPercent = (timeLeft / (game.settings.roundDuration / 1000)) * 100;
  const timerColor =
    progressPercent > 50 ? 'var(--color-success)' :
    progressPercent > 25 ? 'var(--color-warning)' :
    'var(--color-error)';

  if (game.phase === 'roundEnd') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="text-center space-y-8 animate-pulse">
          <div className="text-6xl">✨</div>
          <h2 className="text-4xl font-extrabold text-white">Round Complete!</h2>
          <div className="text-2xl text-white font-semibold">
            Next: {players[game.currentPlayerIndex]?.name}
          </div>
          <div className="text-white text-lg opacity-80">Get ready...</div>
        </div>
      </div>
    );
  }

  if (showTimesUp) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 animate-pulse" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
        <div className="text-center space-y-12">
          <div className="space-y-6">
            <div className="text-8xl animate-bounce">⏰</div>
            <h1 className="text-6xl font-extrabold text-white animate-pulse">
              TIME&apos;S UP!
            </h1>
            <div className="text-3xl font-bold text-white opacity-90">
              Round ended for {currentPlayer?.name}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-white text-2xl font-semibold drop-shadow-lg">
              Question {game.currentQuestionInRound} / {game.questionsPerRound}
            </div>
            <div className="flex justify-center gap-8">
              {players.map(player => (
                <div key={player.id} className="text-center bg-white bg-opacity-30 rounded-2xl p-6 backdrop-blur-sm border-2 border-white border-opacity-40 shadow-2xl">
                  <div className="text-white text-base font-bold drop-shadow-md mb-2">{player.name}</div>
                  <div className="text-white text-4xl font-black drop-shadow-lg" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.3)' }}>{player.score}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNextRound}
            className="px-16 py-6 rounded-full bg-white text-red-600 font-bold text-3xl shadow-2xl hover:scale-105 active:scale-95 transition-transform animate-pulse"
          >
            ➡️ Next Round
          </button>

          <div className="text-white text-lg opacity-80">
            No points awarded
          </div>
        </div>
      </div>
    );
  }

  if (showPlayerReady) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
        <div className="text-center space-y-12">
          <div className="space-y-6">
            <div className="text-7xl animate-bounce">🎯</div>
            <h1 className="text-5xl font-extrabold text-white">
              Get Ready!
            </h1>
            <div className="text-3xl font-bold text-white">
              {currentPlayer?.name}&apos;s Turn
            </div>
          </div>

          <div className="relative">
            <div className="text-8xl font-extrabold text-white animate-pulse">
              {readyCountdown}
            </div>
            <div className="text-xl text-white font-semibold mt-4 opacity-90">
              Starting in {readyCountdown} seconds...
            </div>
          </div>

          <button
            onClick={handleSkipReady}
            className="px-12 py-5 rounded-full bg-white text-pink-600 font-bold text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-transform"
          >
            🚀 Start Now!
          </button>

          <div className="text-white text-sm opacity-70">
            Only {currentPlayer?.name} should see the word
          </div>
        </div>
      </div>
    );
  }

  if (!showPlayerReady && showWord && wordRevealTimer > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: categoryColor }}>
        <div className="text-center space-y-8">
          <div className="text-white text-3xl font-bold mb-4">
            {currentPlayer?.name}'s Turn
          </div>
          <div className="text-white text-6xl font-extrabold animate-pulse">
            {currentWord.text.toUpperCase()}
          </div>
          <div className="text-white text-5xl font-extrabold">
            {wordRevealTimer}
          </div>
          <div className="text-white text-2xl font-semibold opacity-90">
            {game.currentCategory === 'draw' ? '🎨 Draw it!' :
             game.currentCategory === 'explain' ? '💬 Explain it!' :
             '👋 Signal it!'}
          </div>
        </div>
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
        currentQuestion={game.currentQuestionInRound}
        totalQuestions={game.questionsPerRound}
        onGotIt={() => setShowPlayerSelect(true)}
        onPass={() => endRound(false)}
      />

      {/* Player selection modal */}
      {showPlayerSelect && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all">
            <h3 className="text-3xl font-bold mb-6 text-center text-gray-900">
              Who guessed it?
            </h3>
            <div className="text-sm text-gray-500 mb-4 text-center">
              Current presenter: {currentPlayer?.name}
            </div>
            <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
              {players
                .filter((player, index) => {
                  // Filter out the current presenter by both index AND player ID for safety
                  const isNotPresenterByIndex = index !== game?.currentPlayerIndex;
                  const isNotPresenterById = player.id !== currentPlayer?.id;
                  return isNotPresenterByIndex && isNotPresenterById;
                })
                .map((player) => (
                  <button
                    key={player.id}
                    onClick={() => {
                      endRound(true, player.id);
                      setShowPlayerSelect(false);
                    }}
                    className="w-full px-8 py-5 rounded-2xl font-bold text-xl text-white shadow-xl hover:opacity-90 transition-all hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: categoryColor,
                      boxShadow: `0 10px 30px ${categoryColor}60`,
                    }}
                  >
                    {player.name}
                  </button>
                ))}
            </div>
            {players.filter((_, index) => index !== game?.currentPlayerIndex).length === 0 && (
              <div className="text-center text-gray-500 mb-6">
                No other players to select
              </div>
            )}
            <button
              onClick={() => setShowPlayerSelect(false)}
              className="w-full px-6 py-4 rounded-2xl font-semibold text-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Floating scores indicator - bottom right */}
      <div className="fixed bottom-6 right-6 z-40 backdrop-blur-xl bg-white bg-opacity-10 rounded-2xl p-4 border border-white border-opacity-20 shadow-2xl">
        <div className="text-xs text-white text-opacity-70 mb-2 text-center font-semibold uppercase tracking-wider">
          Round {game.currentRound + 1} / {game.settings.totalRounds}
        </div>
        <div className="flex gap-4">
          {players.map(player => (
            <div key={player.id} className="text-center">
              <div className="text-xs text-white text-opacity-80 mb-1 font-medium">{player.name}</div>
              <div className="text-2xl font-bold text-white">{player.score}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
