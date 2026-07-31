"use client";

import { useState } from "react";
import { getLowEnglishHungarianGloss } from "@/content/hints/lowEnglishHuGlosses";
import { messages } from "@/i18n/translations";
import { getWordAssistFacts } from "@/lib/game/wordAssist";
import type { Language, Word } from "@/types";

interface WordAssistProps {
  word: Word;
  language: Language;
}

export function WordAssist({ word, language }: WordAssistProps) {
  const [open, setOpen] = useState(false);
  const copy = messages[language];
  const facts = getWordAssistFacts(word);
  const hungarianGloss = getLowEnglishHungarianGloss(word);
  const localizedTags = facts.tags.map(
    (tag) => copy.assist.tagLabels[tag as keyof typeof copy.assist.tagLabels] ?? tag,
  );

  return (
    <section className="word-assist" aria-label={copy.assist.title}>
      <button
        className="secondary-button word-assist__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="word-assist-details"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? copy.assist.hide : copy.assist.show}
      </button>
      {open ? (
        <div id="word-assist-details" className="word-assist__details">
          <h2>{copy.assist.title}</h2>
          {hungarianGloss ? (
            <p className="word-assist__gloss">
              {copy.assist.hungarianMeaning(hungarianGloss)}
            </p>
          ) : null}
          <p>{copy.assist.metadataNotice}</p>
          <ul>
            <li>{copy.assist.difficulty(copy.setup.difficultyOptions[word.difficulty].label)}</li>
            <li>{copy.assist.length(facts.length)}</li>
            <li>{copy.assist.firstCharacter(facts.firstCharacter)}</li>
            <li>{localizedTags.length > 0 ? copy.assist.tags(localizedTags.join(", ")) : copy.assist.noTags}</li>
          </ul>
        </div>
      ) : null}
    </section>
  );
}
