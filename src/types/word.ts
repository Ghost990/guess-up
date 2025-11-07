/**
 * GuessUp - Word Types
 * Word database and category types
 */

/**
 * Word category taxonomy
 */
export type WordCategory =
  | 'animals'      // Animals (kutya, macska, ló)
  | 'objects'      // Physical objects (szék, asztal, könyv)
  | 'actions'      // Verbs/actions (fut, ugrik, eszik)
  | 'professions'  // Jobs (tanár, orvos, művész)
  | 'foods'        // Food items (kenyér, tej, sajt)
  | 'places'       // Locations (iskola, park, piac)
  | 'abstract'     // Abstract concepts (szerelem, béke, idő)
  | 'events';      // Events (születésnap, esküvő, ünnep)

/**
 * Game activity categories
 * Each requires different player interaction
 */
export type Category =
  | 'draw'      // Drawing on canvas
  | 'explain'   // Verbal/text explanation
  | 'signal';   // Gesture/pantomime

/**
 * Difficulty levels
 */
export type Difficulty = 1 | 2 | 3;

/**
 * Difficulty descriptions
 */
export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  1: 'Könnyű',   // Easy
  2: 'Közepes',  // Medium
  3: 'Nehéz',    // Hard
};

/**
 * Word interface
 * Represents a single word in the database
 */
export interface Word {
  /** Unique word identifier */
  id: string;

  /** The word text (Hungarian) */
  text: string;

  /** Word category for filtering */
  category: WordCategory;

  /** Difficulty level (1: easy, 2: medium, 3: hard) */
  difficulty: Difficulty;

  /** Character length (for difficulty calculation) */
  length: number;

  /** Language code (ISO 639-1) */
  language: 'hu';

  /** Optional tags for advanced filtering */
  tags: string[];

  /** Timestamp when word was used (session-scoped) */
  usedAt?: number;

  /** Frequency rank (1 = most common) */
  frequencyRank?: number;
}

/**
 * Word database query filter
 */
export interface WordFilter {
  category?: WordCategory | WordCategory[];
  difficulty?: Difficulty | Difficulty[];
  minLength?: number;
  maxLength?: number;
  tags?: string[];
  excludeIds?: string[];
}

/**
 * Word database query result
 */
export interface WordQueryResult {
  words: Word[];
  total: number;
  hasMore: boolean;
}

/**
 * Word validation schema
 */
export const WORD_CONSTRAINTS = {
  TEXT_MIN_LENGTH: 2,
  TEXT_MAX_LENGTH: 30,
  MIN_WORDS_PER_CATEGORY: 50,  // Minimum words per category for good experience
  DIFFICULTY_LETTER_THRESHOLDS: {
    1: 5,   // Easy: ≤5 letters
    2: 8,   // Medium: 6-8 letters
    3: 100, // Hard: >8 letters
  },
} as const;
