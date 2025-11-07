# GuessUp - Design System

**Project**: GuessUp - Mobile-First Activity Party Game
**Designer Agent**: Complete Design System
**Date**: November 7, 2025
**Status**: Foundation for Implementation

---

## Design Philosophy

**Core Principles**:
1. **Clarity First**: Game state always obvious, no confusion
2. **Playful Energy**: Fun, engaging, exciting interactions
3. **Mobile-First**: Portrait orientation, thumb-friendly
4. **Accessible**: WCAG 2.1 AA, inclusive design
5. **Performance**: 60fps animations, smooth transitions
6. **Simplicity**: Clean layouts, clear hierarchy

**2025 Design Trends Applied**:
- **Neo-brutalist accents**: Bold typography, high contrast borders
- **Glassmorphism**: Subtle backdrop blur for modals and overlays
- **Gradient renaissance**: Mesh gradients for backgrounds
- **Organic shapes**: Rounded corners, fluid transitions
- **Physics-based animations**: Spring animations, natural motion
- **Dynamic color systems**: Context-aware, category-coded

---

## Color System

### Primary Palette

#### Brand Colors
```css
/* Primary - Vibrant Purple (Energy, Fun, Playful) */
--color-primary-50: #faf5ff;
--color-primary-100: #f3e8ff;
--color-primary-200: #e9d5ff;
--color-primary-300: #d8b4fe;
--color-primary-400: #c084fc;
--color-primary-500: #a855f7;  /* Main brand color */
--color-primary-600: #9333ea;
--color-primary-700: #7e22ce;
--color-primary-800: #6b21a8;
--color-primary-900: #581c87;
--color-primary-950: #3b0764;

/* Secondary - Electric Blue (Trust, Communication) */
--color-secondary-50: #eff6ff;
--color-secondary-100: #dbeafe;
--color-secondary-200: #bfdbfe;
--color-secondary-300: #93c5fd;
--color-secondary-400: #60a5fa;
--color-secondary-500: #3b82f6;  /* Secondary brand */
--color-secondary-600: #2563eb;
--color-secondary-700: #1d4ed8;
--color-secondary-800: #1e40af;
--color-secondary-900: #1e3a8a;
--color-secondary-950: #172554;
```

#### Category Colors (Game Modes)
```css
/* Draw Category - Creative Blue */
--color-draw-50: #f0f9ff;
--color-draw-100: #e0f2fe;
--color-draw-200: #bae6fd;
--color-draw-300: #7dd3fc;
--color-draw-400: #38bdf8;
--color-draw-500: #0ea5e9;  /* Main Draw color */
--color-draw-600: #0284c7;
--color-draw-700: #0369a1;
--color-draw-800: #075985;
--color-draw-900: #0c4a6e;

/* Explain Category - Communication Green */
--color-explain-50: #f0fdf4;
--color-explain-100: #dcfce7;
--color-explain-200: #bbf7d0;
--color-explain-300: #86efac;
--color-explain-400: #4ade80;
--color-explain-500: #22c55e;  /* Main Explain color */
--color-explain-600: #16a34a;
--color-explain-700: #15803d;
--color-explain-800: #166534;
--color-explain-900: #14532d;

/* Signal Category - Physical Orange */
--color-signal-50: #fff7ed;
--color-signal-100: #ffedd5;
--color-signal-200: #fed7aa;
--color-signal-300: #fdba74;
--color-signal-400: #fb923c;
--color-signal-500: #f97316;  /* Main Signal color */
--color-signal-600: #ea580c;
--color-signal-700: #c2410c;
--color-signal-800: #9a3412;
--color-signal-900: #7c2d12;
```

