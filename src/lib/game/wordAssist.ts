import type { Word } from "@/types";

export interface WordAssistFacts {
  length: number;
  firstCharacter: string;
  tags: string[];
}

function normalizeForComparison(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim();
}

/**
 * Returns only task-pack metadata. It intentionally does not infer or invent a definition.
 */
export function getWordAssistFacts(word: Word): WordAssistFacts {
  const text = word.text.trim();
  const characters = Array.from(text);
  const answer = normalizeForComparison(text);
  const seenTags = new Set<string>();
  const tags = word.tags.filter((tag) => {
    const normalized = normalizeForComparison(tag);
    if (!normalized || normalized === answer || seenTags.has(normalized)) return false;
    seenTags.add(normalized);
    return true;
  });

  return {
    length: word.length > 0 ? word.length : Math.max(characters.length, 1),
    firstCharacter: characters[0] ?? "?",
    tags,
  };
}
