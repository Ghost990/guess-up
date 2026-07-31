# GuessUp — canonical game rules

This file is the source of truth for current gameplay behavior. If an older planning or implementation document conflicts with this file and the tested code, this file and the code win.

## Setup

- A game requires **2–8 unique, non-empty player names**.
- The host chooses the interface/task language, difficulty, rounds per player, round duration, and enabled categories.
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
- During active play, holding the task button temporarily reveals the task again.

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
- Game, language, and latest round result are stored in `localStorage` under `guessup-game-state`.
- Saved setup player names use `guessup-player-names`.

## Languages and task packs

- Supported languages: Hungarian (`hu`) and English (`en`).
- The selected language controls both interface copy and the task pack.
- Language and difficulty are frozen into game settings when a game starts.
- Hungarian pack: **540 tasks** across three difficulties.
- English pack: **900 tasks** across five difficulties.
- Each task declares one or more compatible categories.
- Used task IDs are excluded from selection until the matching language/difficulty/category pool is exhausted; the pool may then repeat.

## End of game

- The final scheduled round transitions directly to `gameOver` after scoring or passing.
- Final standings are sorted by score.
- Starting a new game clears the current game and result while keeping the selected interface language and saved setup names.