#### Semantic Colors
```css
/* Success - Correct guesses, achievements */
--color-success-50: #f0fdf4;
--color-success-500: #22c55e;
--color-success-600: #16a34a;
--color-success-700: #15803d;

/* Warning - Timer low, attention needed */
--color-warning-50: #fffbeb;
--color-warning-500: #f59e0b;
--color-warning-600: #d97706;
--color-warning-700: #b45309;

/* Error - Wrong guesses, failures */
--color-error-50: #fef2f2;
--color-error-500: #ef4444;
--color-error-600: #dc2626;
--color-error-700: #b91c1c;

/* Info - Instructions, help text */
--color-info-50: #eff6ff;
--color-info-500: #3b82f6;
--color-info-600: #2563eb;
--color-info-700: #1d4ed8;
```

#### Neutral Palette
```css
/* Neutral - Backgrounds, text, borders */
--color-neutral-50: #fafafa;
--color-neutral-100: #f5f5f5;
--color-neutral-200: #e5e5e5;
--color-neutral-300: #d4d4d4;
--color-neutral-400: #a3a3a3;
--color-neutral-500: #737373;
--color-neutral-600: #525252;
--color-neutral-700: #404040;
--color-neutral-800: #262626;
--color-neutral-900: #171717;
--color-neutral-950: #0a0a0a;
```

### Dark Mode Palette

```css
/* Dark mode adjustments - Enhanced contrast */
[data-theme="dark"] {
  /* Primary adjustments for dark backgrounds */
  --color-primary: var(--color-primary-400);
  --color-primary-hover: var(--color-primary-300);

  /* Category colors - Brighter for visibility */
  --color-draw: var(--color-draw-400);
  --color-explain: var(--color-explain-400);
  --color-signal: var(--color-signal-400);

  /* Backgrounds */
  --color-background: var(--color-neutral-950);
  --color-surface: var(--color-neutral-900);
  --color-surface-elevated: var(--color-neutral-800);

  /* Text */
  --color-text-primary: var(--color-neutral-50);
  --color-text-secondary: var(--color-neutral-300);
  --color-text-tertiary: var(--color-neutral-500);

  /* Borders */
  --color-border: var(--color-neutral-800);
  --color-border-strong: var(--color-neutral-700);
}
```

### Color Usage Guidelines

**Text Contrast Requirements** (WCAG 2.1 AA):
- Normal text (16px+): 4.5:1 minimum
- Large text (24px+): 3:1 minimum
- UI components: 3:1 minimum

**Category Color Application**:
- Badge backgrounds: Use -500 shade
- Badge text: White (4.5:1 contrast)
- Timer borders: Use -600 shade
- Button accents: Use -600 shade
- Screen subtle tints: Use -50 shade (light mode), -900/10% opacity (dark mode)

**State Colors**:
- Default: Primary colors
- Hover: -600 shade
- Active: -700 shade
- Disabled: Neutral-400 with 50% opacity
- Focus: 2px outline with -500 shade

---

## Typography System

### Font Families

```css
/* Primary Font - Display and Headings */
--font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

/* Body Font - Content and UI */
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

/* Monospace Font - Scores, Timers */
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

**Rationale**:
- **Inter**: Modern, excellent readability, variable font support, free
- **System fonts fallback**: Fast load, native feel
- **JetBrains Mono**: Clear numerals for scores/timers

### Type Scale

#### Mobile-First Scale (320px-600px)
```css
/* Display - Hero text, word reveals */
--text-display-large: clamp(2.5rem, 8vw, 4rem);      /* 40-64px */
--text-display-medium: clamp(2rem, 6vw, 3rem);       /* 32-48px */
--text-display-small: clamp(1.75rem, 5vw, 2.5rem);   /* 28-40px */

/* Heading - Section titles */
--text-heading-1: clamp(1.5rem, 4vw, 2rem);          /* 24-32px */
--text-heading-2: clamp(1.25rem, 3.5vw, 1.75rem);    /* 20-28px */
--text-heading-3: clamp(1.125rem, 3vw, 1.5rem);      /* 18-24px */

/* Body - Content, descriptions */
--text-body-large: clamp(1.125rem, 2.5vw, 1.25rem);  /* 18-20px */
--text-body-medium: 1rem;                             /* 16px */
--text-body-small: 0.875rem;                          /* 14px */

