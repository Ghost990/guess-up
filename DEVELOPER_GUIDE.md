# GuessUp - Developer Guide

**Project**: GuessUp - Mobile-First Activity Party Game
**Version**: 1.0.0
**Last Updated**: November 7, 2025

---

## Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher
- Git

### Installation
```bash
# Clone repository
git clone https://github.com/Ghost990/guess-up.git
cd guess-up

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

---

## Project Structure

```
guess-up/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with theme provider
│   │   ├── page.tsx            # Home page (Play Now entry point)
│   │   └── game/               # Game flow pages
│   │       ├── setup/          # Player setup page
│   │       ├── lobby/          # Waiting room
│   │       ├── play/           # Main game board
│   │       ├── round-end/      # Round results
│   │       └── game-over/      # Final scores
│   │
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...
│   │   └── game/               # Game-specific components
│   │       ├── Timer.tsx
│   │       ├── WordReveal.tsx
│   │       ├── GameBoard.tsx
│   │       ├── PlayerCard.tsx
│   │       └── ...
│   │
│   ├── stores/                 # Zustand state management
│   │   └── gameStore.ts
│   │
│   ├── lib/                    # Core utilities
│   │   ├── game/               # Game logic
│   │   │   ├── randomization.ts
│   │   │   ├── scoring.ts
│   │   │   ├── turnRotation.ts
│   │   │   └── gameLogic.ts
│   │   └── utils.ts
│   │
│   ├── types/                  # TypeScript definitions
│   │   ├── game.ts
│   │   ├── player.ts
│   │   ├── word.ts
│   │   ├── timer.ts
│   │   ├── events.ts
│   │   └── index.ts
│   │
│   ├── data/                   # Static data
│   │   └── words-hu.json       # Hungarian word database
│   │
│   └── hooks/                  # Custom React hooks
│       ├── useGame.ts
│       ├── useTimer.ts
│       └── ...
│
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

---

## Type System

### Importing Types
```typescript
import {
  Game,
  Player,
  Word,
  Category,
  Difficulty,
  GamePhase,
  Role,
} from '@/types';
```

### Core Interfaces

#### Game
```typescript
interface Game {
  id: string;
  hostPlayerId: string;
  players: Player[];
  currentRound: number;
  totalRounds: number;
  phase: GamePhase;
  currentPlayerIndex: number;
  currentCategory: Category;
  currentWord: Word | null;
  timer: Timer;
  scores: Record<string, number>;
  guesses: Guess[];
  settings: GameSettings;
  createdAt: number;
  startedAt: number | null;
  endedAt: number | null;
}
```

#### Player
```typescript
interface Player {
  id: string;
  name: string;
  score: number;
  joinedAt: number;
  isHost: boolean;
  isActive: boolean;
  hasGuessedCorrectly: boolean;
  color?: string;
  avatar?: string;
}
```

#### Word
```typescript
interface Word {
  id: string;
  text: string;
  category: WordCategory;
  difficulty: Difficulty;
  length: number;
  language: 'hu';
  tags: string[];
}
```

---

## Game Logic Utilities

### Fisher-Yates Shuffle
```typescript
import { fisherYatesShuffle } from '@/lib/game/randomization';

// Shuffle player order
const shuffledPlayers = fisherYatesShuffle(players);

// Shuffle word list
const shuffledWords = fisherYatesShuffle(words);
```

### Scoring
```typescript
import { calculateGuessPoints, SCORING } from '@/lib/game/scoring';

// Calculate points for a guess
const points = calculateGuessPoints(guess, roundStartTime);

// Scoring constants
SCORING.CORRECT_GUESS;  // 10 points
SCORING.FAST_BONUS;     // 5 points (if guessed within 5s)
SCORING.TEAM_BONUS;     // 15 points (if all players guessed)
```

### Turn Rotation
```typescript
import {
  getNextPlayerIndex,
  getNextCategory,
  getCategoryForRound,
} from '@/lib/game/turnRotation';

// Get next player (circular rotation)
const nextIndex = getNextPlayerIndex(currentIndex, totalPlayers);

// Get next category
const nextCat = getNextCategory(currentCategory, availableCategories);

// Get category for specific round
const cat = getCategoryForRound(roundNumber, availableCategories);
```

