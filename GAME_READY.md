# GuessUp — play and operation guide

**Status:** playable and locally verified
**Canonical rules:** [GAME_RULES.md](GAME_RULES.md)

## Start locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The Playwright configuration uses `http://127.0.0.1:3100`.

## Set up a game

- Add 2–8 unique player names.
- Choose Hungarian or English.
- Pick a difficulty available for that language.
- Choose 1–4 rounds per player.
- Choose a 30, 45, 60, or 90 second round.
- Enable one or more categories: drawing, explaining, or acting/signalling.
- Start the game. Presenter order is shuffled once.

## Play a round

- Pass the device to the named presenter.
- Keep the screen private and tap the reveal button.
- Read the task and category instruction.
- Tap the explicit start button to begin the timer.
- Draw, explain, or act according to the category.
- Hold the task button if the presenter needs to peek again.
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

## Language packs

- Hungarian: 540 tasks (`easy`, `medium`, `hard`)
- English: 900 tasks (`lowEnglish`, `easy`, `medium`, `challenging`, `hard`)

## Installability and offline behavior

The app includes a web manifest and production service-worker registration, so supported browsers can install it. The current service worker is deliberately network-only and clears old caches; do not describe the current build as fully offline-ready.

## Verification

```bash
npm run check
npm run test:e2e
```

As of 2026-07-31:

- ESLint passed
- TypeScript passed
- 33/33 unit and component tests passed
- production build passed
- Playwright passed on Desktop Chrome and Pixel 5
- no console errors or horizontal overflow were found in setup and active-play visual QA
