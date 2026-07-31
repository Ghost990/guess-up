import {
  RECAP_VIEW_MODEL_VERSION,
  type GameNightRecapInputV1,
  type GameNightRecapViewModelV1,
  type RecapAwardAvailability,
  type RecapPairingAward,
  type RecapPlayerSnapshot,
  type RecapPlayerStats,
  type RecapPresenterAward,
  type RecapGuesserAward,
} from "@/types/recap";

const MINIMUM_PRESENTER_ATTEMPTS = 2;
const MINIMUM_GUESSER_CORRECT = 2;
const MINIMUM_PAIRING_CORRECT = 2;

interface PairingStat {
  presenterId: string;
  guesserId: string;
  correct: number;
}

function comparePlayers(left: RecapPlayerSnapshot, right: RecapPlayerSnapshot): number {
  if (left.score !== right.score) return right.score - left.score;
  if (left.name !== right.name) return left.name < right.name ? -1 : 1;
  return left.id < right.id ? -1 : left.id > right.id ? 1 : 0;
}

function awardAvailability(candidateCount: number): RecapAwardAvailability {
  if (candidateCount === 0) return "insufficientData";
  return candidateCount === 1 ? "available" : "tie";
}

function emptyPresenterAward(): RecapPresenterAward {
  return {
    availability: "insufficientData",
    playerIds: [],
    playerNames: [],
    correct: 0,
    attempts: 0,
    successRate: null,
    minimumAttempts: MINIMUM_PRESENTER_ATTEMPTS,
  };
}

function emptyGuesserAward(): RecapGuesserAward {
  return {
    availability: "insufficientData",
    playerIds: [],
    playerNames: [],
    correct: 0,
    minimumCorrect: MINIMUM_GUESSER_CORRECT,
  };
}

function emptyPairingAward(): RecapPairingAward {
  return {
    availability: "insufficientData",
    presenterIds: [],
    presenterNames: [],
    guesserIds: [],
    guesserNames: [],
    correct: 0,
    minimumCorrect: MINIMUM_PAIRING_CORRECT,
  };
}

/**
 * Builds a deterministic recap without mutating its input. Presenter awards
 * require two presented rounds and use success rate; guesser and pairing awards
 * require two successful rounds because failed guesses are not recorded today.
 */
