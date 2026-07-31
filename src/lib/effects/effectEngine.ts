import { playEffectSound } from "./soundEngine";
import { triggerHaptic } from "./haptics";
import type { EffectCue, EffectsPreferences } from "@/types/effects";

export interface EffectEngineDependencies {
  playSound?: (cue: EffectCue) => Promise<boolean>;
  vibrate?: (cue: EffectCue) => boolean;
}

export function getCountdownEffectCue(remainingSeconds: number): EffectCue | null {
  switch (remainingSeconds) {
    case 5:
    case 4:
    case 3:
      return "countdown";
    case 2:
      return "countdownUrgent";
    case 1:
      return "countdownFinal";
    default:
      return null;
  }
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
