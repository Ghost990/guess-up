# GuessUp - Animation Specifications

**Project**: GuessUp - Mobile-First Activity Party Game
**Designer Agent**: Complete Animation Catalog
**Date**: November 7, 2025
**Status**: Implementation-Ready Animations

---

## Animation Philosophy

**Principles**:
1. **Physics-Based**: Spring animations for natural feel
2. **Purposeful**: Every animation serves a function
3. **Performance**: 60fps target, GPU-accelerated
4. **Accessible**: Respect prefers-reduced-motion
5. **Playful**: Energetic personality through motion
6. **Feedback**: Immediate visual response to actions

---

## Animation Catalog

### 1. Page Transitions

**Slide In/Out**:
- Duration: 350ms
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (spring)
- Transform: translateX(-100% → 0) for enter, translateX(0 → 100%) for exit
- Opacity: 0 → 1 for enter, 1 → 0 for exit

```css
.page-enter {
  animation: slideIn 350ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Fade In/Out**:
- Duration: 250ms
- Easing: ease-in-out
- Opacity: 0 → 1 for fade in, 1 → 0 for fade out

---

### 2. Button Animations

**Hover**:
- Duration: 150ms
- Transform: translateY(-1px), scale(1.02) (lift effect)
- Box Shadow: --shadow-sm → --shadow-md
- Easing: ease-out

**Active (Press)**:
- Duration: 100ms
- Transform: translateY(0), scale(0.98) (press down)
- Box Shadow: --shadow-md → --shadow-sm
- Easing: ease-in

**Pulse (Call-to-Action)**:
- Duration: 2000ms
- Iteration: Infinite
- Transform: scale(1.0 → 1.05 → 1.0)
- Opacity: 1.0 → 0.9 → 1.0
- Easing: ease-in-out

```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1.0);
    opacity: 1.0;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

.button-cta {
  animation: pulse 2s ease-in-out infinite;
}
```

**Loading Spinner**:
- Duration: 800ms
- Iteration: Infinite
- Transform: rotate(0deg → 360deg)
- Easing: linear

---

### 3. Modal/Dialog Animations

**Modal Enter**:
- Backdrop: Fade in (200ms, opacity 0 → 1)
- Content: Scale in + fade in (300ms)
- Transform: scale(0.9 → 1.0)
- Opacity: 0 → 1
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (spring)

**Modal Exit**:
- Backdrop: Fade out (200ms)
- Content: Scale out + fade out (250ms)
- Transform: scale(1.0 → 0.95)
- Opacity: 1 → 0
- Easing: ease-in-out

```tsx
// Framer Motion example
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1.0 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{
    type: 'spring',
    stiffness: 300,
    damping: 30,
  }}
>
  Modal content
</motion.div>
```

---

### 4. Timer Countdown Animation

**Circular Progress**:
- SVG stroke-dashoffset animation
- Duration: Smooth countdown (requestAnimationFrame)
- Easing: Linear (constant speed)
- Color Transition: Green → Yellow → Red based on time remaining

```tsx
// React example
const circumference = 2 * Math.PI * radius;
const offset = circumference - (remaining / duration) * circumference;

<circle
  cx={size / 2}
  cy={size / 2}
  r={radius}
  strokeDasharray={circumference}
  strokeDashoffset={offset}
  style={{
    transition: 'stroke-dashoffset 0.1s linear',
    stroke: getTimerColor(remaining),
  }}
