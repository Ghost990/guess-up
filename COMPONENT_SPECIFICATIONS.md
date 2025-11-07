# GuessUp - Component Specifications

**Project**: GuessUp - Mobile-First Activity Party Game
**Designer Agent**: Complete Component Library
**Date**: November 7, 2025
**Status**: Implementation-Ready Shadcn Components

---

## Component Library Overview

**Total Components**: 27 components
- **UI Components** (15): Button, Card, Badge, Input, Timer, etc.
- **Game Components** (12): GameBoard, WordReveal, PlayerCard, etc.

**Shadcn Base Components Used**:
- Button, Card, Badge, Input, Dialog, Tabs, Avatar, Separator, Progress, Slider, Select

**Custom Components**:
- Timer (circular countdown), WordReveal, Canvas, GameBoard, ScoreDisplay

---

## UI Components (Shadcn-Based)

### 1. Button Component

**Purpose**: All interactive buttons throughout the app

#### Variants

**Primary** (Default):
```tsx
<Button variant="primary" size="lg">
  Play Now
</Button>
```
- Background: --color-primary
- Text: White
- Height: 56px (lg), 48px (md), 40px (sm)
- Border Radius: --radius-md
- Shadow: --shadow-sm
- Hover: --color-primary-600, --shadow-md, translateY(-1px)
- Active: --color-primary-700, --shadow-sm, translateY(0)
- Focus: 2px outline --color-primary-500, 2px offset

**Secondary**:
```tsx
<Button variant="secondary" size="md">
  How to Play
</Button>
```
- Background: Transparent
- Border: 2px solid --color-border
- Text: --color-text-primary
- Hover: Background --color-neutral-50, border --color-primary
- Active: Background --color-neutral-100

**Outline**:
```tsx
<Button variant="outline" size="md">
  Settings
</Button>
```
- Background: Transparent
- Border: 1px solid --color-border
- Text: --color-text-primary
- Hover: Background --color-neutral-50
- Active: Background --color-neutral-100

**Success**:
```tsx
<Button variant="success" size="lg">
  ✅ Got it!
</Button>
```
- Background: --color-success
- Text: White
- Shadow: --shadow-sm
- Hover: --color-success-600
- Active: --color-success-700

**Destructive**:
```tsx
<Button variant="destructive" size="lg">
  ❌ Pass
</Button>
```
- Background: --color-error
- Text: White
- Shadow: --shadow-sm
- Hover: --color-error-600
- Active: --color-error-700

**Ghost**:
```tsx
<Button variant="ghost" size="sm">
  ← Back
</Button>
```
- Background: Transparent
- Text: --color-text-primary
- Hover: Background --color-neutral-50
- Active: Background --color-neutral-100

**Gradient**:
```tsx
<Button variant="gradient" size="lg">
  Start Game →
</Button>
```
- Background: --gradient-success
- Text: White
- Shadow: --shadow-lg
- Hover: Scale(1.02), --shadow-xl
- Active: Scale(0.98), --shadow-md
- Animation: Subtle pulse (optional)

#### Sizes

```tsx
type ButtonSize = 'sm' | 'md' | 'lg';

sm: height: 40px, padding: 8px 16px, font: --text-body-small
md: height: 48px, padding: 12px 24px, font: --text-body-medium
lg: height: 56px, padding: 16px 32px, font: --text-body-large
```

#### Props

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'destructive' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;  // 100% width
  disabled?: boolean;
  loading?: boolean;  // Show spinner
  icon?: React.ReactNode;  // Left icon
  iconRight?: React.ReactNode;  // Right icon
  children: React.ReactNode;
  onClick?: () => void;
}
```

#### Accessibility

- Minimum touch target: 44×44px (enforce with padding if needed)
- Keyboard accessible: Tab order, Enter/Space activation
- Focus visible: 2px outline, 2px offset
- Disabled state: opacity 50%, not focusable, cursor not-allowed
- Loading state: Spinner replaces text, aria-busy="true"

---

### 2. Card Component

**Purpose**: Containers for content (player cards, settings, results)

#### Variants

**Default**:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Players Ready</CardTitle>
  </CardHeader>
  <CardContent>
    Player list here...
  </CardContent>
</Card>
```
- Background: --color-surface
- Border: 1px solid --color-border
- Border Radius: --radius-lg
- Padding: 24px (content), 16px (header)
- Shadow: --shadow-md

