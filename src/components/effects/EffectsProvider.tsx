"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createEffectEngine } from "@/lib/effects/effectEngine";
import {
  DEFAULT_EFFECTS_PREFERENCES,
  readEffectsPreferences,
  writeEffectsPreferences,
} from "@/lib/effects/preferences";
import { canPlayAudio } from "@/lib/effects/soundEngine";
import { canVibrate } from "@/lib/effects/haptics";
import type {
  EffectCue,
  EffectsCapabilities,
  EffectsPreferences,
} from "@/types/effects";

interface EffectsContextValue {
  preferences: EffectsPreferences;
  capabilities: EffectsCapabilities;
  setPreference: <Key extends keyof EffectsPreferences>(
    key: Key,
    value: EffectsPreferences[Key],
  ) => void;
  trigger: (cue: EffectCue) => void;
}

const defaultCapabilities: EffectsCapabilities = {
  audio: false,
  haptics: false,
  reducedMotion: false,
};

const fallbackValue: EffectsContextValue = {
  preferences: DEFAULT_EFFECTS_PREFERENCES,
  capabilities: defaultCapabilities,
  setPreference: () => undefined,
  trigger: () => undefined,
};

const EffectsContext = createContext<EffectsContextValue>(fallbackValue);
const engine = createEffectEngine();

export function EffectsProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(DEFAULT_EFFECTS_PREFERENCES);
  const [capabilities, setCapabilities] = useState(defaultCapabilities);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateCapabilities = () =>
      setCapabilities({
        audio: canPlayAudio(),
        haptics: canVibrate(navigator),
        reducedMotion: media.matches,
      });
    const hydrationFrame = window.requestAnimationFrame(() => {
      setPreferences(readEffectsPreferences(window.localStorage));
      updateCapabilities();
    });
    media.addEventListener("change", updateCapabilities);
    return () => {
      window.cancelAnimationFrame(hydrationFrame);
      media.removeEventListener("change", updateCapabilities);
    };
  }, []);

  const setPreference = useCallback(
    <Key extends keyof EffectsPreferences>(key: Key, value: EffectsPreferences[Key]) => {
      setPreferences((current) => {
        const next = { ...current, [key]: value };
        writeEffectsPreferences(next, window.localStorage);
        return next;
      });
    },
    [],
  );

  const trigger = useCallback(
    (cue: EffectCue) => engine.trigger(cue, preferences),
    [preferences],
  );

  const value = useMemo(
    () => ({ preferences, capabilities, setPreference, trigger }),
    [preferences, capabilities, setPreference, trigger],
  );

  return <EffectsContext.Provider value={value}>{children}</EffectsContext.Provider>;
}

export function useEffects(): EffectsContextValue {
  return useContext(EffectsContext);
}
