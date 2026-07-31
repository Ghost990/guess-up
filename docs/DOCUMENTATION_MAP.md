# GuessUp documentation map

The repository contains current documentation and retained historical planning artifacts. Use this map to avoid implementing retired specifications.

## Active and authoritative

- `README.md` — product overview, setup, stack, commands
- `GAME_RULES.md` — canonical gameplay, scoring, timing, and persistence rules
- `GAME_READY.md` — current player/operator guide
- `PROJECT_STATUS.md` — verified implementation and known limitations
- `WORD_DATABASE_INFO.md` — current task-pack counts, schema, and contribution rules
- `AGENTS.md` — repository workflow and quality expectations
- `CLAUDE.md` — compact agent context
- `docs/ENGLISH_PROMPT_RESEARCH.md` — research constraints for the current English expansion

The tested code remains the final executable source of truth.

## Historical implementation records

The remaining root-level Markdown files document earlier research, architecture, design, roadmap, QA, and bug-fix phases. They are retained for rationale and archaeology, but may describe retired concepts such as:

- Next.js 14/15 setup
- WebSocket or server-authoritative multiplayer
- Shadcn/UI and Framer Motion plans
- automatic three-second reveal
- 10-point and speed-bonus scoring
- fixed 60-second rounds
- 180-task Hungarian-only packs
- unfinished component roadmaps
- old local paths, ports, and deployment commands

Do not treat these documents as current requirements. When a historical record conflicts with `GAME_RULES.md`, `PROJECT_STATUS.md`, or the tests, the current documents and tests win.

## Maintenance rule

Behavioral changes must update the relevant active document in the same change. Historical files should only be edited to correct their historical record or preserve a clear warning; they should not become parallel sources of current truth.