**Elevated**:
```tsx
<Card variant="elevated">
  ...
</Card>
```
- Background: --color-surface-elevated
- Border: 1px solid --color-border
- Shadow: --shadow-lg
- Hover: --shadow-xl, translateY(-2px)

**Outline**:
```tsx
<Card variant="outline">
  ...
</Card>
```
- Background: Transparent
- Border: 2px solid --color-border
- Shadow: None

**Glass** (Glassmorphism):
```tsx
<Card variant="glass">
  ...
</Card>
```
- Background: var(--glass-background)
- Border: 1px solid var(--glass-border)
- Backdrop Filter: var(--glass-blur)
- Shadow: var(--glass-shadow)

#### Subcomponents

```tsx
<CardHeader>  // 16px padding, border-bottom if content exists
<CardTitle>   // --text-heading-3, --font-weight-semibold
<CardDescription>  // --text-body-small, --color-text-secondary
<CardContent> // 24px padding
<CardFooter>  // 16px padding, border-top
```

#### Props

```tsx
interface CardProps {
  variant?: 'default' | 'elevated' | 'outline' | 'glass';
  interactive?: boolean;  // Hover effects
  className?: string;
  children: React.ReactNode;
}
```

---

### 3. Badge Component

**Purpose**: Category indicators, status labels, player counts

#### Variants

**Category Badges**:
```tsx
<Badge variant="draw">🎨 Draw</Badge>
<Badge variant="explain">💬 Explain</Badge>
<Badge variant="signal">👋 Signal</Badge>
```
- Draw: Background --gradient-draw, shadow --shadow-draw
- Explain: Background --gradient-explain, shadow --shadow-explain
- Signal: Background --gradient-signal, shadow --shadow-signal
- Text: White, --text-label-medium, --font-weight-semibold
- Padding: 4px 12px (--badge-padding)
- Border Radius: --radius-full (pill shape)
- Letter Spacing: --letter-spacing-wide
- Text Transform: Uppercase

**Status Badges**:
```tsx
<Badge variant="success">✓ Ready</Badge>
<Badge variant="warning">⏳ Waiting</Badge>
<Badge variant="error">❌ Failed</Badge>
```
- Success: --color-success background
- Warning: --color-warning background
- Error: --color-error background
- Text: White

**Count Badge**:
```tsx
<Badge variant="count">[2/8]</Badge>
```
- Background: --color-primary
- Text: White
- Size: Compact (6px 10px padding)
- Font: --font-mono, --text-label-small

**Outline Badge**:
```tsx
<Badge variant="outline">Easy</Badge>
```
- Background: Transparent
- Border: 1px solid --color-border
- Text: --color-text-primary

#### Sizes

```tsx
type BadgeSize = 'sm' | 'md' | 'lg';

sm: padding: 2px 8px, font: --text-label-small (11px)
md: padding: 4px 12px, font: --text-label-medium (12px)  // Default
lg: padding: 6px 16px, font: --text-label-large (14px)
```

#### Props

```tsx
interface BadgeProps {
  variant?: 'draw' | 'explain' | 'signal' | 'success' | 'warning' | 'error' | 'count' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

---

### 4. Input Component

**Purpose**: Text input fields (player names, guesses)

#### Variants

**Default**:
```tsx
<Input
  placeholder="Player name..."
  value={name}
  onChange={handleChange}
/>
```
- Background: --color-surface-elevated
- Border: 1px solid --color-border
- Border Radius: --radius-md
- Padding: 12px 16px
- Font: --text-body-medium
- Height: 48px
- Focus: Border --color-primary, 2px width

**Error State**:
```tsx
<Input
  error="Name already exists"
  className="border-error"
