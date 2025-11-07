# GuessUp - Screen Designs

**Project**: GuessUp - Mobile-First Activity Party Game
**Designer Agent**: Complete Screen Layouts
**Date**: November 7, 2025
**Status**: Implementation-Ready Designs

---

## Design Principles

**Layout Strategy**:
1. **Mobile-First**: Optimized for 320px-600px width, portrait orientation
2. **Thumb-Friendly**: Primary actions in bottom 1/3 of screen
3. **Clear Hierarchy**: Game state always obvious at a glance
4. **Minimal UI**: Let content dominate, controls when needed
5. **Category-Coded**: Visual differentiation through colors
6. **Safe Areas**: Respect notches, home indicators, status bars

**Screen Dimensions**:
- **Small**: 320×568px (iPhone SE)
- **Medium**: 375×812px (iPhone 12-15 standard)
- **Large**: 414×896px (iPhone Plus, large Android)
- **Safe Area Insets**: Top 24px, Bottom 32px, Sides 16px

---

## Game Phase Overview

```
┌──────────────────────────────────────┐
│         Game Flow States             │
├──────────────────────────────────────┤
│                                      │
│  1. Home Screen                      │
│     ↓                                │
│  2. Player Setup (Add Players)       │
│     ↓                                │
│  3. Game Configuration               │
│     ↓                                │
│  4. Game Lobby (Waiting to Start)    │
│     ↓                                │
│  5. Role Assignment (Current Turn)   │
│     ↓                                │
│  6. Word Reveal (3 seconds)          │
│     ↓                                │
│  7. Game Board (Playing)             │
│     ├─ Drawer View                   │
│     ├─ Explainer View                │
│     ├─ Signer View                   │
│     └─ Guesser View                  │
│     ↓                                │
│  8. Round End (Scoring)              │
│     ↓                                │
│  9. Next Round or Game End           │
│     ↓                                │
│  10. Final Results (Winner)          │
│                                      │
└──────────────────────────────────────┘
```

---

## 1. Home Screen

### Layout Specification

**Purpose**: Welcome screen, brand identity, entry point

**Visual ASCII Representation** (375×812px):
```
┌─────────────────────────────────┐
│         [Status Bar]            │  ← 24px safe area
├─────────────────────────────────┤
│                                 │
│         ╔═══════════╗           │  ← Mesh gradient background
│         ║  GuessUp  ║           │     (Primary + Secondary colors)
│         ╚═══════════╝           │
│                                 │
│      Activity Party Game        │
│                                 │
│   ┌──────────────────────┐     │
│   │     🎮 Play Now      │     │  ← Primary CTA (56px height)
│   └──────────────────────┘     │
│                                 │
│   ┌──────────────────────┐     │
│   │   📖 How to Play     │     │  ← Secondary button
│   └──────────────────────┘     │
│                                 │
│   ┌──────────────────────┐     │
│   │     ⚙️ Settings      │     │  ← Tertiary button
│   └──────────────────────┘     │
│                                 │
│                                 │
│    🌙 Dark Mode Toggle          │  ← Small control
│                                 │
│         [Home Indicator]        │  ← 32px safe area
└─────────────────────────────────┘
```

### Component Breakdown

**Background**:
- Mesh gradient (--gradient-mesh-primary)
- Animated subtle movement (optional)
- Dark mode: Dark gradient with lighter accents

**Logo/Title**:
- Font: --font-display
- Size: --text-display-large (40-64px)
- Weight: --font-weight-extrabold
- Color: White with subtle shadow
- Position: Top 1/3 of screen

**Tagline**:
- Text: "Activity Party Game" or "Rajzolj, Magyarázz, Mutasd"
- Font: --font-body
- Size: --text-body-large
- Weight: --font-weight-regular
- Color: White 80% opacity
- Position: Below logo, centered

**Primary Button (Play Now)**:
- Size: Full width - 32px margins (311px on 375px screen)
- Height: --button-height-lg (56px)
- Background: White
- Text Color: --color-primary
- Border Radius: --radius-md
- Shadow: --shadow-lg
- Position: Center of screen
- Animation: Subtle pulse (optional)

**Secondary Button (How to Play)**:
- Size: Full width - 32px margins
- Height: --button-height-md (44px)
- Background: Transparent
- Border: 2px solid white
- Text Color: White
- Border Radius: --radius-md
- Position: Below primary button (16px gap)

**Tertiary Button (Settings)**:
- Size: Full width - 32px margins
- Height: --button-height-md (44px)
- Background: Transparent
- Border: 1px solid white 40% opacity
- Text Color: White
- Border Radius: --radius-md
- Position: Below secondary button (16px gap)

**Dark Mode Toggle**:
- Size: 48×28px toggle switch
- Position: Bottom left, 16px from edges
- Label: "Dark Mode" (12px font)

### Interaction States

**Primary Button**:
- Default: White background, shadow-lg
- Hover: Scale 1.02, shadow-xl
- Active: Scale 0.98, shadow-md
- Focus: 2px primary outline

**Secondary Button**:
- Default: Transparent, white border
- Hover: White 10% background
- Active: White 20% background
- Focus: 2px white outline

### Responsive Behavior

**Small (320px)**:
- Reduce logo size slightly (--text-display-medium)
- Reduce button padding (48px height)
- Tighter spacing (12px gaps)

**Large (414px+)**:
- Increase logo size (--text-display-large max)
- More spacious layout (24px gaps)

---

## 2. Player Setup Screen

### Layout Specification

**Purpose**: Add 2-8 players, assign names

**Visual ASCII Representation** (375×812px):
```
┌─────────────────────────────────┐
│  ← Back     Players    [2/8]    │  ← Header with count
├─────────────────────────────────┤
│                                 │
│   Add Player Names              │  ← Section heading
│   (2-8 players)                 │
│                                 │
│ ┌───────────────────────────┐   │
│ │ 1. [Anna____________]  × │   │  ← Player input + remove
│ └───────────────────────────┘   │
│                                 │
│ ┌───────────────────────────┐   │
│ │ 2. [Béla____________]  × │   │
│ └───────────────────────────┘   │
│                                 │
│ ┌───────────────────────────┐   │
│ │ 3. [________________]    │   │  ← Empty input
│ └───────────────────────────┘   │
│                                 │
│   ┌───────────────────────┐     │
│   │   + Add Player        │     │  ← Add button (enabled when <8)
│   └───────────────────────┘     │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│   ┌───────────────────────┐     │
│   │    Continue →         │     │  ← Primary CTA (enabled when ≥2)
│   └───────────────────────┘     │
│                                 │
└─────────────────────────────────┘
```

### Component Breakdown

**Header Bar**:
- Height: 56px
- Background: --color-surface
- Border Bottom: 1px --color-border
- Left: Back button (44×44px)
- Center: "Players" title (--text-heading-2)
- Right: Player count badge "[2/8]" (--color-primary)

