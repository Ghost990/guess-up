import { TASK_PACK_MANIFEST_SCHEMA_VERSION, type TaskPackManifest } from "@/types/packs";

export const gamingHungarianPackManifest = {
  id: "gaming-hungarian",
  schemaVersion: TASK_PACK_MANIFEST_SCHEMA_VERSION,
  locale: "hu",
  metadata: {
    locale: "hu",
    title: "Játékterem",
    description: "Konzolos, arcade és videojátékos témák magyar partijátékhoz.",
  },
  audience: "family",
  availability: "free",
  version: "1.0.0",
  contentSource: {
    id: "gaming-pack-hu",
    kind: "pack-data",
    location: "src/data/gaming-hu.json",
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
  tags: ["gaming", "video-games", "arcade", "hungarian"],
} as const satisfies TaskPackManifest;
