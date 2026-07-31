import type { EffectCue } from "@/types/effects";

export type VibrationPattern = number | number[];

const HAPTIC_PATTERNS: Record<EffectCue, VibrationPattern> = {
  roundStart: 35,
  countdown: 18,
  countdownUrgent: [18, 30, 28],
  countdownFinal: 42,
  correct: [35, 35, 75],
  pass: 30,
  timeout: [80, 45, 80],
  winner: [45, 35, 45, 35, 110],
};

export function getHapticPattern(cue: EffectCue): VibrationPattern {
  return HAPTIC_PATTERNS[cue];
}

export function canVibrate(target?: Pick<Navigator, "vibrate"> | null): boolean {
  return typeof target?.vibrate === "function";
}

export function triggerHaptic(
  cue: EffectCue,
  target?: Pick<Navigator, "vibrate"> | null,
): boolean {
  if (!canVibrate(target)) return false;
  try {
    return Boolean(target?.vibrate(getHapticPattern(cue)));
  } catch {
    return false;
  }
}