/>
```

**Timer Pulse** (<10s remaining):
- Duration: 1000ms (per pulse)
- Iteration: Continuous while <10s
- Transform: scale(1.0 → 1.05 → 1.0)
- Easing: ease-in-out

**Timer Color Transition**:
- >40s: --color-success (green)
- 20-40s: Interpolate green → yellow
- <20s: --color-error (red)
- Method: HSL color interpolation

---

### 5. Word Reveal Animation

**Enter Sequence**:
1. **Backdrop Fade** (0-200ms):
   - Opacity: 0 → 1
   - Backdrop-filter: blur(0px → 8px)

2. **Word Card Scale In** (100-400ms):
   - Transform: scale(0.8 → 1.0)
   - Opacity: 0 → 1
   - Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (spring bounce)

3. **Word Text Fade** (200-500ms):
   - Opacity: 0 → 1
   - Transform: translateY(10px → 0)

4. **Countdown Start** (500ms):
   - Initial scale pulse (1.0 → 1.2 → 1.0)

**Countdown Pulse** (per second):
- Duration: 1000ms
- Transform: scale(1.0 → 1.2 → 1.0)
- Color: Interpolate category color → red as time decreases

**Exit Sequence**:
1. **Word Card Scale Out** (0-300ms):
   - Transform: scale(1.0 → 0.9)
   - Opacity: 1 → 0
   - Easing: ease-in

2. **Backdrop Fade Out** (100-300ms):
   - Opacity: 1 → 0

---

### 6. Confetti Animation (Success)

**Confetti Burst**:
- Duration: 2000ms (total)
- Particles: 100-150 pieces
- Colors: Category colors + gold (#FFD700)
- Physics:
  - Initial velocity: Random upward/outward
  - Gravity: 0.5 (downward acceleration)
  - Rotation: Random spin (0-360deg per second)
  - Opacity: 1.0 → 0.0 (fade out in last 500ms)

**Trigger Points**:
- Correct guess (Game Board)
- Round success (Round End)
- Winner announcement (Game End)

```tsx
// Using react-confetti
<Confetti
  width={window.innerWidth}
  height={window.innerHeight}
  numberOfPieces={150}
  recycle={false}
  colors={['#0ea5e9', '#22c55e', '#f97316', '#FFD700']}
  gravity={0.5}
/>
```

---

### 7. Score Counter Animation

**Count Up**:
- Duration: 500ms
- Start: 0 or previous score
- End: New score
- Easing: ease-out
- Method: Interpolate numbers, update every frame

```tsx
// Count up animation
const [displayScore, setDisplayScore] = useState(0);

useEffect(() => {
  let start = displayScore;
  let end = newScore;
  let duration = 500;
  let startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3); // ease-out
    const current = Math.floor(start + (end - start) * easedProgress);

    setDisplayScore(current);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  animate();
}, [newScore]);
```

**Score Highlight**:
- When score increases, flash background color
- Duration: 400ms
- Background: Transparent → --color-success-50 → Transparent
- Easing: ease-in-out

---

### 8. List Animations

**Stagger In** (Player list, leaderboard):
- Each item enters sequentially
- Delay: 50ms per item
- Animation: Slide in from left + fade in
- Duration: 250ms per item
- Easing: ease-out

```tsx
// Framer Motion stagger example
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  }}
>
  {players.map((player, i) => (
    <motion.div
      key={player.id}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      <PlayerCard player={player} />
    </motion.div>
  ))}
</motion.div>
```

**Item Add/Remove**:
- Add: Slide down from above + fade in (250ms)
- Remove: Slide up + fade out (200ms)
- Remaining items: Smooth reposition (300ms, ease-in-out)

---

### 9. Canvas Drawing Animation

**Stroke Rendering**:
- Method: requestAnimationFrame for 60fps
- Interpolation: Catmull-Rom spline for smooth curves
- Sync: WebSocket stroke events rendered in real-time

**Eraser Animation**:
- Cursor: Custom eraser icon (32×32px)
- Trail: Temporary white path that reveals erased area
- Feedback: Haptic vibration on erase (mobile)

**Undo Animation**:
- Duration: 150ms
- Method: Fade out last stroke (opacity 1 → 0)
- Then: Redraw canvas without that stroke

---

### 10. Gesture Feedback Animations

**Button Tap**:
- Ripple Effect: Circular ripple from tap point
- Duration: 400ms
- Opacity: 0.3 → 0
- Scale: 0 → 2.0
- Easing: ease-out

**Haptic Feedback** (Mobile):
- Light tap: On button press
- Medium tap: On correct guess
- Heavy tap: On round complete
- Error tap: On wrong guess (double tap pattern)

**Shake Animation** (Error):
- Duration: 400ms
- Transform: translateX(0 → 10px → -10px → 5px → -5px → 0)
- Use: Wrong guess, validation error
- Easing: ease-in-out

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.input-error {
  animation: shake 400ms ease-in-out;
}
```

