import { TASK_PACK_MANIFEST_SCHEMA_VERSION, type TaskPackManifest } from "@/types/packs";

export const classicHungarianPackManifest = {
  id: "classic-hungarian",
  schemaVersion: TASK_PACK_MANIFEST_SCHEMA_VERSION,
  locale: "hu",
  metadata: {
    locale: "hu",
    title: "Klasszikus társas",
    description: "Eredeti, magyar feladatok rajzoláshoz, magyarázathoz és mutogatáshoz.",
  },
  audience: "family",
  availability: "free",
  version: "1.0.0",
  contentSource: {
    id: "word-pack-hu",
    kind: "existing-word-pack",
    location: "src/data/words-hu.json",
  },
  compatibility: {
    categories: ["draw", "explain", "signal"],
    difficulties: ["easy", "medium", "hard"],
  },
  visualTheme: {
    accentColor: "#f5b642",
    coverAsset: "classic-hungarian-party",
    backgroundStyle: "warm",
  },
  tags: ["classic", "party", "hungarian"],
} as const satisfies TaskPackManifest;
