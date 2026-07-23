export type Language = "hu" | "en";

export type Category = "draw" | "explain" | "signal";

export type Difficulty = "lowEnglish" | "easy" | "medium" | "hard";

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

export interface WordFilter {
  category?: Category | Category[];
  difficulty?: Difficulty | Difficulty[];
  excludeIds?: string[];
}

export const DIFFICULTY_LEVELS: Difficulty[] = [
  "lowEnglish",
  "easy",
  "medium",
  "hard",
];
export const CATEGORIES: Category[] = ["draw", "explain", "signal"];
