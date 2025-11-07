# GuessUp - Implementation Guide

**Project**: GuessUp - Mobile-First Activity Party Game
**Designer Agent**: Developer Handoff Guide
**Date**: November 7, 2025
**Status**: Ready for Implementation

---

## Quick Start

### 1. Design System Setup

**Install Tailwind CSS**:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configure Tailwind** (`tailwind.config.js`):
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        draw: {
          500: '#0ea5e9',
          600: '#0284c7',
        },
        explain: {
          500: '#22c55e',
          600: '#16a34a',
        },
        signal: {
          500: '#f97316',
          600: '#ea580c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}
```

**Global CSS** (`globals.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Color tokens */
  --color-primary: theme('colors.primary.500');
  --color-draw: theme('colors.draw.500');
  --color-explain: theme('colors.explain.500');
  --color-signal: theme('colors.signal.500');

  /* Spacing */
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;

  /* Shadows */
  --shadow-md: theme('boxShadow.md');
  --shadow-lg: theme('boxShadow.lg');

  /* Timing */
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Dark mode adjustments */
[data-theme="dark"] {
  --color-primary: theme('colors.primary.400');
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 2. Install Shadcn Components

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card badge input dialog progress slider avatar separator
```

---

### 3. Install Animation Libraries

```bash
npm install framer-motion
npm install react-confetti
```

---

## Component Implementation Examples

### Button Component (Primary)

```tsx
// components/ui/button.tsx
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'destructive' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            // Variants
            'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0':
              variant === 'primary',
            'bg-success-500 text-white hover:bg-success-600 active:bg-success-700 shadow-sm':
              variant === 'success',
            'bg-gradient-to-r from-success-400 to-primary-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]':
              variant === 'gradient',
            'border-2 border-gray-200 bg-transparent hover:bg-gray-50 active:bg-gray-100':
              variant === 'secondary',
            'border border-gray-200 bg-transparent hover:bg-gray-50 active:bg-gray-100':
              variant === 'outline',
            'bg-error-500 text-white hover:bg-error-600 active:bg-error-700 shadow-sm':
              variant === 'destructive',
            // Sizes
            'h-10 px-4 text-sm': size === 'sm',
            'h-12 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
            // Full width
            'w-full': fullWidth,
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
```

**Usage**:
```tsx
<Button variant="primary" size="lg" fullWidth>
  Play Now
</Button>

<Button variant="success" size="lg">
  ✅ Got it!
</Button>

<Button variant="gradient" size="lg" fullWidth>
  Start Game →
</Button>
```

---

### Category Badge Component

```tsx
// components/game/category-badge.tsx
import { cn } from '@/lib/utils';

type Category = 'draw' | 'explain' | 'signal';

interface CategoryBadgeProps {
  category: Category;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const categoryConfig = {
  draw: {
    emoji: '🎨',
    label: 'Draw',
    gradient: 'from-draw-400 to-draw-600',
    shadow: 'shadow-[0_4px_12px_-2px_rgba(14,165,233,0.3)]',
  },
  explain: {
    emoji: '💬',
    label: 'Explain',
    gradient: 'from-explain-400 to-explain-600',
    shadow: 'shadow-[0_4px_12px_-2px_rgba(34,197,94,0.3)]',
  },
  signal: {
    emoji: '👋',
    label: 'Signal',
    gradient: 'from-signal-400 to-signal-600',
    shadow: 'shadow-[0_4px_12px_-2px_rgba(249,115,22,0.3)]',
  },
};

export function CategoryBadge({ category, size = 'small', className }: CategoryBadgeProps) {
  const config = categoryConfig[category];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-gradient-to-r text-white font-semibold uppercase tracking-wide',
        config.gradient,
        config.shadow,
        {
          'px-4 py-1 text-xs': size === 'small',
          'px-6 py-2 text-sm': size === 'medium',
          'w-60 h-30 flex-col justify-center border-2 border-white text-2xl shadow-2xl': size === 'large',
        },
        className
      )}
    >
      <span className={cn({ 'text-2xl': size === 'small' || size === 'medium', 'text-6xl': size === 'large' })}>
        {config.emoji}
      </span>
      <span>{config.label}</span>
    </div>
  );
}
```

**Usage**:
```tsx
<CategoryBadge category="draw" size="small" />
<CategoryBadge category="explain" size="medium" />
<CategoryBadge category="signal" size="large" />
```

---

### Timer Component (Circular Countdown)

```tsx
// components/game/timer.tsx
'use client';

import { useEffect, useState } from 'react';

interface TimerProps {
  duration: number; // Total duration in seconds
  remaining: number; // Current remaining seconds
  size?: number; // Diameter in pixels
  strokeWidth?: number;
  onComplete?: () => void;
}

