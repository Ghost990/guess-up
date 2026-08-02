/**
 * GuessUp - Type Definitions
 * Central export of all type definitions
 */

// Game types
export type {
  Game,
  GamePhase,
  GameSettings,
  RoundResult,
} from './game';

// Player types
export type { Player } from './player';

// Word types
export type {
  Word,
  WordPack,
  Category,
  Difficulty,
  Language,
} from './word';

export { CATEGORIES, DIFFICULTY_LEVELS } from './word';
