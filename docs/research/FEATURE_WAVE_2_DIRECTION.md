# Hoppra interaction and visual identity wave

**Date:** 2026-07-31

**Branch:** `product/party-platform-v2`

## Product intent

This wave fixes the mobile reveal interaction and extends Hoppra from a logo into a recognizable party-game system:

- a word can be shown or hidden with one tap;
- the touch control never contains the hidden content;
- optional help works in Hungarian and English without inventing definitions;
- pack covers use original, reusable SVG scenes;
- the final countdown is recognizable by sound while staying visually complete.

## Research findings

### Touch and reveal

W3C WCAG 2.2 SC 2.5.1 recommends that functionality can be operated with a single pointer and without requiring path-based or complex gestures. A press-and-hold interaction is also a poor fit here for a simpler physical reason: the finger is positioned exactly where the player needs to read.

Decision:

- replace pointer-down/up reveal with a normal button click;
- render the word in a separate content region above the control;
- keep explicit show and hide labels;
- preserve keyboard and screen-reader operation;
- target at least a 44 px touch area and keep the primary action in the thumb-friendly lower control zone.

Source: https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures

### Contextual help

The current word data contains text, tags, length, difficulty and valid activity categories. It does not contain verified dictionary definitions or translations. The application must not generate confident but false semantic explanations.

Decision:

- assistance is progressive and optional;
- use verified local facts only: topic tag, first letter, length and difficulty;
- localize the help labels and tag vocabulary for Hungarian and English;
- offer browser pronunciation as progressive enhancement when `speechSynthesis` exists;
- never call a generated tag summary a dictionary definition;
- never require network access, an account or an AI API during play.

This contract covers every current word and allows curated definitions or translations to be added later as optional structured data.

### Illustration system

Jackbox's Party Pack art process provides a useful product principle: shared structural UI makes the collection coherent, while each game or pack gets a distinct visual world tied to its mechanics. Art should guide attention and improve recognition, not compete with gameplay.

Decision:

- common Hoppra construction: warm-black outlines, flat coral/cyan/yellow fields, offset print shadows and modular prompt-card geometry;
- pack-specific compositions rather than recolored duplicate covers;
- a reusable React SVG scene component with accessible decorative and meaningful modes;
- scenes include people, places, objects and simple diagrams across the collection;
- integrate artwork into pack selection first, then setup, handoff, reveal and recap surfaces where it supports the current state.

Source: https://www.jackboxgames.com/blog/behind-the-scenes-of-pp10-art

### Countdown sound

Sound can communicate urgency without requiring the player to look at the phone, but it cannot be the only channel. The existing timer dial and numeric countdown remain authoritative.

Decision:

- 5, 4, 3 seconds: short warning ticks;
- 2 seconds: higher or tighter urgent cue;
- 1 second: distinct final tick;
- 0 seconds: separate timeout cadence;
- keep volume restrained and sounds very short;
- respect the existing sound and haptic settings;
- preserve visual and screen-reader timer information.

Accessibility context: pertinent audio events should also have visual equivalents. The existing timer fulfills that requirement.

## Art direction

Working name: **Party Print Kit**

- **Ink:** `#17130e`
- **Primary forms:** coral prompt card, cyan reverse card, yellow signal mark
- **Line:** chunky, consistent rounded outline
- **Depth:** small offset shadow, no glow and no glass
- **People:** simplified geometric bodies with expressive posture, no generic avatar circles
- **Places:** table, room, street or signpost geometry that reads at card scale
- **Objects:** phone, cards, pencil, timer and trophy reduced to bold silhouettes
- **Diagrams:** arrows, paths, steps and bursts derived from game actions

The style should feel like screen-printed game-night ephemera, not a generic mobile-app icon set.

## Acceptance contract

- No mobile interaction requires press-and-hold.
- Revealed content is never under the active fingertip.
- Hint UI is available after private reveal in both supported languages.
- Every word produces an honest fallback hint.
- Every current pack has a distinct SVG cover scene.
- Original scenes appear on multiple relevant product surfaces.
- Final five seconds have escalating cues behind the existing preference boundary.
- Reduced motion, keyboard operation, screen-reader labels and no-horizontal-overflow checks remain green.
