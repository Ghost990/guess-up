/**
 * GuessUp - Core Game Logic
 * Game state transitions and validation
 */

import { GamePhase, VALID_PHASE_TRANSITIONS } from '@/types';

/**
 * Check if phase transition is valid
 *
 * @param currentPhase - Current game phase
 * @param nextPhase - Desired next phase
 * @returns True if transition is valid
 */
export function isValidPhaseTransition(
  currentPhase: GamePhase,
  nextPhase: GamePhase
): boolean {
  const validTransitions = VALID_PHASE_TRANSITIONS[currentPhase];
  return validTransitions.includes(nextPhase);
}

/**
 * Normalize guess for comparison
 * Remove accents, convert to lowercase, trim whitespace
 *
 * @param text - Text to normalize
 * @returns Normalized text
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove accents
}

/**
 * Check if guess matches word
 *
 * @param guess - Player's guess
 * @param correctWord - Correct word
 * @returns True if guess is correct
 */
export function isGuessCorrect(guess: string, correctWord: string): boolean {
  return normalizeText(guess) === normalizeText(correctWord);
}

/**
 * Check if round should end
 *
 * @param remainingTime - Time remaining in milliseconds
 * @param allPlayersGuessed - Have all players guessed
 * @returns True if round should end
 */
export function shouldEndRound(
  remainingTime: number,
  allPlayersGuessed: boolean
): boolean {
  return remainingTime <= 0 || allPlayersGuessed;
}

/**
 * Check if game should end
 *
 * @param currentRound - Current round number
 * @param totalRounds - Total rounds in game
 * @returns True if game should end
 */
export function shouldEndGame(
  currentRound: number,
  totalRounds: number
): boolean {
  return currentRound >= totalRounds;
}

/**
 * Generate unique game ID
 *
 * @returns Random 6-character game ID
 */
export function generateGameId(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

/**
 * Generate player ID
 *
 * @returns UUID v4 player ID
 */
export function generatePlayerId(): string {
  return crypto.randomUUID();
}