/* Label - UI labels, badges */
--text-label-large: 0.875rem;                         /* 14px */
--text-label-medium: 0.75rem;                         /* 12px */
--text-label-small: 0.6875rem;                        /* 11px */
```

### Font Weights

```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

**Usage Guidelines**:
- **Light (300)**: Subtle secondary text
- **Regular (400)**: Body text, descriptions
- **Medium (500)**: UI labels, buttons
- **Semibold (600)**: Section headings, emphasis
- **Bold (700)**: Main headings, CTAs
- **Extrabold (800)**: Display text, word reveals

### Line Heights

```css
--line-height-tight: 1.2;      /* Headings, display text */
--line-height-snug: 1.375;     /* Short paragraphs */
--line-height-normal: 1.5;     /* Body text */
--line-height-relaxed: 1.625;  /* Long-form content */
--line-height-loose: 2;        /* Very spacious */
```

### Letter Spacing

```css
--letter-spacing-tighter: -0.05em;
--letter-spacing-tight: -0.025em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.025em;
--letter-spacing-wider: 0.05em;
--letter-spacing-widest: 0.1em;
```

**Usage**:
- Headings: -0.025em (tighter)
- Body: 0 (normal)
- Labels/badges: 0.025em (wide)
- Buttons: 0.05em (wider)

---

## Spacing System

### Base Unit: 4px Grid

```css
--spacing-0: 0;
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
--spacing-20: 5rem;    /* 80px */
--spacing-24: 6rem;    /* 96px */
```

### Component Spacing

```css
/* Internal padding */
--space-button-padding-x: var(--spacing-6);  /* 24px horizontal */
--space-button-padding-y: var(--spacing-3);  /* 12px vertical */

--space-card-padding: var(--spacing-6);      /* 24px all sides */
--space-badge-padding-x: var(--spacing-3);   /* 12px horizontal */
--space-badge-padding-y: var(--spacing-1);   /* 4px vertical */

/* Gaps and margins */
--space-stack-small: var(--spacing-2);       /* 8px vertical stack */
--space-stack-medium: var(--spacing-4);      /* 16px vertical stack */
--space-stack-large: var(--spacing-6);       /* 24px vertical stack */

--space-inline-small: var(--spacing-2);      /* 8px horizontal inline */
--space-inline-medium: var(--spacing-4);     /* 16px horizontal inline */
--space-inline-large: var(--spacing-6);      /* 24px horizontal inline */
```

### Layout Spacing

```css
/* Screen safe areas */
--space-screen-padding: var(--spacing-4);    /* 16px screen edges */
--space-screen-padding-top: var(--spacing-6);/* 24px top (status bar) */
--space-screen-padding-bottom: var(--spacing-8); /* 32px bottom (home indicator) */

/* Section spacing */
--space-section-gap: var(--spacing-8);       /* 32px between sections */
--space-content-gap: var(--spacing-6);       /* 24px between content blocks */
```

---

## Border Radius

### Scale
```css
--radius-none: 0;
--radius-sm: 0.25rem;    /* 4px - Small elements */
--radius-md: 0.5rem;     /* 8px - Buttons, inputs */
--radius-lg: 0.75rem;    /* 12px - Cards, containers */
--radius-xl: 1rem;       /* 16px - Large cards */
--radius-2xl: 1.5rem;    /* 24px - Modal, dialog */
--radius-3xl: 2rem;      /* 32px - Hero sections */
--radius-full: 9999px;   /* Fully rounded - Badges, avatars */
```

### Usage Guidelines
- **Buttons**: --radius-md (8px)
- **Cards**: --radius-lg (12px)
- **Badges**: --radius-full (pill shape)
- **Modals**: --radius-2xl (24px)
- **Avatars**: --radius-full (circular)
- **Timer ring**: --radius-full (circular)

---

## Shadows (Elevation System)

