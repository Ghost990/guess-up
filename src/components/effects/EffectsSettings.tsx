"use client";

import { PhoneGlyph, SoundOffGlyph, SoundOnGlyph } from "@/components/icons";
import { useEffects } from "./EffectsProvider";
import type { Language } from "@/types";

const copy = {
  hu: {
    label: "Játékhatások",
    soundOn: "Hang bekapcsolva",
    soundOff: "Hang kikapcsolva",
    hapticsOn: "Rezgés bekapcsolva",
    hapticsOff: "Rezgés kikapcsolva",
    unsupported: "A rezgést ez az eszköz nem támogatja",
  },
  en: {
    label: "Game effects",
    soundOn: "Sound on",
    soundOff: "Sound off",
    hapticsOn: "Haptics on",
    hapticsOff: "Haptics off",
    unsupported: "Haptics are not supported on this device",
  },
} as const;

export function EffectsSettings({ language, compact = false }: { language: Language; compact?: boolean }) {
  const { preferences, capabilities, setPreference } = useEffects();
  const labels = copy[language];

  return (
    <div className="effects-settings" role="group" aria-label={labels.label} data-compact={compact}>
      <button
        type="button"
        className="effects-toggle"
        aria-pressed={preferences.sound}
        aria-label={preferences.sound ? labels.soundOn : labels.soundOff}
        title={preferences.sound ? labels.soundOn : labels.soundOff}
        onClick={() => setPreference("sound", !preferences.sound)}
      >
        {preferences.sound ? <SoundOnGlyph aria-hidden="true" size={18} /> : <SoundOffGlyph aria-hidden="true" size={18} />}
        {!compact && <span>{preferences.sound ? labels.soundOn : labels.soundOff}</span>}
      </button>
      <button
        type="button"
        className="effects-toggle"
        aria-pressed={preferences.haptics}
        aria-label={
          capabilities.haptics
            ? preferences.haptics
              ? labels.hapticsOn
              : labels.hapticsOff
            : labels.unsupported
        }
        title={capabilities.haptics ? undefined : labels.unsupported}
        disabled={!capabilities.haptics}
        onClick={() => setPreference("haptics", !preferences.haptics)}
      >
        <PhoneGlyph aria-hidden="true" size={18} />
        {!compact && <span>{preferences.haptics ? labels.hapticsOn : labels.hapticsOff}</span>}
      </button>
    </div>
  );
}