/>
```
- Border: 2px solid --color-error
- Focus: Border --color-error
- Error Message: Below input, --text-body-small, --color-error
- Icon: ⚠️ warning icon (right side)

**With Icon**:
```tsx
<Input
  icon={<SearchIcon />}
  placeholder="Search..."
/>
```
- Icon: Left side, 24×24px, --color-text-tertiary
- Padding Left: 48px (make room for icon)

**Textarea**:
```tsx
<Textarea
  placeholder="Type hints if needed..."
  rows={5}
/>
```
- Same styling as Input
- Min Height: 120px
- Resize: Vertical only

#### Props

```tsx
interface InputProps {
  type?: 'text' | 'number' | 'email';
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;  // Error message
  icon?: React.ReactNode;  // Left icon
  maxLength?: number;
  autoFocus?: boolean;
  className?: string;
}
```

#### Accessibility

- Label: Always provide <label> with htmlFor
- Placeholder: Not a replacement for label
- Error: aria-invalid="true", aria-describedby="error-id"
- Required: aria-required="true"
- Disabled: disabled attribute, cursor not-allowed

---

### 5. Dialog Component (Modal)

**Purpose**: Pause menu, confirmations, overlays

#### Structure

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>⏸️ Paused</DialogTitle>
      <DialogClose />
    </DialogHeader>
    <DialogBody>
      Content here...
    </DialogBody>
    <DialogFooter>
      <Button>Continue</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### Styling

**Backdrop**:
- Background: rgba(0, 0, 0, 0.5)
- Backdrop Filter: blur(8px)
- Animation: Fade in (200ms)

**Dialog Content**:
- Width: 90% screen width (max 450px)
- Background: var(--glass-background)
- Border: 1px solid var(--glass-border)
- Border Radius: --radius-2xl
- Shadow: --shadow-2xl
- Backdrop Filter: var(--glass-blur)
- Position: Center of screen
- Animation: Scale in with spring (0.9 → 1.0, 300ms)

**Dialog Header**:
- Padding: 24px
- Border Bottom: 1px solid --color-border
- Title: --text-heading-2, --font-weight-semibold

**Dialog Close Button**:
- Position: Absolute top-right
- Size: 44×44px
- Icon: X (24×24px)
- Hover: Background --color-neutral-100

**Dialog Body**:
- Padding: 24px
- Max Height: 70vh
- Overflow: Auto (scrollable if needed)

**Dialog Footer**:
- Padding: 16px 24px
- Border Top: 1px solid --color-border
- Layout: Flex row, gap 12px, justify-content flex-end

#### Props

```tsx
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}
```

#### Accessibility

- Focus Trap: Focus stays within dialog
- Escape Key: Closes dialog
- Click Outside: Closes dialog (optional)
- Initial Focus: First focusable element
- ARIA: role="dialog", aria-modal="true", aria-labelledby="title-id"

---

### 6. Progress Component

**Purpose**: Loading states, round progress

#### Variants

**Linear Progress**:
```tsx
<Progress value={65} max={100} />
```
- Height: 8px
- Background: --color-neutral-200
- Fill: --color-primary
- Border Radius: --radius-full
- Animation: Smooth transition (200ms)

**Circular Progress** (Custom):
```tsx
<CircularProgress value={65} size={80} strokeWidth={8} />
```
- SVG circle with stroke-dashoffset animation
- Size: 80px diameter (customizable)
- Stroke Width: 8px
- Background Ring: --color-neutral-200
- Progress Ring: --color-primary
- Inner Text: Percentage (optional)

#### Props

```tsx
interface ProgressProps {
  value: number;  // 0-100
  max?: number;  // Default 100
  color?: string;  // Override progress color
  showValue?: boolean;  // Show percentage text
}
```

---

### 7. Slider Component

**Purpose**: Round count, timer duration settings

#### Styling

```tsx
<Slider
  min={3}
  max={10}
  step={1}
  value={[8]}
  onValueChange={handleChange}
