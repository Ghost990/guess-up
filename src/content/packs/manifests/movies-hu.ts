import { TASK_PACK_MANIFEST_SCHEMA_VERSION, type TaskPackManifest } from "@/types/packs";

export const moviesHungarianPackManifest = {
  id: "movies-hungarian",
  schemaVersion: TASK_PACK_MANIFEST_SCHEMA_VERSION,
  locale: "hu",
  metadata: {
    locale: "hu",
    title: "Mozivászon",
    description: "Filmcímek, kellékek és emlékezetes filmes helyzetek magyarul.",
  },
  audience: "family",
  availability: "free",
  version: "1.0.0",
  contentSource: {
    id: "movies-pack-hu",
    kind: "pack-data",
    location: "src/data/movies-hu.json",
  },
  compatibility: {
    categories: ["draw", "explain", "signal"],
    difficulties: ["easy", "medium"],
  },
  visualTheme: {
    accentColor: "#ef5d7a",
    coverAsset: "movies-cinema-reel",
    backgroundStyle: "warm",
    surfaceStyle: "cinema",
  },
  tags: ["movies", "cinema", "film", "hungarian"],
} as const satisfies TaskPackManifest;
