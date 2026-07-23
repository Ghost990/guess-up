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
  Role,
} from './game';

export {
  VALID_PHASE_TRANSITIONS,
  CATEGORY_TO_ROLE,
} from './game';

// Player types
export type {
  Player,
  CreatePlayerInput,
  UpdatePlayerInput,
  PlayerWithRole,
} from './player';

export { PLAYER_CONSTRAINTS } from './player';

// Word types
export type {
  Word,
  WordPack,
  Category,
  Difficulty,
  Language,
  WordFilter,
} from './word';

export {
  CATEGORIES,
  DIFFICULTY_LEVELS,
} from './word';

// Timer types
export type {
  Timer,
  TimerUpdate,
  TimerSyncStatus,
} from './timer';

export { TIMER_CONFIG } from './timer';

// Event types
export type {
  Guess,
  GameEvent,
  GameEventType,
  PlayerJoinedEvent,
  GameStartedEvent,
  RoundStartedEvent,
  GuessSubmittedEvent,
  RoundEndedEvent,
  GameEndedEvent,
} from './events';
