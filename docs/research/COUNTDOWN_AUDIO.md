# Final-countdown audio and haptic cues

## Goal

Make the last seconds of a Hoppra round understandable from the cue sequence alone, while retaining the existing visual timer and user controls for sound and haptics.

## Evidence and accessibility constraints

- W3C WAI explains that people can miss or have difficulty understanding audio, and recommends that sites do not rely on sound alone; it specifically calls out haptic feedback as a complementary mobile alert. See [Auditory: Diverse Abilities and Barriers](https://www.w3.org/WAI/people-use-web/abilities-barriers/auditory/) (updated 25 June 2024).
- The same W3C guidance stresses clear audio with low background noise. This system therefore uses short sine tones at low Web Audio gain instead of speech, samples, or long musical effects.
- Sound and vibration remain independently user-controlled through the pre-existing preference gates. Browser capability checks, reduced-motion behavior, SSR guards, and caught AudioContext resume/play errors remain unchanged.

## Cue grammar

| Remaining seconds | Cue | Audio | Haptic |
| --- | --- | --- | --- |
| 5–3 | `countdown` | One calm, low-gain 330 Hz tick | One 18 ms pulse |
| 2 | `countdownUrgent` | Two short, higher ticks | Two brief pulses |
| 1 | `countdownFinal` | One distinct, highest final tick | One decisive 42 ms pulse |
| 0 / outside final window | none | no countdown cue | no countdown cue |
| timeout | existing `timeout` | Two falling tones | Existing two-pulse timeout pattern |

The escalation is deterministic rather than randomized: a player can learn the rhythm over repeated rounds. The first three ticks remain calm; the two-second pair signals urgency; the one-second high tick is distinct; the following timeout cue has a contrasting falling contour. Values are intentionally brief and low-gain to avoid startling volume.

## Integration contract

`getCountdownEffectCue(remainingSeconds)` is pure and returns `countdown` for 5–3, `countdownUrgent` for 2, `countdownFinal` for 1, and `null` otherwise. The game orchestrator can call that mapping once per timer update and continue using its existing effect engine and preference gates.
