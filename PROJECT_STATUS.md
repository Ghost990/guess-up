# Hoppra! project status

**Last verified:** 2026-07-31

**Branch:** `product/party-platform-v2`

**Status:** first product-platform wave implemented, buildable, and covered by unit/component, E2E, and bounded visual QA

`Hoppra!` is the recommended working public name for the product formerly called GuessUp. Internal repository names and persisted storage keys remain unchanged until trademark and domain clearance are complete.

## Safety and Git isolation

- Stable baseline preserved as branch `legacy/stable-single-device-2026-07-31`.
- Stable baseline preserved as annotated tag `legacy-stable-2026-07-31`.
- Product-platform development is isolated on `product/party-platform-v2`.
- `main` remains the stable pre-platform line.

## Implemented core game

- Next.js 16 App Router single-page pass-and-play game
- Mobile-first setup, handoff, reveal, active-play, scoring, result, and game-over screens
- Hungarian and English UI/task sources
- 2–8 players and once-per-game shuffled presenter order
- 1–4 rounds per player
- 30/45/60/90 second absolute-deadline timer
- Draw, explain, and signal categories
- Presenter +2 / guesser +1 scoring
- Persisted active/paused game state and saved player names
- Installable manifest and production service-worker registration

## Product-platform wave

### Game Night Recap

- Versioned, serializable round-event contract
- Persisted `correct`, `passed`, and `timedOut` outcomes
- Deterministic standings, tie handling, presenter/guesser/pairing awards, and small-sample fallbacks
- Localized HU/EN recap UI on Game Over
- Native Web Share when supported
- Clipboard summary fallback
- Dependency-free 1080 × 1350 PNG canvas export
- Zustand persistence migration from v2 to v3

### Experience pack platform

- Versioned `TaskPackManifest` schema
- Localized metadata, audience, availability, compatibility, and visual theme contracts
- Deterministic registry validation and filtering
- Content-source abstraction without duplicating source task records
- Async entitlement-provider boundary with free and demo implementations
- Store-independent Pack Picker/Card components
- Setup and runtime selection wired to immutable `packId`
- Legacy persisted games fall back to the locale's default classic pack

Current experience manifests:

- `classic-hu` — Klasszikus társas
- `challenge-hungarian` — Nehéz menet
- `classic-en` — Classic Party
- `easy-energy-english` — Easy Energy

### Effects and celebration

- Centralized effect engine
- Web Audio cues for round start, escalating 5-3/2/1 countdown tiers, correct, pass, timeout, and winner
- Haptics behind capability checks
- Persistent independent sound/haptics preferences
- Reduced-motion-aware winner celebration
- SSR-safe provider and unsupported-browser fallbacks

### Mobile reveal and task assistance

- Active tasks reveal with a single tap and hide with a second tap
- Task content lives in a dedicated live card above the touch control, rather than under a held finger
- HU/EN localized assistance panel with difficulty, first character, length, and semantic tags
- Browser speech-synthesis pronunciation when supported
- Human-reviewed, offline Hungarian glosses for all 180 Low English prompts
- System/editorial tags are filtered out instead of presented as fake semantic hints

### Illustration language

- Four original inline-SVG pack scenes built from people, places, play objects, and diagram motifs
- Shared warm-black outline, off-white paper, coral/cyan/yellow palette, and print-offset shadow language
- Manifest-driven `coverAsset` resolution with an accessible fallback scene
- Artwork reused on Pack Cards, setup, private handoff, reveal, and Game Over
- Decorative and meaningful-image accessibility contracts covered by component tests

### Working brand

- Recommended name: **Hoppra!**
- Public App Store/web/domain collision research documented in `docs/BRAND_NAME_RESEARCH.md`
- Metadata and PWA manifest updated to the working name
- New two-card/exclamation vector mark
- Font-independent outlined horizontal SVG logo
- Regenerated 192 px and 512 px PWA icons
- Existing `guessup-*` local-storage keys intentionally retained for data compatibility

## Task sources

- Hungarian: **540 tasks**
  - easy: 210
  - medium: 200
  - hard: 130
- English: **900 tasks**
  - lowEnglish: 180
  - easy: 180
  - medium: 180
  - challenging: 180
  - hard: 180

All 1,440 records have unique IDs within their language source. Runtime selection filters by pack, language, difficulty, category compatibility, and previously used IDs.

## Verified quality gates

```text
npm run lint       passed
npm run typecheck  passed
npm run test       77/77 passed across 18 files
npm run build      passed; static / route generated
npm run test:e2e   2/2 passed (Desktop Chrome + Pixel 5)
git diff --check   passed
```

Bounded production visual QA:

- desktop setup: `clientWidth 1440`, `scrollWidth 1440`
- Pixel-width setup: `clientWidth 393`, `scrollWidth 393`
- Pixel-width Game Over/Recap: `clientWidth 393`, `scrollWidth 393`
- Pixel-width active play: `clientWidth 393`, `scrollWidth 393`
- revealed task card bottom `580.6px`; reveal control top `596.6px`; separate 16px touch/content gap
- zero console errors and zero uncaught page errors
- setup, pack picker, handoff, open help, active reveal, and recap inspected as mobile surfaces
- app icon and horizontal logo exports visually inspected after rasterization

## Known limitations and follow-up work

- `Hoppra!` is a working recommendation, not completed trademark clearance.
- RDAP “not found” signals for candidate domains are not registrar availability guarantees.
- The service worker remains network-only; installability exists, true offline caching does not.
- Source tasks are currently reused through pack filters; original paid-content packs still need dedicated editorial content.
- Entitlement boundaries exist, but no production StoreKit, Google Play, Stripe, or account backend is connected.
- Recap sharing is local browser functionality; there are no hosted recap URLs or server analytics yet.
- Local persistence does not synchronize games across browsers or devices.
- There is intentionally no server-authoritative multiplayer backend.

## Development

```bash
npm install
npm run dev
npm run check
npm run test:e2e
```

Default development URL: `http://localhost:3000`

Playwright development URL: `http://127.0.0.1:3100`

See `README.md`, `GAME_RULES.md`, `docs/PRODUCT_STRATEGY_AND_MONETIZATION.md`, `docs/BRAND_NAME_RESEARCH.md`, and `docs/DOCUMENTATION_MAP.md` before relying on older implementation documents.
