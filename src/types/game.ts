import type { Player } from "./player";
import type { Category, Difficulty, Language, Word } from "./word";

export type GamePhase =
  | "wordReveal"
  | "playing"
  | "paused"
  | "roundEnd"
  | "gameOver";

export interface GameSettings {
  /** Optional only for migration compatibility with persisted v2 games. */
  packId?: string;
  roundsPerPlayer: number;
  totalRounds: number;
  difficulty: Difficulty;
  categories: Category[];
  roundDuration: 30000 | 45000 | 60000 | 90000;
  language: Language;
}

export interface RoundResult {
  roundIndex: number;
  presenterId: string;
  guesserId: string | null;
  success: boolean;
  word: Word;
  category: Category;
  presenterPoints: number;
  guesserPoints: number;
}

export interface Game {
  id: string;
  players: Player[];
  phase: GamePhase;
  currentRound: number;
  currentPlayerIndex: number;
  currentCategory: Category;
  currentWord: Word;
  settings: GameSettings;
  usedWordIds: string[];
  roundEndsAt: number | null;
  pausedRemainingMs: number | null;
  startedAt: number;
  endedAt: number | null;
}
