import { TASK_PACK_MANIFEST_SCHEMA_VERSION, type TaskPackManifest } from "@/types/packs";

export const challengeHungarianPackManifest = {
  id: "challenge-hungarian",
  schemaVersion: TASK_PACK_MANIFEST_SCHEMA_VERSION,
  locale: "hu",
  metadata: {
    locale: "hu",
    title: "Nehéz menet",
    description: "Elvontabb, ritkább feladatok azoknak, akik már nem kérnek bemelegítő kört.",
  },
  audience: "adult",
  availability: "free",
  version: "1.0.0",
  contentSource: {
    id: "word-pack-hu",
    kind: "existing-word-pack",
    location: "src/data/words-hu.json",
  },
  compatibility: {
    categories: ["draw", "explain", "signal"],
    difficulties: ["hard"],
  },
  visualTheme: {
    accentColor: "#ef5d7a",
    coverAsset: "challenge-hungarian-climb",
    backgroundStyle: "playful",
    surfaceStyle: "summit",
  },
  tags: ["challenge", "party", "hungarian"],
} as const satisfies TaskPackManifest;