### Light Mode Shadows
```css
/* Subtle elevation - Hovering slightly above */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* Card elevation - Standard raised surface */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
            0 2px 4px -2px rgb(0 0 0 / 0.1);

/* Elevated card - Important elements */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);

/* Modal, dialog - Highest elevation */
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
            0 8px 10px -6px rgb(0 0 0 / 0.1);

/* Mega elevation - Full screen overlays */
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

### Dark Mode Shadows
```css
[data-theme="dark"] {
  /* Stronger shadows for visibility on dark backgrounds */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4),
              0 2px 4px -2px rgb(0 0 0 / 0.3);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5),
              0 4px 6px -4px rgb(0 0 0 / 0.4);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.6),
              0 8px 10px -6px rgb(0 0 0 / 0.5);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.7);
}
```

### Colored Shadows (Category-Specific)
```css
/* For category badges and themed elements */
--shadow-draw: 0 4px 12px -2px rgb(14 165 233 / 0.3);
--shadow-explain: 0 4px 12px -2px rgb(34 197 94 / 0.3);
--shadow-signal: 0 4px 12px -2px rgb(249 115 22 / 0.3);
```

---

## Animation System

### Timing Functions (Easing)

```css
/* Standard easings */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Spring animations (natural motion) */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Custom game easings */
--ease-reveal: cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* Word reveal */
--ease-timer: cubic-bezier(0.33, 1, 0.68, 1);         /* Timer countdown */
```

### Duration Scale

```css
/* Fast - Micro-interactions, hovers */
--duration-fast: 150ms;

/* Base - Standard transitions */
--duration-base: 250ms;

/* Moderate - Larger movements */
--duration-moderate: 350ms;

/* Slow - Major state changes */
--duration-slow: 500ms;

/* Very slow - Full screen transitions */
--duration-very-slow: 700ms;
```

### Animation Presets

```css
/* Button hover */
--animation-button-hover: all var(--duration-fast) var(--ease-out);

/* Card lift on hover */
--animation-card-hover: transform var(--duration-base) var(--ease-spring),
                       box-shadow var(--duration-base) var(--ease-out);

/* Modal entrance */
--animation-modal-enter: opacity var(--duration-moderate) var(--ease-in-out),
                        transform var(--duration-moderate) var(--ease-spring);

/* Word reveal */
--animation-word-reveal: opacity var(--duration-slow) var(--ease-reveal),
                        transform var(--duration-slow) var(--ease-reveal);

/* Timer countdown */
--animation-timer: stroke-dashoffset var(--duration-base) var(--ease-timer);
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Glassmorphism Effects

```css
/* Subtle glass effect for modals and overlays */
--glass-background: rgba(255, 255, 255, 0.1);
--glass-border: rgba(255, 255, 255, 0.2);
--glass-blur: blur(10px);
--glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

/* Dark mode glass */
[data-theme="dark"] {
  --glass-background: rgba(0, 0, 0, 0.3);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-blur: blur(12px);
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
}
```

**Usage**:
```css
.glass-modal {
  background: var(--glass-background);
  border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-blur);
  box-shadow: var(--glass-shadow);
}
```

---

## Gradient System

### Background Gradients

```css
/* Mesh gradient - Hero backgrounds */
--gradient-mesh-primary:
  radial-gradient(at 27% 37%, hsla(270, 75%, 60%, 1) 0px, transparent 50%),
  radial-gradient(at 97% 21%, hsla(220, 75%, 60%, 1) 0px, transparent 50%),
  radial-gradient(at 52% 99%, hsla(330, 75%, 60%, 1) 0px, transparent 50%),
  radial-gradient(at 10% 29%, hsla(190, 75%, 60%, 1) 0px, transparent 50%);

/* Category gradients */
--gradient-draw: linear-gradient(135deg, var(--color-draw-400) 0%, var(--color-draw-600) 100%);
--gradient-explain: linear-gradient(135deg, var(--color-explain-400) 0%, var(--color-explain-600) 100%);
--gradient-signal: linear-gradient(135deg, var(--color-signal-400) 0%, var(--color-signal-600) 100%);

/* Success celebration gradient */
--gradient-success: linear-gradient(135deg, var(--color-success-400) 0%, var(--color-success-600) 50%, var(--color-primary-500) 100%);
```

