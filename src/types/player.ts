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

}
