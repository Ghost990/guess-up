import type { Category, Player } from "@/types";

export const PRESENTER_POINTS = 2;
export const GUESSER_POINTS = 1;

export function getTotalRounds(playerCount: number, roundsPerPlayer: number): number {
  if (playerCount < 2 || roundsPerPlayer < 1) return 0;
  return playerCount * roundsPerPlayer;
}

function getPlayerIndexForRound(roundIndex: number, playerCount: number): number {
  if (playerCount < 1) throw new Error("At least one player is required.");
  return roundIndex % playerCount;
}

export function getCategoryForTurn(
  roundIndex: number,
  playerCount: number,
  categories: Category[],
): Category {
  if (categories.length === 0) throw new Error("At least one category is required.");
  const playerIndex = getPlayerIndexForRound(roundIndex, playerCount);
  const cycleIndex = Math.floor(roundIndex / playerCount);
  return categories[(playerIndex + cycleIndex) % categories.length];
}

export function applyScore(
  players: Player[],
  presenterId: string,
  guesserId: string | null,
): Player[] {
  if (!guesserId || guesserId === presenterId) return players;

  return players.map((player) => {
    if (player.id === presenterId) {
      return { ...player, score: player.score + PRESENTER_POINTS };
    }
    if (player.id === guesserId) {
      return { ...player, score: player.score + GUESSER_POINTS };
    }
    return player;
  });
}