/>
```
- Track Height: 6px
- Track Background: --color-neutral-200
- Track Fill: --color-primary (0% to current value)
- Thumb: 24×24px circle, --color-primary, --shadow-md
- Thumb Hover: Scale(1.1), --shadow-lg
- Thumb Active: Scale(1.0), --shadow-md
- Border Radius: --radius-full

**With Labels**:
- Tick Marks: Small circles below track at each step
- Value Display: Large number on right side (32px font)
- Preset Snapping: Snap to preset values when close (±threshold)

#### Props

```tsx
interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  showTicks?: boolean;  // Show tick marks
  showValue?: boolean;  // Show current value
  presets?: number[];  // Snap points
}
```

#### Accessibility

- Keyboard: Arrow keys adjust value
- ARIA: role="slider", aria-valuemin, aria-valuemax, aria-valuenow
- Focus: Visible focus ring on thumb

---

### 8. Avatar Component

**Purpose**: Player representation

#### Variants

**Emoji Avatar** (Default):
```tsx
<Avatar>
  <AvatarFallback>🙂</AvatarFallback>
</Avatar>
```
- Size: 40px (default), 32px (sm), 48px (md), 64px (lg)
- Background: --color-neutral-100
- Border Radius: --radius-full (circular)
- Font Size: 60% of avatar size
- Center: Flexbox center alignment

**Initials Avatar**:
```tsx
<Avatar>
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
```
- Text: 2 initials, uppercase
- Font: --font-weight-semibold
- Color: --color-text-primary
- Background: --color-primary-100

**Image Avatar**:
```tsx
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="Player" />
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
```
- Image: Cover fit, rounded
- Fallback: Show if image fails to load

#### Sizes

```tsx
type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

sm: 32px
md: 40px  // Default
lg: 48px
xl: 64px
```

#### Props

```tsx
interface AvatarProps {
  size?: AvatarSize;
  children: React.ReactNode;
}
```

---

### 9. Separator Component

**Purpose**: Visual dividers

#### Variants

```tsx
<Separator orientation="horizontal" />
<Separator orientation="vertical" />
```
- Horizontal: Height 1px, width 100%, margin 16px 0
- Vertical: Width 1px, height 100%, margin 0 16px
- Background: --color-border
- Opacity: 50% (subtle)

#### Props

```tsx
interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}
```

---

## Game-Specific Components

### 10. Timer Component (Circular Countdown)

**Purpose**: Show remaining time during gameplay

#### Structure

```tsx
<Timer
  duration={60}  // Total seconds
  remaining={45}  // Seconds left
  size={120}
  strokeWidth={8}
  onComplete={handleComplete}
/>
```

#### Visual Design

**SVG Structure**:
- Size: 120px diameter (customizable)
- Stroke Width: 8px
- Background Ring: --color-neutral-200, full circle
- Progress Ring: Color based on time remaining, partial arc
- Inner Text: Seconds remaining, --font-mono, --text-display-medium

**Color Transitions**:
- >40s remaining: --color-success (green)
- 20-40s remaining: --color-warning (yellow)
- <20s remaining: --color-error (red)
- Transition: Smooth color interpolation

**Animation**:
- Stroke Dashoffset: Animate countdown smoothly (60fps)
- requestAnimationFrame: For smooth rendering
- Easing: Linear countdown
- Pulse: Subtle scale pulse when <10s (1.0 → 1.05 → 1.0)

#### Props

```tsx
interface TimerProps {
  duration: number;  // Total duration in seconds
  remaining: number;  // Current remaining seconds
  size?: number;  // Diameter in pixels (default 120)
  strokeWidth?: number;  // Ring thickness (default 8)
  showText?: boolean;  // Show seconds text (default true)
  onComplete?: () => void;  // Callback when timer reaches 0
  paused?: boolean;  // Pause countdown
}
```

#### Accessibility

- ARIA: role="timer", aria-label="60 seconds remaining"
- Update aria-label as time decreases
- Screen Reader: Announce time at intervals (30s, 15s, 10s, 5s)

---

### 11. WordReveal Component

**Purpose**: Show word to active player for 3 seconds

#### Structure

```tsx
<WordReveal
  word="KUTYA"
  category="draw"
  duration={3}
  onComplete={handleComplete}
