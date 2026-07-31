# Hoppra Game Night Identity

## Design read

Hoppra is a mobile-first, single-device party game. The interface should feel like a physical game night laid out on a dark table, not a collection of themed dashboards.

Design dials:

- Variance: 7/10. Offset print composition and asymmetric physical objects, while gameplay remains immediately scannable.
- Motion: 5/10. Tactile state transitions and celebration only; no ambient animation that competes with the timer.
- Density: 6/10. Setup can feel like a packed game box. Active play keeps one dominant object and short supporting controls.

## Research synthesis

### Jackbox Party Pack art direction

Source: Jackbox Games, Behind the Scenes of Party Pack 10: Art Edition.

- Shared structure and general UI hold the pack together; individual art distinguishes games.
- The picker is the common place that introduces separate game identities.
- Visuals are tied to mechanics and provide structure, not decoration.
- Background detail must stay subordinate to action and accessibility.

### Exploding Kittens product language

Source: official Exploding Kittens storefront.

- A single black stage, condensed poster typography, cream controls, and blunt outlines unify wildly different products.
- Each game owns an illustration and local palette, but the surrounding frame remains recognizably the parent brand.
- Product packaging behaves like a physical object, not a generic web card.

## Core metaphor

Every Hoppra screen happens on the same table:

- Setup: open game box and rule sheet.
- Pack picker: stack of playable deck boxes.
- Handoff: private pass card.
- Reveal: task card pulled from the deck.
- Active play: tabletop timer, task ticket, and two physical action controls.
- Scoreboard: printed score sheet.
- Result: stamped score slip.
- Game over: winner poster plus collectible recap sheet.

## Global tokens

- Table: warm near-black felt.
- Paper: warm off-white with faint print texture.
- Ink: warm black.
- Parent accent: Hoppra coral.
- Supporting inks: cyan, yellow, mint.
- Pack accent: one local ink used only for edge stripes, stamps, shadows, and selected states.
- Category color: semantic cue, never a page background.

## Shape and material rules

- Paper objects: 2-3px ink border, 12-18px corner radius, hard offset shadow.
- Controls: 10px radius, 2px border, small tactile offset on active.
- Icon controls: square 48-64px targets.
- Pills: category and compact metadata only.
- No generic floating surface without a named physical role.
- No blur, glass, neon glow, or gradient mesh.

## Typography

- Display: Barlow Condensed, black and uppercase when the surface behaves like a poster, ticket, or score header.
- Body: Nunito Sans, high legibility and slightly friendly geometry.
- Timer and scores: tabular figures.
- Theme packs do not replace the type family. Arcade may use monospace only inside its task ink area.

## Theme boundary

The pack may change:

- accent ink;
- cover illustration;
- one edge/perforation motif;
- one small pattern;
- task-card stamp treatment.

The pack may not change:

- page background family;
- layout hierarchy;
- base card material;
- button system;
- scoreboard structure;
- display/body typography;
- Hoppra logo treatment.

## Accessibility and behavior

- One primary action per state.
- Minimum 44px touch targets; active gameplay controls are 58px or larger.
- AA contrast on paper and table surfaces.
- Category and result state never rely on color alone.
- Reveal and active prompt remain physically separate from their controls.
- Motion is 150-300ms, transform/opacity only, and reduced-motion safe.
- Long task text wraps; no semantic content is clipped or replaced by ellipsis.