**Section Heading**:
- Text: "Add Player Names"
- Font: --text-heading-3
- Color: --color-text-primary
- Margin: 24px top, 8px bottom

**Subheading**:
- Text: "(2-8 players)"
- Font: --text-body-small
- Color: --color-text-secondary
- Margin: 0 0 24px

**Player Input Row**:
- Container: Full width - 32px margins
- Height: 56px
- Background: --color-surface-elevated
- Border: 1px --color-border
- Border Radius: --radius-md
- Padding: 16px
- Gap between rows: 12px

**Player Number**:
- Text: "1.", "2.", etc.
- Font: --text-body-medium
- Weight: --font-weight-semibold
- Color: --color-text-secondary

**Input Field**:
- Font: --text-body-medium
- Color: --color-text-primary
- Placeholder: "Player name..."
- Border: None (contained in row)
- Max Length: 20 characters

**Remove Button (×)**:
- Size: 32×32px
- Background: Transparent
- Hover: --color-error-50
- Color: --color-error-500
- Position: Right side of row
- Visible only when ≥3 players

**Add Player Button**:
- Width: Full width - 32px margins
- Height: 48px
- Background: --color-surface-elevated
- Border: 2px dashed --color-primary
- Text: "+ Add Player"
- Color: --color-primary
- Enabled: When <8 players
- Disabled: Opacity 50%, not clickable

**Continue Button**:
- Width: Full width - 32px margins
- Height: 56px
- Background: --color-primary
- Text: "Continue →"
- Color: White
- Border Radius: --radius-md
- Position: Bottom 32px from screen edge (above safe area)
- Enabled: When ≥2 players
- Disabled: --color-neutral-300, not clickable

### Validation Rules

**Name Validation**:
- Minimum: 1 character
- Maximum: 20 characters
- Allowed: Letters, numbers, spaces, emojis
- No duplicates: Show error if name already exists

**Player Count**:
- Minimum: 2 players (Continue button enabled)
- Maximum: 8 players (Add button disabled)

**Error States**:
- Duplicate name: Red border on input, error message below
- Empty name on Continue: Shake animation, focus first empty input

### Responsive Behavior

**Small (320px)**:
- Reduce padding to 12px
- Input height 48px
- Font size --text-body-small

**Large (414px+)**:
- More spacious padding (20px)
- Input height 60px

---

## 3. Game Configuration Screen

### Layout Specification

**Purpose**: Set difficulty, round count, timer duration, categories

**Visual ASCII Representation** (375×812px):
```
┌─────────────────────────────────┐
│  ← Back   Game Settings         │  ← Header
├─────────────────────────────────┤
│                                 │
│   Difficulty Level              │  ← Section
│   ┌───┐  ┌───┐  ┌───┐          │
│   │ 😊│  │ 😐│  │ 😎│          │  ← Difficulty cards
│   │Easy│ │Med│ │Hard│          │
│   └───┘  └───┘  └───┘          │
│    ✓                            │  ← Selected indicator
│                                 │
│   Number of Rounds              │
│   ┌───────────────────────┐     │
│   │  [─────●─────]   8    │     │  ← Slider + value
│   └───────────────────────┘     │
│   3  4  5  6  7  8  9  10       │  ← Tick marks
│                                 │
│   Round Timer                   │
│   ┌───────────────────────┐     │
│   │  [───────●───]  60s   │     │  ← Slider + value
│   └───────────────────────┘     │
│   30s   45s   60s   90s   120s  │  ← Preset values
│                                 │
│   Categories                    │
│   ┌───────────────┐             │
│   │ 🎨 Draw    ✓ │             │  ← Category toggle
│   └───────────────┘             │
│   ┌───────────────┐             │
│   │ 💬 Explain  ✓ │             │
│   └───────────────┘             │
│   ┌───────────────┐             │
│   │ 👋 Signal   ✓ │             │
│   └───────────────┘             │
│                                 │
│   ┌───────────────────────┐     │
│   │   Start Game →        │     │  ← Primary CTA
│   └───────────────────────┘     │
│                                 │
└─────────────────────────────────┘
```

### Component Breakdown

**Difficulty Cards**:
- Layout: 3 columns, equal width
- Card Size: ~100px wide × 120px high
- Gap: 12px between cards
- Border: 2px solid --color-border
- Selected: Border --color-primary, background --color-primary-50
- Content:
  - Emoji (48px size) centered
  - Label text below (--text-label-large)
  - Checkmark (✓) if selected

**Difficulty Options**:
- Easy (😊): Shorter words, common vocabulary
- Medium (😐): Mixed difficulty, standard words
- Hard (😎): Longer words, complex concepts

**Round Count Slider**:
- Range: 3-10 rounds
- Default: 8 rounds
- Track: --color-neutral-200 background
- Fill: --color-primary (0% to current value)
- Thumb: 24×24px circle, --color-primary, --shadow-md
- Value Display: Large number (32px) on right side
- Tick Marks: Small circles below slider at each value

**Timer Slider**:
- Range: 30s - 120s
- Default: 60s
- Presets: 30s, 45s, 60s, 90s, 120s (snap points)
- Track: --color-neutral-200 background
- Fill: --color-secondary (0% to current value)
- Thumb: 24×24px circle, --color-secondary, --shadow-md
- Value Display: "60s" text (24px) on right side
- Labels: Preset values below slider

**Category Toggles**:
- Layout: 3 rows, full width
- Row Height: 56px
- Background: --color-surface-elevated
- Border: 1px --color-border
- Border Radius: --radius-md
- Gap: 8px between rows
- Content:
  - Left: Category emoji (24px)
  - Center: Category name (--text-body-medium)
  - Right: Checkmark (✓) if enabled
- Interaction:
  - Tap to toggle on/off
  - At least 1 category must be enabled
  - Disabled state: Opacity 50%, not clickable

**Category Colors**:
- Draw (🎨): --color-draw-500 accent
- Explain (💬): --color-explain-500 accent
- Signal (👋): --color-signal-500 accent

**Start Game Button**:
- Width: Full width - 32px margins
- Height: 56px
- Background: --gradient-success
- Text: "Start Game →"
- Color: White
- Border Radius: --radius-md
- Shadow: --shadow-lg
- Position: Bottom 32px from screen edge
- Animation: Subtle pulse when ready

### Validation Rules

**Difficulty**:
- Required: Must select one difficulty level
- Default: Medium

**Rounds**:
- Range: 3-10
- Default: 8
- Display: Always show current value

**Timer**:
- Range: 30s - 120s
- Default: 60s
- Snap to presets when close (±3s)

**Categories**:
- Minimum: 1 category must be enabled
- Default: All 3 enabled
- Warning: If only 1 category, show "Single category mode - less variety"

