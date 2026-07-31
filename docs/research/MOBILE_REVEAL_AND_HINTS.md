# Mobile reveal and contextual word assistance research

## Decision

Hoppra now uses a regular semantic button that toggles the active task into a separate, stable live card. The player can tap/click it once to show the task and again to hide it; no press-and-hold, pointer path, or gesture timing is required. The visible control label stays an action label rather than becoming the task itself.

Contextual assistance is intentionally available only on the already private, initial reveal screen and before the timer starts. It is optional and collapsible. It is generated locally and deterministically from existing task metadata: difficulty, character count, first character, and safe tags. The UI explicitly says that this is metadata, not a definition; tags equal to the answer are excluded. This avoids fabricated definitions and needs no network, account, or translation service.

## Accessibility findings

- [W3C, Understanding SC 2.5.1: Pointer Gestures](https://www.w3.org/WAI/WCAG21/Understanding/pointer-gestures.html) says functionality using multipoint or path-based gestures must also be operable with a single pointer without a path-based gesture. It also notes that keyboard access alone is not a sufficient replacement for pointer users. A visible tap/click button therefore replaces the prior hold-to-peek behavior.
- Existing shared button styles set a `min-height: 50px`, exceeding the requested 44px touch-target minimum. The interaction retains native `button` semantics, focus behavior, and keyboard activation.
- The task value is rendered separately in an `aria-live="polite"`, `aria-atomic="true"` card so the control remains usable and the revealed value is not under a user’s thumb.

## Progressive enhancement

[MDN’s Web Speech API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) describes `SpeechSynthesis`, `SpeechSynthesisUtterance`, and `Window.speechSynthesis` for text-to-speech. The optional pronunciation button is only rendered after the browser confirms both APIs exist, sets the correct `hu-HU`/`en-US` language, and remains absent when unsupported.

## Validation scope

Unit coverage verifies deterministic metadata/fallback behavior across every current task and ensures no tag equal to the answer is exposed. Component coverage verifies tap toggling, the separate live card, action-only control labels, and that assistance is unavailable before explicit private reveal.
