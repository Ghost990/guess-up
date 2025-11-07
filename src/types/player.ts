/**
 * GuessUp - Player Types
 * Player state and related interfaces
 */

import { Role } from './game';

/**
 * Player state interface
 * Represents a single player in a game session
 */
export interface Player {
  /** Unique player identifier (UUID v4) */
  id: string;

  /** Player display name (1-20 characters) */
  name: string;

  /** Current score (points accumulated) */
  score: number;

  /** Timestamp when player joined (ms) */
  joinedAt: number;

  /** Is this player the game host */
  isHost: boolean;

  /** Is player currently connected */
  isActive: boolean;

  /** Has player guessed correctly this round */
  hasGuessedCorrectly: boolean;

  /** Player color for UI (hex code) */
  color?: string;

  /** Player avatar (emoji or URL) */
  avatar?: string;
}

/**
 * Player creation input
 * Used when adding new player to game
 */
export interface CreatePlayerInput {
  name: string;
  color?: string;
  avatar?: string;
}

/**
 * Player update input
 * For modifying existing player properties
 */
export interface UpdatePlayerInput {
  name?: string;
  color?: string;
  avatar?: string;
  isActive?: boolean;
}

/**
 * Player validation constraints
 */
export const PLAYER_CONSTRAINTS = {
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 20,
  MIN_PLAYERS: 2,
  MAX_PLAYERS: 8,
  NAME_PATTERN: /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9\s-]+$/,  // Hungarian chars
} as const;

/**
 * Player with their assigned role for current round
 * Computed from game state
 */
export interface PlayerWithRole extends Player {
  currentRole: Role;
  isActivePlayer: boolean;
}