export function buildGameNightRecap(
  input: GameNightRecapInputV1,
): GameNightRecapViewModelV1 {
  const playersById = new Map(input.players.map((player) => [player.id, player]));
  const statsByPlayerId = new Map<string, RecapPlayerStats>(
    input.players.map((player) => [
      player.id,
      {
        playerId: player.id,
        playerName: player.name,
        tasksPresented: 0,
        correctAsPresenter: 0,
        passedAsPresenter: 0,
        timedOutAsPresenter: 0,
        correctAsGuesser: 0,
      },
    ]),
  );
  const pairings = new Map<string, PairingStat>();
  const roundCounts = { tasksPlayed: 0, correct: 0, passed: 0, timedOut: 0 };

  for (const round of input.rounds) {
    roundCounts.tasksPlayed += 1;
    if (round.outcome === "correct") roundCounts.correct += 1;
    if (round.outcome === "passed") roundCounts.passed += 1;
    if (round.outcome === "timedOut") roundCounts.timedOut += 1;

    const presenterStats = statsByPlayerId.get(round.presenterId);
    if (presenterStats) {
      presenterStats.tasksPresented += 1;
      if (round.outcome === "correct") presenterStats.correctAsPresenter += 1;
      if (round.outcome === "passed") presenterStats.passedAsPresenter += 1;
      if (round.outcome === "timedOut") presenterStats.timedOutAsPresenter += 1;
    }

    if (round.outcome !== "correct" || !round.guesserId) continue;

    const guesserStats = statsByPlayerId.get(round.guesserId);
    if (guesserStats) guesserStats.correctAsGuesser += 1;

    const pairingKey = `${round.presenterId}\u0000${round.guesserId}`;
    const pairing = pairings.get(pairingKey) ?? {
      presenterId: round.presenterId,
      guesserId: round.guesserId,
      correct: 0,
    };
    pairing.correct += 1;
    pairings.set(pairingKey, pairing);
  }

  let currentRank = 0;
  let previousScore: number | undefined;
  const rankings = [...input.players]
    .sort(comparePlayers)
    .map((player, index) => {
      if (player.score !== previousScore) currentRank = index + 1;
      previousScore = player.score;
      return {
        rank: currentRank,
        playerId: player.id,
        playerName: player.name,
        score: player.score,
      };
    });

  const leaders = rankings.filter((entry) => entry.rank === 1);
  const playerStats = input.players
    .map((player) => statsByPlayerId.get(player.id)!)
    .sort((left, right) => {
      if (left.playerName !== right.playerName) {
        return left.playerName < right.playerName ? -1 : 1;
      }
      return left.playerId < right.playerId ? -1 : left.playerId > right.playerId ? 1 : 0;
    });

  const eligiblePresenters = playerStats.filter(
    (stat) => stat.tasksPresented >= MINIMUM_PRESENTER_ATTEMPTS,
  );
  const bestPresenterRate = eligiblePresenters.reduce(
    (best, stat) => Math.max(best, stat.correctAsPresenter / stat.tasksPresented),
    -1,
  );
  const bestPresenters = eligiblePresenters.filter(
    (stat) => stat.correctAsPresenter / stat.tasksPresented === bestPresenterRate,
  );
  const bestPresenter = bestPresenters.length === 0
    ? emptyPresenterAward()
    : {
        availability: awardAvailability(bestPresenters.length),
        playerIds: bestPresenters.map((stat) => stat.playerId),
        playerNames: bestPresenters.map((stat) => stat.playerName),
        correct: bestPresenters[0].correctAsPresenter,
        attempts: bestPresenters[0].tasksPresented,
        successRate: bestPresenterRate,
        minimumAttempts: MINIMUM_PRESENTER_ATTEMPTS,
      };

  const bestGuesserCorrect = playerStats.reduce(
    (best, stat) => Math.max(best, stat.correctAsGuesser),
    0,
  );
  const bestGuessers = bestGuesserCorrect < MINIMUM_GUESSER_CORRECT
    ? []
    : playerStats.filter((stat) => stat.correctAsGuesser === bestGuesserCorrect);
  const bestGuesser = bestGuessers.length === 0
    ? emptyGuesserAward()
    : {
        availability: awardAvailability(bestGuessers.length),
        playerIds: bestGuessers.map((stat) => stat.playerId),
        playerNames: bestGuessers.map((stat) => stat.playerName),
        correct: bestGuesserCorrect,
        minimumCorrect: MINIMUM_GUESSER_CORRECT,
      };

  const pairingValues = [...pairings.values()];
  const strongestPairingCorrect = pairingValues.reduce(
    (best, pairing) => Math.max(best, pairing.correct),
    0,
  );
  const strongestPairings = strongestPairingCorrect < MINIMUM_PAIRING_CORRECT
    ? []
    : pairingValues.filter((pairing) => pairing.correct === strongestPairingCorrect);
  const strongestPairing = strongestPairings.length === 0
    ? emptyPairingAward()
    : {
        availability: awardAvailability(strongestPairings.length),
        presenterIds: strongestPairings.map((pairing) => pairing.presenterId),
        presenterNames: strongestPairings.map(
          (pairing) => playersById.get(pairing.presenterId)?.name ?? pairing.presenterId,
        ),
        guesserIds: strongestPairings.map((pairing) => pairing.guesserId),
        guesserNames: strongestPairings.map(
          (pairing) => playersById.get(pairing.guesserId)?.name ?? pairing.guesserId,
        ),
        correct: strongestPairingCorrect,
        minimumCorrect: MINIMUM_PAIRING_CORRECT,
      };

  return {
    schemaVersion: RECAP_VIEW_MODEL_VERSION,
    gameId: input.gameId,
    language: input.language,
    startedAt: input.startedAt,
    endedAt: input.endedAt,
    durationMs: Math.max(0, input.endedAt - input.startedAt),
    roundCounts,
    winner: {
      kind: leaders.length === 0 ? "none" : leaders.length === 1 ? "winner" : "tie",
      playerIds: leaders.map((leader) => leader.playerId),
      playerNames: leaders.map((leader) => leader.playerName),
    },
    rankings,
    playerStats,
    awards: { bestPresenter, bestGuesser, strongestPairing },
  };
}
