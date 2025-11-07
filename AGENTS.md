# Repository Guidelines

## Project Structure & Module Organization
Next.js 15 App Router routes live in `src/app`, organized by gameplay phases (setup, lobby, rounds). `src/components` hosts shared UI, `src/lib` holds helpers, `src/data` ships word packs, `src/stores` keeps Zustand slices, `src/styles` contains Tailwind tokens, and `src/types` stores contracts; static assets stay in `public`. Review `ARCHITECTURE_OVERVIEW.md`, `IMPLEMENTATION_GUIDE.md`, and `QUALITY_ASSURANCE.md` before altering flows that span modules.

## Build, Test, and Development Commands
- `npm install` — install dependencies after cloning or when docs add a new tool.
- `npm run dev` — run the local server with hot refresh at `http://localhost:3000`.
- `npm run build` — compile the production bundle; fails fast on type or lint issues.
- `npm run start` — serve the built bundle to double-check production behavior.
- `npm run lint` — execute `next lint`; required before every PR push.
- `npx vitest run` / `npx vitest watch` — run the Vitest suites defined in `TESTING_STRATEGY.md`.
- `npx playwright test` — execute mobile-first E2E coverage in `tests/e2e`.

## Coding Style & Naming Conventions
TypeScript is `strict`; type exported props, Zustand slices, and shared helpers. Use PascalCase for React components (`TimerPanel.tsx`), camelCase for hooks/utilities, and keep modules focused (≤200 lines). Compose styles with Tailwind utilities plus `clsx`/`tailwind-merge`, and reference shared code via the `@/` alias. Run `npm run lint` before each commit and format TODOs as `// TODO(agent): context`.

## Testing Guidelines
`TESTING_STRATEGY.md`, `TEST_PLANS.md`, and `QUALITY_ASSURANCE.md` mandate Vitest + React Testing Library for unit/component coverage (≥80% statements/functions/lines, ≥75% branches). Place specs in `tests/` mirroring source paths (`tests/stores/gameStore.test.ts`) and suffix component specs with `.test.tsx`. Use `npx vitest run` for CI parity or `npx vitest watch` during dev; mock Zustand stores through their public hooks. E2E specs live in `tests/e2e`, target Pixel 5/iPhone 12 profiles via `npx playwright test`, and should upload traces when retries occur. Log WCAG 2.1 AA checks in every UI PR.

## Commit & Pull Request Guidelines
History favors short, imperative subjects (`Enhance player selection modal…`). Keep the first line ≤72 chars, add scoped prefixes when helpful (`gameplay:`), and reference issues (`(#123)`) when closing backlog items. Each PR must include: intent summary, screenshots or recordings for UI deltas (mobile + desktop), test results (`npm run lint`, `npx vitest run`, `npx playwright test`), and links to supporting docs. Highlight config, data-seed, or environment changes so deployment agents can reapply them confidently.
