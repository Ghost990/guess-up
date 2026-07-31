import { describe, expect, it, vi } from "vitest";
import { createEffectEngine } from "@/lib/effects/effectEngine";
import { getHapticPattern, triggerHaptic } from "@/lib/effects/haptics";
import {
  DEFAULT_EFFECTS_PREFERENCES,
  EFFECTS_PREFERENCES_KEY,
  readEffectsPreferences,
  writeEffectsPreferences,
} from "@/lib/effects/preferences";

function createStorage(initial: string | null = null) {
  let value = initial;
  return {
    getItem: vi.fn(() => value),
    setItem: vi.fn((key: string, next: string) => {
      expect(key).toBe(EFFECTS_PREFERENCES_KEY);
      value = next;
    }),
  };
}

describe("effects preferences", () => {
  it("falls back safely for missing or malformed persisted values", () => {
    expect(readEffectsPreferences(createStorage())).toEqual(DEFAULT_EFFECTS_PREFERENCES);
    expect(readEffectsPreferences(createStorage("not-json"))).toEqual(
      DEFAULT_EFFECTS_PREFERENCES,
    );
    expect(readEffectsPreferences(createStorage('{"sound":true}'))).toEqual(
      DEFAULT_EFFECTS_PREFERENCES,
    );
  });

  it("round-trips a valid preference value", () => {
    const storage = createStorage();
    const preferences = { sound: false, haptics: true };
    writeEffectsPreferences(preferences, storage);
    expect(readEffectsPreferences(storage)).toEqual(preferences);
  });
});

describe("haptics", () => {
  it("uses short, deterministic patterns", () => {
    expect(getHapticPattern("countdown")).toBe(18);
    expect(getHapticPattern("winner")).toEqual([45, 35, 45, 35, 110]);
  });

  it("fails safely when vibration is unavailable or throws", () => {
    expect(triggerHaptic("correct", null)).toBe(false);
    expect(
      triggerHaptic("correct", {
        vibrate: vi.fn(() => {
          throw new Error("blocked");
        }),
      }),
    ).toBe(false);
  });
});

describe("effect engine", () => {
  it("routes cues only to enabled channels", () => {
    const playSound = vi.fn(async () => true);
    const vibrate = vi.fn(() => true);
    const engine = createEffectEngine({ playSound, vibrate });

    engine.trigger("correct", { sound: true, haptics: false });
    expect(playSound).toHaveBeenCalledWith("correct");
    expect(vibrate).not.toHaveBeenCalled();

    playSound.mockClear();
    engine.trigger("pass", { sound: false, haptics: true });
    expect(playSound).not.toHaveBeenCalled();
    expect(vibrate).toHaveBeenCalledWith("pass");
  });
});
