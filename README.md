# Hoppra! (working name; formerly GuessUp)

Mobile-first, single-device party game for 2–8 players. Pass one phone around, then draw, explain, or act out a localized task while the others guess.

## Current feature set

- Hungarian and English interface and task packs
- 2–8 players with a once-per-game shuffled presenter order
- 1–4 rounds per player
- 30, 45, 60, or 90 second rounds
- Draw, explain, and act/signal categories
- Private handoff and manual task reveal
- Presenter + guesser scoring
- Refresh-safe persisted game state and absolute round deadlines
- Installable web app manifest
- Experience-based task-pack picker with versioned manifests and entitlement boundary
- Original inline-SVG pack scenes reused across setup, handoff, reveal, and recap surfaces
- Tap-to-reveal active task card with a physically separate mobile control zone
- Localized task assistance with pronunciation, verified metadata, and 180 reviewed Low English Hungarian glosses
- Game Night Recap with standings, round statistics, native share, text copy, and PNG export
- Optional sound and haptics with escalating final-five-second cues, plus reduced-motion-aware winner celebration

> The service worker currently uses a network-only strategy. The app is installable, but a fresh load is not guaranteed to work offline.

## Game rules

- `totalRounds = playerCount × roundsPerPlayer`
- Correct answer: presenter **+2**, selected guesser **+1**
- Pass or no correct guesser: no points
- The presenter cannot score as the guesser
- The selected task language is frozen when the game starts
- Used task IDs are avoided until the matching pool is exhausted

See [GAME_RULES.md](GAME_RULES.md) for the canonical behavior.

## Task packs

- Hungarian: **540** tasks across `easy`, `medium`, and `hard`
- English: **900** tasks across `lowEnglish`, `easy`, `medium`, `challenging`, and `hard`
- Categories: `draw`, `explain`, `signal`

The source tasks remain in `src/data/words-hu.json` and `src/data/words-en.json`. Versioned pack manifests, registry validation, entitlement boundaries, and experience-based filtering live under `src/content/packs` and `src/lib/packs`; runtime task resolution lives in `src/lib/game/wordPacks.ts`.

## Stack

- Next.js 16.2.11 / App Router / Turbopack
- React 19.2.8
- TypeScript 5.9 strict mode
- Tailwind CSS 4.3
- Zustand 5 with persisted client state
- Vitest + React Testing Library
- Playwright desktop and Pixel 5 E2E coverage

## Local development

```bash
npm install
npm run dev
```

The default dev URL is `http://localhost:3000`. Playwright starts or reuses the app at `http://127.0.0.1:3100`.

## Verification

```bash
npm run check
npm run test:e2e
```

`npm run check` runs ESLint, TypeScript, Vitest, and the production build.

## Project structure

```text
src/app/                 App Router entry and metadata
src/components/game/     Setup, gameplay, scoring, results, shared game UI
src/data/                Hungarian and English task packs
src/i18n/                Localized interface copy
src/lib/game/            Round, task selection, scoring, and rotation logic
src/stores/               Persisted Zustand game state
src/styles/               Global design system and responsive styles
src/types/                Shared contracts
tests/                    Unit, component, and E2E tests
public/                   Manifest, icons, and service worker
```

## Documentation

Start with:

- [GAME_RULES.md](GAME_RULES.md) — canonical gameplay behavior
- [GAME_READY.md](GAME_READY.md) — player and operator guide
- [PROJECT_STATUS.md](PROJECT_STATUS.md) — verified implementation status
- [WORD_DATABASE_INFO.md](WORD_DATABASE_INFO.md) — task-pack schema and counts
- [docs/PRODUCT_STRATEGY_AND_MONETIZATION.md](docs/PRODUCT_STRATEGY_AND_MONETIZATION.md) — approved product expansion, monetization, and first-wave scope
- [docs/BRAND_NAME_RESEARCH.md](docs/BRAND_NAME_RESEARCH.md) — Hoppra working-name research, collision checks, risks, and logo direction
- [docs/DOCUMENTATION_MAP.md](docs/DOCUMENTATION_MAP.md) — active versus historical documents

Many older root-level documents are retained as implementation history. They may describe retired multiplayer, scoring, reveal, or design prototypes and are not authoritative unless listed as active in the documentation map.