/>
```

#### Visual Design

**Full Screen Overlay**:
- Position: Fixed, full screen (100vw × 100vh)
- Background: Category-colored gradient (10% opacity) over blur backdrop
- Z-Index: --z-modal

**Word Card**:
- Background: White card
- Border: 4px solid category color
- Padding: 32px 48px
- Border Radius: --radius-2xl
- Shadow: --shadow-2xl
- Position: Center of screen

**Word Text**:
- Font: --font-display
- Size: --text-display-large (40-64px, responsive)
- Weight: --font-weight-extrabold
- Color: --color-text-primary
- Text Transform: Uppercase
- Letter Spacing: --letter-spacing-tight

**Countdown Timer**:
- Display: Large number "3", "2", "1"
- Font: --font-mono, 72px
- Color: Category color, transitions to red as time decreases
- Animation: Scale pulse on each second (1.0 → 1.2 → 1.0)

**Instruction Text**:
- Text: "Remember this word!"
- Font: --text-body-medium
- Color: --color-text-secondary
- Position: Below word card

#### Animation Sequence

1. **Enter** (300ms):
   - Backdrop fade in (0 → 1 opacity)
   - Word card scale in (0.8 → 1.0) with spring easing
   - Word fade in (0 → 1 opacity)

2. **Hold** (3 seconds):
   - Countdown timer animates (3 → 2 → 1)
   - Pulse animation on each second

3. **Exit** (300ms):
   - Entire overlay fade out (1 → 0 opacity)
   - Word card scale out (1.0 → 0.9)

#### Props

```tsx
interface WordRevealProps {
  word: string;  // The revealed word
  category: 'draw' | 'explain' | 'signal';
  duration?: number;  // Reveal duration in seconds (default 3)
  onComplete: () => void;  // Callback when reveal ends
}
```

#### Security

- CSS: user-select: none; (prevent text selection/copy)
- Meta Tag: Prevent screenshot (iOS)
- No dismiss option (auto-disappear only)

---

### 12. Canvas Component (Drawing)

**Purpose**: Drawing surface for Draw category

#### Structure

```tsx
<Canvas
  width={343}
  height={400}
  onStroke={handleStroke}
  backgroundColor="#ffffff"
/>
```

#### Visual Design

- Size: Full width - 32px margins, ~4:3 aspect ratio
- Background: White (always, for contrast)
- Border: 2px solid --color-neutral-200
- Border Radius: --radius-lg

#### Drawing Tools

**Color Palette**:
- Black (default), Red, Blue, Green, Yellow, Orange, Purple, Brown
- Display: Grid of color circles (32×32px each)
- Selected: Border ring (3px, --color-primary)

**Line Width**:
- Thin: 2px
- Medium: 4px (default)
- Thick: 8px
- Display: 3 line examples

**Eraser**:
- Toggle: Switch to white color with larger brush
- Size: 2× current line width

**Clear**:
- Confirmation: "Clear entire canvas?"
- Action: Reset canvas to white

**Undo**:
- Stack: Last 10 strokes
- Action: Remove last stroke, redraw previous

#### Touch Interaction

- Touch Start: Begin stroke
- Touch Move: Continue stroke, smooth line interpolation
- Touch End: Finish stroke, save to stack
- Prevent Scroll: stopPropagation on canvas
- Smooth Lines: Catmull-Rom spline interpolation

#### Props

```tsx
interface CanvasProps {
  width: number;
  height: number;
  backgroundColor?: string;  // Default "#ffffff"
  onStroke?: (stroke: Stroke) => void;  // Emit stroke for sync
  disabled?: boolean;  // Read-only mode (for guessers)
}

