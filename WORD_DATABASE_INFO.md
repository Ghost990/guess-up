# Hoppra! task-pack reference

The current game ships two large localized base libraries and six isolated theme sources.

Base libraries:

- `src/data/words-hu.json` — Hungarian, version 2.0.0
- `src/data/words-en.json` — English, version 2.3.0

Dedicated theme sources:

- `src/data/movies-hu.json`, `src/data/movies-en.json`
- `src/data/series-hu.json`, `src/data/series-en.json`
- `src/data/gaming-hu.json`, `src/data/gaming-en.json`

Each dedicated source is version 1.0.0 and contains 12 tasks: six `easy` and six `medium`.

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

### Dedicated themes

- Movies: 12 Hungarian + 12 English
- Series: 12 Hungarian + 12 English
- Gaming: 12 Hungarian + 12 English
- Additional isolated tasks: **72**
- Repository total: **1,512 records across eight JSON sources**

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

- resolves the selected immutable `packId` through the manifest registry;
- loads that manifest's registered base or isolated content source;
- verifies the source locale matches the frozen game language;
- filters by exact difficulty;
- filters by category compatibility;
- excludes task IDs already used in the current game;
- falls back to the full matching pool only when all matching IDs have been used;
- throws when no matching task exists.

Selection uses the shared randomization helper rather than `Array.sort(() => Math.random() - 0.5)`.

## Adding tasks

A new task must:

- have an ID unique within its JSON content source;
- use a difficulty declared in that pack's metadata;
- include at least one supported category;
- have localized, family-appropriate text;
- keep `length` consistent with the visible task text;
- update `metadata.totalWords` and `metadata.lastUpdated`;
- pass the word-pack and full project checks.

Run:

```bash
pnpm test -- tests/lib/wordPacks.test.ts
pnpm check
pnpm test:e2e
```

When adding a new content source, register it in `src/content/packs/contentSources.ts` and add a compatible versioned manifest under `src/content/packs/manifests`.

Do not maintain hand-written distribution numbers in multiple documents. This file and each JSON source's metadata are the human-readable references; the JSON arrays, registry, and tests are the final executable source of truth.
