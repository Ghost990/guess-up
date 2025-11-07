/**
 * GuessUp - Scoring System
 * Points calculation and scoring logic
 */

import { Guess } from '@/types';

/**
 * Scoring constants
 */
export const SCORING = {
  /** Base points for correct guess */
  CORRECT_GUESS: 10,

  /** Bonus points for fast guess (within 5 seconds) */
  FAST_BONUS: 5,

  /** Fast guess threshold (milliseconds) */
  FAST_THRESHOLD: 5000,

  /** All players correct bonus */
  TEAM_BONUS: 15,
} as const;

/**
 * Calculate points for a guess
 *
 * @param guess - The guess to score
 * @param roundStartTime - When the round started (ms)
 * @returns Points awarded
 */
export function calculateGuessPoints(
  guess: Guess,
  roundStartTime: number
): number {
  if (!guess.correct) {
    return 0;
  }

  let points = SCORING.CORRECT_GUESS;

  // Fast bonus if guessed within threshold
  const guessTime = guess.timestamp - roundStartTime;
  if (guessTime <= SCORING.FAST_THRESHOLD) {
    points += SCORING.FAST_BONUS;
  }

  return points;
}

/**
 * Calculate total scores for all players
 *
 * @param guesses - All guesses for the round
 * @param playerIds - All player IDs
 * @param roundStartTime - When round started
 * @returns Record of playerId to points awarded
 */
export function calculateRoundScores(
  guesses: Guess[],
  playerIds: string[],
  roundStartTime: number
): Record<string, number> {
  const scores: Record<string, number> = {};

  // Initialize all players to 0
  playerIds.forEach(id => {
    scores[id] = 0;
  });

  // Calculate individual guess scores
  guesses.forEach(guess => {
    if (guess.correct) {
      scores[guess.playerId] = calculateGuessPoints(guess, roundStartTime);
    }
  });

  // Team bonus if all players guessed correctly
  const correctGuesses = guesses.filter(g => g.correct);
  if (correctGuesses.length === playerIds.length) {
    playerIds.forEach(id => {
      scores[id] += SCORING.TEAM_BONUS;
    });
  }

  return scores;
}
