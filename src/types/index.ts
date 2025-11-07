/**
 * GuessUp - Type Definitions
 * Central export of all type definitions
 */

// Game types
export type {
  Game,
  GamePhase,
  GameSettings,
  Role,
} from './game';

export {
  VALID_PHASE_TRANSITIONS,
  CATEGORY_TO_ROLE,
  DEFAULT_GAME_SETTINGS,
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
  WordCategory,
  Category,
  Difficulty,
  WordFilter,
  WordQueryResult,
} from './word';

export {
  DIFFICULTY_LABELS,
  WORD_CONSTRAINTS,
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
