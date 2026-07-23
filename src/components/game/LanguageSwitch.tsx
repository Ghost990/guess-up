"use client";

import { Globe2 } from "lucide-react";
import { messages } from "@/i18n/translations";
import type { Language } from "@/types";

interface LanguageSwitchProps {
  language: Language;
  onChange: (language: Language) => void;
  compact?: boolean;
}

export function LanguageSwitch({
  language,
  onChange,
  compact = false,
}: LanguageSwitchProps) {
  const copy = messages[language];

  return (
    <div
      className="language-switch"
      role="group"
      aria-label={copy.setup.gameLanguage}
    >
      {!compact && <Globe2 aria-hidden="true" size={18} />}
      {(["hu", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          className="language-switch__option"
          aria-pressed={language === option}
          onClick={() => onChange(option)}
        >
          {compact ? messages[option].languageShort : messages[option].languageName}
        </button>
      ))}
    </div>
  );
}