interface Stroke {
  points: Point[];  // Array of x, y coordinates
  color: string;
  width: number;
  timestamp: number;
}
```

#### Performance

- requestAnimationFrame: Smooth 60fps drawing
- Debounce Emit: Batch stroke points (every 50ms) for WebSocket
- Canvas Optimization: Use offscreen canvas for better performance

---

### 13. PlayerCard Component

**Purpose**: Display player info in lists

#### Structure

```tsx
<PlayerCard
  player={{
    id: '1',
    name: 'Anna',
    emoji: '🙂',
    score: 20,
    isReady: true,
  }}
  variant="lobby"
/>
```

#### Variants

**Lobby Variant**:
- Height: 64px
- Background: --color-surface-elevated
- Border: 1px solid --color-border
- Border Radius: --radius-md
- Padding: 16px
- Layout:
  - Left: Avatar emoji (32px)
  - Center: Player name (--text-body-large, --font-weight-medium)
  - Right: Ready status (✓ or ...)

**Leaderboard Variant**:
- Height: 56px
- Layout:
  - Left: Rank number + avatar emoji
  - Center: Player name
  - Right: Total score
- 1st Place: Gold background gradient, bold text
- 2nd Place: Silver background (--color-neutral-100)
- 3rd Place: Bronze background (--color-warning-50)
- Others: Default background

**Round End Variant**:
- Height: 48px
- Layout:
  - Left: Avatar emoji + player name
  - Right: "+10 pts" (color-coded)
- Points Color: --color-success (positive) or --color-text-tertiary (zero)

#### Props

```tsx
interface PlayerCardProps {
  player: {
    id: string;
    name: string;
    emoji?: string;
    score?: number;
    isReady?: boolean;
  };
  variant: 'lobby' | 'leaderboard' | 'roundEnd';
  rank?: number;  // For leaderboard
  pointsAwarded?: number;  // For round end
}
```

---

### 14. ScoreDisplay Component

**Purpose**: Show current scores during gameplay

#### Structure

```tsx
<ScoreDisplay
  players={players}
  currentPlayerId="1"
/>
```

#### Visual Design

- Position: Top right corner (header)
- Size: Compact (80px × 32px)
- Background: --color-surface-elevated
- Border: 1px solid --color-border
- Border Radius: --radius-full (pill)
- Padding: 8px 12px
- Content: Total score for current player (or all players)
- Font: --font-mono, --text-body-small
- Icon: 🏆 emoji (16px)

#### Expanded View (Optional)

- Tap to expand: Show all player scores
- Modal/Popover: Overlay with full scoreboard
- Animation: Scale up from top right

#### Props

```tsx
interface ScoreDisplayProps {
  players: Player[];
  currentPlayerId?: string;  // Highlight current player
  showAll?: boolean;  // Show all scores or just total
}
```

---

### 15. CategoryBadge Component (Enhanced Badge)

**Purpose**: Large category indicators (game board, role assignment)

#### Structure

```tsx
<CategoryBadge
  category="draw"
  size="large"
/>
```

#### Sizes

**Small** (36px height):
- Padding: 8px 16px
- Font: --text-label-medium
- Icon: 24px emoji
- Use: Game board header, in-line mentions

**Medium** (64px height):
- Padding: 12px 24px
- Font: --text-heading-3
- Icon: 32px emoji
- Use: Game configuration, round end

**Large** (120px height):
- Width: 240px
- Font: --text-display-small
- Icon: 64px emoji
- Border: 3px solid white
- Shadow: --shadow-xl with category color
- Use: Role assignment screen (full attention)

#### Props

```tsx
interface CategoryBadgeProps {
  category: 'draw' | 'explain' | 'signal';
  size?: 'small' | 'medium' | 'large';
}
```

---

### 16. DifficultyCard Component

**Purpose**: Difficulty selection cards

#### Structure

```tsx
<DifficultyCard
  difficulty="medium"
  selected={true}
  onSelect={handleSelect}
