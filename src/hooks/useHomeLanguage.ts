"use client";

import { useSyncExternalStore } from "react";
import type { Language } from "@/types";

const GAME_STATE_KEY = "guessup-game-state";

interface PersistedLanguageEnvelope {
  state?: {
    game?: unknown;
    language?: unknown;
    [key: string]: unknown;
  };
  version?: number;
}

function readLanguage(): Language {
  if (typeof window === "undefined") return "hu";
  try {
    const stored = JSON.parse(localStorage.getItem(GAME_STATE_KEY) ?? "null") as
      | PersistedLanguageEnvelope
      | null;
    return stored?.state?.language === "en" ? "en" : "hu";
  } catch {
    return "hu";
  }
}

function persistLanguage(language: Language): void {
  try {
    const stored = JSON.parse(localStorage.getItem(GAME_STATE_KEY) ?? "null") as
      | PersistedLanguageEnvelope
      | null;
    const next: PersistedLanguageEnvelope = stored ?? { state: {}, version: 3 };
    next.state ??= {};
    if (next.state.game) return;
    next.state.language = language;
    next.version ??= 3;
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(next));
  } catch {
    // Language preference is a convenience; storage failure must not block play.
  }
}

export function useHomeLanguage() {
  const language = useSyncExternalStore<Language>(
    (notify) => {
      window.addEventListener("storage", notify);
      window.addEventListener("hoppra:language-change", notify);
      return () => {
        window.removeEventListener("storage", notify);
        window.removeEventListener("hoppra:language-change", notify);
      };
    },
    readLanguage,
    () => "hu" as Language,
  );

  const setLanguage = (nextLanguage: Language) => {
    persistLanguage(nextLanguage);
    window.dispatchEvent(new Event("hoppra:language-change"));
  };

  return { language, setLanguage };
}
