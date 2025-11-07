/**
 * GuessUp - Event Types
 * Game events and action types
 */

import { Player } from './player';
import { Word, Category } from './word';
import { GamePhase, GameSettings } from './game';

/**
 * Guess submitted by a player
 */
export interface Guess {
  /** Player who submitted the guess */
  playerId: string;

  /** The guessed word */
  guess: string;

  /** Timestamp when guess was submitted */
  timestamp: number;

  /** Was the guess correct */
  correct: boolean;

  /** Points awarded for this guess */
  points: number;
}

/**
 * Game event base interface
 * All game events extend this
 */
export interface GameEvent<T = any> {
  /** Event type discriminator */
  type: GameEventType;

  /** Event timestamp (server time) */
  timestamp: number;

  /** Game session ID */
  gameId: string;

  /** Event-specific data */
  data: T;
}

/**
 * All possible game event types
 */
export type GameEventType =
  // Player events
  | 'player_joined'
  | 'player_left'
  | 'player_updated'
  | 'player_disconnected'
  | 'player_reconnected'

  // Game lifecycle events
  | 'game_created'
  | 'game_started'
  | 'game_paused'
  | 'game_resumed'
  | 'game_ended'

  // Round events
  | 'round_started'
  | 'word_revealed'
  | 'word_hidden'
  | 'round_ended'

  // Gameplay events
  | 'guess_submitted'
  | 'correct_guess'
  | 'incorrect_guess'
  | 'drawing_updated'

  // Timer events
  | 'timer_sync'
  | 'timer_warning'  // 10s remaining
  | 'timer_critical' // 5s remaining
  | 'timer_ended'

  // System events
  | 'phase_changed'
  | 'error';

/**
 * Player joined event
 */
export interface PlayerJoinedEvent extends GameEvent<{
  player: Player;
  playerCount: number;
}> {
  type: 'player_joined';
}

/**
 * Game started event
 */
export interface GameStartedEvent extends GameEvent<{
  startedBy: string;
  players: Player[];
  settings: GameSettings;
}> {
  type: 'game_started';
}

/**
 * Round started event
 */
export interface RoundStartedEvent extends GameEvent<{
  round: number;
  category: Category;
  activePlayer: Player;
  word: Word;
}> {
  type: 'round_started';
}

/**
 * Guess submitted event
 */
export interface GuessSubmittedEvent extends GameEvent<{
  guess: Guess;
  correct: boolean;
  points: number;
}> {
  type: 'guess_submitted';
}

/**
 * Round ended event
 */
export interface RoundEndedEvent extends GameEvent<{
  round: number;
  scores: Record<string, number>;
  correctGuesses: Guess[];
  word: Word;
  nextPlayer: Player | null;
}> {
  type: 'round_ended';
}

/**
 * Game ended event
 */
export interface GameEndedEvent extends GameEvent<{
  finalScores: Record<string, number>;
  winner: Player;
  totalRounds: number;
}> {
  type: 'game_ended';
}
