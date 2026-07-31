# GuessUp task-pack reference

The current game ships two localized JSON task packs:

- `src/data/words-hu.json` — Hungarian, version 2.0.0
- `src/data/words-en.json` — English, version 2.3.0

## Verified counts

### Hungarian

- Total: **540**
- `easy`: 210
- `medium`: 200
- `hard`: 130
- Unique IDs: 540

### English

- Total: **900**
- `lowEnglish`: 180
- `easy`: 180
- `medium`: 180
- `challenging`: 180
- `hard`: 180
- Unique IDs: 900

Supported category identifiers are `draw`, `explain`, and `signal`. A task can be compatible with one or more categories.

## JSON structure

```json
{
  "metadata": {
    "version": "2.3.0",
    "language": "en",
    "totalWords": 900,
    "categories": ["draw", "explain", "signal"],
    "difficulties": ["lowEnglish", "easy", "medium", "challenging", "hard"],
    "lastUpdated": "2026-07-25"
  },
  "words": [
    {
      "id": "low-draw-001",
      "text": "apple",
      "categories": ["draw"],
      "difficulty": "lowEnglish",
      "length": 5,
      "tags": ["low-english", "draw"]
    }
  ]
}
```

## Runtime selection

`src/lib/game/wordPacks.ts`:

- selects the pack matching the frozen game language;
- filters by exact difficulty;
- filters by category compatibility;
- excludes task IDs already used in the current game;
- falls back to the full matching pool only when all matching IDs have been used;
- throws when no matching task exists.

Selection uses the shared randomization helper rather than `Array.sort(() => Math.random() - 0.5)`.

## Adding tasks

A new task must:

- have an ID unique within its language pack;
- use a difficulty declared in that pack's metadata;
- include at least one supported category;
- have localized, family-appropriate text;
- keep `length` consistent with the visible task text;
- update `metadata.totalWords` and `metadata.lastUpdated`;
- pass the word-pack and full project checks.

Run:

```bash
npm run test -- tests/lib/wordPacks.test.ts
npm run check
npm run test:e2e
```

Do not maintain hand-written distribution numbers in multiple documents. This file and each JSON pack's metadata are the human-readable references; the JSON arrays and tests are the final executable source of truth.
