# Hoppra Glyphs

Hoppra Glyphs are the app's first-party icon family. They use small, flat party-print illustrations rather than a generic icon-library look.

## Visual contract

- **Canvas:** square `0 0 24 24` viewBox; use the `size` prop for both rendered dimensions.
- **Linework:** warm-black `#17130e`, rounded caps and joins, with a chunky `2.25` stroke.
- **Color:** one or two flat accents from the Hoppra palette—coral `#ef5d7a`, cyan `#6dc6dd`, yellow `#f5b642`, mint `#9fe870`, and paper `#fff8e8`. No gradients, emoji, or external artwork.
- **Construction:** simple hand-drawn-feeling geometric forms with a compact accent mark; glyphs should remain recognizable at 16px.

## Component contract

Import glyphs from `@/components/icons`. Every glyph accepts `size`, `className`, and standard SVG/ARIA props. Glyphs are decorative (`aria-hidden`) by default, but supplying `aria-label` promotes the SVG to an `img` role. Existing controls retain their accessible button labels; do not use a glyph as the only source of a control's name.

```tsx
import { HelpGlyph } from "@/components/icons";

<HelpGlyph aria-hidden="true" size={19} />
```

Add new glyphs to `HoppraGlyphs.tsx`, using `GlyphFrame` so their canvas, stroke treatment, and accessibility defaults remain consistent.
