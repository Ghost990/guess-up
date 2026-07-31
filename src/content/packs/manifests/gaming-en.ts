import { TASK_PACK_MANIFEST_SCHEMA_VERSION, type TaskPackManifest } from "@/types/packs";

export const gamingEnglishPackManifest = {
  id: "gaming-english",
  schemaVersion: TASK_PACK_MANIFEST_SCHEMA_VERSION,
  locale: "en",
  metadata: {
    locale: "en",
    title: "Arcade Party",
    description: "Console, arcade, and video-game moments built for a playful group round.",
  },
  audience: "family",
  availability: "free",
  version: "1.0.0",
  contentSource: {
    id: "gaming-pack-en",
    kind: "pack-data",
    location: "src/data/gaming-en.json",
  },
  compatibility: {
    categories: ["draw", "explain", "signal"],
    difficulties: ["easy", "medium"],
  },
  visualTheme: {
    accentColor: "#9fe870",
    coverAsset: "gaming-pixel-arcade",
    backgroundStyle: "playful",
  },
  tags: ["gaming", "video-games", "arcade", "english"],
} as const satisfies TaskPackManifest;
