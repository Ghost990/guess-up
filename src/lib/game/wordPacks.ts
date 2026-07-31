import englishPack from "@/data/words-en.json";
import gamingEnglishPack from "@/data/gaming-en.json";
import gamingHungarianPack from "@/data/gaming-hu.json";
import hungarianPack from "@/data/words-hu.json";
import moviesEnglishPack from "@/data/movies-en.json";
import moviesHungarianPack from "@/data/movies-hu.json";
import seriesEnglishPack from "@/data/series-en.json";
import seriesHungarianPack from "@/data/series-hu.json";
import { taskPackRegistry } from "@/content/packs";
import type { Category, Difficulty, Language, Word, WordPack } from "@/types";
import type { TaskPackManifest } from "@/types/packs";
import { getRandomItem } from "./randomization";

const packs = {
  hu: hungarianPack,
  en: englishPack,
} as unknown as Record<Language, WordPack>;

const packsByContentSource = {
  "word-pack-hu": hungarianPack,
  "word-pack-en": englishPack,
  "movies-pack-hu": moviesHungarianPack,
  "movies-pack-en": moviesEnglishPack,
  "series-pack-hu": seriesHungarianPack,
  "series-pack-en": seriesEnglishPack,
  "gaming-pack-hu": gamingHungarianPack,
  "gaming-pack-en": gamingEnglishPack,
} as unknown as Record<string, WordPack>;

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

export function getWordPackForContentSource(contentSourceId: string): WordPack {
  const wordPack = packsByContentSource[contentSourceId];
  if (!wordPack) {
    throw new Error(`No runtime word pack is registered for content source "${contentSourceId}".`);
  }
  return wordPack;
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

  const words = getWordPackForContentSource(manifest.contentSource.id).words;
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
