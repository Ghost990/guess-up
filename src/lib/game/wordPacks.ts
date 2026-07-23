import englishPack from "@/data/words-en.json";
import hungarianPack from "@/data/words-hu.json";
import type { Category, Difficulty, Language, Word, WordPack } from "@/types";
import { getRandomItem } from "./randomization";

const packs = {
  hu: hungarianPack,
  en: englishPack,
} as unknown as Record<Language, WordPack>;

export function getWordPack(language: Language): WordPack {
  return packs[language];
}

interface PickWordOptions {
  language: Language;
  difficulty: Difficulty;
  category: Category;
  excludeIds?: string[];
}

export function pickWord({
  language,
  difficulty,
  category,
  excludeIds = [],
}: PickWordOptions): Word {
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
