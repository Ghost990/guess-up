# Hoppra! — play and operation guide

**Status:** playable and locally verified
**Canonical rules:** [GAME_RULES.md](GAME_RULES.md)

## Start locally

```bash
corepack enable
pnpm install
pnpm dev
```

Open `http://localhost:3000`, choose **New Game**, and continue at `/new-game`. The Playwright configuration uses `http://127.0.0.1:3100`.

## Set up a game

- Add 2–8 unique player names.
- Choose Hungarian or English.
- Choose one of the experience packs available for that language.
- Start immediately with the shown defaults, or open **Game rules / Játékszabályok** to change difficulty, rounds, time, and categories.
- Start the game. Presenter order is shuffled once.

## Play a round

- Pass the device to the named presenter.
- Keep the screen private and tap the reveal button.
- Read the task and category instruction.
- Tap the explicit start button to begin the timer.
- Open **Standings / Állás** only when the group wants to check the current score; it stays collapsed during play.
- Draw, explain, or act according to the category.
- Tap the task control to reveal the task again; tap once more to hide it.
- Tap **Got it** when someone answers correctly, then select the guesser.
- Tap **Pass** or choose **No one** if nobody answered correctly.
- Review the result and explicitly continue to the next turn.

## Scoring

- Presenter: **+2** for a correct answer.
- Selected guesser: **+1**.
- Pass/no correct answer: **0**.

## Persistence and recovery

- The game is stored locally in the current browser.
- Refreshing during an active or paused round restores the game.
- The timer is based on an absolute deadline and does not reset on refresh.
- Opening the scoring dialog pauses the timer.
- Saved player names are reused on the next setup screen.

Local browser storage is device- and browser-specific. A game opened in another browser or device will not share state.

## Task sources

- Hungarian base library: 540 tasks (`easy`, `medium`, `hard`)
- English base library: 900 tasks (`lowEnglish`, `easy`, `medium`, `challenging`, `hard`)
- Movie, series, and gaming sources: 12 tasks per theme and language
- Ten experience manifests select either a compatible slice of a base library or one isolated theme source

## Installability and offline behavior

The app includes a typed web manifest, safe-area metadata, install icons, a production service worker, and an offline fallback. After one successful online load, the public app shell and `/new-game` route can be reopened without a connection. Updates are offered explicitly so an active round is not reloaded unexpectedly. Account, checkout, and future entitlement endpoints intentionally remain network-only.

## Verification

```bash
pnpm check
pnpm test:e2e
pnpm test:pwa
```

As of 2026-08-02:

- ESLint passed
- TypeScript passed
- 102/102 unit and component tests passed across 22 files
- production build passed
- Playwright passed on Desktop Chrome and Pixel 5
- production PWA test passed with a controlled, offline Pixel 5 reload
- The latest committed visual QA found no console errors or horizontal overflow on the checked mobile and desktop surfaces