### Game Logic
```typescript
import {
  isValidPhaseTransition,
  isGuessCorrect,
  shouldEndRound,
  shouldEndGame,
  generateGameId,
  generatePlayerId,
} from '@/lib/game/gameLogic';

// Validate phase transition
if (isValidPhaseTransition('lobby', 'wordReveal')) {
  // Safe to transition
}

// Check if guess is correct (accent-insensitive)
if (isGuessCorrect(playerGuess, correctWord)) {
  // Award points
}

// Check if round should end
if (shouldEndRound(remainingTime, allPlayersGuessed)) {
  // End round
}

// Generate IDs
const gameId = generateGameId();       // "AB3C5D"
const playerId = generatePlayerId();   // UUID v4
```

---

## Design System

### Colors

#### Category Colors
```tsx
// Draw category - Blue
<div className="bg-draw-500 text-white">Draw</div>

// Explain category - Green
<div className="bg-explain-500 text-white">Explain</div>

// Signal category - Orange
<div className="bg-signal-500 text-white">Signal</div>
```

#### Semantic Colors
```tsx
// Success
<div className="bg-success-500 text-white">Correct!</div>

// Warning
<div className="bg-warning-500 text-white">Low time</div>

// Error
<div className="bg-error-500 text-white">Wrong guess</div>
```

### Typography
```tsx
// Display sizes (responsive)
<h1 className="text-display-large">GuessUp</h1>
<h2 className="text-display-medium">Welcome</h2>

// Heading sizes
<h1 className="text-heading-1">Main Title</h1>
<h2 className="text-heading-2">Subtitle</h2>
<h3 className="text-heading-3">Section</h3>

// Font families
<p className="font-sans">Body text</p>
<code className="font-mono">12:45</code>
```

### Shadows
```tsx
// Standard shadows
<div className="shadow-sm">Small elevation</div>
<div className="shadow-md">Medium elevation</div>
<div className="shadow-lg">Large elevation</div>

// Category-specific shadows
<div className="shadow-draw">Draw badge</div>
<div className="shadow-explain">Explain badge</div>
<div className="shadow-signal">Signal badge</div>
```

### Animations
```tsx
// Built-in animations
<div className="animate-scale-in">Scales in</div>
<div className="animate-fade-in">Fades in</div>
<div className="animate-pulse-subtle">Subtle pulse</div>

// Timing functions
<div className="transition-all duration-300 ease-spring">
  Spring animation
</div>
```

---

## Component Patterns

### Button Component
```tsx
import { Button } from '@/components/ui/Button';

// Primary button (default)
<Button onClick={handleClick}>
  Play Now
</Button>

// With variants
<Button variant="secondary">How to Play</Button>
<Button variant="success">Continue</Button>
<Button variant="destructive">Pass</Button>

// With sizes
<Button size="lg">Large Button</Button>
<Button size="md">Medium Button</Button>
<Button size="sm">Small Button</Button>

// With icon
<Button icon={<PlayIcon />}>
  Start Game
</Button>

// Full width
<Button fullWidth>
  Submit
</Button>

// Disabled or loading
<Button disabled>Disabled</Button>
<Button loading>Processing...</Button>
```

### Card Component
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Players Ready</CardTitle>
  </CardHeader>
  <CardContent>
    <PlayerList players={players} />
  </CardContent>
  <CardFooter>
    <Button>Start Game</Button>
  </CardFooter>
</Card>

// Glass variant (glassmorphism)
<Card variant="glass">
  Semi-transparent with backdrop blur
</Card>
```

### Badge Component
```tsx
import { Badge } from '@/components/ui/Badge';

// Category badges
<Badge variant="draw">🎨 Draw</Badge>
<Badge variant="explain">💬 Explain</Badge>
<Badge variant="signal">👋 Signal</Badge>

// Status badges
<Badge variant="success">✓ Ready</Badge>
<Badge variant="warning">⏳ Waiting</Badge>
<Badge variant="error">❌ Failed</Badge>

// Count badge
<Badge variant="count">[2/8]</Badge>
```

---

## State Management

### Using Zustand Store
```typescript
import { useGameStore } from '@/stores/gameStore';

