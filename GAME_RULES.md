# GuessUp – canonical game rules

This file is the source of truth for gameplay behavior. Older implementation notes may describe retired prototypes.

## Round model

- One round gives one player one localized task.
- The setup selects **rounds per player**, not a raw task count.
- `totalRounds = playerCount × roundsPerPlayer`, so every player presents the same number of times.
- Presenter order follows the entered player order.
- Categories rotate by player and cycle, giving each presenter a balanced mix.
- Moving from a result to the next round always requires the explicit Continue action.

## Scoring

- Correct answer: presenter **+2 points**, selected guesser **+1 point**.
- Pass or no correct answer: no points.
- The presenter cannot be selected as the guesser.
- Invalid or repeated scoring events are ignored by the store phase guards.

## State and timing

The persisted phases are:

```text
wordReveal → playing ⇄ paused → roundEnd → wordReveal | gameOver
```

- The ready and private reveal experience belongs to `wordReveal`.
- Active timing uses an absolute `roundEndsAt` timestamp, so background tabs and refreshes do not restart the timer.
- Opening the guesser selector pauses and persists the remaining time.
- An active or paused game resumes after refresh.

## Languages

- Supported game languages: Hungarian (`hu`) and English (`en`).
- The selected language controls both interface copy and the task pack.
- The language is frozen into game settings when a game starts.
- Each language pack contains 540 curated tasks across all difficulties and categories.
