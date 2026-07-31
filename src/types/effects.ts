export type EffectCue =
  | "roundStart"
  | "countdown"
  | "countdownUrgent"
  | "countdownFinal"
  | "correct"
  | "pass"
  | "timeout"
  | "winner";

export interface EffectsPreferences {
  sound: boolean;
  haptics: boolean;
}

export interface EffectsCapabilities {
  audio: boolean;
  haptics: boolean;
  reducedMotion: boolean;
}
