import { TASK_PACK_MANIFEST_SCHEMA_VERSION, type TaskPackManifest } from "@/types/packs";

export const easyEnergyEnglishPackManifest = {
  id: "easy-energy-english",
  schemaVersion: TASK_PACK_MANIFEST_SCHEMA_VERSION,
  locale: "en",
  metadata: {
    locale: "en",
    title: "Easy Energy",
    description: "Fast, familiar prompts for mixed-language groups and instant party momentum.",
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
    difficulties: ["lowEnglish", "easy"],
  },
  visualTheme: {
    accentColor: "#9fe870",
    coverAsset: "easy-energy-english-city",
    backgroundStyle: "playful",
  },
  tags: ["easy", "party", "english-learning"],
} as const satisfies TaskPackManifest;
