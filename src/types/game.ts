import type { Player } from "./player";
import type { Category, Difficulty, Language, Word } from "./word";

export type GamePhase =
  | "wordReveal"
  | "playing"
  | "paused"
  | "roundEnd"
  | "gameOver";

export const VALID_PHASE_TRANSITIONS: Record<GamePhase, GamePhase[]> = {
  wordReveal: ["playing", "gameOver"],
  playing: ["paused", "roundEnd", "gameOver"],
  paused: ["playing", "roundEnd", "gameOver"],
  roundEnd: ["wordReveal", "gameOver"],
  gameOver: [],
};

export type Role = "drawer" | "explainer" | "signer" | "guesser";

export const CATEGORY_TO_ROLE: Record<Category, Role> = {
  draw: "drawer",
  explain: "explainer",
  signal: "signer",
};

export interface GameSettings {
  /** Optional only for migration compatibility with persisted v2 games. */
  packId?: string;
  roundsPerPlayer: number;
  totalRounds: number;
  difficulty: Difficulty;
  categories: Category[];
  roundDuration: 30000 | 45000 | 60000 | 90000;
  wordRevealDuration: number;
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
  createdAt: number;
  startedAt: number;
  endedAt: number | null;
}