/>
```

#### Visual Design

- Size: ~100px wide × 120px high
- Background: --color-surface-elevated
- Border: 2px solid --color-border
- Border Radius: --radius-md
- Selected State:
  - Border: 2px solid --color-primary
  - Background: --color-primary-50
  - Checkmark: ✓ (top right corner, --color-primary)

**Content**:
- Emoji: 48px size, centered (😊 Easy, 😐 Medium, 😎 Hard)
- Label: --text-label-large, centered below emoji
- Description: --text-body-small, --color-text-secondary (optional)

#### Props

```tsx
interface DifficultyCardProps {
  difficulty: 'easy' | 'medium' | 'hard';
  selected: boolean;
  onSelect: (difficulty: string) => void;
}
```

---

## Component Summary Table

| Component | Shadcn Base | Custom | Purpose |
|-----------|-------------|--------|---------|
| Button | ✅ | Variants added | All interactive buttons |
| Card | ✅ | Glass variant added | Content containers |
| Badge | ✅ | Category colors added | Labels, status indicators |
| Input | ✅ | Error state added | Text input fields |
| Dialog | ✅ | Glass styling added | Modals, pause menu |
| Progress | ✅ | - | Loading states |
| Slider | ✅ | Preset snapping added | Settings controls |
| Avatar | ✅ | Emoji variant added | Player representation |
| Separator | ✅ | - | Visual dividers |
| Timer | - | ✅ | Circular countdown |
| WordReveal | - | ✅ | Word display overlay |
| Canvas | - | ✅ | Drawing surface |
| PlayerCard | - | ✅ | Player list items |
| ScoreDisplay | - | ✅ | Score tracker |
| CategoryBadge | ✅ (Badge) | Large size added | Category indicators |
| DifficultyCard | ✅ (Card) | Selection state added | Difficulty picker |

**Total**: 16 components (9 Shadcn-based, 7 custom)

---

## Component Installation (Shadcn)

### 1. Install Shadcn CLI

```bash
npx shadcn-ui@latest init
```

### 2. Install Required Components

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add separator
```

### 3. Customize Components

- Modify `components/ui/button.tsx` to add gradient variant
- Add category color variants to `badge.tsx`
- Add glass variant to `card.tsx` and `dialog.tsx`

---

## Component Usage Examples

### Example 1: Primary Button with Icon

```tsx
import { Button } from '@/components/ui/button';

<Button
  variant="primary"
  size="lg"
  icon={<PlayIcon />}
  onClick={handleStart}
>
  Play Now
</Button>
```

### Example 2: Category Badge

```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="draw">
  🎨 Draw
</Badge>
```

### Example 3: Player Card (Lobby)

```tsx
import { PlayerCard } from '@/components/game/player-card';

<PlayerCard
  player={{
    id: '1',
    name: 'Anna',
    emoji: '🙂',
    isReady: true,
  }}
  variant="lobby"
/>
```

### Example 4: Timer Component

```tsx
import { Timer } from '@/components/game/timer';

<Timer
  duration={60}
  remaining={45}
  size={120}
  onComplete={() => console.log('Time up!')}
/>
```

### Example 5: Glass Modal

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

<Dialog open={isPaused} onOpenChange={setIsPaused}>
  <DialogContent className="glass-modal">
    <DialogHeader>
      <DialogTitle>⏸️ Paused</DialogTitle>
    </DialogHeader>
    <Button onClick={() => setIsPaused(false)}>
      Resume Game →
    </Button>
  </DialogContent>
</Dialog>
```

---

## Component Specifications Complete

**Status**: ✅ All Components Specified

**Deliverables**:
- 16 component specifications (9 Shadcn-based, 7 custom)
- Complete variant definitions for each component
- Props interfaces with TypeScript types
- Accessibility requirements
- Usage examples with code snippets
- Shadcn installation instructions

**Next**: Create ANIMATION_SPECIFICATIONS.md with detailed animation catalog and timing details.

---

**Designer Agent**: Component Specifications Complete
**Date**: November 7, 2025
**Ready for**: Animation Specification Phase