export function Timer({
  duration,
  remaining,
  size = 120,
  strokeWidth = 8,
  onComplete,
}: TimerProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (remaining / duration) * circumference;

  // Color based on remaining time
  const getColor = () => {
    if (remaining > 40) return 'stroke-success-500';
    if (remaining > 20) return 'stroke-warning-500';
    return 'stroke-error-500';
  };

  useEffect(() => {
    if (remaining === 0 && onComplete) {
      onComplete();
    }
  }, [remaining, onComplete]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn('transition-all duration-100', getColor())}
        />
      </svg>
      {/* Time text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn('font-mono font-bold', {
          'text-4xl': size >= 120,
          'text-2xl': size < 120,
          'animate-pulse': remaining < 10,
        })}>
          {remaining}
        </span>
      </div>
    </div>
  );
}
```

**Usage**:
```tsx
<Timer
  duration={60}
  remaining={45}
  size={120}
  onComplete={() => console.log('Time up!')}
/>
```

---

### Word Reveal Component

```tsx
// components/game/word-reveal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CategoryBadge } from './category-badge';

interface WordRevealProps {
  word: string;
  category: 'draw' | 'explain' | 'signal';
  duration?: number; // Duration in seconds
  onComplete: () => void;
}

export function WordReveal({ word, category, duration = 3, onComplete }: WordRevealProps) {
  const [countdown, setCountdown] = useState(duration);

  useEffect(() => {
    if (countdown === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center gap-8 px-8">
          {/* Instruction */}
          <p className="text-lg text-white/80">Your Word:</p>

          {/* Word Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="rounded-2xl border-4 border-primary-500 bg-white px-12 py-8 shadow-2xl"
          >
            <h1 className="text-center font-display text-5xl font-extrabold uppercase tracking-tight text-gray-900 md:text-6xl">
              {word}
            </h1>
          </motion.div>

          {/* Countdown */}
          <motion.div
            key={countdown}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="text-7xl font-bold text-primary-500"
          >
            {countdown}
          </motion.div>

          {/* Reminder */}
          <p className="text-sm text-white/70">Remember this word!</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
```

**Usage**:
```tsx
<WordReveal
  word="KUTYA"
  category="draw"
  duration={3}
  onComplete={() => setPhase('playing')}
/>
```

---

### Glass Modal Component

```tsx
// components/ui/glass-modal.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';

export function GlassModal({ open, onOpenChange, title, children }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/20 bg-white/10 backdrop-blur-xl dark:bg-black/30">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl">{title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">{children}</div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
```

**Usage**:
```tsx
<GlassModal
  open={isPaused}
  onOpenChange={setIsPaused}
  title="⏸️ Paused"
>
  <Button onClick={() => setIsPaused(false)}>Resume Game →</Button>
</GlassModal>
```

---

### Confetti Component

```tsx
// components/game/confetti.tsx
'use client';

import ReactConfetti from 'react-confetti';
import { useEffect, useState } from 'react';

interface ConfettiProps {
  duration?: number; // Duration in ms
  onComplete?: () => void;
}

export function Confetti({ duration = 2000, onComplete }: ConfettiProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const timer = setTimeout(() => {
      setIsActive(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isActive) return null;

  return (
    <ReactConfetti
      width={windowSize.width}
      height={windowSize.height}
      numberOfPieces={150}
      recycle={false}
      colors={['#0ea5e9', '#22c55e', '#f97316', '#FFD700', '#a855f7']}
      gravity={0.5}
    />
  );
}
```

**Usage**:
```tsx
{showConfetti && (
  <Confetti
    duration={2000}
    onComplete={() => setShowConfetti(false)}
  />
)}
```

---

## Layout Templates

### Page Container

```tsx
// components/layout/page-container.tsx
import { cn } from '@/lib/utils';

export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('min-h-screen px-4 pt-6 pb-8 safe-area', className)}>
      {children}
    </div>
  );
}
```

### Header with Back Button

```tsx
// components/layout/header.tsx
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function Header({
  title,
  onBack,
  rightContent,
}: {
  title: string;
  onBack?: () => void;
  rightContent?: React.ReactNode;
}) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
      {onBack && (
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}
      <h1 className="text-lg font-semibold">{title}</h1>
      {rightContent && <div>{rightContent}</div>}
    </header>
  );
}
```

---

## Utility Functions

### Class Name Helper (`cn`)

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Format Time

```ts
// lib/format-time.ts
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
```

---

## Responsive Design Utilities

### Responsive Text

```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  GuessUp
</h1>
```

### Responsive Spacing

```tsx
<div className="p-4 sm:p-6 md:p-8">
  Content
</div>
```

### Safe Area Support (Mobile Notch/Home Indicator)

```css
/* globals.css */
.safe-area {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

---

## Implementation Checklist

- [ ] Install Tailwind CSS and configure theme
- [ ] Install Shadcn UI components
- [ ] Install Framer Motion for animations
- [ ] Install react-confetti for celebrations
- [ ] Create design system CSS variables
- [ ] Implement Button component with all variants
- [ ] Implement Card component with glass variant
- [ ] Implement Badge component with category colors
- [ ] Implement Timer component (circular countdown)
- [ ] Implement WordReveal component with animations
- [ ] Implement Canvas component for drawing
- [ ] Implement GlassModal component
- [ ] Implement Confetti component
- [ ] Create responsive layout templates
- [ ] Test all components on mobile (320px-600px)
- [ ] Test dark mode support
- [ ] Test reduced motion accessibility
- [ ] Validate WCAG 2.1 AA compliance

---

## Implementation Guide Complete

**Status**: ✅ Ready for Development

**Deliverables**:
- Complete Tailwind configuration
- Shadcn component installation instructions
- 8 implementation examples with full code
- Layout templates and utilities
- Responsive design patterns
- Accessibility best practices
- Implementation checklist

**Next**: DESIGN_COMPLETE.md - Executive summary and final handoff.

---

**Designer Agent**: Implementation Guide Complete
**Date**: November 7, 2025
**Ready for**: Implementer Agent Handoff
