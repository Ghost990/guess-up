import type { EffectsPreferences } from "@/types/effects";

export const EFFECTS_PREFERENCES_KEY = "guessup-effects-preferences-v1";
export const DEFAULT_EFFECTS_PREFERENCES: EffectsPreferences = {
  sound: true,
  haptics: true,
};

function isPreferences(value: unknown): value is EffectsPreferences {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<EffectsPreferences>;
  return typeof candidate.sound === "boolean" && typeof candidate.haptics === "boolean";
}

export function readEffectsPreferences(storage?: Pick<Storage, "getItem">): EffectsPreferences {
  if (!storage) return DEFAULT_EFFECTS_PREFERENCES;
  try {
    const value = JSON.parse(storage.getItem(EFFECTS_PREFERENCES_KEY) ?? "null");
    return isPreferences(value) ? value : DEFAULT_EFFECTS_PREFERENCES;
  } catch {
    return DEFAULT_EFFECTS_PREFERENCES;
  }
}

export function writeEffectsPreferences(
  preferences: EffectsPreferences,
  storage?: Pick<Storage, "setItem">,
): void {
  if (!storage) return;
  try {
    storage.setItem(EFFECTS_PREFERENCES_KEY, JSON.stringify(preferences));
  } catch {
    // Effects are an enhancement. Storage failures must never block gameplay.
  }
}
