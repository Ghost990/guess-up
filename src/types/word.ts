export type Language = "hu" | "en";

export type Category = "draw" | "explain" | "signal";

export type Difficulty = "lowEnglish" | "easy" | "medium" | "challenging" | "hard";

export interface Word {
  id: string;
  text: string;
  categories: Category[];
  difficulty: Difficulty;
  length: number;
  tags: string[];
}

export interface WordPack {
  metadata: {
    version: string;
    language: Language;
    totalWords: number;
    categories: Category[];
    difficulties: Difficulty[];
    lastUpdated: string;
  };
  words: Word[];
}

export const DIFFICULTY_LEVELS: Difficulty[] = [
  "lowEnglish",
  "easy",
  "medium",
  "challenging",
  "hard",
];
export const CATEGORIES: Category[] = ["draw", "explain", "signal"];
