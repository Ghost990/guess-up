import { describe, expect, it } from "vitest";
import { buildGameNightRecap } from "@/lib/recap/buildGameNightRecap";
import { formatRecapShareText } from "@/lib/recap/browserRecapShare";
import { RECAP_EVENT_SCHEMA_VERSION } from "@/types/recap";

const recap = buildGameNightRecap({
  schemaVersion: RECAP_EVENT_SCHEMA_VERSION,
  gameId: "game-share",
  language: "hu",
  startedAt: 1000,
  endedAt: 7000,
  players: [
    { id: "anna", name: "Anna", score: 2 },
    { id: "bela", name: "Béla", score: 1 },
  ],
  rounds: [
    {
      schemaVersion: RECAP_EVENT_SCHEMA_VERSION,
      roundIndex: 0,
      completedAt: 6000,
      category: "draw",
      outcome: "correct",
      presenterId: "anna",
      guesserId: "bela",
      presenterPoints: 2,
      guesserPoints: 1,
    },
  ],
});

describe("recap sharing", () => {
  it("formats a deterministic localized text summary", () => {
    expect(formatRecapShareText(recap, "PartyLab")).toBe([
      "🏆 Anna nyert",
      "1 feladat · 1 találat · 0 passz",
      "",
      "1. Anna — 2 pont",
      "2. Béla — 1 pont",
      "",
      "— PartyLab",
    ].join("\n"));
  });
});
