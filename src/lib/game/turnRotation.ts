/**
 * GuessUp - Turn Rotation Logic
 * Player order and category rotation
 */

import { Player, Category } from '@/types';
import { fisherYatesShuffle } from './randomization';

/**
 * Get next player index (circular rotation)
 *
 * @param currentIndex - Current player index
 * @param totalPlayers - Total number of players
 * @returns Next player index
 */
export function getNextPlayerIndex(
  currentIndex: number,
  totalPlayers: number
): number {
  return (currentIndex + 1) % totalPlayers;
}

/**
 * Initialize player order with Fisher-Yates shuffle
 *
 * @param players - Array of players
 * @returns Shuffled array of players
 */
export function initializePlayerOrder(players: Player[]): Player[] {
  return fisherYatesShuffle(players);
}

/**
 * Rotate through categories fairly
 * Categories rotate in order, ensuring each player gets each category
 *
 * @param currentCategory - Current category
 * @param availableCategories - Enabled categories
 * @returns Next category
 */
export function getNextCategory(
  currentCategory: Category,
  availableCategories: Category[]
): Category {
  const currentIndex = availableCategories.indexOf(currentCategory);
  const nextIndex = (currentIndex + 1) % availableCategories.length;
  return availableCategories[nextIndex];
}

/**
 * Get category for a specific round
 * Ensures fair distribution of categories across rounds
 *
 * @param roundNumber - Current round number (1-indexed)
 * @param availableCategories - Enabled categories
 * @returns Category for the round
 */
export function getCategoryForRound(
  roundNumber: number,
  availableCategories: Category[]
): Category {
  const index = (roundNumber - 1) % availableCategories.length;
  return availableCategories[index];
}
