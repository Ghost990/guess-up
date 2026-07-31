import { playEffectSound } from "./soundEngine";
import { triggerHaptic } from "./haptics";
import type { EffectCue, EffectsPreferences } from "@/types/effects";

export interface EffectEngineDependencies {
  playSound?: (cue: EffectCue) => Promise<boolean>;
  vibrate?: (cue: EffectCue) => boolean;
}

export function createEffectEngine(dependencies: EffectEngineDependencies = {}) {
  const playSound = dependencies.playSound ?? playEffectSound;
  const vibrate =
    dependencies.vibrate ??
    ((cue: EffectCue) =>
      triggerHaptic(cue, typeof navigator === "undefined" ? null : navigator));

  return {
    trigger(cue: EffectCue, preferences: EffectsPreferences): void {
      if (preferences.sound) void playSound(cue);
      if (preferences.haptics) vibrate(cue);
    },
  };
}
