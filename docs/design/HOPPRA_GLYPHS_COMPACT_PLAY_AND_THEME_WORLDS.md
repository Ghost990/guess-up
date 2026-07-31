# Hoppra glyphs, compact play, and theme worlds

## Product intent

Hoppra should look authored at every scale. Generic icon-library shapes, oversized gameplay help, and theme packs that only rename the same prompt pool all break that promise.

## Hoppra Glyph contract

- Custom inline SVG React components only; no external icon font or mixed icon families.
- A shared 24 x 24 coordinate system, chunky warm-black strokes, square/offset print details, and flat fills from the Hoppra palette.
- Glyphs remain simple at 18-24 px and may become more expressive at 32 px.
- Decorative glyphs are hidden from assistive technology. Icon-only controls always keep a localized accessible name.
- Domain glyphs should be recognizable without relying on emoji conventions.

## Compact gameplay prompt ticket

During the timer the countdown is the primary object. The prompt is memory support, not a second hero.

- Prompt text and reveal toggle share one compact horizontal row.
- The prompt card remains a separate live region from the button.
- The toggle is icon-only visually, at least 52 x 52 px, with a localized accessible name.
- The task is never revealed on pointer-down; only an explicit click/tap toggles it.
- Prompt text uses deterministic length buckets so longer phrases shrink rather than overflow or become clipped.
- Mobile geometry must prove the prompt content and touch target do not overlap.

## Silent contextual help

- Help is available only after the private task reveal and before the timer begins.
- The trigger is a single custom clue glyph with an accessible label.
- Help is entirely visual and offline. No speech synthesis, audio playback, or pronunciation control is allowed because nearby players could hear the answer.
- Reviewed Low English Hungarian glosses remain valid, alongside metadata clues.

## Theme worlds

Theme packs are real content boundaries, not decorative labels. Runtime selection must resolve the selected manifest's content source.

### Movie night

Flat cinema language: ticket notches, clapboard geometry, projector beam blocks, coral and yellow against warm black.

### Series night

Episode language: split frames, season tabs, remote-control rhythm, cyan and mint with serialized panel marks.

### Gaming night

Pixel language: hard grid alignment, stair-step silhouettes, 8-bit controller/D-pad forms, acid green and cyan. No rounded generic controller art.

Each theme requires:

- its own source-scoped HU and EN prompt pool;
- truthful coverage for every exposed difficulty/category combination;
- a stable theme taxonomy in the manifest;
- a bespoke PackScene cover identity;
- tests proving prompts cannot leak between themes.

## Recap poster

The PNG export should feel collectible rather than administrative:

- 1080 x 1350 party-print poster composition;
- oversized winner moment and custom trophy/ribbon geometry;
- asymmetric color blocks and offset print shadows;
- top-three hierarchy before secondary standings;
- compact stats, no dashboard metric-card grid;
- deterministic fitting for long names, ties, and 1-6 players;
- no gradients, emoji, or external assets.
