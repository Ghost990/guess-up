# Hoppra! project status

**Last verified:** 2026-08-02

**Branch:** `main` (delivered product baseline: `cb5e707`)

**Status:** distinct pack worlds, simplified progressive setup, all-open monetization boundary, offline PWA, and performance fixes are delivered; pnpm 11 is the canonical package manager

`Hoppra!` is the recommended working public name for the product formerly called GuessUp. Internal repository names and persisted storage keys remain unchanged until trademark and domain clearance are complete.

## Delivery state

- Local `main`, `origin/main`, and `origin/HEAD` were synchronized at `cb5e707` before the pnpm migration.
- The former product-platform work is no longer isolated on a feature branch; it is part of the active `main` line.
- Dependency installation, project scripts, and Playwright server startup use pnpm 11. The committed `pnpm-lock.yaml` replaces `package-lock.json`; pnpm settings and the native-build allowlist live in `pnpm-workspace.yaml`.
- The production module graph was reduced to 71 reachable TypeScript/TSX files. Retired multiplayer/event/timer utilities, unused state fields, an inactive Tailwind v3 config, and three unused dependencies were removed.
- The public landing page is served at `/`; setup and all persisted game phases are served at `/new-game`.
- Historical repository and storage names remain `guess-up` / `guessup-*` for compatibility.

## Implemented core game

- Next.js 16 App Router application with a localized product home and dedicated pass-and-play route
- Mobile-first setup, handoff, reveal, active-play, scoring, result, and game-over screens
- Hungarian and English UI/task sources
- 2–8 players and once-per-game shuffled presenter order
- 1–4 rounds per player
- 30/45/60/90 second absolute-deadline timer
- Draw, explain, and signal categories
- Presenter +2 / guesser +1 scoring
- Persisted active/paused game state and saved player names
- Typed install manifest, dedicated maskable/Apple icons, and offline-ready production service worker

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
- Async entitlement-provider boundary with free, demo, and explicit all-open rollout implementations
- Store-independent Pack Picker/Card components
- Setup and runtime selection wired to immutable `packId`
- Legacy persisted games fall back to the locale's default classic pack
- Pack worlds now differ by material and silhouette, not only accent color: classic confetti paper, summit trail map, city grid, cinema ticket, broadcast screen, and arcade pixel panel
- The setup pack shelf previews those same world materials before selection

### Focused game-night interface

- Setup keeps players, language, and pack choice visible while advanced rules collapse into one summarized disclosure
- The duplicate setup explainer collapses until requested
- Active play centers one task surface and keeps live standings collapsed until requested
- Native `details` controls preserve keyboard interaction and visible focus treatment
- Mobile setup height dropped from 3239 px to 1748 px in the bounded 393 × 851 visual check

Current experience manifests:

- `classic-hungarian` — Klasszikus társas
- `challenge-hungarian` — Nehéz menet
- `movies-hungarian` — Mozivászon
- `series-hungarian` — Sorozatmaraton
- `gaming-hungarian` — Játékterem
- `classic-english` — Classic Party
- `easy-energy-english` — Easy Energy
- `movies-english` — Movie Night
- `series-english` — Series Marathon
- `gaming-english` — Arcade Party

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

### Home and illustration language

- Localized Hoppra landing page with product explanation, category stories, pack worlds, and calls to action
- Seven original inline-SVG pack scenes built from people, places, play objects, and diagram motifs
- Shared warm-black outline, off-white paper, coral/cyan/yellow palette, and print-offset shadow language
- Manifest-driven `coverAsset` resolution with an accessible fallback scene
- Artwork reused on the home page, Pack Cards, setup, private handoff, reveal, and Game Over
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

- Hungarian base library: **540 tasks**
  - easy: 210
  - medium: 200
  - hard: 130
- English base library: **900 tasks**
  - lowEnglish: 180
  - easy: 180
  - medium: 180
  - challenging: 180
  - hard: 180
- Dedicated movie, series, and gaming sources: **12 tasks per theme and language**
  - Hungarian isolated theme tasks: 36
  - English isolated theme tasks: 36

The repository contains **1,512 task records across eight JSON content sources**. IDs are unique within each source. Runtime selection resolves the selected manifest's content source, then filters by language, difficulty, category compatibility, and previously used IDs.

## Verified quality gates

```text
pnpm lint       passed
pnpm typecheck  passed
pnpm test       102/102 passed across 22 files
pnpm build      passed; static / and /new-game routes generated
pnpm test:e2e   2/2 passed (Desktop Chrome + Pixel 5)
pnpm test:pwa   1/1 passed (production Pixel 5, controlled offline reload)
pnpm audit      passed; no known vulnerabilities
git diff --check   passed
```

Bounded production visual QA:

- desktop setup: `clientWidth 1440`, `scrollWidth 1440`
- Pixel-width setup: `clientWidth 393`, `scrollWidth 393`
- Pixel-width Game Over/Recap: `clientWidth 393`, `scrollWidth 393`
- Pixel-width active play: `clientWidth 393`, `scrollWidth 393`
- Pixel-width compact setup: `scrollHeight 1748`, down from `3239`; optional rules closed
- desktop compact setup: `scrollHeight 1621`, down from `2738`; three-column pack shelf
- live standings verified closed by default and keyboard-expandable
- classic, summit, city, cinema, broadcast, and arcade play surfaces visually inspected as distinct worlds
- revealed task card bottom `580.6px`; reveal control top `596.6px`; separate 16px touch/content gap
- zero console errors and zero uncaught page errors
- setup, pack picker, handoff, open help, active reveal, and recap inspected as mobile surfaces
- app icon and horizontal logo exports visually inspected after rasterization
- production worker controlled `/new-game`, created namespaced shell/runtime caches, and reopened the setup route offline at 393 px with zero horizontal overflow

## Known limitations and follow-up work

- `Hoppra!` is a working recommendation, not completed trademark clearance.
- RDAP “not found” signals for candidate domains are not registrar availability guarantees.
- Offline support depends on one successful production load; the build-level Pixel 5 test covers install, control, namespaced caches, and offline `/new-game` reload.
- Classic/challenge/easy experiences reuse filtered base libraries; movie, series, and gaming packs have isolated but intentionally small 12-task-per-locale starter sources that need editorial expansion.
- Entitlement boundaries exist, but no production StoreKit, Google Play, Stripe, or account backend is connected.
- The approved Supabase/Stripe data and entitlement design is documented, while all packs remain intentionally open.
- Recap sharing is local browser functionality; there are no hosted recap URLs or server analytics yet.
- Local persistence does not synchronize games across browsers or devices.
- There is intentionally no server-authoritative multiplayer backend.

## Development

```bash
corepack enable
pnpm install
pnpm dev
pnpm check
pnpm test:e2e
```

Default development URL: `http://localhost:3000`

Playwright development URL: `http://127.0.0.1:3100`

See `README.md`, `GAME_RULES.md`, `docs/PRODUCT_STRATEGY_AND_MONETIZATION.md`, `docs/BRAND_NAME_RESEARCH.md`, and `docs/DOCUMENTATION_MAP.md` before relying on older implementation documents.
