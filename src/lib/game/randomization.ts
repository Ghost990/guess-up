/**
 * GuessUp - Randomization Utilities
 * Fisher-Yates shuffle and random selection functions
 */

/**
 * Fisher-Yates shuffle algorithm
 * Produces unbiased permutations in O(n) time
 * Used for fair player order and word selection
 *
 * @param array - Array to shuffle (does not mutate original)
 * @returns New shuffled array
 */
export function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Get random item from array
 *
 * @param array - Array to select from
 * @returns Random item from array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
