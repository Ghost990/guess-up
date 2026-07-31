import type { EffectCue } from "@/types/effects";

interface Tone {
  frequency: number;
  duration: number;
  delay?: number;
  gain?: number;
}

const TONES: Record<EffectCue, Tone[]> = {
  roundStart: [{ frequency: 440, duration: 0.08 }, { frequency: 660, duration: 0.11, delay: 0.07 }],
  countdown: [{ frequency: 330, duration: 0.045, gain: 0.045 }],
  countdownUrgent: [
    { frequency: 440, duration: 0.045, gain: 0.045 },
    { frequency: 523, duration: 0.06, delay: 0.065, gain: 0.047 },
  ],
  countdownFinal: [{ frequency: 659, duration: 0.085, gain: 0.05 }],
  correct: [{ frequency: 523, duration: 0.08 }, { frequency: 784, duration: 0.15, delay: 0.08 }],
  pass: [{ frequency: 220, duration: 0.09, gain: 0.04 }],
  timeout: [{ frequency: 196, duration: 0.16 }, { frequency: 147, duration: 0.2, delay: 0.13 }],
  winner: [
    { frequency: 523, duration: 0.09 },
    { frequency: 659, duration: 0.09, delay: 0.09 },
    { frequency: 784, duration: 0.2, delay: 0.18 },
  ],
};

let sharedContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext;
  if (!AudioContextClass) return null;
  sharedContext ??= new AudioContextClass();
  return sharedContext;
}

export function canPlayAudio(): boolean {
  return typeof window !== "undefined" && typeof window.AudioContext === "function";
}

export function getSoundPattern(cue: EffectCue): readonly Tone[] {
  return TONES[cue];
}

export async function playEffectSound(cue: EffectCue): Promise<boolean> {
  try {
    const context = getAudioContext();
    if (!context) return false;
    if (context.state === "suspended") await context.resume();

    const now = context.currentTime;
    for (const tone of TONES[cue]) {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const startsAt = now + (tone.delay ?? 0);
      const endsAt = startsAt + tone.duration;

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(tone.frequency, startsAt);
      gain.gain.setValueAtTime(tone.gain ?? 0.055, startsAt);
      gain.gain.exponentialRampToValueAtTime(0.0001, endsAt);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(startsAt);
      oscillator.stop(endsAt);
    }
    return true;
  } catch {
    return false;
  }
}

export function resetSharedAudioContextForTests(): void {
  sharedContext = null;
}
