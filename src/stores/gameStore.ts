import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCategoryForTurn, getTotalRounds, applyScore, GUESSER_POINTS, PRESENTER_POINTS } from "@/lib/game/rounds";
import { initializePlayerOrder } from "@/lib/game/turnRotation";
import { getDefaultPackId, getTaskPackManifest, pickWord } from "@/lib/game/wordPacks";
import {
  RECAP_EVENT_SCHEMA_VERSION,
  type RecapRoundEventV1,
  type RecapRoundOutcome,
} from "@/types/recap";
import type {
  Category,
  Difficulty,
  Game,
  Language,
  Player,
  RoundResult,
} from "@/types";

export interface SetupGameInput {
  playerNames: string[];
  difficulty: Difficulty;
  roundsPerPlayer: number;
  roundDuration: 30000 | 45000 | 60000 | 90000;
  language: Language;
  packId?: string;
  categories?: Category[];
}

interface GameStore {
  game: Game | null;
  language: Language;
  lastResult: RoundResult | null;
  roundHistory: RecapRoundEventV1[];
  setLanguage: (language: Language) => void;
  setupGame: (input: SetupGameInput) => void;
  startPlaying: () => void;
  pauseRound: () => void;
  resumeRound: () => void;
  endRound: (
    success: boolean,
    guesserId?: string,
    failureOutcome?: Extract<RecapRoundOutcome, "passed" | "timedOut">,
  ) => void;
  startNextRound: () => void;
  finishGame: () => void;
  resetGame: () => void;
}

type PersistedGameState = Pick<
  GameStore,
  "game" | "language" | "lastResult" | "roundHistory"
>;

