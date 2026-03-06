'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { Trash2, Plus } from 'lucide-react';

const STORAGE_KEY_PLAYERS = 'guessup-player-names';
const STORAGE_KEY_DIFFICULTY = 'guessup-difficulty';

const categoryBadges = [
  { emoji: '\u{1F3A8}', label: 'DRAW', color: '#FFD60A' },
  { emoji: '\u{1F4AC}', label: 'EXPLAIN', color: '#00E5FF' },
  { emoji: '\u{1F44B}', label: 'SIGNAL', color: '#FF3A8F' },
];

const difficultyConfig = {
  easy: { color: '#00E676', tint: '#00E67615', border: '#00E67644', desc: 'Common, everyday words' },
  medium: { color: '#F59E0B', tint: '#F59E0B15', border: '#F59E0B44', desc: 'Trickier concepts and actions' },
  hard: { color: '#FF4444', tint: '#FF444415', border: '#FF444444', desc: 'Rare, abstract or tricky words' },
};

export function PlayerSetup({ onStart }: { onStart: () => void }) {
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [newPlayerInput, setNewPlayerInput] = useState('');
  const [selectedRounds, setSelectedRounds] = useState(9);
  const setupGame = useGameStore(state => state.setupGame);

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

  useEffect(() => {
    try {
      const normalizedPlayers = playerNames
        .map(name => name.trim())
        .filter(name => name.length > 0);

      if (normalizedPlayers.length > 0) {
        localStorage.setItem(STORAGE_KEY_PLAYERS, JSON.stringify(normalizedPlayers));
      } else {
        localStorage.removeItem(STORAGE_KEY_PLAYERS);
      }
    } catch (error) {
      console.error('Failed to save players:', error);
    }
  }, [playerNames]);

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
        const nextInput = document.querySelector(`input[data-player="${index + 1}"]`) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      } else {
        addPlayer();
      }
    }
  };

  const handleStart = () => {
    let nextPlayerNames = playerNames;
    const pendingName = newPlayerInput.trim();

    if (pendingName) {
      nextPlayerNames = [...playerNames, pendingName];
      setPlayerNames(nextPlayerNames);
      setNewPlayerInput('');
    }

    const validNames = nextPlayerNames
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (validNames.length >= 2) {
      setupGame(validNames, difficulty, selectedRounds);
      onStart();
    }
  };

  const trimmedPlayers = playerNames
    .map(n => n.trim())
    .filter(n => n.length > 0);
  const pendingPlayer = newPlayerInput.trim();
  const projectedPlayers = pendingPlayer ? [...trimmedPlayers, pendingPlayer] : trimmedPlayers;
  const validPlayerCount = projectedPlayers.length;
  const canStart = validPlayerCount >= 2;

  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center px-6 py-10 overflow-y-auto"
      style={{ background: '#0A0A12' }}
    >
      <div className="w-full max-w-lg space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1
            className="text-5xl sm:text-6xl font-black tracking-tight text-white"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Guess<span style={{ color: '#FFD60A' }}>Up</span>
          </h1>
          <p className="text-white/50 text-lg font-medium">Party Game</p>
        </div>

        {/* Category badges */}
        <div className="flex justify-center gap-3">
          {categoryBadges.map((badge) => (
            <div
              key={badge.label}
              className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5"
              style={{
                background: `${badge.color}18`,
                color: badge.color,
                border: `1px solid ${badge.color}33`,
              }}
            >
              <span>{badge.emoji}</span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Players section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
              Players ({validPlayerCount}/8)
            </h2>
            <span className="text-sm text-white/40">Min: 2</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {playerNames.map((name, index) => (
              <div
                key={index}
                className="rounded-xl border transition-colors"
                style={{
                  background: '#12121E',
                  borderColor: name.trim() ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
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
                    className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/30 text-base font-medium focus:outline-none"
                    maxLength={20}
                    autoComplete="off"
                  />
                  {playerNames.length > 2 && (
                    <button
                      onClick={() => removePlayer(index)}
                      className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      title="Remove player"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {playerNames.length < 8 && (
            <div
              className="rounded-xl border border-dashed transition-colors"
              style={{
                background: '#12121E',
                borderColor: 'rgba(255,255,255,0.1)',
              }}
            >
              <div className="flex items-center gap-2 p-1">
                <input
                  type="text"
                  value={newPlayerInput}
                  onChange={(e) => setNewPlayerInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add new player..."
                  className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/30 text-base font-medium focus:outline-none"
                  maxLength={20}
                  autoComplete="off"
                />
                <button
                  onClick={() => addPlayer()}
                  disabled={!newPlayerInput.trim()}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-20"
                  title="Add player"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Difficulty section */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
            Difficulty
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {(['easy', 'medium', 'hard'] as const).map((level) => {
              const cfg = difficultyConfig[level];
              const selected = difficulty === level;
              return (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className="px-4 py-3 rounded-xl font-bold capitalize text-sm transition-all active:scale-95"
                  style={{
                    background: selected ? cfg.tint : '#12121E',
                    color: selected ? cfg.color : 'rgba(255,255,255,0.5)',
                    border: `1.5px solid ${selected ? cfg.border : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  {level}
                </button>
              );
            })}
          </div>
          <p className="text-center text-sm text-white/40">
            {difficultyConfig[difficulty].desc}
          </p>
        </div>

        {/* Rounds section */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
            Rounds
          </h2>
          <div className="flex gap-3">
            {[6, 9, 12, 15, 18].map((count) => {
              const selected = selectedRounds === count;
              return (
                <button
                  key={count}
                  onClick={() => setSelectedRounds(count)}
                  className="flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
                  style={{
                    background: selected ? 'rgba(255,255,255,0.15)' : '#12121E',
                    color: selected ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                    border: selected ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {count}
                </button>
              );
            })}
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={handleStart}
          disabled={!canStart}
          className="w-full py-5 rounded-2xl font-black text-xl text-white active:scale-95 transition-transform disabled:opacity-40 disabled:active:scale-100"
          style={{
            fontFamily: 'var(--font-syne)',
            background: canStart
              ? 'linear-gradient(135deg, #00E676 0%, #00C853 100%)'
              : '#12121E',
            boxShadow: canStart ? '0 8px 32px rgba(0,230,118,0.3)' : 'none',
          }}
        >
          Start Game
        </button>

        {!canStart && (
          <p className="text-center text-white/30 text-sm">
            Add at least 2 players to start
          </p>
        )}
      </div>
    </div>
  );
}
