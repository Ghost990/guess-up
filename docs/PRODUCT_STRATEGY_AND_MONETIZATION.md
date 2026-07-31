# GuessUp product expansion and monetization strategy

**Status:** approved direction for the post-legacy product branch  
**Working title:** GuessUp — a new public product name must be selected before release  
**Date:** 2026-07-31  
**Source of truth for current gameplay:** tested code and [`GAME_RULES.md`](../GAME_RULES.md)

## Executive decision

The current pass-and-play game is a stable core, not a finished commercial product. The next iteration should add three separate product layers:

- **shareability:** create a memorable artifact users want to send to friends;
- **retention:** give the same group reasons to return through packs, history, and polish;
- **content economy:** turn curated packs and event customization into fair, optional purchases.

The first implementation wave is deliberately limited to the numbered items below:

1. **Game Night Recap**
2. **Thematic Pack System**
4. **Sound, Haptics, and Moment Effects**

These numbers are stable references for planning and implementation. Items 3 and 5–8 remain later opportunities and must not silently expand the first implementation scope.

## Product principles

- The complete core game remains useful without payment.
- No banner ads or interstitials may interrupt setup, handoff, active play, scoring, or results.
- A subscription is not the launch model. The category is episodic and current competitor reviews show strong resistance to aggressive subscription walls.
- Accounts are optional until cross-device entitlements, community content, or synchronization genuinely require them.
- Every new capability works in Hungarian and English from the first release.
- The game remains local-first and refresh-safe.
- Effects must respect mute, reduced-motion, browser capability, and user consent.
- Content, presentation, entitlement, and analytics concerns stay separate so later payment, localization, and server sync do not require a rewrite.

## Current baseline

The stable baseline provides:

- 2–8 player pass-and-play gameplay;
- Hungarian and English UI and task data;
- 540 Hungarian and 900 English tasks;
- draw, explain, and act categories;
- once-per-game shuffled player order;
- persisted absolute-deadline timer and phase-guarded Zustand state;
- presenter +2 and guesser +1 scoring;
- installable PWA shell with network-only service worker;
- lint, strict typecheck, unit/component tests, production build, and two-device-class E2E coverage.

Current commercial-layer gaps include no recap export, no game history, no custom or thematic pack registry, no effects preference layer, no audio/haptics, no purchase entitlement model, and no real offline cache.

# Prioritized feature opportunities

## 1. Game Night Recap

### User value

At game over, generate a polished recap that can be viewed, downloaded, or shared. It should turn a completed game into an artifact rather than a dead-end scoreboard.

### MVP content

- winner or tie state;
- full final ranking;
- number of tasks played;
- correct, passed, and timed-out round counts;
- best presenter;
- best guesser;
- strongest presenter–guesser pairing when enough data exists;
- game date and duration;
- product branding and a shareable call to action.

### MVP interactions

- responsive recap panel inside the game-over screen;
- native Web Share API when available;
- PNG download fallback;
- text-only share fallback when file sharing is unavailable;
- clear handling of tied statistics and small sample sizes.

### Architecture

Store a bounded, versioned round-event history instead of deriving the recap from `lastResult`. The persisted game schema should support migration from existing saved games.

Suggested domain split:

```text
src/lib/recap/
  buildRecap.ts
  recapStats.ts
  recapShare.ts
src/components/recap/
  GameNightRecap.tsx
  RecapShareActions.tsx
src/types/recap.ts
```

The recap builder consumes a read-only game snapshot and returns a serializable view model. Rendering and file generation must not contain scoring business logic.

### Success signals

- recap viewed per completed game;
- share action opened;
- share completed when detectable;
- PNG downloaded;
- new game started after recap.

## 2. Thematic Pack System

### User value

Users choose an experience rather than only language, difficulty, and mechanic. A pack has a recognizable identity, cover, audience, content rules, and optional commercial entitlement.

### Initial pack directions

- Hungarian internet and memes;
- 2000s nostalgia;
- movies and series;
- gaming;
- couples/date night;
- family;
- kids;
- office and corporate language;
- music and lyric prompts;
- English learning;
- seasonal packs.

Only content that is original, licensed, public-domain, or safely referential may ship. Brand, celebrity, film, lyric, and franchise packs need an IP review before commercial use.

### Scalable model

```ts
interface TaskPackManifest {
  id: string;
  schemaVersion: number;
  locale: "hu" | "en";
  titleKey: string;
  descriptionKey: string;
  coverAsset: string;
  accent: string;
  audience: "family" | "kids" | "adult" | "office";
  tags: string[];
  availability: "free" | "premium" | "event";
  taskSource: string;
  version: string;
}
```