function createId(prefix: string): string {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${id}`;
}

function normalizeNames(playerNames: string[]): string[] {
  const normalized = playerNames.map((name) => name.trim()).filter(Boolean);
  const uniqueNames = new Set(normalized.map((name) => name.toLocaleLowerCase()));

  if (normalized.length < 2 || normalized.length > 8) {
    throw new Error("A game requires between 2 and 8 players.");
  }
  if (uniqueNames.size !== normalized.length) {
    throw new Error("Player names must be unique.");
  }

  return normalized;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      game: null,
      language: "hu",
      lastResult: null,
      roundHistory: [],

      setLanguage: (language) => {
        if (get().game) return;
        set({ language });
      },

      setupGame: ({
        playerNames,
        difficulty,
        roundsPerPlayer,
        roundDuration,
        language,
        packId,
        categories = ["draw", "explain", "signal"],
      }) => {
        const names = normalizeNames(playerNames);
        if (categories.length === 0) {
          throw new Error("At least one category is required.");
        }
        if (["lowEnglish", "challenging"].includes(difficulty) && language !== "en") {
          throw new Error("This difficulty requires the English language.");
        }
        const resolvedPackId = packId ?? getDefaultPackId(language);
        const selectedPack = getTaskPackManifest(resolvedPackId, language);
        if (!selectedPack.compatibility.difficulties.includes(difficulty)) {
          throw new Error(`Task pack "${resolvedPackId}" does not support difficulty "${difficulty}".`);
        }
        if (categories.some((category) => !selectedPack.compatibility.categories.includes(category))) {
          throw new Error(`Task pack "${resolvedPackId}" does not support every selected category.`);
        }

        const now = Date.now();
        const createdPlayers: Player[] = names.map((name, index) => ({
          id: createId("player"),
          name,
          score: 0,
          joinedAt: now,
          isHost: index === 0,
          isActive: true,
          hasGuessedCorrectly: false,
        }));
        const players = initializePlayerOrder(createdPlayers);
        const totalRounds = getTotalRounds(players.length, roundsPerPlayer);
        const currentCategory = getCategoryForTurn(0, players.length, categories);
        const currentWord = pickWord({
          language,
          difficulty,
          category: currentCategory,
          packId: resolvedPackId,
        });

        const game: Game = {
          id: createId("game"),
          players,
          phase: "wordReveal",
          currentRound: 0,
          currentPlayerIndex: 0,
          currentCategory,
          currentWord,
          settings: {
            packId: resolvedPackId,
            roundsPerPlayer,
            totalRounds,
            difficulty,
            categories,
            roundDuration,
            wordRevealDuration: 3000,
            language,
          },
          usedWordIds: [currentWord.id],
          roundEndsAt: null,
          pausedRemainingMs: null,
          createdAt: now,
          startedAt: now,
          endedAt: null,
        };

        set({ game, language, lastResult: null, roundHistory: [] });
      },

      startPlaying: () => {
        const { game } = get();
        if (!game || game.phase !== "wordReveal") return;

        set({
          game: {
            ...game,
            phase: "playing",
            roundEndsAt: Date.now() + game.settings.roundDuration,
            pausedRemainingMs: null,
          },
        });
      },

      pauseRound: () => {
        const { game } = get();
        if (!game || game.phase !== "playing" || game.roundEndsAt === null) return;
        set({
          game: {
            ...game,
            phase: "paused",
            pausedRemainingMs: Math.max(0, game.roundEndsAt - Date.now()),
            roundEndsAt: null,
          },
        });
      },

      resumeRound: () => {
        const { game } = get();
        if (!game || game.phase !== "paused" || game.pausedRemainingMs === null) return;
        set({
          game: {
            ...game,
            phase: "playing",
            roundEndsAt: Date.now() + game.pausedRemainingMs,
            pausedRemainingMs: null,
          },
        });
      },

      endRound: (success, guesserId, failureOutcome = "passed") => {
        const { game, roundHistory } = get();
        if (!game || (game.phase !== "playing" && game.phase !== "paused")) return;

        const presenter = game.players[game.currentPlayerIndex];
        const validGuesser =
          success &&
          guesserId &&
          guesserId !== presenter.id &&
          game.players.some((player) => player.id === guesserId)
            ? guesserId
            : null;

        if (success && !validGuesser) return;

        const players = validGuesser
          ? applyScore(game.players, presenter.id, validGuesser)
          : game.players;
        const lastResult: RoundResult = {
          roundIndex: game.currentRound,
          presenterId: presenter.id,
          guesserId: validGuesser,
          success: Boolean(validGuesser),
          word: game.currentWord,
          category: game.currentCategory,
          presenterPoints: validGuesser ? PRESENTER_POINTS : 0,
          guesserPoints: validGuesser ? GUESSER_POINTS : 0,
        };
        const isLastRound = game.currentRound >= game.settings.totalRounds - 1;
        const roundEvent: RecapRoundEventV1 = {
          schemaVersion: RECAP_EVENT_SCHEMA_VERSION,
          roundIndex: game.currentRound,
          completedAt: Date.now(),
          category: game.currentCategory,
          outcome: validGuesser ? "correct" : failureOutcome,
          presenterId: presenter.id,
          guesserId: validGuesser,
          presenterPoints: lastResult.presenterPoints,
          guesserPoints: lastResult.guesserPoints,
        };

        set({
          game: {
            ...game,
            players,
            phase: isLastRound ? "gameOver" : "roundEnd",
            roundEndsAt: null,
            pausedRemainingMs: null,
            endedAt: isLastRound ? Date.now() : null,
          },
          lastResult,
          roundHistory: [...roundHistory, roundEvent],
        });
      },

      startNextRound: () => {
        const { game } = get();
        if (!game || game.phase !== "roundEnd") return;

        const nextRound = game.currentRound + 1;
        if (nextRound >= game.settings.totalRounds) return;

        const currentPlayerIndex = nextRound % game.players.length;
        const currentCategory = getCategoryForTurn(
          nextRound,
          game.players.length,
          game.settings.categories,
        );
        const currentWord = pickWord({
          language: game.settings.language,
          difficulty: game.settings.difficulty,
          category: currentCategory,
          packId: game.settings.packId ?? getDefaultPackId(game.settings.language),
          excludeIds: game.usedWordIds,
        });

        set({
          game: {
            ...game,
            phase: "wordReveal",
            currentRound: nextRound,
            currentPlayerIndex,
            currentCategory,
            currentWord,
            usedWordIds: [...game.usedWordIds, currentWord.id],
            roundEndsAt: null,
            pausedRemainingMs: null,
          },
          lastResult: null,
        });
      },

      finishGame: () => {
        const { game } = get();
        if (!game || game.phase === "gameOver") return;
        set({
          game: {
            ...game,
            phase: "gameOver",
            roundEndsAt: null,
            pausedRemainingMs: null,
            endedAt: Date.now(),
          },
        });
      },

      resetGame: () => set({ game: null, lastResult: null, roundHistory: [] }),
    }),
    {
      name: "guessup-game-state",
      version: 3,
      migrate: (persistedState, version) => {
        const state = persistedState as Partial<GameStore>;
        if (version < 2) {
          const language: Language = state.language === "en" ? "en" : "hu";
          return {
            game: null,
            language,
            lastResult: null,
            roundHistory: [],
          };
        }
        if (version < 3) {
          return {
            game: state.game ?? null,
            language: state.language === "en" ? "en" : "hu",
            lastResult: state.lastResult ?? null,
            roundHistory: [],
          };
        }
        return {
          game: state.game ?? null,
          language: state.language === "en" ? "en" : "hu",
          lastResult: state.lastResult ?? null,
          roundHistory: Array.isArray(state.roundHistory) ? state.roundHistory : [],
        } satisfies PersistedGameState;
      },
      partialize: (state) => ({
        game: state.game,
        language: state.language,
        lastResult: state.lastResult,
        roundHistory: state.roundHistory,
      }),
    },
  ),
);