### Responsive Behavior

**Small (320px)**:
- Difficulty cards: 2 columns, scroll if needed
- Slider tracks: Full width - 24px margins
- Smaller font sizes

**Large (414px+)**:
- More spacious layout (24px gaps)
- Larger difficulty cards (120px wide)

---

## 4. Game Lobby Screen

### Layout Specification

**Purpose**: Waiting room before game starts, player list, final checks

**Visual ASCII Representation** (375×812px):
```
┌─────────────────────────────────┐
│  ← Exit      Lobby              │  ← Header
├─────────────────────────────────┤
│                                 │
│   Waiting to Start...           │  ← Status
│                                 │
│   Players Ready                 │  ← Section heading
│                                 │
│ ┌───────────────────────────┐   │
│ │  🙂 Anna            ✓     │   │  ← Player card with ready status
│ └───────────────────────────┘   │
│ ┌───────────────────────────┐   │
│ │  😊 Béla            ✓     │   │
│ └───────────────────────────┘   │
│ ┌───────────────────────────┐   │
│ │  🤔 Cili            ...   │   │  ← Not ready (waiting)
│ └───────────────────────────┘   │
│                                 │
│   Game Settings                 │
│   • Difficulty: Medium          │  ← Config summary
│   • Rounds: 8                   │
│   • Timer: 60s                  │
│   • Categories: Draw, Explain   │
│                                 │
│                                 │
│                                 │
│   ┌───────────────────────┐     │
│   │   I'm Ready! ✓        │     │  ← Ready button (toggle)
│   └───────────────────────┘     │
│                                 │
│   ┌───────────────────────┐     │
│   │   Start Game →        │     │  ← Start (host only, when all ready)
│   └───────────────────────┘     │
│                                 │
└─────────────────────────────────┘
```

### Component Breakdown

**Status Text**:
- Text: "Waiting to Start..." or "All Players Ready!"
- Font: --text-heading-3
- Color: --color-text-secondary (waiting) or --color-success (ready)
- Position: Top section, centered
- Animation: Pulsing dots for waiting state

**Player Cards**:
- Height: 64px per card
- Background: --color-surface-elevated
- Border: 1px --color-border
- Border Radius: --radius-md
- Padding: 16px
- Gap: 8px between cards
- Content:
  - Left: Avatar emoji (32px)
  - Center: Player name (--text-body-large, --font-weight-medium)
  - Right: Status indicator (✓ ready, ... waiting)

**Ready Status**:
- Ready: Green checkmark (✓), --color-success
- Waiting: Three dots (...), --color-text-tertiary, animated

**Game Settings Summary**:
- Section: "Game Settings" heading
- Background: --color-surface-elevated with --color-info-50 tint
- Border: 1px --color-info-200
- Border Radius: --radius-md
- Padding: 16px
- Content: Bulleted list, --text-body-small
- Icon: ⚙️ settings emoji

**Ready Button (Player)**:
- Width: Full width - 32px margins
- Height: 56px
- Background: --color-success (when ready) or --color-neutral-200 (not ready)
- Text: "I'm Ready! ✓" or "Mark as Ready"
- Color: White (ready) or --color-text-primary (not ready)
- Border Radius: --radius-md
- Toggle: Tap to ready/unready
- Animation: Scale pulse when tapped

**Start Game Button (Host)**:
- Width: Full width - 32px margins
- Height: 56px
- Background: --gradient-success
- Text: "Start Game →"
- Color: White
- Border Radius: --radius-md
- Shadow: --shadow-lg
- Enabled: Only when all players ready
- Disabled: --color-neutral-300, opacity 50%
- Visible: Only for game host

### WebSocket Real-Time Updates

**Player Join**:
- New player card animates in from bottom
- Other players see notification toast

**Player Ready**:
- Status indicator updates instantly
- Card border briefly flashes green
- Counter updates: "2/3 ready"

**Player Leave**:
- Card fades out and slides up
- Gap closes with animation
- Remaining players notified

**Settings Change** (Host):
- Summary updates in real-time
- Brief highlight animation

### Responsive Behavior

**Small (320px)**:
- Reduce player card height to 56px
- Smaller avatar (24px)
- Compact settings summary

**Large (414px+)**:
- Larger player cards (72px height)
- More spacious layout

---

## 5. Role Assignment Screen

### Layout Specification

**Purpose**: Show current turn, who is performing, who is guessing

**Visual ASCII Representation** (375×812px):
```
┌─────────────────────────────────┐
│         Round 3 of 8            │  ← Round indicator
├─────────────────────────────────┤
│                                 │
│                                 │
│        Current Turn             │  ← Heading
│                                 │
│     ┌───────────────────┐       │
│     │                   │       │
│     │   🎨 Draw         │       │  ← Category badge (large)
│     │                   │       │
│     └───────────────────┘       │
│                                 │
│        Anna's turn              │  ← Player name (large, bold)
│                                 │
│                                 │
│   Other Players:                │  ← Section
│   Béla, Cili, Dani              │  ← Comma-separated list
│   (Guessing)                    │
│                                 │
│                                 │
│                                 │
│                                 │
│   ┌───────────────────────┐     │
│   │  Get Ready! →         │     │  ← Continue button
│   └───────────────────────┘     │
│                                 │
│                                 │
└─────────────────────────────────┘
```

### Component Breakdown

**Round Indicator**:
- Text: "Round 3 of 8"
- Font: --text-heading-3
- Color: --color-text-secondary
- Position: Top center, 24px from top
- Background: --color-surface-elevated
- Padding: 8px 16px
- Border Radius: --radius-full (pill shape)

**Category Badge (Large)**:
- Size: 240px wide × 120px high (centered)
- Background: Category gradient (e.g., --gradient-draw)
- Border: 3px solid white
- Border Radius: --radius-xl
- Shadow: --shadow-xl, category-colored shadow
- Content:
  - Category emoji (64px)
  - Category name (--text-display-small, white, bold)
- Animation: Scale in with spring animation

**Player Name**:
- Text: "Anna's turn" or "It's your turn!"
- Font: --text-display-medium
- Weight: --font-weight-bold
- Color: --color-text-primary
- Position: Below badge, centered
- Animation: Fade in after badge

**Other Players Section**:
- Heading: "Other Players:"
- Font: --text-body-medium
- Color: --color-text-secondary
- List: Comma-separated player names
- Font: --text-body-large
- Color: --color-text-primary
- Subtext: "(Guessing)"
- Color: --color-text-tertiary

**Continue Button**:
- Width: Full width - 32px margins
- Height: 56px
- Background: Category color (e.g., --color-draw)
- Text: "Get Ready! →" or "Continue →"
- Color: White
- Border Radius: --radius-md
- Shadow: --shadow-lg
- Position: Bottom 32px from screen edge
- Animation: Pulse

