# Hoppra! (working public name; formerly GuessUp)

Mobile-first, single-device party game for 2–8 players. Pass one phone around, then draw, explain, or act out a localized task while the others guess.

## Current feature set

- Hungarian and English interface and task packs
- Localized product landing page at `/` with the game flow isolated at `/new-game`
- 2–8 players with a once-per-game shuffled presenter order
- 1–4 rounds per player
- 30, 45, 60, or 90 second rounds
- Draw, explain, and act/signal categories
- Private handoff and manual task reveal
- Presenter + guesser scoring
- Refresh-safe persisted game state and absolute round deadlines
- Installable, offline-ready PWA shell with safe update handling
- Ten experience packs backed by versioned manifests, validated content sources, and an entitlement boundary
- Distinct pack worlds with their own table pattern, paper material, framing, and control geometry
- Original inline-SVG pack scenes reused across setup, handoff, reveal, and recap surfaces
- Progressive setup with optional rules behind one compact disclosure and an on-demand live scoreboard
- Tap-to-reveal active task card with a physically separate mobile control zone
- Localized task assistance with pronunciation, verified metadata, and 180 reviewed Low English Hungarian glosses
- Game Night Recap with standings, round statistics, native share, text copy, and PNG export
- Optional sound and haptics with escalating final-five-second cues, plus reduced-motion-aware winner celebration

> The production service worker caches the public app shell and game route, uses network-first navigation with an offline fallback, and never caches future auth, checkout, or entitlement API traffic.

## Game rules

- `totalRounds = playerCount × roundsPerPlayer`
- Correct answer: presenter **+2**, selected guesser **+1**
- Pass or no correct guesser: no points
- The presenter cannot score as the guesser
- The selected task language is frozen when the game starts
- Used task IDs are avoided until the matching pool is exhausted

See [GAME_RULES.md](GAME_RULES.md) for the canonical behavior.

## Task packs and content sources

- Hungarian base library: **540** tasks across `easy`, `medium`, and `hard`
- English base library: **900** tasks across `lowEnglish`, `easy`, `medium`, `challenging`, and `hard`
- Dedicated movie, series, and gaming sources: **12 tasks per theme and language**, 72 additional tasks total
- Experience manifests: **10** total — five Hungarian and five English
- Categories: `draw`, `explain`, `signal`

Base tasks live in `src/data/words-hu.json` and `src/data/words-en.json`; isolated theme sources use `src/data/{movies,series,gaming}-{hu,en}.json`. Versioned manifests and content-source registration live under `src/content/packs`, while validation and entitlement boundaries live under `src/lib/packs`. Runtime task resolution remains in `src/lib/game/wordPacks.ts`.

## Stack

- Next.js 16.2.12 / App Router / Turbopack
- React 19.2.8
- TypeScript 5.9 strict mode
- Tailwind CSS 4.3
- Zustand 5 with persisted client state
- pnpm 11.9.0
- Vitest + React Testing Library
- Playwright desktop and Pixel 5 E2E coverage

The committed `pnpm-lock.yaml` is the dependency source of truth. Project-level pnpm settings and the native-build allowlist live in `pnpm-workspace.yaml`.

## Local development

```bash
corepack enable
pnpm install
pnpm dev
```

The default dev URL is `http://localhost:3000`. Playwright starts or reuses the app at `http://127.0.0.1:3100`.

## Verification

```bash
pnpm check
pnpm test:e2e
pnpm test:pwa
```

`pnpm check` runs ESLint, TypeScript, Vitest, and the production build. `pnpm test:pwa` starts that production build and proves the game route can reopen offline under service-worker control.

## Project structure

```text
src/app/                 Home and dedicated game routes, metadata, global wiring
src/components/          Home, game, packs, effects, illustrations, icons, recap
src/content/             Pack manifests/content sources and offline hint content
src/data/                Base libraries and dedicated localized theme sources
src/i18n/                Localized interface copy
src/lib/                 Game, pack, effect, and recap domain logic
src/stores/               Persisted Zustand game state
src/styles/               Shared, home, and game-night responsive styles
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
- [docs/MONETIZATION_AND_DATA_ARCHITECTURE.md](docs/MONETIZATION_AND_DATA_ARCHITECTURE.md) — database, purchase, entitlement, protected-content, and rollout design
- [docs/BRAND_NAME_RESEARCH.md](docs/BRAND_NAME_RESEARCH.md) — Hoppra working-name research, collision checks, risks, and logo direction
- [docs/DOCUMENTATION_MAP.md](docs/DOCUMENTATION_MAP.md) — active versus historical documents

Many older root-level documents are retained as implementation history. They may describe retired multiplayer, scoring, reveal, or design prototypes and are not authoritative unless listed as active in the documentation map.
