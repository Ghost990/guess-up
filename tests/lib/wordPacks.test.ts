import { describe, expect, it, vi } from "vitest";
import { getWordPack, pickWord } from "@/lib/game/wordPacks";
import type { Category, Difficulty, Language } from "@/types";

const languages: Language[] = ["hu", "en"];
const standardDifficulties: Difficulty[] = ["easy", "medium", "hard"];
const categories: Category[] = ["draw", "explain", "signal"];

describe("localized word packs", () => {
  it.each(languages)("%s contains a healthy, valid task pool", (language) => {
    const pack = getWordPack(language);
    const ids = new Set(pack.words.map((word) => word.id));

    expect(pack.metadata.language).toBe(language);
    expect(pack.words).toHaveLength(pack.metadata.totalWords);
    expect(ids.size).toBe(pack.words.length);

    for (const difficulty of standardDifficulties) {
      for (const category of categories) {
        const matching = pack.words.filter(
          (word) =>
            word.difficulty === difficulty && word.categories.includes(category),
        );
        expect(matching.length).toBeGreaterThanOrEqual(10);
      }
    }
  });

  it("ships a large Low English pool for every category", () => {
    const pack = getWordPack("en");

    for (const category of categories) {
      const matching = pack.words.filter(
        (word) =>
          word.difficulty === "lowEnglish" && word.categories.includes(category),
      );
      expect(matching.length).toBeGreaterThanOrEqual(40);
    }
  });

  it("ships balanced English Challenging and Hard pools", () => {
    const pack = getWordPack("en");

    for (const difficulty of ["challenging", "hard"] as const) {
      for (const category of categories) {
        const matching = pack.words.filter(
          (word) => word.difficulty === difficulty && word.categories.includes(category),
        );
        expect(matching).toHaveLength(60);
      }
    }
  });

  it("validates the researched upper-tier expansion contract", () => {
    const words = getWordPack("en").words;
    const additions = words.filter((word) =>
      word.id.startsWith("upper-en-"),
    );
    const normalizedTexts = additions.map((word) => word.text.trim().toLocaleLowerCase("en"));
    const existingTexts = new Set(
      words
        .filter((word) => !word.id.startsWith("upper-en-"))
        .map((word) => word.text.trim().toLocaleLowerCase("en")),
    );

    expect(additions).toHaveLength(180);
    expect(new Set(normalizedTexts).size).toBe(additions.length);
    for (const word of additions) {
      expect(word.text).toBe(word.text.trim());
      expect(word.text.length).toBeGreaterThan(0);
      expect(word.text.length).toBeLessThanOrEqual(60);
      expect(existingTexts.has(word.text.toLocaleLowerCase("en"))).toBe(false);
      expect(word.length).toBe(word.text.length);
      expect(word.categories).toHaveLength(1);
      expect(word.tags).toContain(word.difficulty);
      expect(word.tags).toContain(word.categories[0]);
      expect(word.tags).toContain("original-expansion");
    }
  });

  it("selects from the requested language, difficulty, and category", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const word = pickWord({
      language: "en",
      difficulty: "hard",
      category: "signal",
    });
    const englishPack = getWordPack("en");

    expect(englishPack.words).toContainEqual(word);
    expect(word.difficulty).toBe("hard");
    expect(word.categories).toContain("signal");
    vi.restoreAllMocks();
  });

  it("enforces the selected experience pack compatibility", () => {
    const challengeWord = pickWord({
      language: "hu",
      difficulty: "hard",
      category: "draw",
      packId: "challenge-hungarian",
    });
    expect(challengeWord.difficulty).toBe("hard");

    expect(() => pickWord({
      language: "hu",
      difficulty: "medium",
      category: "draw",
      packId: "challenge-hungarian",
    })).toThrow('does not support difficulty "medium"');
  });

  it("reuses the matching pool only after all matching tasks were used", () => {
    const pack = getWordPack("hu");
    const matchingIds = pack.words
      .filter((word) => word.difficulty === "easy" && word.categories.includes("draw"))
      .map((word) => word.id);
    const word = pickWord({
      language: "hu",
      difficulty: "easy",
      category: "draw",
      excludeIds: matchingIds,
    });

    expect(matchingIds).toContain(word.id);
  });
});