**Alternative Text (Active Player)**:
- If current user is active player: "It's your turn!"
- If current user is guesser: "Watch Anna's turn"

### Timing

**Display Duration**: 3-5 seconds
- Auto-advance after 3 seconds OR
- Manual tap "Continue" button (immediate)
- Progress bar at bottom (optional)

### Responsive Behavior

**Small (320px)**:
- Category badge: 200px wide × 100px high
- Player name: --text-display-small
- Reduce spacing

**Large (414px+)**:
- Category badge: 280px wide × 140px high
- More spacious layout

---

## 6. Word Reveal Screen

### Layout Specification

**Purpose**: Show word to active player for 3 seconds, then hide

**Visual ASCII Representation** (375×812px):
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│                                 │
│      Your Word:                 │  ← Small heading
│                                 │
│    ╔═════════════════╗          │
│    ║                 ║          │
│    ║    KUTYA        ║          │  ← Word (huge, bold)
│    ║                 ║          │
│    ╚═════════════════╝          │
│                                 │
│                                 │
│       ⏱️ 3                      │  ← Countdown timer (large)
│                                 │
│                                 │
│    Remember this word!          │  ← Instruction text
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```

### Component Breakdown

**Background**:
- Full screen overlay
- Category-colored gradient (subtle, 10% opacity)
- Blur background content slightly (if visible)

**"Your Word:" Heading**:
- Text: "Your Word:" or "A Te Szavad:"
- Font: --text-heading-3
- Color: --color-text-secondary
- Position: Top 1/3 of screen, centered
- Animation: Fade in quickly

**Word Display**:
- Text: The revealed word (e.g., "KUTYA")
- Font: --font-display
- Size: --text-display-large (40-64px, responsive)
- Weight: --font-weight-extrabold
- Color: --color-text-primary
- Background: White card with category-colored border (4px)
- Padding: 32px 48px
- Border Radius: --radius-2xl
- Shadow: --shadow-2xl
- Position: Center of screen
- Animation:
  - Scale in with spring (0.8 → 1.0)
  - Fade in opacity (0 → 1)
  - Duration: 300ms

**Countdown Timer**:
- Display: Large number "3", "2", "1"
- Font: --font-mono
- Size: 72px
- Weight: --font-weight-bold
- Color: --color-primary
- Position: Below word card
- Animation:
  - Scale pulse on each second (1.0 → 1.2 → 1.0)
  - Color transition (green → yellow → red)
  - Duration: 1000ms per number

**Instruction Text**:
- Text: "Remember this word!" or "Jegyezd meg!"
- Font: --text-body-medium
- Color: --color-text-secondary
- Position: Below countdown
- Animation: Fade in after 500ms

**Auto-Dismiss**:
- After 3 seconds:
  - Fade out entire screen (300ms)
  - Transition to Game Board screen
- No manual dismiss option (prevents cheating)

### Security Considerations

**Prevent Screenshot**:
- CSS: `user-select: none;` on word text
- Meta tag: `<meta name="prevent-screenshot" content="true">` (iOS)
- Blur background and show overlay
- No context menu on long press

**Prevent Accidental Reveal**:
- Word disappears completely after 3s
- No way to navigate back to reveal
- Confirmation dialog if navigating away during reveal

### Responsive Behavior

**Small (320px)**:
- Word size: --text-display-medium (32-48px)
- Countdown: 56px
- Reduce padding on word card

**Large (414px+)**:
- Word size: --text-display-large max (64px)
- Countdown: 96px
- More spacious padding

---

## 7. Game Board Screen (Playing Phase)

### Overview

**Purpose**: Main gameplay screen with role-based views

**Shared Elements Across All Roles**:
1. Timer (circular countdown)
2. Category badge
3. Current player indicator
4. Score display (optional)
5. Pause button
6. Role-specific content area

### Common Layout Structure

```
┌─────────────────────────────────┐
│  ⏸️      [Timer]        [Score] │  ← Header with timer
│           ⏱️ 45s                │
│                                 │
│  ┌───────┐                      │
│  │🎨 Draw│  Anna's turn         │  ← Category + Player
│  └───────┘                      │
├─────────────────────────────────┤
│                                 │
│                                 │
│      [Role-Specific Content]    │  ← Changes by role
│      (Canvas / Text / Camera)   │
│                                 │
│                                 │
│                                 │
├─────────────────────────────────┤
│                                 │
│   [Action Buttons]              │  ← Role-specific controls
│   [Success / Fail / Pass]       │
│                                 │
└─────────────────────────────────┘
```

---

## 7a. Game Board - Drawer View

### Layout Specification

**Purpose**: Active player draws on canvas

**Visual ASCII Representation** (375×812px):
```
┌─────────────────────────────────┐
│ ⏸️    ⏱️ 45s         200 pts   │  ← Header
│                                 │
│ ┌───────┐                       │
│ │🎨 Draw│  Your turn            │  ← Category badge + status
│ └───────┘                       │
├─────────────────────────────────┤
│ ╔═══════════════════════════╗   │
│ ║                           ║   │
│ ║        Canvas             ║   │  ← Drawing canvas (full width)
│ ║      (Draw here!)         ║   │     White background
│ ║                           ║   │     Black ink by default
│ ║                           ║   │
│ ║                           ║   │
│ ╚═══════════════════════════╝   │
│                                 │
│ [●] [—] [◻️] [🗑️] [↶]         │  ← Drawing tools
│  Color Line Clear Undo          │
│                                 │
├─────────────────────────────────┤
│ ┌─────────────┐ ┌────────────┐  │
│ │✅ Got it!   │ │ ❌ Pass    │  │  ← Action buttons
│ └─────────────┘ └────────────┘  │
└─────────────────────────────────┘
```

### Component Breakdown

**Timer (Circular)**:
- Size: 80px diameter
- Position: Top center
- Stroke Width: 8px
- Colors:
  - >40s: --color-success (green)
  - 20-40s: --color-warning (yellow)
  - <20s: --color-error (red)
- Animation: Smooth countdown with stroke-dashoffset
- Inner Text: Seconds remaining (--text-display-small, --font-mono)

**Category Badge**:
- Background: --gradient-draw
- Text: "🎨 Draw"
- Size: Auto width, 36px height
- Position: Below timer, left aligned
- Border Radius: --radius-full
- Shadow: --shadow-draw

**Player Status**:
- Text: "Your turn" or "Anna's turn"
- Font: --text-body-medium
- Color: --color-text-secondary
- Position: Next to category badge

**Canvas**:
- Size: Full width - 32px margins, aspect ratio ~4:3
- Height: ~400px on 375px screen
- Background: White (always, for contrast)
- Border: 2px solid --color-neutral-200
- Border Radius: --radius-lg
- Touch Events:
  - touchstart, touchmove, touchend
  - Prevent scroll while drawing
  - Smooth line drawing (120fps target)

**Drawing Tools Row**:
- Height: 56px
- Background: --color-surface-elevated
- Border: 1px solid --color-border
- Border Radius: --radius-md
- Padding: 8px
- Position: Below canvas, 16px gap
- Tools:
  - **Color Picker** (●): Tap to open color palette overlay
  - **Line Width** (—): Tap to toggle thin/medium/thick
  - **Eraser** (◻️): Toggle eraser mode
  - **Clear** (🗑️): Clear entire canvas (with confirmation)
  - **Undo** (↶): Undo last stroke

**Tool Icons**:
- Size: 44×44px each (touch target)
- Icon Size: 24px
- Color: --color-text-primary
- Active State: --color-primary background, white icon
- Spacing: 4px gap between tools

**Action Buttons** (Bottom):
- Layout: 2 columns, equal width
- Gap: 12px
- Height: 56px each

**"Got it!" Button** (Success):
- Background: --color-success
- Text: "✅ Got it!"
- Color: White
- Width: ~48% of screen width
- Purpose: Player successfully guessed

**"Pass" Button**:
- Background: --color-error
- Text: "❌ Pass"
- Color: White
- Width: ~48% of screen width
- Purpose: Skip this word, no points

### Interaction Patterns

**Drawing**:
- Touch and drag to draw
- Smooth lines with line interpolation
- Variable line width based on speed (optional)
- Prevent accidental zooms/scrolls

**Tool Switching**:
- Tap tool to activate
- Visual feedback (highlight active tool)
- Haptic feedback (optional)

**Success Flow**:
- Tap "Got it!" → Show success animation → End round
- Award points to all players

**Pass Flow**:
- Tap "Pass" → Confirmation dialog "Skip this word?" → End round
- No points awarded

### Responsive Behavior

**Small (320px)**:
- Canvas height: ~340px
- Tool icons: 40×40px
- Reduce button padding

**Large (414px+)**:
- Canvas height: ~480px
- Larger tool icons (48×48px)
- More spacious layout

---

## 7b. Game Board - Explainer View

### Layout Specification

**Purpose**: Active player explains word verbally or with text

**Visual ASCII Representation** (375×812px):
```
┌─────────────────────────────────┐
│ ⏸️    ⏱️ 45s         200 pts   │  ← Header
│                                 │
│ ┌─────────┐                     │
│ │💬 Explain│  Your turn          │  ← Category badge
│ └─────────┘                     │
├─────────────────────────────────┤
│                                 │
│    Explain the word without     │  ← Instructions
│    saying it directly!          │
│                                 │
│ ╔═══════════════════════════╗   │
│ ║                           ║   │
│ ║   [Optional Text Area]    ║   │  ← Optional hint text area
│ ║   Type hints if needed... ║   │     (for accessibility)
│ ║                           ║   │
│ ╚═══════════════════════════╝   │
│                                 │
│                                 │
│    💡 Tip: Describe,           │  ← Helpful tips
│       don't say the word!       │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
├─────────────────────────────────┤
│ ┌─────────────┐ ┌────────────┐  │
│ │✅ Got it!   │ │ ❌ Pass    │  │  ← Action buttons
│ └─────────────┘ └────────────┘  │
└─────────────────────────────────┘
```

### Component Breakdown

**Category Badge**:
- Background: --gradient-explain
- Text: "💬 Explain"
- Shadow: --shadow-explain

**Instructions**:
- Text: "Explain the word without saying it directly!"
- Font: --text-heading-3
- Color: --color-text-primary
- Position: Top section, centered
- Padding: 24px

**Optional Text Area** (Accessibility Feature):
- Purpose: For hearing-impaired players or quiet environments
- Size: Full width - 32px margins, 200px height
- Background: --color-surface-elevated
- Border: 2px dashed --color-explain
- Border Radius: --radius-lg
- Placeholder: "Type hints if needed (optional)..."
- Font: --text-body-large
- Max Length: 200 characters
- Real-time sync: Other players see hints as they're typed

**Tips Section**:
- Icon: 💡 emoji
- Text: "Tip: Describe, don't say the word!"
- Font: --text-body-small
- Color: --color-text-secondary
- Background: --color-info-50
- Padding: 12px 16px
- Border Radius: --radius-md
- Position: Below text area

**Action Buttons**:
- Same as Drawer View
- "Got it!" (success): Award points
- "Pass": Skip, no points

### Alternative: Voice Indicator

**Voice Activity Indicator** (Optional):
- Visual: Animated waveform or pulsing circle
- Position: Center of screen
- Purpose: Show that player is speaking (audio level detection)
- Color: --gradient-explain
- Animation: Pulse with audio amplitude

### Responsive Behavior

**Small (320px)**:
- Reduce text area height to 160px
- Smaller font sizes

**Large (414px+)**:
- Larger text area (240px height)
- More spacious layout

---

## 7c. Game Board - Signer View

### Layout Specification

**Purpose**: Active player signals with gestures/pantomime

**Visual ASCII Representation** (375×812px):
```
┌─────────────────────────────────┐
│ ⏸️    ⏱️ 45s         200 pts   │  ← Header
│                                 │
│ ┌─────────┐                     │
│ │👋 Signal│  Your turn          │  ← Category badge
│ └─────────┘                     │
├─────────────────────────────────┤
│                                 │
│    Use gestures and body        │  ← Instructions
│    language to signal!          │
│                                 │
│ ╔═══════════════════════════╗   │
│ ║                           ║   │
│ ║   [Camera Preview]        ║   │  ← Optional camera (Phase 2)
│ ║   or                      ║   │     OR
│ ║   [Gesture Illustration]  ║   │     Illustration placeholder
│ ║                           ║   │
│ ╚═══════════════════════════╝   │
│                                 │
│                                 │
│    💡 Tip: No sounds,          │  ← Helpful tips
│       only movements!           │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
├─────────────────────────────────┤
│ ┌─────────────┐ ┌────────────┐  │
│ │✅ Got it!   │ │ ❌ Pass    │  │  ← Action buttons
│ └─────────────┘ └────────────┘  │
└─────────────────────────────────┘
```

### Component Breakdown

**Category Badge**:
- Background: --gradient-signal
- Text: "👋 Signal"
- Shadow: --shadow-signal

**Instructions**:
- Text: "Use gestures and body language to signal!"
- Font: --text-heading-3
- Color: --color-text-primary
- Position: Top section, centered
- Padding: 24px

**Camera Preview (Phase 2 Feature)**:
- Size: Full width - 32px margins, 16:9 aspect ratio
- Height: ~280px on 375px screen
- Background: Black (camera off) or live video feed
- Border: 2px solid --color-signal
- Border Radius: --radius-lg
- Controls:
  - Camera toggle (front/back)
  - Camera on/off toggle
- Purpose: Optional visual aid for remote play

**Gesture Illustration (MVP)**:
- Size: Same as camera preview area
- Background: --color-signal-50
- Border: 2px dashed --color-signal
- Border Radius: --radius-lg
- Content:
  - Icon: 🤸 or 👋 emoji (large, 96px)
  - Text: "Show gestures to other players"
- Purpose: Placeholder for camera feature

**Tips Section**:
- Icon: 💡 emoji
- Text: "Tip: No sounds, only movements!"
- Font: --text-body-small
- Color: --color-text-secondary
- Background: --color-warning-50
- Padding: 12px 16px
- Border Radius: --radius-md
- Position: Below camera/illustration area

**Action Buttons**:
- Same as Drawer and Explainer views
- "Got it!" (success): Award points
- "Pass": Skip, no points

### Camera Feature (Phase 2)

**Camera Permissions**:
- Request camera permission on first use
- Show permission denied state if declined
- Fallback: Gesture illustration (no camera needed)

**Camera UI**:
- Toggle button: Switch front/back camera (44×44px, top right)
- On/Off button: Disable camera (44×44px, top left)
- Privacy: No recording, live feed only

### Responsive Behavior

**Small (320px)**:
- Camera/illustration area: ~240px height
- Smaller font sizes

**Large (414px+)**:
- Camera/illustration area: ~340px height
- More spacious layout

---

## 7d. Game Board - Guesser View

### Layout Specification

**Purpose**: Other players watch and guess

**Visual ASCII Representation** (375×812px):
```
┌─────────────────────────────────┐
│ ⏸️    ⏱️ 45s         200 pts   │  ← Header
│                                 │
│ ┌───────┐                       │
│ │🎨 Draw│  Anna is drawing...   │  ← Category badge + status
│ └───────┘                       │
├─────────────────────────────────┤
│                                 │
│    Watch and guess!             │  ← Instructions
│                                 │
│ ╔═══════════════════════════╗   │
│ ║                           ║   │
│ ║   [Canvas / Text / Video] ║   │  ← Mirrored content from active player
│ ║   (Synchronized in         ║   │     Canvas strokes (Draw)
│ ║    real-time)             ║   │     Typed hints (Explain)
│ ║                           ║   │     Video feed (Signal - Phase 2)
│ ║                           ║   │
│ ╚═══════════════════════════╝   │
│                                 │
│ ┌────────────────────────────┐  │
│ │ [Type your guess...     ]  │  │  ← Guess input field
│ └────────────────────────────┘  │
│                                 │
│    Your guesses:                │  ← Previous guesses
│    • macska ❌                  │     (wrong guesses shown)
│    • kutya ❌                   │
│                                 │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │   Submit Guess →            │ │  ← Submit button
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### Component Breakdown

