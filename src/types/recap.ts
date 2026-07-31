import type { Category, Language } from "./word";

/** Current persisted shape for a completed round recorded for recap generation. */
export const RECAP_EVENT_SCHEMA_VERSION = 1 as const;
export const RECAP_VIEW_MODEL_VERSION = 1 as const;

export type RecapRoundOutcome = "correct" | "passed" | "timedOut";

export interface RecapPlayerSnapshot {
  id: string;
  name: string;
  score: number;
}

/**
 * A serializable record of one resolved round. Keep this independent from the
 * runtime game state so persisted histories can be migrated deliberately.
 */
export interface RecapRoundEventV1 {
  schemaVersion: typeof RECAP_EVENT_SCHEMA_VERSION;
  roundIndex: number;
  completedAt: number;
  category: Category;
  outcome: RecapRoundOutcome;
  presenterId: string;
  guesserId: string | null;
  presenterPoints: number;
  guesserPoints: number;
}

/** Read-only, serializable input used to create a game-night recap. */
export interface GameNightRecapInputV1 {
  schemaVersion: typeof RECAP_EVENT_SCHEMA_VERSION;
  gameId: string;
  language: Language;
  startedAt: number;
  endedAt: number;
  players: RecapPlayerSnapshot[];
  rounds: RecapRoundEventV1[];
}

export interface RecapRoundCounts {
  tasksPlayed: number;
  correct: number;
  passed: number;
  timedOut: number;
}

export interface RecapRankingEntry {
  rank: number;
  playerId: string;
  playerName: string;
  score: number;
}

export interface RecapWinner {
  kind: "winner" | "tie" | "none";
  playerIds: string[];
  playerNames: string[];
}

export interface RecapPlayerStats {
  playerId: string;
  playerName: string;
  tasksPresented: number;
  correctAsPresenter: number;
  passedAsPresenter: number;
  timedOutAsPresenter: number;
  correctAsGuesser: number;
}

export type RecapAwardAvailability = "available" | "tie" | "insufficientData";

export interface RecapPresenterAward {
  availability: RecapAwardAvailability;
  playerIds: string[];
  playerNames: string[];
  correct: number;
  attempts: number;
  successRate: number | null;
  minimumAttempts: number;
}

export interface RecapGuesserAward {
  availability: RecapAwardAvailability;
  playerIds: string[];
  playerNames: string[];
  correct: number;
  minimumCorrect: number;
}

export interface RecapPairingAward {
  availability: RecapAwardAvailability;
  presenterIds: string[];
  presenterNames: string[];
  guesserIds: string[];
  guesserNames: string[];
  correct: number;
  minimumCorrect: number;
}

/**
 * UI-ready, serializable recap data. The builder owns all statistics so
 * renderers and exports never need to reimplement scoring logic.
 */
export interface GameNightRecapViewModelV1 {
  schemaVersion: typeof RECAP_VIEW_MODEL_VERSION;
  gameId: string;
  language: Language;
  startedAt: number;
  endedAt: number;
  durationMs: number;
  roundCounts: RecapRoundCounts;
  winner: RecapWinner;
  rankings: RecapRankingEntry[];
  playerStats: RecapPlayerStats[];
  awards: {
    bestPresenter: RecapPresenterAward;
    bestGuesser: RecapGuesserAward;
    strongestPairing: RecapPairingAward;
  };
}
