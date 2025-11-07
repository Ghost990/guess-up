import { create } from 'zustand';
import type { Game, Player, Word } from '@/types';
import { fisherYatesShuffle } from '@/lib/game/randomization';
import wordsData from '@/data/words-hu.json';

interface GameStore {
  game: Game | null;
  players: Player[];
  currentWord: Word | null;

  // Actions
  setupGame: (playerNames: string[], difficulty: 'easy' | 'medium' | 'hard') => void;
  startRound: () => void;
  endRound: (success: boolean, guesserId?: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  game: null,
  players: [],
  currentWord: null,

  setupGame: (playerNames, difficulty) => {
    const now = Date.now();
    const players: Player[] = playerNames.map((name, index) => ({
      id: `player-${index + 1}`,
      name,
      score: 0,
      joinedAt: now,
      isHost: index === 0,
      isActive: true,
      hasGuessedCorrectly: false,
    }));

    const totalRounds = playerNames.length * 3;
    const gameSettings = {
      totalRounds: totalRounds as 5 | 10 | 15,
      difficulty: (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3) as 1 | 2 | 3,
      categories: ['draw', 'explain', 'signal'] as Array<'draw' | 'explain' | 'signal'>,
      roundDuration: 60000 as 30000 | 60000 | 90000,
      wordRevealDuration: 3000,
      allowMidGameJoin: false,
    };

    const newGame: Game = {
      id: `game-${Date.now()}`,
      hostPlayerId: players[0].id,
      players,
      phase: 'setup',
      currentRound: 0,
      totalRounds,
      currentPlayerIndex: 0,
      currentCategory: 'draw',
      currentWord: null,
      timer: {
        serverTime: now,
        phaseStartTime: now,
        phaseDuration: 60000,
        remainingMs: 60000,
        isPaused: false,
        pausedAt: null,
      },
      scores: Object.fromEntries(players.map(p => [p.id, 0])),
      guesses: [],
      settings: gameSettings,
      createdAt: Date.now(),
      startedAt: null,
      endedAt: null,
      currentQuestionInRound: 1,
      questionsPerRound: 10,
    };

    set({
      players,
      game: newGame,
    });
  },

  startRound: () => {
    const state = get();
    const { game, players } = state;
    if (!game) return;

    console.log('[startRound] Called with state:', {
      currentPlayerIndex: game.currentPlayerIndex,
      currentPlayer: players[game.currentPlayerIndex]?.name,
      currentRound: game.currentRound,
      currentQuestion: game.currentQuestionInRound,
      phase: game.phase
    });

    const categories: Array<'draw' | 'explain' | 'signal'> = ['draw', 'explain', 'signal'];
    const category = categories[game.currentRound % 3];

    // Map numeric difficulty to string for word filtering
    const difficultyMap: Record<number, 'easy' | 'medium' | 'hard'> = {
      1: 'easy',
      2: 'medium',
      3: 'hard',
    };
    const wordDifficulty = difficultyMap[game.settings.difficulty];

    // Filter words - the JSON structure has string difficulty and categories array
    const filteredWords = wordsData.words.filter(
      (w: any) => w.difficulty === wordDifficulty && w.categories.includes(category)
    );
    const shuffledWords = fisherYatesShuffle(filteredWords);
    const rawWord = shuffledWords[0] as any;

    // Map JSON word to Word type
    const word: Word = {
      id: rawWord.id,
      text: rawWord.text,
      category: 'animals', // Default category, not critical for gameplay
      difficulty: game.settings.difficulty,
      length: rawWord.length,
      language: 'hu',
      tags: rawWord.tags || [],
    };

    // Use set with function to ensure we get the latest state
    // CRITICAL: Preserve ALL game state fields, only update phase and category
    set((state) => {
      console.log('[startRound] Setting state. Current player index preserved:', state.game?.currentPlayerIndex);
      return {
        game: {
          ...state.game!,
          phase: 'playing',
          currentCategory: category,
        },
        currentWord: word,
      };
    });
  },

  endRound: (success, guesserId) => {
    const { game, players } = get();
    if (!game) return;

    console.log('[endRound] Called with:', {
      success,
      guesserId,
      currentPlayerIndex: game.currentPlayerIndex,
      currentPlayer: players[game.currentPlayerIndex]?.name,
      currentQuestion: game.currentQuestionInRound,
      questionsPerRound: game.questionsPerRound
    });

    // Update scores: presenter gets 1 point (entertained), guesser gets 2 points (guessed correctly)
    if (success && guesserId) {
      const updatedPlayers = players.map((p) => {
        if (p.id === players[game.currentPlayerIndex].id) {
          return { ...p, score: p.score + 1 };
        }
        if (p.id === guesserId) {
          return { ...p, score: p.score + 2 };
        }
        return p;
      });
      set({ players: updatedPlayers });
    }

    // Check if round is complete (10 questions)
    if (game.currentQuestionInRound >= game.questionsPerRound) {
      // Round complete, move to next player
      const nextPlayerIndex = (game.currentPlayerIndex + 1) % players.length;
      const nextRound = game.currentRound + 1;

      console.log('[endRound] Round complete! Moving to next player:', {
        currentPlayerIndex: game.currentPlayerIndex,
        nextPlayerIndex,
        currentPlayer: players[game.currentPlayerIndex]?.name,
        nextPlayer: players[nextPlayerIndex]?.name,
        nextRound
      });

      if (nextRound >= game.settings.totalRounds) {
        console.log('[endRound] Game over!');
        set({ game: { ...game, phase: 'gameOver', currentRound: nextRound } });
      } else {
        console.log('[endRound] Setting state with nextPlayerIndex:', nextPlayerIndex);
        set({
          game: {
            ...game,
            phase: 'roundEnd',
            currentRound: nextRound,
            currentPlayerIndex: nextPlayerIndex,
            currentQuestionInRound: 1,
          },
          players: players.map((p) => ({
            ...p,
            hasGuessedCorrectly: false,
          })),
        });
      }
    } else {
      // Continue with next question in same round
      const nextQuestionInRound = game.currentQuestionInRound + 1;
      console.log('[endRound] Continuing same round, next question:', nextQuestionInRound);
      set({
        game: {
          ...game,
          phase: 'roundEnd',
          currentQuestionInRound: nextQuestionInRound,
        },
        players: players.map((p) => ({
          ...p,
          hasGuessedCorrectly: false,
        })),
      });
    }
  },

  resetGame: () => set({ game: null, players: [], currentWord: null }),
}));