The task itself remains compatible with the existing category and difficulty filters. Pack membership is an additional dimension, not a replacement for the current game rules.

Suggested domain split:

```text
src/content/packs/
  manifests/
  data/
src/lib/packs/
  packRegistry.ts
  packValidation.ts
  packSelection.ts
src/components/packs/
  PackPicker.tsx
  PackCard.tsx
src/types/packs.ts
```

### Entitlement boundary

The UI must query a generic entitlement provider instead of reading a `premium` boolean directly. The first provider may be local/demo-only, but the contract must allow later replacement with server-verified purchases.

```ts
interface EntitlementProvider {
  canAccessPack(packId: string): Promise<boolean>;
}
```

Do not add real payment dependencies in the first feature wave.

### Success signals

- pack impressions and selections;
- game starts by pack;
- completion rate by pack;
- replay rate by pack;
- premium intent/opened offer, before introducing payment;
- task repetition and pass rate by pack.

## 3. Custom Deck Creator and Sharing — later

Manual custom deck creation should be free. Users can export or share a versioned deck through a compact link, QR code, or file. AI generation can later use metered credits, but manual user-authored content must not be paywalled.

This is outside the first implementation wave, but the pack schema must not block it.

## 4. Sound, Haptics, and Moment Effects

### User value

Make important moments feel physical and celebratory without turning every click into noise.

### MVP moments

- round start;
- final five-second countdown;
- correct answer;
- pass/timeout;
- points awarded;
- winner reveal.

### Capability and preference model

- effects are client-side enhancements, never state-machine inputs;
- mute and haptic preferences persist independently from game state;
- sound starts only after user interaction to satisfy autoplay policies;
- `navigator.vibrate` is capability-checked and never assumed;
- reduced motion disables decorative celebration and large movement;
- effects failures never block gameplay;
- no remote tracking or microphone/camera permission is required.

Suggested domain split:

```text
src/lib/effects/
  effectEngine.ts
  soundEngine.ts
  haptics.ts
  preferences.ts
src/components/effects/
  EffectsProvider.tsx
  EffectsSettings.tsx
```

Audio assets should be tiny, locally hosted, licensed/original, and preload only when appropriate. A synthesized Web Audio implementation is acceptable for the first release if it remains subtle and deterministic.

### Success signals

- effects enabled/disabled;
- haptics supported;
- effects preference retained;
- no audio-related console errors;
- no gameplay delay attributable to effects.

## 5. Real offline PWA — high-priority follow-up

Cache the application shell, localized content, icons, and previously entitled packs. Offline support should be tested as a product capability, not inferred from manifest installability.

## 6. Local groups and Hall of Fame — follow-up

Persist opt-in local group profiles, wins, games, and pair statistics without requiring an account.

## 7. Camera instant replay — later experiment

Optional local-only `MediaRecorder` capture can create highly shareable moments, but requires explicit consent, privacy copy, browser compatibility work, and automatic deletion of unselected footage.

## 8. TV/spectator mode — later expansion

A phone can remain the private controller while a TV or laptop displays public score and ceremony state. This requires a separate public projection model and transport layer; it must not leak private task data.

# Monetization strategy

## Recommended launch model

### Free core

- complete base gameplay;
- all three mechanics;
- 2–8 players;
- Hungarian and English;
- several full-quality packs;
- manual custom deck creation when implemented;
- offline use;
- no advertising during a game.

### One-time thematic packs

Hypothesis ranges for testing, not fixed launch prices:

- individual pack: **490–990 HUF**;
- three-to-five-pack bundle: **1,490–2,490 HUF**;
- seasonal bundle: around **1,990 HUF**.

### One-time Party Pass

Test **2,990–4,990 HUF** for:

- all current standard premium packs;
- premium recap themes;
- expanded local statistics;
- future custom-pack sharing features;
- ad-free status if optional advertising is ever introduced.

Do not promise every future expansion forever.

### AI deck credits — later

- first generation free;
- prepaid credit bundles or a small allowance attached to Party Pass;
- manual creation remains free;
- moderation, provider cost, abuse controls, and output validation are prerequisites.

## B2B and event offering

A branded event package is likely to monetize earlier than a consumer subscription.

Possible deliverables:

