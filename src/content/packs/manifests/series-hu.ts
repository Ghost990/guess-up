import { TASK_PACK_MANIFEST_SCHEMA_VERSION, type TaskPackManifest } from "@/types/packs";

export const seriesHungarianPackManifest = {
  id: "series-hungarian",
  schemaVersion: TASK_PACK_MANIFEST_SCHEMA_VERSION,
  locale: "hu",
  metadata: {
    locale: "hu",
    title: "Sorozatmaraton",
    description: "Ismerős sorozatok, szereplők, kellékek és évadzáró fordulatok magyarul.",
  },
  audience: "family",
  availability: "free",
  version: "1.0.0",
  contentSource: {
    id: "series-pack-hu",
    kind: "pack-data",
    location: "src/data/series-hu.json",
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
  tags: ["series", "television", "tv", "hungarian"],
} as const satisfies TaskPackManifest;
