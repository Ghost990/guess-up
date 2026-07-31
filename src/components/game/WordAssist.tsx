"use client";

import { useState, useSyncExternalStore } from "react";
import { Volume2 } from "lucide-react";
import { messages } from "@/i18n/translations";
import { getWordAssistFacts } from "@/lib/game/wordAssist";
import type { Language, Word } from "@/types";

interface WordAssistProps {
  word: Word;
  language: Language;
}

function canUseSpeechSynthesis(): boolean {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window
  );
}

function subscribeToSpeechSupport() {
  return () => undefined;
}

function getServerSpeechSupport(): boolean {
  return false;
}

export function WordAssist({ word, language }: WordAssistProps) {
  const [open, setOpen] = useState(false);
  const speechAvailable = useSyncExternalStore(
    subscribeToSpeechSupport,
    canUseSpeechSynthesis,
    getServerSpeechSupport,
  );
  const copy = messages[language];
  const facts = getWordAssistFacts(word);
  const localizedTags = facts.tags.map(
    (tag) => copy.assist.tagLabels[tag as keyof typeof copy.assist.tagLabels] ?? tag,
  );


  const speak = () => {
    if (!canUseSpeechSynthesis()) return;
    const utterance = new SpeechSynthesisUtterance(word.text);
    utterance.lang = language === "hu" ? "hu-HU" : "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

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
          <p>{copy.assist.metadataNotice}</p>
          <ul>
            <li>{copy.assist.difficulty(copy.setup.difficultyOptions[word.difficulty].label)}</li>
            <li>{copy.assist.length(facts.length)}</li>
            <li>{copy.assist.firstCharacter(facts.firstCharacter)}</li>
            <li>{localizedTags.length > 0 ? copy.assist.tags(localizedTags.join(", ")) : copy.assist.noTags}</li>
          </ul>
          {speechAvailable ? (
            <button className="secondary-button word-assist__listen" type="button" onClick={speak}>
              <Volume2 aria-hidden="true" size={18} />
              {copy.assist.listen}
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