- event-specific pack;
- brand colors and logo;
- custom splash and winner screen;
- branded recap export;
- QR access;
- expiration or persistent license;
- moderation and delivery support.

Initial price hypotheses:

- small event: **59,900 HUF**;
- larger company/agency package: **99,000–149,000 HUF**;
- annual library or recurring agency use: custom quote.

These are validation hypotheses, not revenue forecasts.

## Advertising boundary

Avoid ads at launch. If tested later, only an explicitly optional rewarded action may unlock a pack for one session. Never show an ad during setup-to-game-over flow.

## Subscription boundary

Do not launch a subscription before there is demonstrated recurring content value, strong repeat usage, and a release cadence that justifies recurring billing. Competitor store reviews show subscription backlash when core variety is perceived as artificially restricted.

# Market evidence and naming risk

An established direct competitor already uses the public name **Guess Up** in the same charades/headbands category. Its current store listings advertise:

- 25–26 languages;
- 100+ decks;
- team mode;
- recording and social sharing;
- custom decks and sharing;
- curated pack purchases;
- advertising and VIP subscription;
- AI category generation.

Its Google Play listing showed 41K+ reviews when checked on 2026-07-31. Recent reviews also complained about limited free choice and aggressive subscription gating. This supports a fair one-time-pack model but makes the current project name unsuitable for public differentiation.

The working title may remain in code temporarily. Before public release, perform:

- App Store and Google Play collision search;
- general web and social-handle search;
- domain availability check;
- EUIPO and relevant national trademark screening;
- linguistic and pronunciation review in Hungarian and English;
- repository/package rename only after a candidate is selected.

A search result is not a legal clearance. Trademark approval requires a qualified review if the product becomes commercial.

# Analytics and privacy foundation

Define a provider-neutral event contract before choosing an analytics vendor:

```ts
type ProductEvent =
  | { type: "game_started"; packIds: string[]; locale: string }
  | { type: "game_completed"; packIds: string[]; rounds: number }
  | { type: "recap_viewed" }
  | { type: "recap_share_opened"; method: "native" | "download" | "text" }
  | { type: "pack_selected"; packId: string }
  | { type: "effects_preference_changed"; sound: boolean; haptics: boolean };
```

The initial implementation may use a no-op adapter. Do not place vendor SDK calls inside gameplay components.

# Branch and delivery strategy

## Legacy preservation

Preserve the last stable baseline with:

- a dedicated legacy branch;
- an annotated tag;
- no history rewrite;
- remote push only after explicit authorization.

A separate duplicate repository is unnecessary unless the product later diverges operationally. Git branches and tags preserve the exact tree more cleanly without splitting issues, releases, and history.

## New development branch

All product-expansion code begins on a new branch from the committed strategy baseline. Feature streams may use temporary worktrees and branches but must integrate through the product branch.

## Implementation order

1. versioned domain contracts and migration strategy;
2. event history plus recap statistics tests;
3. recap UI and export/share fallbacks;
4. pack manifests, registry, validation, and selection;
5. pack picker and migration of existing data;
6. isolated effects engine and preferences;
7. integration wiring;
8. documentation and full verification.

# Binary done criteria for the first wave

The first wave is complete only when:

- existing saved games migrate or fail safely without crashing;
- all current rules and scoring semantics remain unchanged;
- completed games show a deterministic recap based on event history;
- recap can be downloaded, and native sharing is used when supported;
- at least one free themed pack in each supported language is selectable;
- old task data remains playable through the new registry;
- pack access goes through an entitlement interface;
- sound and haptics have persistent user controls;
- reduced-motion and unsupported capability paths are safe;
- Hungarian and English copy are complete;
- lint and strict typecheck pass;
- unit/component tests pass;
- production build passes;
- E2E passes on desktop Chrome and Pixel 5;
- no console errors or horizontal overflow are present in core flows;
- changes are committed locally on the product branch;
- nothing is pushed or deployed without explicit authorization.

# Sources checked

- Apple App Store — Charades & Headbands: Guess Up: <https://apps.apple.com/kh/app/charades-headbands-guess-up/id1160484607>
- Google Play — Charades & Headbands: Guess Up: <https://play.google.com/store/apps/details?id=pt.cosmicode.guessup&hl=en_US>
- Sensor Tower public overview — Heads Up!: <https://app.sensortower.com/overview/623592465?country=US>
- Netflix Games — Heads Up!: <https://www.netflix.com/games/81569939>

Third-party revenue estimates are directional evidence only and are not used as a forecast in this document.
