import { describe, expect, it } from "vitest";
import { getWordAssistFacts } from "@/lib/game/wordAssist";
import { getWordPack } from "@/lib/game/wordPacks";
import type { Word } from "@/types";

const word: Word = {
  id: "sample",
  text: "Árvíz",
  categories: ["explain"],
  difficulty: "medium",
  length: 5,
  tags: ["nature", "Árvíz", "nature", ""],
};

describe("getWordAssistFacts", () => {
  it("is deterministic and excludes a tag that repeats the answer", () => {
    const first = getWordAssistFacts(word);

    expect(first).toEqual({ length: 5, firstCharacter: "Á", tags: ["nature"] });
    expect(getWordAssistFacts(word)).toEqual(first);
  });

  it("falls back to the available text length when a legacy word has no length", () => {
    expect(getWordAssistFacts({ ...word, text: "tea", length: 0, tags: [] })).toEqual({
      length: 3,
      firstCharacter: "t",
      tags: [],
    });
  });

  it("returns non-empty metadata for every shipped task without inventing a definition", () => {
    for (const language of ["hu", "en"] as const) {
      for (const task of getWordPack(language).words) {
        const facts = getWordAssistFacts(task);
        expect(facts.length).toBeGreaterThan(0);
        expect(facts.firstCharacter).not.toBe("");
        expect(facts.tags.map((tag) => tag.toLocaleLowerCase())).not.toContain(
          task.text.toLocaleLowerCase(),
        );
      }
    }
  });
});