---

## Z-Index Scale

```css
--z-base: 0;
--z-dropdown: 100;
--z-sticky: 200;
--z-fixed: 300;
--z-modal-backdrop: 400;
--z-modal: 500;
--z-popover: 600;
--z-toast: 700;
--z-tooltip: 800;
```

---

## Breakpoints

```css
/* Mobile-first approach */
--breakpoint-sm: 375px;   /* Small phones (iPhone SE) */
--breakpoint-md: 414px;   /* Standard phones (iPhone 12-15) */
--breakpoint-lg: 600px;   /* Large phones, small tablets */
--breakpoint-xl: 768px;   /* Tablets portrait */
```

**Media Query Usage**:
```css
/* Small phones (320px-374px) - Default styles */

/* Standard phones (375px+) */
@media (min-width: 375px) { }

/* Large phones (414px+) */
@media (min-width: 414px) { }

/* Small tablets (600px+) */
@media (min-width: 600px) { }

/* Tablets portrait (768px+) */
@media (min-width: 768px) { }
```

---

## Touch Targets

```css
/* Minimum touch target sizes (iOS/Android standards) */
--touch-target-min: 44px;      /* Minimum for all interactive elements */
--touch-target-comfortable: 48px; /* Comfortable size */
--touch-target-large: 56px;    /* Large, prominent buttons */
```

**Application**:
- All buttons: minimum 44×44px
- Primary CTAs: 48×48px or larger
- Game action buttons: 56×56px for easy tapping during gameplay

---

## Component Tokens

### Button Tokens
```css
--button-height-sm: 36px;
--button-height-md: 44px;
--button-height-lg: 56px;
--button-padding-x: var(--spacing-6);
--button-padding-y: var(--spacing-3);
--button-border-radius: var(--radius-md);
--button-font-weight: var(--font-weight-medium);
```

### Card Tokens
```css
--card-padding: var(--spacing-6);
--card-border-radius: var(--radius-lg);
--card-shadow: var(--shadow-md);
--card-border: 1px solid var(--color-neutral-200);
```

### Badge Tokens
```css
--badge-padding-x: var(--spacing-3);
--badge-padding-y: var(--spacing-1);
--badge-border-radius: var(--radius-full);
--badge-font-size: var(--text-label-medium);
--badge-font-weight: var(--font-weight-semibold);
```

### Timer Tokens
```css
--timer-size: 120px;
--timer-stroke-width: 8px;
--timer-font-size: var(--text-display-medium);
--timer-font-weight: var(--font-weight-bold);
```

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

**Color Contrast**:
- Normal text (16px): 4.5:1 minimum
- Large text (24px): 3:1 minimum
- UI components: 3:1 minimum
- Focus indicators: 3:1 minimum

**Focus Indicators**:
```css
--focus-ring-width: 2px;
--focus-ring-offset: 2px;
--focus-ring-color: var(--color-primary-500);
--focus-ring-style: solid;

/* Focus ring implementation */
.focusable:focus-visible {
  outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}
```

**Touch Targets**:
- Minimum 44×44px for all interactive elements
- Adequate spacing between targets (8px minimum)

**Text Scaling**:
- Support up to 200% zoom without layout breaks
- Use relative units (rem, em) for font sizes
- Test with iOS Dynamic Type and Android font scaling

**Screen Reader Support**:
- Semantic HTML elements
- ARIA labels for complex interactions
- Live regions for dynamic content (timer, scores)

**Keyboard Navigation**:
- All interactive elements focusable
- Logical tab order
- Skip links for main content
- Escape key closes modals

**Motion Sensitivity**:
- Respect `prefers-reduced-motion`
- Provide static alternatives for animations
- No auto-playing animations

---

## Design Tokens Implementation

### CSS Custom Properties (Recommended)

