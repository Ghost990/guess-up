import { TASK_PACK_MANIFEST_SCHEMA_VERSION, type TaskPackManifest } from "@/types/packs";

export const moviesEnglishPackManifest = {
  id: "movies-english",
  schemaVersion: TASK_PACK_MANIFEST_SCHEMA_VERSION,
  locale: "en",
  metadata: {
    locale: "en",
    title: "Movie Night",
    description: "Film titles, props, and big-screen moments for a movie-loving crew.",
  },
  audience: "family",
  availability: "free",
  version: "1.0.0",
  contentSource: {
    id: "movies-pack-en",
    kind: "pack-data",
    location: "src/data/movies-en.json",
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
  tags: ["movies", "cinema", "film", "english"],
} as const satisfies TaskPackManifest;