function GameComponent() {
  // Select specific state
  const game = useGameStore((state) => state.game);
  const players = useGameStore((state) => state.game?.players ?? []);

  // Select actions
  const addPlayer = useGameStore((state) => state.addPlayer);
  const startGame = useGameStore((state) => state.startGame);
  const submitGuess = useGameStore((state) => state.submitGuess);

  // Use in component
  const handleAddPlayer = () => {
    addPlayer({ name: 'Anna' });
  };

  return (
    <div>
      <h2>Players: {players.length}</h2>
      <button onClick={handleAddPlayer}>Add Player</button>
    </div>
  );
}
```

### Store Actions Pattern
```typescript
// Initialize new game
initializeGame(settings: GameSettings): void

// Player management
addPlayer(input: CreatePlayerInput): void
removePlayer(playerId: string): void

// Game flow
startGame(): void
setGamePhase(phase: GamePhase): void
nextRound(): void
submitGuess(playerId: string, guess: string): void
endGame(): void
resetGame(): void

// Selectors
getCurrentPlayer(): Player | null
getPlayerRole(playerId: string): Role
isActivePlayer(playerId: string): boolean
```

---

## Testing

### Unit Tests (Vitest)
```typescript
import { describe, it, expect } from 'vitest';
import { fisherYatesShuffle } from '@/lib/game/randomization';

describe('fisherYatesShuffle', () => {
  it('returns array with same elements', () => {
    const input = [1, 2, 3, 4, 5];
    const output = fisherYatesShuffle(input);
    expect(output).toHaveLength(5);
    expect(output.sort()).toEqual(input.sort());
  });

  it('does not mutate original array', () => {
    const input = [1, 2, 3];
    const original = [...input];
    fisherYatesShuffle(input);
    expect(input).toEqual(original);
  });
});
```

### Component Tests
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

---

## Accessibility Guidelines

### ARIA Labels
```tsx
// Timer component
<div
  role="timer"
  aria-label={`${remainingSeconds} seconds remaining`}
>
  {remainingSeconds}
</div>

// Button with icon only
<button aria-label="Close modal">
  <XIcon />
</button>

// Input with error
<input
  aria-invalid={hasError}
  aria-describedby="error-message"
/>
<span id="error-message">{errorMessage}</span>
```

### Keyboard Navigation
```tsx
// Focus visible styles
<button className="focus-visible:outline-2 focus-visible:outline-primary-500">
  Keyboard accessible
</button>

// Tab order
<div className="flex gap-4">
  <button tabIndex={0}>First</button>
  <button tabIndex={0}>Second</button>
  <button tabIndex={0}>Third</button>
</div>
```

### Touch Targets
```tsx
// Minimum 44×44px touch targets
<button className="min-w-[44px] min-h-[44px]">
  ✓
</button>

// Comfortable size for primary actions
<button className="h-14 px-8">
  Play Now
</button>
```

---

## Performance Optimization

### Code Splitting
```typescript
// Lazy load components
import dynamic from 'next/dynamic';

const GameBoard = dynamic(() => import('@/components/game/GameBoard'), {
  loading: () => <LoadingSpinner />,
});
```

### Memoization
```typescript
import { memo } from 'react';

const PlayerCard = memo(({ player }: { player: Player }) => {
  return <div>{player.name}</div>;
});
```

### Image Optimization
```tsx
import Image from 'next/image';

<Image
  src="/avatar.png"
  alt="Player avatar"
  width={64}
  height={64}
  priority
/>
```

---

## Deployment

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## Common Issues & Solutions

### TypeScript Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Not Working
```bash
# Rebuild Tailwind
npx tailwindcss -i ./src/app/globals.css -o ./public/output.css --watch
```

### Hot Reload Issues
```bash
# Restart dev server
npm run dev
```

---

## Contributing

### Code Style
- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write JSDoc comments for public APIs
- Create unit tests for utilities
- Follow component structure guidelines

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/player-setup

# Commit with descriptive messages
git commit -m "feat: add player setup screen with validation"

# Push and create PR
git push origin feature/player-setup
```

---

## Resources

### Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://zustand-demo.pmnd.rs)
- [Framer Motion](https://www.framer.com/motion)

### Design System
- See `DESIGN_SYSTEM.md` for complete design tokens
- See `COMPONENT_SPECIFICATIONS.md` for component details
- See `SCREEN_DESIGNS.md` for layout specifications

### Architecture
- See `ARCHITECTURE_OVERVIEW.md` for system design
- See `DATA_MODELS.md` for type definitions
- See `IMPLEMENTATION_ROADMAP.md` for development plan

---

**Developer Guide**: Complete
**Last Updated**: November 7, 2025
**Ready for**: Active Development
