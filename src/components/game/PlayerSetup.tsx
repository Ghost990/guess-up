'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { Trash2, Plus, Sparkles } from 'lucide-react';

const STORAGE_KEY_PLAYERS = 'guessup-player-names';
const STORAGE_KEY_DIFFICULTY = 'guessup-difficulty';

export function PlayerSetup({ onStart }: { onStart: () => void }) {
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [newPlayerInput, setNewPlayerInput] = useState('');
  const setupGame = useGameStore(state => state.setupGame);

  // Load saved players and difficulty from localStorage on mount
  useEffect(() => {
    try {
      const savedPlayers = localStorage.getItem(STORAGE_KEY_PLAYERS);
      const savedDifficulty = localStorage.getItem(STORAGE_KEY_DIFFICULTY);

      if (savedPlayers) {
        const parsed = JSON.parse(savedPlayers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPlayerNames(parsed);
        }
      }

      if (savedDifficulty && ['easy', 'medium', 'hard'].includes(savedDifficulty)) {
        setDifficulty(savedDifficulty as 'easy' | 'medium' | 'hard');
      }
    } catch (error) {
      console.error('Failed to load saved players:', error);
    }
  }, []);

  // Save players to localStorage whenever they change (only save non-empty names)
  useEffect(() => {
    try {
      const nonEmptyPlayers = playerNames.filter(name => name.trim().length > 0);
      if (nonEmptyPlayers.length > 0) {
        localStorage.setItem(STORAGE_KEY_PLAYERS, JSON.stringify(nonEmptyPlayers));
      }
    } catch (error) {
      console.error('Failed to save players:', error);
    }
  }, [playerNames]);

  // Save difficulty to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DIFFICULTY, difficulty);
    } catch (error) {
      console.error('Failed to save difficulty:', error);
    }
  }, [difficulty]);

  const addPlayer = (name?: string) => {
    const playerName = (name || newPlayerInput).trim();
    if (playerName && playerNames.length < 8) {
      setPlayerNames([...playerNames, playerName]);
      setNewPlayerInput('');
    }
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 2) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
    }
  };

  const updatePlayer = (index: number, name: string) => {
    const updated = [...playerNames];
    updated[index] = name;
    setPlayerNames(updated);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>, index?: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index !== undefined) {
        // Focus next input or start button
        const nextInput = document.querySelector(`input[data-player="${index + 1}"]`) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      } else {
        // Add player from "Add Player" input
        addPlayer();
      }
    }
  };

  const handleStart = () => {
    const validNames = playerNames.filter(n => n.trim().length > 0);
    if (validNames.length >= 2) {
      setupGame(validNames, difficulty);
      onStart();
    }
  };

  const validPlayerCount = playerNames.filter(n => n.trim().length > 0).length;
  const canStart = validPlayerCount >= 2;

  // Category color badges for preview
  const categoryBadges = [
    { emoji: '🎨', label: 'Draw', color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
    { emoji: '💬', label: 'Explain', color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    { emoji: '👋', label: 'Signal', color: '#f97316', gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden p-6"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent)',
            top: '-10%',
            left: '-10%',
            animationDuration: '4s',
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent)',
            bottom: '-10%',
            right: '-10%',
            animationDuration: '5s',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* Main content card */}
      <div
        className="relative z-10 w-full max-w-lg backdrop-blur-2xl rounded-3xl shadow-2xl border-2 overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 0 60px rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="p-8 space-y-8">
          {/* Title section with sparkle animation */}
          <div className="text-center space-y-3 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" style={{ animationDuration: '2s' }} />
            </div>
            <h1
              className="text-6xl font-black tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
              }}
            >
              GuessUp
            </h1>
            <p className="text-xl font-semibold text-white/90">
              Activity Party Game
            </p>

            {/* Category preview badges */}
            <div className="flex justify-center gap-2 mt-4 pt-2">
              {categoryBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="group px-3 py-1.5 rounded-full backdrop-blur-xl border transition-all duration-300 hover:scale-110"
                  style={{
                    background: `${badge.color}25`,
                    borderColor: `${badge.color}60`,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{badge.emoji}</span>
                    <span className="text-xs font-bold text-white/80">{badge.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Players section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Players ({validPlayerCount}/8)</h2>
              <span className="text-sm font-medium text-white/70">Min: 2 players</span>
            </div>

            {/* Player list */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {playerNames.map((name, index) => (
                <div
                  key={index}
                  className="group relative backdrop-blur-xl rounded-xl border-2 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: name.trim() ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                    borderColor: name.trim() ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <div className="flex items-center gap-2 p-1">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updatePlayer(index, e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      placeholder={`Player ${index + 1}`}
                      data-player={index}
                      className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/50 text-lg font-semibold focus:outline-none"
                      maxLength={20}
                      autoComplete="off"
                    />
                    {playerNames.length > 2 && (
                      <button
                        onClick={() => removePlayer(index)}
                        className="p-2 rounded-lg transition-all duration-200 hover:bg-red-500/20 active:scale-95 group-hover:opacity-100 opacity-0"
                        style={{
                          color: '#ef4444',
                        }}
                        title="Remove player"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add player section */}
            {playerNames.length < 8 && (
              <div
                className="backdrop-blur-xl rounded-xl border-2 border-dashed transition-all duration-300 hover:border-white/40"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <div className="flex items-center gap-2 p-1">
                  <input
                    type="text"
                    value={newPlayerInput}
                    onChange={(e) => setNewPlayerInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add new player..."
                    className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/50 text-lg font-semibold focus:outline-none"
                    maxLength={20}
                    autoComplete="off"
                  />
                  <button
                    onClick={() => addPlayer()}
                    disabled={!newPlayerInput.trim()}
                    className="p-2 rounded-lg transition-all duration-200 hover:bg-white/10 active:scale-95 disabled:opacity-30"
                    style={{
                      color: 'white',
                    }}
                    title="Add player"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Difficulty section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Difficulty</h2>
            <div className="grid grid-cols-3 gap-3">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className="group relative px-4 py-3 rounded-xl font-bold capitalize text-lg transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                  style={{
                    background: difficulty === level
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%)'
                      : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: difficulty === level ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                    boxShadow: difficulty === level ? '0 8px 32px rgba(255, 255, 255, 0.2)' : 'none',
                  }}
                >
                  <span className="relative z-10">{level}</span>
                  {/* Shine effect on hover */}
                  {difficulty === level && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" style={{ animationDuration: '2s' }} />
                  )}
                </button>
              ))}
            </div>
            <div className="text-center text-sm text-white/70 mt-2">
              {difficulty === 'easy' && '⏱️ 60 seconds per round'}
              {difficulty === 'medium' && '⏱️ 45 seconds per round'}
              {difficulty === 'hard' && '⏱️ 30 seconds per round'}
            </div>
          </div>

          {/* Start button */}
          <button
            onClick={handleStart}
            disabled={!canStart}
            className="group relative w-full px-8 py-5 rounded-2xl font-black text-2xl text-white shadow-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: canStart
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : 'rgba(255, 255, 255, 0.1)',
              boxShadow: canStart ? '0 10px 40px rgba(16, 185, 129, 0.4)' : 'none',
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span>Start Game</span>
              <span className="text-3xl group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
            {/* Animated shine effect */}
            {canStart && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
            )}
          </button>

          {/* Helper text */}
          {!canStart && (
            <div className="text-center text-white/60 text-sm animate-pulse">
              Add at least 2 players to start
            </div>
          )}
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
