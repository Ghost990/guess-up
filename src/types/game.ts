/**
 * GuessUp - Game Types
 * Core game state types and phase definitions
 */

import { Player } from './player';
import { Word, Category, Difficulty } from './word';
import { Timer } from './timer';
import { Guess } from './events';

/**
 * Game phase state machine
 * Defines all possible game states and valid transitions
 */
export type GamePhase =
  | 'setup'       // Initial player configuration
  | 'lobby'       // Waiting for game start
  | 'wordReveal'  // Showing word to active player (3s)
  | 'playing'     // Active round gameplay
  | 'paused'      // Round paused (optional)
  | 'roundEnd'    // Round results display
  | 'gameOver';   // Final scores and winner

/**
 * Valid phase transitions
 * Used for validation in state management
 */
export const VALID_PHASE_TRANSITIONS: Record<GamePhase, GamePhase[]> = {
  setup: ['lobby'],
  lobby: ['wordReveal'],
  wordReveal: ['playing'],
  playing: ['paused', 'roundEnd'],
  paused: ['playing', 'roundEnd'],
  roundEnd: ['wordReveal', 'gameOver'],
  gameOver: ['setup'], // Replay
};

/**
 * Player roles during a round
 * Determined by active player and category
 */
export type Role =
  | 'drawer'     // Active player (draw category)
  | 'explainer'  // Active player (explain category)
  | 'signer'     // Active player (signal category)
  | 'guesser';   // All non-active players

/**
 * Map category to active role
 */
export const CATEGORY_TO_ROLE: Record<Category, Role> = {
  draw: 'drawer',
  explain: 'explainer',
  signal: 'signer',
};

/**
 * Game configuration settings
 * Set during game setup, immutable during gameplay
 */
export interface GameSettings {
  /** Total rounds to play */
  totalRounds: 5 | 10 | 15;

  /** Word difficulty level */
  difficulty: Difficulty;

  /** Enabled categories (min 1, max 3) */
  categories: Category[];

  /** Milliseconds per round (30s, 60s, or 90s) */
  roundDuration: 30000 | 60000 | 90000;

  /** Milliseconds to show word to active player */
  wordRevealDuration: number;  // Default 3000

  /** Allow players to join mid-game */
  allowMidGameJoin: boolean;

  /** Custom word list (optional) */
  customWords?: Word[];
}

/**
 * Default game settings
 */
export const DEFAULT_GAME_SETTINGS: GameSettings = {
  totalRounds: 5,
  difficulty: 1,
  categories: ['draw', 'explain', 'signal'],
  roundDuration: 60000,
  wordRevealDuration: 3000,
  allowMidGameJoin: false,
};

/**
 * Main game state interface
 * Represents a complete game session from setup to completion
 */
export interface Game {
  /** Unique game session identifier (UUID v4) */
  id: string;

  /** Player ID of the host (creator) */
  hostPlayerId: string;

  /** All players in the game (max 8) */
  players: Player[];

  /** Current round number (1-indexed) */
  currentRound: number;

  /** Total rounds to play (5, 10, or 15) */
  totalRounds: number;

  /** Current game phase */
  phase: GamePhase;

  /** Index of active player in players array */
  currentPlayerIndex: number;

  /** Current round's category */
  currentCategory: Category;

  /** Current word (hidden from guessers) */
  currentWord: Word | null;

  /** Timer state */
  timer: Timer;

  /** Player scores (playerId → score) */
  scores: Record<string, number>;

  /** All guesses for current round */
  guesses: Guess[];

  /** Game configuration */
  settings: GameSettings;

  /** Game creation timestamp (ms) */
  createdAt: number;

  /** Game start timestamp (ms) - null until started */
  startedAt: number | null;

  /** Game end timestamp (ms) - null until ended */
  endedAt: number | null;

  /** Room/lobby join code (6 digits) */
  joinCode?: string;

  /** Current question number in round (1-indexed) */
  currentQuestionInRound: number;

  /** Questions per round (default 10) */
  questionsPerRound: number;
}
