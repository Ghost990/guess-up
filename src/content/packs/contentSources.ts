import type { RegisteredTaskContentSource } from "@/types/packs";

export const taskContentSources = [
  {
    id: "word-pack-hu",
    kind: "existing-word-pack",
    location: "src/data/words-hu.json",
    locale: "hu",
    categories: ["draw", "explain", "signal"],
    difficulties: ["easy", "medium", "hard"],
  },
  {
    id: "word-pack-en",
    kind: "existing-word-pack",
    location: "src/data/words-en.json",
    locale: "en",
    categories: ["draw", "explain", "signal"],
    difficulties: ["lowEnglish", "easy", "medium", "challenging", "hard"],
  },
] as const satisfies readonly RegisteredTaskContentSource[];
