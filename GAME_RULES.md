# Hoppra! — canonical game rules

This file is the source of truth for current gameplay behavior. If an older planning or implementation document conflicts with this file and the tested code, this file and the code win.

## Setup

- A game requires **2–8 unique, non-empty player names**.
- The host chooses the interface/task language, experience pack, difficulty, rounds per player, round duration, and enabled categories.
- A pack manifest may constrain the available difficulties and categories. Setup rejects incompatible pack/language/difficulty/category combinations.
- Rounds per player: **1, 2, 3, or 4**.
- Round duration: **30, 45, 60, or 90 seconds**.
- At least one category must remain enabled.
- Hungarian difficulties: `easy`, `medium`, `hard`.
- English difficulties: `lowEnglish`, `easy`, `medium`, `challenging`, `hard`.
- English-only difficulty selections are reset when switching back to Hungarian.

## Round model

- One round gives one presenter one localized task.
- `totalRounds = playerCount × roundsPerPlayer`, so every player presents the same number of times.
- Player order is shuffled once with Fisher–Yates when the game starts, then rotates in that fixed order.
- Categories rotate by player and cycle to provide a balanced mix among the enabled categories.
- Moving from a round result to the next round always requires the explicit Continue action.

## Handoff and task reveal

- Each round starts in a private handoff screen.
- The current presenter explicitly reveals the task; there is no automatic three-second reveal.
- The presenter explicitly starts the timer after reading the task.
- During active play, tapping the task control reveals the task in a separate card; tapping again hides it.

## Scoring

- Correct answer: presenter **+2 points**, selected guesser **+1 point**.
- Pass, timeout with no correct guesser, or selecting “no one”: no points.
- The presenter cannot be selected as the guesser.
- Invalid or repeated scoring events are ignored by store phase guards.

## State and timing

The persisted phases are:

```text
wordReveal → playing ⇄ paused → roundEnd → wordReveal | gameOver
```

- Active timing uses an absolute `roundEndsAt` timestamp, so background tabs and refreshes do not restart the timer.
- Opening the guesser selector pauses the timer and persists the remaining duration.
- Cancelling the selector resumes from the persisted remaining duration.
- An active or paused game resumes after refresh.
- Game, language, latest round result, selected pack ID, and versioned round history are stored in `localStorage` under `guessup-game-state`.
- Persisted player records contain only ID, display name, and score. Retired host/connection/guess flags, automatic-reveal timing, and server-event/timer state are not part of the active model; extra legacy fields are ignored when old state is loaded.
- Persisted v2 state migrates to v3 with an empty round history; old games without a pack ID resolve to the locale's default classic pack.
- Saved setup player names use `guessup-player-names`.

## Languages and task packs

- Supported languages: Hungarian (`hu`) and English (`en`).
- The selected language controls interface copy and which compatible experience packs are offered.
- Language, pack ID, and difficulty are frozen into game settings when a game starts.
- The Hungarian base library contains **540 tasks** across three difficulties.
- The English base library contains **900 tasks** across five difficulties.
- Movie, series, and gaming packs use dedicated 12-task sources for each language, adding **72 isolated theme tasks** across six files.
- Ten experience manifests are registered: five Hungarian and five English.
- Each task declares one or more compatible categories.
- Experience packs use versioned manifests and content-source references. They may filter the shared source records without duplicating task data.
- Used task IDs are excluded from selection until the matching language/difficulty/category pool is exhausted; the pool may then repeat.

## End of game

- The final scheduled round transitions directly to `gameOver` after scoring or passing.
- Final standings are sorted by score.
- Starting a new game clears the current game and result while keeping the selected interface language and saved setup names.
- Every resolved round appends exactly one `correct`, `passed`, or `timedOut` history event.
- Game Over builds the recap from that round history and can share a localized text summary or download a 1080 × 1350 PNG card.
