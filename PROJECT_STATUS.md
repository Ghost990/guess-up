# GuessUp project status

**Last verified:** 2026-07-31
**Branch:** `main`
**Verified commit:** `c978f75` (`content: expand English upper difficulty tasks`)
**Status:** playable, buildable, and covered by unit/component and core E2E tests

## Implemented

- Next.js 16 App Router single-page game
- Mobile-first responsive setup, handoff, reveal, active-play, scoring, result, and game-over screens
- Hungarian and English UI/task packs
- 2–8 players and once-per-game shuffled order
- 1–4 rounds per player
- 30/45/60/90 second absolute-deadline timer
- Draw, explain, and signal categories
- Presenter +2 / guesser +1 scoring
- Persisted active/paused game state and saved player names
- Installable manifest and production service-worker registration

## Task packs

- Hungarian: **540** tasks
  - easy: 210
  - medium: 200
  - hard: 130
- English: **900** tasks
  - lowEnglish: 180
  - easy: 180
  - medium: 180
  - challenging: 180
  - hard: 180

All 1,440 records have unique IDs within their language pack. Runtime selection filters by language, difficulty, category compatibility, and previously used IDs.

## Technical stack

- Next.js 16.2.11
- React / React DOM 19.2.8
- TypeScript 5.9.3 strict mode
- Tailwind CSS 4.3.3
- Zustand 5.0.8
- Vitest 4.1.10
- Playwright 1.61.1

## Verified quality gates

```text
npm run lint       passed
npm run typecheck  passed
npm run test       33/33 passed
npm run build      passed
npm run test:e2e   2/2 passed (Desktop Chrome + Pixel 5)
```

Visual smoke checks at 393 px and 1440 px found:

- zero page/console errors
- zero horizontal overflow
- gameplay controls visible and usable on mobile
- responsive setup, reveal, play, and scoreboard layouts

## Known limitations and follow-up work

- The service worker is network-only; installability exists, offline caching does not.
- The setup page is long on mobile and duplicates the language switch in the header and form.
- E2E currently covers one English two-player flow; more explicit timeout, scoring-cancel, Hungarian, 8-player, and accessibility scenarios would improve confidence.
- Local persistence does not synchronize games across browsers or devices.
- There is no server-authoritative multiplayer backend; this is intentionally a single-device pass-and-play game.

## Development

```bash
npm install
npm run dev
npm run check
npm run test:e2e
```

Default development URL: `http://localhost:3000`
Playwright development URL: `http://127.0.0.1:3100`

See [README.md](README.md), [GAME_RULES.md](GAME_RULES.md), and [docs/DOCUMENTATION_MAP.md](docs/DOCUMENTATION_MAP.md) before relying on older design or implementation documents.
