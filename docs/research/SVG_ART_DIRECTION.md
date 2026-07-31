# Hoppra SVG art direction: Party print kit

Pack art is a reusable inline-SVG language rather than a collection of image assets. It uses flat, original geometry: warm-black `#17130e` outlines at 3px, off-white paper fields, coral/cyan/yellow fills, and a mint accent reserved for Easy Energy. Slightly offset dark shapes provide a screen-print register effect without gradients or filters.

## Composition rules

- Build recognisable scenes from people, places, play objects, paths, cards, and diagrams — never generic decorative blobs.
- Keep people rounded and energetic, but use simple limbs and blocky clothes rather than cute character illustration.
- Use one large scene idea per card and leave enough off-white negative space for the pack title and copy.
- Do not put user-facing words, stock imagery, emoji, fonts, gradients, or icon-library glyphs in the SVG.

## Pack mapping

| `coverAsset` | Scene |
| --- | --- |
| `classic-hungarian-party` | Two players passing a play card in a burst of party shapes. |
| `challenge-hungarian-climb` | A stepped mountain/maze with a climber, summit flag, and diagram waypoint. |
| `classic-english-table` | A party table with food, bunting, and players on either side. |
| `easy-energy-english-city` | A friendly city route with signpost, buildings, object/sun marker, and a player. |

## Reuse API

`PackScene` accepts `coverAsset` plus `variant`: `cover`, `setup`, `handoff`, `reveal`, or `recap`. Variants retain the same scene but add a compact top-right hand-drawn motif, so future setup and result surfaces can stay recognisably Hoppra without duplicating illustration code.

Artwork is decorative by default (`aria-hidden="true"`, `focusable="false"`). When a scene conveys essential content, pass `decorative={false}` and a `title`; the SVG then exposes `role="img"` and an internal title.