```css
:root {
  /* Color tokens */
  --color-primary: var(--color-primary-500);
  --color-secondary: var(--color-secondary-500);

  /* Category colors */
  --color-draw: var(--color-draw-500);
  --color-explain: var(--color-explain-500);
  --color-signal: var(--color-signal-500);

  /* Semantic colors */
  --color-success: var(--color-success-500);
  --color-warning: var(--color-warning-500);
  --color-error: var(--color-error-500);
  --color-info: var(--color-info-500);

  /* Surface colors */
  --color-background: var(--color-neutral-50);
  --color-surface: #ffffff;
  --color-surface-elevated: var(--color-neutral-100);

  /* Text colors */
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-600);
  --color-text-tertiary: var(--color-neutral-500);

  /* Border colors */
  --color-border: var(--color-neutral-200);
  --color-border-strong: var(--color-neutral-300);
}
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          // ... (full palette from above)
          950: '#3b0764',
        },
        draw: {
          500: '#0ea5e9',
          // ...
        },
        explain: {
          500: '#22c55e',
          // ...
        },
        signal: {
          500: '#f97316',
          // ...
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      spacing: {
        // Extend with custom spacing tokens
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
};
```

---

## Design System Validation

### Checklist

- ✅ **Complete Color Palette**: Primary, secondary, category, semantic, neutral
- ✅ **Typography Scale**: Display, heading, body, label with responsive sizing
- ✅ **Spacing System**: 4px grid with component and layout tokens
- ✅ **Border Radius**: Consistent scale from sm to full
- ✅ **Shadow System**: Elevation scale with light/dark modes
- ✅ **Animation System**: Timing functions, durations, presets
- ✅ **Glassmorphism**: Modal and overlay effects
- ✅ **Gradient System**: Background and category gradients
- ✅ **Z-Index Scale**: Logical stacking order
- ✅ **Breakpoints**: Mobile-first responsive strategy
- ✅ **Touch Targets**: iOS/Android minimum sizes
- ✅ **Component Tokens**: Button, card, badge, timer specifics
- ✅ **Accessibility**: WCAG 2.1 AA compliance standards
- ✅ **Design Tokens**: CSS variables and Tailwind config
- ✅ **Dark Mode**: Complete palette adjustments

---

## Usage Examples

### Example: Primary Button
```css
.button-primary {
  background: var(--color-primary);
  color: white;
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--button-border-radius);
  font-weight: var(--button-font-weight);
  height: var(--button-height-md);
  min-width: var(--touch-target-min);
  transition: var(--animation-button-hover);
  box-shadow: var(--shadow-sm);
}

.button-primary:hover {
  background: var(--color-primary-600);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.button-primary:focus-visible {
  outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}
```

### Example: Category Badge
```css
.badge-draw {
  background: var(--gradient-draw);
  color: white;
  padding: var(--badge-padding-y) var(--badge-padding-x);
  border-radius: var(--badge-border-radius);
  font-size: var(--badge-font-size);
  font-weight: var(--badge-font-weight);
  box-shadow: var(--shadow-draw);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
}
```

### Example: Glass Modal
```css
.modal-glass {
  background: var(--glass-background);
  border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  padding: var(--card-padding);
  animation: var(--animation-modal-enter);
}
```

---

## Design System Complete

**Status**: ✅ Foundation Ready for Screen Designs

**Deliverables**:
- Complete color system (primary, category, semantic, neutral, dark mode)
- Typography system (scale, weights, line heights, letter spacing)
- Spacing system (4px grid, component tokens, layout tokens)
- Border radius scale (sm to full)
- Shadow system (elevation with light/dark modes)
- Animation system (timing, durations, presets)
- Glassmorphism effects
- Gradient system
- Z-index scale
- Breakpoints and touch targets
- Component tokens (button, card, badge, timer)
- Accessibility standards (WCAG 2.1 AA)
- CSS variables and Tailwind configuration

**Next**: Create SCREEN_DESIGNS.md with detailed layouts for all game phases using this design system.

---

**Designer Agent**: Design System Complete
**Date**: November 7, 2025
**Ready for**: Screen Layout Design Phase