---

### 11. Micro-Interactions

**Toggle Switch**:
- Duration: 200ms
- Thumb: translateX(0 → 20px) for on, reverse for off
- Background: Color transition (--color-neutral-300 → --color-primary)
- Easing: ease-in-out

**Checkbox**:
- Duration: 150ms
- Checkmark: Scale in (0 → 1) with rotation (0 → 360deg)
- Border: Color transition (--color-border → --color-primary)
- Easing: ease-out

**Loading Dots**:
- Duration: 1200ms
- Iteration: Infinite
- Animation: 3 dots bounce up and down sequentially
- Delay: 200ms per dot

```css
@keyframes dotBounce {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  40% {
    transform: translateY(-10px);
    opacity: 0.6;
  }
}

.dot:nth-child(1) { animation: dotBounce 1.2s infinite 0s; }
.dot:nth-child(2) { animation: dotBounce 1.2s infinite 0.2s; }
.dot:nth-child(3) { animation: dotBounce 1.2s infinite 0.4s; }
```

---

## Reduced Motion Support

**Accessibility Requirement**: Respect `prefers-reduced-motion: reduce`

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

**Alternative Static States**:
- Confetti: Show static success icon instead of particles
- Timer: Instant color changes instead of smooth transitions
- Page transitions: Instant without slide/fade
- Button hover: Immediate state change without lift effect

---

## Performance Optimization

**GPU Acceleration**:
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid `width`, `height`, `top`, `left` (triggers reflow)
- Use `will-change` sparingly for active animations only

```css
.animating-element {
  will-change: transform, opacity;
  /* Remove will-change after animation completes */
}
```

**requestAnimationFrame**:
- Use for smooth 60fps animations (timer, canvas, counters)
- Cancel on component unmount
- Throttle/debounce when appropriate

**Lazy Loading Animations**:
- Don't animate off-screen elements
- Use Intersection Observer to trigger animations when visible

---

## Animation Library Recommendations

**Framer Motion** (Recommended):
- Declarative React animations
- Spring physics built-in
- Gesture support (drag, tap, hover)
- Variants for complex sequences
- Accessibility support (respects prefers-reduced-motion)

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
>
  Content
</motion.div>
```

**React Spring** (Alternative):
- Physics-based animations
- Lightweight
- Excellent performance

**CSS Animations** (Fallback):
- For simple transitions
- No JavaScript overhead
- Good browser support

---

## Animation Timing Reference

| Animation | Duration | Easing | Iteration |
|-----------|----------|--------|-----------|
| Button Hover | 150ms | ease-out | Once |
| Button Active | 100ms | ease-in | Once |
| Button Pulse | 2000ms | ease-in-out | Infinite |
| Modal Enter | 300ms | spring | Once |
| Modal Exit | 250ms | ease-in-out | Once |
| Timer Countdown | Continuous | linear | N/A |
| Timer Pulse | 1000ms | ease-in-out | While <10s |
| Word Reveal Enter | 500ms | spring | Once |
| Word Reveal Exit | 300ms | ease-in | Once |
| Confetti | 2000ms | physics | Once |
| Score Count Up | 500ms | ease-out | Once |
| List Stagger | 250ms/item | ease-out | Once |
| Shake Error | 400ms | ease-in-out | Once |
| Ripple | 400ms | ease-out | Once |
| Page Transition | 350ms | spring | Once |

---

## Animation Specifications Complete

**Status**: ✅ Complete Animation Catalog

**Deliverables**:
- Complete animation catalog (11 categories, 30+ animations)
- Timing, easing, and duration specifications
- Code examples (CSS, React, Framer Motion)
- Performance optimization guidelines
- Reduced motion accessibility support
- Library recommendations

**Next**: Create IMPLEMENTATION_GUIDE.md with Tailwind classes and practical code snippets.

---

**Designer Agent**: Animation Specifications Complete
**Date**: November 7, 2025
**Ready for**: Implementation Guide Phase
