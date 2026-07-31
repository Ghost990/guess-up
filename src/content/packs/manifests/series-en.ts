import { TASK_PACK_MANIFEST_SCHEMA_VERSION, type TaskPackManifest } from "@/types/packs";

export const seriesEnglishPackManifest = {
  id: "series-english",
  schemaVersion: TASK_PACK_MANIFEST_SCHEMA_VERSION,
  locale: "en",
  metadata: {
    locale: "en",
    title: "Series Marathon",
    description: "Recognizable shows, characters, props, and cliffhangers for your next binge.",
  },
  audience: "family",
  availability: "free",
  version: "1.0.0",
  contentSource: {
    id: "series-pack-en",
    kind: "pack-data",
    location: "src/data/series-en.json",
  },
  compatibility: {
    categories: ["draw", "explain", "signal"],
    difficulties: ["easy", "medium"],
  },
  visualTheme: {
    accentColor: "#6dc6dd",
    coverAsset: "series-episode-screen",
    backgroundStyle: "cool",
  },
  tags: ["series", "television", "tv", "english"],
} as const satisfies TaskPackManifest;
