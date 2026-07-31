# Repository guidelines

## Source of truth

Current behavior is defined by the tested code and `GAME_RULES.md`. Start with `README.md`, `PROJECT_STATUS.md`, and `docs/DOCUMENTATION_MAP.md`. Older root-level planning/specification files are historical and may describe retired multiplayer, scoring, timer, reveal, or visual prototypes.

## Project structure

- `src/app` — Next.js 16 App Router entry, metadata, and global wiring
- `src/components/game` — setup, handoff, gameplay, scoring, results, and game-over UI
- `src/data` — Hungarian and English task packs
- `src/i18n` — localized interface copy
- `src/lib/game` — task selection, randomization, rounds, scoring, and rotation
- `src/stores` — persisted Zustand game state
- `src/styles` — Tailwind import, design tokens, and responsive component CSS
- `src/types` — shared TypeScript contracts
- `tests` — unit, component, and Playwright E2E coverage
- `public` — manifest, icons, and network-only service worker

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run check
npm run test:e2e
```

`npm run check` is the canonical local quality gate: lint + typecheck + Vitest + production build. Playwright separately exercises Desktop Chrome and Pixel 5 at `http://127.0.0.1:3100`.

## Coding conventions

- Keep TypeScript strict and type exported props, shared helpers, and store contracts.
- Use PascalCase for React components and camelCase for hooks/utilities.
- Import shared code through the `@/` alias.
- Keep state transitions behind Zustand store phase guards.
- Use Fisher–Yates through the existing randomization helpers; do not shuffle with random `sort`.
- Preserve absolute-deadline timer semantics and persisted pause/resume state.
- Do not make the presenter eligible as the guesser.
- Update localized Hungarian and English copy together when behavior changes.

## Testing expectations

Gameplay changes should include the narrowest relevant test plus the full canonical checks. UI changes require both mobile and desktop validation and a horizontal-overflow check. Changes to persistence, timing, scoring, language, or task selection should add regression coverage before refactoring.

## Documentation expectations

When behavior changes, update these in the same change:

- `GAME_RULES.md` for rules/state changes
- `PROJECT_STATUS.md` for implemented capability or known limitations
- `WORD_DATABASE_INFO.md` for pack/schema changes
- `README.md` for setup, stack, or top-level product changes

Do not update historical prototype documents as if they were current specs; keep their historical banner intact.
