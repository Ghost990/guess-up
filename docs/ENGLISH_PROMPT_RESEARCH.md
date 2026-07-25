# English prompt expansion research

## Goal

Expand the English `Challenging` and `Hard` tiers from 30 to 60 prompts per gameplay category (`draw`, `explain`, `signal`) without copying commercial card text.

## Reference patterns

These sources were used to understand difficulty patterns and category fit, not as text to reproduce:

- [Wargamer — Charades ideas](https://www.wargamer.com/charades-ideas): advanced charades work best as recognizable actions or multi-beat situations rather than obscure nouns.
- [Charades.app — Hard Charades ideas](https://charades.app/hard-charades-ideas): higher difficulty can come from processes, abstract ideas, and compound scenes, but prompts still need a visible acting path.
- [Parade — Pictionary words](https://parade.com/living/pictionary-words): difficult drawing prompts tend to be composite objects, systems, processes, or visual abstractions.
- [ESL Active — ESL Taboo words](https://eslactive.com/esl-taboo-words): explanation prompts should stay recognizable to intermediate/advanced English speakers and support multiple clue paths.
- [Hasbro — Taboo instructions](https://instructions.hasbro.com/en-ca/instruction/classic-taboo-game-word-guessing-game-for-adults-and-teens-13-and-up-board-game): reference for the general describe-without-saying-the-answer mechanic only; no proprietary card content was used.

## Authoring contract

- All added prompt text is newly authored for GuessUp.
- No brands, copyrighted characters/titles, commercial card copy, explicit material, or humiliating/sensitive prompts.
- `Challenging` prompts are familiar but require multiple visual or conceptual clues.
- `Hard` prompts are more abstract, nuanced, or multi-step while remaining fair in a 60-second party round.
- Every added prompt has a stable semantic ID, one gameplay category, a matching difficulty tag, and no case-insensitive text collision with the existing English deck.
- Target after expansion: 60 prompts for every `(Challenging|Hard) × (Draw|Explain|Act)` combination.