**Category Badge**:
- Background: Category gradient (matches active player's category)
- Text: "🎨 Draw" / "💬 Explain" / "👋 Signal"
- Shadow: Category-colored shadow

**Status Text**:
- Text: "Anna is drawing..." / "Béla is explaining..." / "Cili is signaling..."
- Font: --text-body-medium
- Color: --color-text-secondary
- Position: Next to category badge

**Instructions**:
- Text: "Watch and guess!"
- Font: --text-heading-3
- Color: --color-text-primary
- Position: Top section, centered

**Synchronized Content Area**:
- Size: Same as active player's content area
- Purpose: Real-time mirror of active player's actions
- Content Type:
  - **Draw**: Canvas with strokes (WebSocket synced)
  - **Explain**: Typed hints (if any)
  - **Signal**: Video feed (Phase 2) or placeholder
- Background: White (for canvas) or --color-surface-elevated
- Border: 2px solid --color-border
- Border Radius: --radius-lg

**Guess Input Field**:
- Width: Full width - 32px margins
- Height: 56px
- Background: --color-surface-elevated
- Border: 2px solid --color-border
- Border Radius: --radius-md
- Placeholder: "Type your guess..."
- Font: --text-body-large
- Max Length: 50 characters
- Auto-focus: Yes (when screen loads)
- Enter Key: Submit guess

**Previous Guesses List**:
- Heading: "Your guesses:"
- Font: --text-body-small, --color-text-secondary
- List Items:
  - Wrong guess: "• macska ❌" (--color-error)
  - Correct guess: "• kutya ✅" (--color-success)
- Max Displayed: 5 most recent guesses
- Animation: New guess slides in from bottom

**Submit Button**:
- Width: Full width - 32px margins
- Height: 56px
- Background: --color-primary
- Text: "Submit Guess →"
- Color: White
- Border Radius: --radius-md
- Enabled: When input has text
- Disabled: When input is empty or submitting

### Guess Validation

**Client-Side**:
- Trim whitespace
- Convert to lowercase
- Minimum 1 character

**Server-Side**:
- Check against correct word (case-insensitive)
- Check against previous guesses (prevent duplicates)
- Award points if correct
- Send feedback to all players

**Feedback**:
- Correct guess:
  - Confetti animation
  - Success message: "You got it! 🎉"
  - End round immediately
- Wrong guess:
  - Shake animation on input field
  - Add to previous guesses list with ❌
  - Clear input field
  - Haptic feedback (vibration)

### Real-Time Synchronization

**Canvas Drawing (Draw Category)**:
- WebSocket events: `stroke_start`, `stroke_move`, `stroke_end`
- Smooth line rendering on guesser's canvas
- Latency target: <100ms

**Text Hints (Explain Category)**:
- WebSocket event: `hint_update`
- Show typed text in real-time
- Debounce: 100ms

**Video Feed (Signal Category - Phase 2)**:
- WebRTC peer-to-peer connection
- Fallback: WebSocket screenshot stream (1fps)

### Responsive Behavior

**Small (320px)**:
- Content area: ~300px height
- Input field: 48px height
- Reduce padding

**Large (414px+)**:
- Content area: ~400px height
- Input field: 60px height
- More spacious layout

---

## 8. Round End Screen

### Layout Specification

**Purpose**: Show round results, points awarded, next player preview

**Visual ASCII Representation** (375×812px):
```
┌─────────────────────────────────┐
│        Round 3 Complete         │  ← Header
├─────────────────────────────────┤
│                                 │
│         ✅ Success!             │  ← Result status (success or fail)
│                                 │
│    The word was: KUTYA          │  ← Word reveal
│                                 │
│ ┌───────────────────────────┐   │
│ │  Points Awarded           │   │
│ │                           │   │
│ │  🙂 Anna       +10 pts    │   │  ← Player scores (who guessed correctly)
│ │  😊 Béla       +10 pts    │   │
│ │  🤔 Cili       +0 pts     │   │  ← (didn't guess in time)
│ │                           │   │
│ └───────────────────────────┘   │
│                                 │
│    Current Standings            │  ← Leaderboard
│                                 │
│ ┌───────────────────────────┐   │
│ │  1. 😊 Béla      30 pts   │   │
│ │  2. 🙂 Anna      20 pts   │   │
│ │  3. 🤔 Cili      10 pts   │   │
│ └───────────────────────────┘   │
│                                 │
│    Next: Béla's turn (Draw)     │  ← Next player preview
│                                 │
│ ┌─────────────────────────────┐ │
│ │   Continue to Round 4 →     │ │  ← Continue button
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

### Component Breakdown

**Round Complete Header**:
- Text: "Round 3 Complete" or "Round 3 of 8"
- Font: --text-heading-2
- Color: --color-text-primary
- Position: Top center, 24px from top
- Background: --color-surface-elevated
- Padding: 12px 24px
- Border Radius: --radius-full

**Result Status**:
- Success: "✅ Success!" (--color-success)
- Pass/Fail: "❌ No guesses" (--color-error)
- Timeout: "⏱️ Time's up!" (--color-warning)
- Font: --text-display-small
- Weight: --font-weight-bold
- Position: Top section, centered
- Animation: Scale in with spring

**Word Reveal**:
- Text: "The word was: KUTYA"
- Font: --text-heading-2
- Color: --color-text-primary
- Position: Below status
- Emphasis: Word in bold or different color (category color)

**Points Awarded Card**:
- Background: --color-surface-elevated
- Border: 1px solid --color-border
- Border Radius: --radius-lg
- Padding: 24px
- Heading: "Points Awarded" (--text-heading-3)

**Player Score Rows**:
- Layout: List of players with points
- Row Height: 48px per player
- Content:
  - Left: Player emoji + name
  - Right: "+10 pts" (--color-success) or "+0 pts" (--color-text-tertiary)
- Font: --text-body-large
- Animation: Count up animation for points (0 → 10)

**Current Standings Card**:
- Background: --color-surface-elevated
- Border: 1px solid --color-border
- Border Radius: --radius-lg
- Padding: 24px
- Heading: "Current Standings" (--text-heading-3)

**Leaderboard Rows**:
- Layout: Ranked list (1st, 2nd, 3rd...)
- Row Height: 56px per player
- Content:
  - Left: Rank number, player emoji + name
  - Right: Total points
- 1st Place: Gold background (--color-warning-50), bold
- 2nd Place: Silver background (--color-neutral-100)
- 3rd Place: Bronze background (--color-neutral-50)
- Font: --text-body-large

**Next Player Preview**:
- Text: "Next: Béla's turn (Draw)"
- Font: --text-body-medium
- Color: --color-text-secondary
- Position: Below leaderboard
- Icon: Small category badge (🎨/💬/👋)

**Continue Button**:
- Width: Full width - 32px margins
- Height: 56px
- Background: --gradient-success
- Text: "Continue to Round 4 →" or "Next Round →"
- Color: White
- Border Radius: --radius-md
- Shadow: --shadow-lg
- Position: Bottom 32px from screen edge
- Animation: Pulse

**Auto-Continue** (Optional):
- Progress bar at bottom (5 seconds)
- Auto-advance to next round after 5s
- Tap "Continue" to skip wait

### Alternative: Pass/Fail Variation

**If Round Failed (No Guesses)**:
- Status: "❌ No guesses" (--color-error)
- Points: All players "+0 pts"
- Message: "Better luck next time!"

**If Round Timeout**:
- Status: "⏱️ Time's up!" (--color-warning)
- Points: Only players who guessed before timeout
- Message: "Close one!"

### Confetti Animation (Success)

**On Success**:
- Confetti explosion from top of screen
- Colors: Category colors + gold
- Duration: 2 seconds
- Library: react-confetti or custom canvas animation

### Responsive Behavior

**Small (320px)**:
- Reduce card padding (16px)
- Smaller fonts (--text-body-medium)
- Compact spacing

**Large (414px+)**:
- Larger cards with more padding (32px)
- More spacious layout

---

## 9. Game End Screen

### Layout Specification

**Purpose**: Final results, winner announcement, play again

**Visual ASCII Representation** (375×812px):
```
┌─────────────────────────────────┐
│        Game Complete!           │  ← Header
├─────────────────────────────────┤
│                                 │
│        🏆 Winner 🏆            │  ← Trophy animation
│                                 │
│         😊 Béla                │  ← Winner name (large)
│         30 Points               │
│                                 │
│    Final Standings              │  ← Section heading
│                                 │
│ ┌───────────────────────────┐   │
│ │ 🥇 1. Béla      30 pts    │   │  ← 1st place (gold)
│ │ 🥈 2. Anna      20 pts    │   │  ← 2nd place (silver)
│ │ 🥉 3. Cili      10 pts    │   │  ← 3rd place (bronze)
│ │    4. Dani      5 pts     │   │  ← Others
│ └───────────────────────────┘   │
│                                 │
│    Game Statistics              │  ← Stats section
│    • 8 rounds played            │
│    • 6 correct guesses          │
│    • 2 passes                   │
│    • Avg time: 42s              │
│                                 │
│ ┌─────────────────────────────┐ │
│ │   🔄 Play Again             │ │  ← Primary CTA
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │   🏠 Back to Home           │ │  ← Secondary button
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

### Component Breakdown

**Game Complete Header**:
- Text: "Game Complete!" or "Játék vége!"
- Font: --text-display-small
- Weight: --font-weight-bold
- Color: --color-text-primary
- Position: Top center
- Animation: Fade in with scale

**Winner Section**:
- Trophy Emoji: 🏆 (large, 96px)
- Animation: Rotate and scale in
- Winner Name: Player emoji + name (--text-display-medium)
- Points: Total points (--text-heading-2, --color-primary)
- Background: --gradient-mesh-primary (subtle, 20% opacity)
- Confetti: Full screen celebration animation

**Final Standings Card**:
- Background: White (light mode) or --color-surface (dark mode)
- Border: 1px solid --color-border
- Border Radius: --radius-xl
- Padding: 24px
- Shadow: --shadow-lg
- Heading: "Final Standings" (--text-heading-3)

**Podium Rows**:
- **1st Place** (Gold):
  - Icon: 🥇
  - Background: Linear gradient (gold shimmer)
  - Font Weight: --font-weight-bold
  - Font Size: --text-body-large
  - Height: 64px
- **2nd Place** (Silver):
  - Icon: 🥈
  - Background: --color-neutral-100
  - Font Size: --text-body-large
  - Height: 56px
- **3rd Place** (Bronze):
  - Icon: 🥉
  - Background: --color-warning-50
  - Font Size: --text-body-large
  - Height: 56px
- **Other Places**:
  - No icon (just number)
  - Background: --color-surface-elevated
  - Font Size: --text-body-medium
  - Height: 48px

**Game Statistics Card**:
- Background: --color-info-50
- Border: 1px solid --color-info-200
- Border Radius: --radius-md
- Padding: 16px
- Heading: "Game Statistics" (--text-body-medium, --font-weight-semibold)
- Stats: Bulleted list
  - Rounds played
  - Correct guesses
  - Passes/Fails
  - Average round time
- Font: --text-body-small
- Color: --color-text-secondary

**Play Again Button**:
- Width: Full width - 32px margins
- Height: 56px
- Background: --gradient-success
- Text: "🔄 Play Again"
- Color: White
- Border Radius: --radius-md
- Shadow: --shadow-lg
- Position: Bottom section (above "Back to Home")
- Animation: Pulse

**Back to Home Button**:
- Width: Full width - 32px margins
- Height: 48px
- Background: Transparent
- Border: 1px solid --color-border
- Text: "🏠 Back to Home"
- Color: --color-text-primary
- Border Radius: --radius-md
- Position: Below "Play Again" (12px gap)

**Confetti Celebration**:
- Duration: 3 seconds
- Colors: Gold, silver, bronze, primary colors
- Intensity: Heavy (winner celebration)
- Library: react-confetti
- Trigger: On screen load

### Share Feature (Optional Phase 2)

**Share Button**:
- Position: Top right corner
- Icon: 📤 share icon
- Size: 44×44px
- Purpose: Share results on social media
- Text: "Share Results"

**Share Content**:
- Image: Screenshot of podium
- Text: "I won GuessUp with 30 points! 🏆"
- URL: Game invitation link

### Play Again Flow

**On "Play Again" Tap**:
1. Confirmation: "Start a new game with same players?"
2. Options:
   - "Yes, same settings" → Reset scores, go to Game Configuration
   - "Yes, new settings" → Go to Player Setup
   - "Cancel" → Stay on results

### Responsive Behavior

**Small (320px)**:
- Reduce trophy size (72px)
- Compact podium rows (48px height for 1st)
- Smaller fonts

**Large (414px+)**:
- Larger trophy (120px)
- More spacious podium (72px height for 1st)
- Larger fonts

---

## 10. Pause Menu / Settings Overlay

### Layout Specification

**Purpose**: Pause game, adjust settings, quit

**Visual ASCII Representation** (375×812px):
```
┌─────────────────────────────────┐
│                                 │
│        [Dimmed Background]      │  ← Backdrop blur
│                                 │
│ ┌───────────────────────────┐   │
│ │         ⏸️ Paused         │   │  ← Modal header
│ │           X               │   │  ← Close button
│ ├───────────────────────────┤   │
│ │                           │   │
│ │   ┌───────────────────┐   │   │
│ │   │  Resume Game →    │   │   │  ← Primary action
│ │   └───────────────────┘   │   │
│ │                           │   │
│ │   ┌───────────────────┐   │   │
│ │   │  ⚙️ Settings      │   │   │  ← Secondary actions
│ │   └───────────────────┘   │   │
│ │                           │   │
│ │   ┌───────────────────┐   │   │
│ │   │  📖 How to Play   │   │   │
│ │   └───────────────────┘   │   │
│ │                           │   │
│ │   ┌───────────────────┐   │   │
│ │   │  🏠 Quit Game     │   │   │  ← Destructive action
│ │   └───────────────────┘   │   │
│ │                           │   │
│ └───────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

### Component Breakdown

**Backdrop**:
- Full screen overlay
- Background: rgba(0, 0, 0, 0.5) (dark overlay)
- Backdrop Filter: blur(8px)
- Animation: Fade in (200ms)

**Modal Container**:
- Width: 90% of screen width (max 400px)
- Background: var(--glass-background)
- Border: 1px solid var(--glass-border)
- Border Radius: --radius-2xl
- Shadow: --shadow-2xl
- Backdrop Filter: --glass-blur
- Position: Center of screen
- Animation: Scale in with spring (0.9 → 1.0)

**Modal Header**:
- Text: "⏸️ Paused" or "Szünet"
- Font: --text-heading-2
- Color: --color-text-primary
- Padding: 24px
- Border Bottom: 1px solid --color-border
- Close Button: X (top right, 44×44px)

**Resume Button**:
- Width: Full width - 48px margins
- Height: 56px
- Background: --color-primary
- Text: "Resume Game →"
- Color: White
- Border Radius: --radius-md
- Margin: 24px 24px 12px

**Settings Button**:
- Width: Full width - 48px margins
- Height: 48px
- Background: Transparent
- Border: 1px solid --color-border
- Text: "⚙️ Settings"
- Color: --color-text-primary
- Border Radius: --radius-md
- Margin: 12px 24px

**How to Play Button**:
- Width: Full width - 48px margins
- Height: 48px
- Background: Transparent
- Border: 1px solid --color-border
- Text: "📖 How to Play"
- Color: --color-text-primary
- Border Radius: --radius-md
- Margin: 12px 24px

**Quit Button**:
- Width: Full width - 48px margins
- Height: 48px
- Background: Transparent
- Border: 1px solid --color-error
- Text: "🏠 Quit Game"
- Color: --color-error
- Border Radius: --radius-md
- Margin: 12px 24px 24px
- Confirmation: "Are you sure? Game will end."

### Interaction

**Open Pause Menu**:
- Trigger: Tap ⏸️ button on Game Board
- Action: Pause game timer, show modal

**Resume**:
- Trigger: Tap "Resume Game" or close button (X)
- Action: Unpause timer, close modal

**Settings**:
- Trigger: Tap "⚙️ Settings"
- Action: Open settings screen (sound, dark mode, language)

**How to Play**:
- Trigger: Tap "📖 How to Play"
- Action: Open rules/instructions screen

**Quit**:
- Trigger: Tap "🏠 Quit Game"
- Action: Show confirmation dialog
- Confirmation: "Are you sure? Game will end."
- Yes: End game, go to Home screen
- No: Close confirmation, return to pause menu

### Responsive Behavior

**Small (320px)**:
- Modal width: 95% of screen
- Reduce padding (16px)
- Smaller fonts

**Large (414px+)**:
- Modal width: 85% of screen (max 450px)
- More spacious padding (32px)

---

## Screen Design Complete

**Status**: ✅ All Screens Designed

**Deliverables**:
- 10 complete screen layouts with ASCII art representations
- Component breakdowns for every screen element
- Interaction patterns and states
- Role-based variations (Drawer, Explainer, Signer, Guesser)
- Responsive behavior specifications
- Animation and timing details
- WebSocket synchronization patterns
- Accessibility considerations

**Screen Count**: 10 primary screens + 4 role variations = 14 total screen designs

**Next**: Create COMPONENT_SPECIFICATIONS.md with detailed Shadcn component specs and variants.

---

**Designer Agent**: Screen Designs Complete
**Date**: November 7, 2025
**Ready for**: Component Specification Phase
