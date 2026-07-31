import { TASK_PACK_MANIFEST_SCHEMA_VERSION, type TaskPackManifest } from "@/types/packs";

export const classicEnglishPackManifest = {
  id: "classic-english",
  schemaVersion: TASK_PACK_MANIFEST_SCHEMA_VERSION,
  locale: "en",
  metadata: {
    locale: "en",
    title: "Classic Party",
    description: "Original English prompts for drawing, explaining, and acting together.",
  },
  audience: "family",
  availability: "free",
  version: "1.0.0",
  contentSource: {
    id: "word-pack-en",
    kind: "existing-word-pack",
    location: "src/data/words-en.json",
  },
  compatibility: {
    categories: ["draw", "explain", "signal"],
    difficulties: ["lowEnglish", "easy", "medium", "challenging", "hard"],
  },
  visualTheme: {
    accentColor: "#6dc6dd",
    coverAsset: "classic-english-table",
    backgroundStyle: "cool",
  },
  tags: ["classic", "party", "english"],
} as const satisfies TaskPackManifest;
