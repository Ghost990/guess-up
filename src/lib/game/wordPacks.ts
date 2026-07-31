import englishPack from "@/data/words-en.json";
import hungarianPack from "@/data/words-hu.json";
import { taskPackRegistry } from "@/content/packs";
import type { Category, Difficulty, Language, Word, WordPack } from "@/types";
import type { TaskPackManifest } from "@/types/packs";
import { getRandomItem } from "./randomization";

const packs = {
  hu: hungarianPack,
  en: englishPack,
} as unknown as Record<Language, WordPack>;

const defaultPackIds: Record<Language, string> = {
  hu: "classic-hungarian",
  en: "classic-english",
};

export function getDefaultPackId(language: Language): string {
  return defaultPackIds[language];
}

export function getTaskPackManifest(packId: string, language: Language): TaskPackManifest {
  const manifest = taskPackRegistry.getById(packId);
  if (!manifest || manifest.locale !== language) {
    throw new Error(`Task pack "${packId}" is not available for language "${language}".`);
  }
  return manifest;
}

export function getWordPack(language: Language): WordPack {
  return packs[language];
}

interface PickWordOptions {
  language: Language;
  difficulty: Difficulty;
  category: Category;
  packId?: string;
  excludeIds?: string[];
}

export function pickWord({
  language,
  difficulty,
  category,
  packId = getDefaultPackId(language),
  excludeIds = [],
}: PickWordOptions): Word {
  const manifest = getTaskPackManifest(packId, language);
  if (!manifest.compatibility.difficulties.includes(difficulty)) {
    throw new Error(`Task pack "${packId}" does not support difficulty "${difficulty}".`);
  }
  if (!manifest.compatibility.categories.includes(category)) {
    throw new Error(`Task pack "${packId}" does not support category "${category}".`);
  }
  const words = getWordPack(language).words;
  const matching = words.filter(
    (word) => word.difficulty === difficulty && word.categories.includes(category),
  );
  const unused = matching.filter((word) => !excludeIds.includes(word.id));
  const pool = unused.length > 0 ? unused : matching;
  const selected = getRandomItem(pool);

  if (!selected) {
    throw new Error(`No ${difficulty} ${category} tasks found for language "${language}".`);
  }

  return selected;
}
