import { describe, expect, it } from "vitest";
import englishPack from "@/data/words-en.json";
import {
  getLowEnglishHungarianGloss,
  LOW_ENGLISH_HU_GLOSSES,
} from "@/content/hints/lowEnglishHuGlosses";
import type { WordPack } from "@/types";

const pack = englishPack as WordPack;
const lowEnglishWords = pack.words.filter((word) => word.difficulty === "lowEnglish");

describe("Low English Hungarian glosses", () => {
  it("covers every current Low English prompt exactly once", () => {
    expect(lowEnglishWords).toHaveLength(180);
    expect(Object.keys(LOW_ENGLISH_HU_GLOSSES)).toHaveLength(lowEnglishWords.length);

    for (const word of lowEnglishWords) {
      expect(getLowEnglishHungarianGloss(word), word.id).toBeTruthy();
    }
  });

  it("does not expose a Low English translation for other difficulty tiers", () => {
    const easyWord = pack.words.find((word) => word.difficulty === "easy");
    expect(easyWord).toBeDefined();
    expect(getLowEnglishHungarianGloss(easyWord!)).toBeNull();
  });
});
