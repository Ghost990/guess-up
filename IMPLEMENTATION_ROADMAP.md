# GuessUp - Implementation Roadmap

**Project**: GuessUp - Mobile-First Activity Party Game  
**Phase**: Development Planning  
**Date**: November 7, 2025  
**Status**: Complete

---

## Table of Contents

1. [Development Philosophy](#development-philosophy)
2. [Phase Overview](#phase-overview)
3. [Phase 1: Core Game Loop](#phase-1-core-game-loop-mvp)
4. [Phase 2: Timer Synchronization](#phase-2-timer-synchronization)
5. [Phase 3: Word Database Integration](#phase-3-word-database-integration)
6. [Phase 4: Polish & Optimization](#phase-4-polish--optimization)
7. [Dependencies & Blockers](#dependencies--blockers)
8. [Effort Estimation](#effort-estimation)
9. [Testing Strategy](#testing-strategy)
10. [Deployment Plan](#deployment-plan)

---

## Development Philosophy

### Core Principles

1. **Iterative Development**: Build in functional increments, test each phase
2. **Mobile-First**: Design and test on mobile devices throughout
3. **Type-Safe**: Implement TypeScript types before features
4. **Test-Driven**: Write tests alongside implementation
5. **Performance-Conscious**: Monitor Core Web Vitals at each phase

### Success Criteria

Each phase must meet:
- ✅ All features implemented and tested
- ✅ Type safety (no TypeScript errors)
- ✅ Core Web Vitals targets met (LCP <2.5s, INP <100ms, CLS <0.1)
- ✅ Mobile responsiveness verified (320px-600px)
- ✅ Code review completed
- ✅ Documentation updated

---

## Phase Overview

```
Phase 1: Core Game Loop (MVP)
  ↓ 2-3 weeks
Phase 2: Timer Synchronization
  ↓ 1-2 weeks
Phase 3: Word Database Integration
  ↓ 1 week
Phase 4: Polish & Optimization
  ↓ 1-2 weeks
──────────────────────────────
Total: 5-8 weeks
```

### Phase Priority Matrix

| Phase | Complexity | Risk | User Impact | Priority |
|-------|------------|------|-------------|----------|
| **Phase 1** | Medium | Low | High | P0 (Critical) |
| **Phase 2** | High | High | High | P0 (Critical) |
| **Phase 3** | Low | Low | Medium | P1 (Important) |
| **Phase 4** | Medium | Low | Medium | P2 (Enhancement) |

---

## Phase 1: Core Game Loop (MVP)

**Duration**: 2-3 weeks  
**Goal**: Functional game from setup → playing → results without timer sync

### 1.1 Project Setup (Days 1-2)

**Tasks**:
- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Configure Tailwind CSS with mobile-first breakpoints
- [ ] Setup ESLint + Prettier with TypeScript rules
- [ ] Configure Vitest for unit testing
- [ ] Create base folder structure (app/, components/, lib/, types/)
- [ ] Setup Git repository with .gitignore

**Deliverables**:
```bash
npx create-next-app@latest guessup --typescript --tailwind --app
cd guessup
npm install zustand dexie
npm install -D @types/node vitest
```

**Validation**:
- `npm run dev` starts without errors
- TypeScript compilation succeeds
- Tailwind classes render correctly

---

### 1.2 Type Definitions (Days 3-4)

**Tasks**:
- [ ] Create `types/game.ts` with core interfaces
- [ ] Create `types/player.ts` with player types
- [ ] Create `types/word.ts` with word types
- [ ] Create `types/events.ts` with game event types
- [ ] Document all types with JSDoc comments

**Deliverables**:
- Complete type definitions (see Technical Specification)
- No TypeScript errors in `types/` directory
- All types exported from index.ts

**Validation**:
```typescript
import { Game, Player, Word, GamePhase } from '@/types'
// All types available and error-free
```

---

### 1.3 UI Component Library (Days 5-7)

**Tasks**:
- [ ] Create `components/ui/Button.tsx` with variants
- [ ] Create `components/ui/Input.tsx` with validation
- [ ] Create `components/ui/Card.tsx` container
- [ ] Create `components/ui/Badge.tsx` for categories/roles
- [ ] Create `components/ui/Avatar.tsx` for players
- [ ] Create `components/ui/Modal.tsx` for dialogs
- [ ] Create `components/ui/Toast.tsx` for notifications
- [ ] Write Storybook stories for each component (optional)

**Deliverables**:
- 7 reusable UI components
- Consistent styling with Tailwind
- Mobile-optimized (44px touch targets)
- Type-safe props

**Validation**:
- Components render on mobile (320px width)
- Touch targets meet 44×44px minimum
- No layout shifts (CLS <0.1)

---

### 1.4 Zustand State Store (Days 8-9)

**Tasks**:
- [ ] Create `stores/gameStore.ts` with full interface
- [ ] Implement state actions (setGamePhase, addPlayer, etc.)
- [ ] Add computed selectors (getCurrentPlayer, getPlayerRole)
- [ ] Setup persistence for gameId/playerId
- [ ] Add devtools middleware
- [ ] Write unit tests for store actions

**Deliverables**:
- Complete Zustand store implementation
- Persistence working (localStorage)
- DevTools integration
- 90%+ test coverage

**Validation**:
```typescript
import { useGameStore } from '@/stores/gameStore'

const { gamePhase, setGamePhase, addPlayer } = useGameStore()
setGamePhase('playing')
expect(gamePhase).toBe('playing')
```

---

### 1.5 Game Setup Pages (Days 10-12)

**Tasks**:
- [ ] Create `app/page.tsx` (landing page)
- [ ] Create `app/game/setup/page.tsx` (player input)
- [ ] Create `app/game/lobby/page.tsx` (waiting room)
- [ ] Implement player name validation
- [ ] Add game settings (rounds, difficulty, categories)
- [ ] Create PlayerList component
- [ ] Add navigation flow (setup → lobby → play)

**Deliverables**:
- 3 pages with routing
- Player setup form (1-6 players)
- Game settings configuration
- Lobby with player list

**Validation**:
- Forms validate correctly
- Navigation works on mobile
- Players persist in state

---

### 1.6 Game Board & Role Views (Days 13-16)

**Tasks**:
- [ ] Create `components/game/GameBoard.tsx` container
- [ ] Create `components/game/roles/DrawerView.tsx` (canvas)
- [ ] Create `components/game/roles/ExplainerView.tsx` (text display)
- [ ] Create `components/game/roles/SignalerView.tsx` (gesture placeholder)
- [ ] Create `components/game/roles/GuesserView.tsx` (input field)
- [ ] Implement role-based rendering logic
- [ ] Add CategoryIndicator component
- [ ] Add RoleIndicator component
- [ ] Implement canvas drawing (touch + mouse)

**Deliverables**:
- GameBoard with role-based views
- DrawerView with basic drawing (color, clear)
- GuesserView with input and submit
- Role assignment logic

**Validation**:
- Drawer sees canvas, guessers see input
- Drawing works on touch devices
- Role assignment follows turn rotation

---

### 1.7 Round Flow & Scoring (Days 17-19)

**Tasks**:
- [ ] Create `lib/game/gameLogic.ts` with phase transitions
- [ ] Create `lib/game/scoring.ts` with points calculation
- [ ] Create `lib/game/turnRotation.ts` with player order
- [ ] Implement WordReveal component (3s display)
- [ ] Create RoundSummary component (scores, next player)
- [ ] Add ScoreBoard component (current standings)
- [ ] Implement guess validation and scoring
- [ ] Add round counter and phase indicators

**Deliverables**:
- Complete round flow (wordReveal → playing → roundEnd)
- Scoring system (10 base + 5 fast bonus)
- Turn rotation (Fisher-Yates)
- Score display

**Validation**:
- Full game playable (manual timer)
- Correct guesses award points
- Next player selected fairly
- Round counter increments

---

### 1.8 Game End & Replay (Days 20-21)

**Tasks**:
- [ ] Create `app/game/game-over/page.tsx`
- [ ] Display final scores with rankings
- [ ] Add winner announcement
- [ ] Implement replay/new game buttons
- [ ] Add game history (optional)
- [ ] Create share button (copy game stats)

**Deliverables**:
- Game over screen with final scores
- Replay functionality (reset game state)
- Winner celebration animation

**Validation**:
- Game ends after totalRounds completed
- Scores displayed correctly
- Replay resets game state

---

### Phase 1 Milestone

**Definition of Done**:
- ✅ Complete game flow: Setup → Lobby → Play → Results → Replay
- ✅ Role-based views working (drawer/guesser)
- ✅ Scoring system functional
- ✅ Turn rotation fair (Fisher-Yates)
- ✅ Mobile responsive (320px-600px)
- ✅ No TypeScript errors
- ✅ Basic E2E test passing

**Known Limitations**:
- ⚠️ No timer synchronization (manual advancement)
- ⚠️ No real-time multiplayer (single device)
- ⚠️ Placeholder word database (hardcoded words)

**Next Phase**: Add server-authoritative timer with WebSocket sync

---

## Phase 2: Timer Synchronization

**Duration**: 1-2 weeks  
**Goal**: Real-time timer sync across multiple clients via WebSocket

### 2.1 WebSocket Server Setup (Days 22-24)

**Tasks**:
- [ ] Install socket.io and socket.io-client
- [ ] Create `app/api/ws/route.ts` WebSocket handler
- [ ] Setup room management (game sessions)
- [ ] Implement connection authentication
- [ ] Add reconnection logic
- [ ] Handle player join/leave events
- [ ] Setup fallback to long-polling

**Deliverables**:
```typescript
// Server
import { Server } from 'socket.io'

const io = new Server(server, {
  cors: { origin: '*' },
  transports: ['websocket', 'polling']
})

io.on('connection', (socket) => {
  socket.on('join_game', ({ gameId, playerId }) => {
    socket.join(gameId)
    io.to(gameId).emit('player_joined', { playerId })
  })
})
```

**Validation**:
- WebSocket connects successfully
- Rooms isolate game sessions
- Fallback to polling works

---

### 2.2 Server Timer Implementation (Days 25-27)

**Tasks**:
- [ ] Create `lib/timer/serverTimer.ts` class
- [ ] Implement 100ms broadcast interval
- [ ] Add phase transition logic
- [ ] Handle timer pause/resume
- [ ] Add timer validation (prevent manipulation)
- [ ] Broadcast timer state to all clients
- [ ] Implement automatic phase progression

**Deliverables**:
```typescript
class ServerTimer {
  start(onTick: (remaining: number) => void, onEnd: () => void): void
  stop(): void
  getRemainingTime(): number
  getServerTime(): number
}
```

**Validation**:
- Timer broadcasts every 100ms
- All clients receive same time
- Phase transitions automatically
- Timer stops at 0

---

### 2.3 Client Timer Interpolation (Days 28-30)

**Tasks**:
- [ ] Create `lib/timer/clientTimer.ts` class
- [ ] Implement requestAnimationFrame rendering
- [ ] Add drift correction (sync if >500ms off)
- [ ] Create `components/game/Timer.tsx` component
- [ ] Add visual progress indicator
- [ ] Implement color transitions (green/yellow/red)
- [ ] Add pulse animation for final 5 seconds
- [ ] Connect Timer to WebSocket updates

**Deliverables**:
```typescript
class ClientTimer {
  sync(serverTime: number, remainingMs: number): void
  getLocalRemainingTime(): number
  startAnimation(onFrame: (remaining: number) => void): void
  stopAnimation(): void
}
```

**Validation**:
- Timer renders at 60fps
- Drift <50ms over 60 seconds
- Smooth countdown animation
- Syncs correctly across clients

---

### 2.4 WebSocket State Sync (Days 31-33)

**Tasks**:
- [ ] Create `lib/websocket/client.ts` wrapper
- [ ] Implement state sync on game actions
- [ ] Add optimistic updates for better UX
- [ ] Handle network latency (display loading states)
- [ ] Implement retry logic for failed messages
- [ ] Add offline mode detection
- [ ] Sync guess submissions in real-time

**Deliverables**:
```typescript
class GameWebSocket {
  connect(gameId: string, playerId: string): Promise<void>
  onGameState(callback: (state) => void): void
  onTimerUpdate(callback: (data) => void): void
  submitGuess(guess: string): void
}
```

**Validation**:
- State updates propagate <100ms
- Guesses appear instantly (optimistic)
- Network errors handled gracefully
- Reconnection works after disconnect

---

### 2.5 Multi-Device Testing (Days 34-35)

**Tasks**:
- [ ] Test on 2+ physical devices simultaneously
- [ ] Verify timer synchronization (±50ms)
- [ ] Test reconnection scenarios
- [ ] Validate state consistency across clients
- [ ] Test poor network conditions (3G simulation)
- [ ] Measure WebSocket message overhead
- [ ] Profile performance on low-end devices

**Deliverables**:
- Multi-device test report
- Network latency measurements
- Performance profile data
- Bug fixes for sync issues

**Validation**:
- ✅ Timer drift <50ms across devices
- ✅ All clients see same game state
- ✅ Reconnection <2 seconds
- ✅ Works on 3G (200ms latency)

---

### Phase 2 Milestone

**Definition of Done**:
- ✅ Server-authoritative timer working
- ✅ WebSocket real-time sync (100ms broadcast)
- ✅ Client timer interpolation (60fps)
- ✅ Timer drift <50ms over 60 seconds
- ✅ Multi-device testing passed
- ✅ Reconnection logic working
- ✅ Fallback to polling functional

**Performance Targets**:
- **Latency**: <100ms message delivery
- **Accuracy**: ±50ms timer sync
- **Frame Rate**: 60fps timer animation
- **Network**: Works on 3G (200ms latency)

**Next Phase**: Integrate real Hungarian word database

---

## Phase 3: Word Database Integration

**Duration**: 1 week  
**Goal**: Load and query 1,000+ Hungarian words from IndexedDB

### 3.1 Word Data Preparation (Days 36-37)

**Tasks**:
- [ ] Source Hungarian words from Wiktionary (5K most common)
- [ ] Categorize words (animals, objects, actions, etc.)
- [ ] Assign difficulty levels (1: easy, 2: medium, 3: hard)
- [ ] Create `data/words/words-hu.json` file
- [ ] Validate JSON schema
- [ ] Add tags for advanced filtering
- [ ] Create word curation script (Node.js)

**Deliverables**:
```json
{
  "version": "1.0",
  "words": [
    {
      "id": "word_001",
      "text": "kutya",
      "category": "animals",
      "difficulty": 1,
      "length": 5,
      "language": "hu",
      "tags": ["domestic", "common", "pet"]
    }
  ]
}
```

**Validation**:
- 1,000+ words categorized
- All words have difficulty assigned
- JSON validates against schema
- No duplicate words

---

### 3.2 IndexedDB Setup (Days 38-39)

**Tasks**:
- [ ] Install Dexie.js (IndexedDB wrapper)
- [ ] Create `lib/database/schema.ts` with Word table
- [ ] Implement database initialization
- [ ] Create indexes (category, difficulty, language)
- [ ] Add migration logic for schema updates
- [ ] Write database tests

**Deliverables**:
```typescript
class WordDatabase extends Dexie {
  words!: Table<Word>
  
  constructor() {
    super('GuessUpDB')
    this.version(1).stores({
      words: 'id, text, category, difficulty, *tags'
    })
  }
}
```

**Validation**:
- Database initializes without errors
- Indexes created successfully
- Queries return results <10ms
- Database persists across sessions

---

### 3.3 Word Service Implementation (Days 40-41)

**Tasks**:
- [ ] Create `lib/database/wordDatabase.ts` service
- [ ] Implement word loading on app startup
- [ ] Add Fisher-Yates shuffle for random selection
- [ ] Implement category/difficulty filtering
- [ ] Add "used word" tracking (session-scoped)
- [ ] Create word search functionality
- [ ] Add word preview for setup screen

**Deliverables**:
```typescript
class WordDatabaseService {
  async initialize(): Promise<void>
  async getRandomWord(category, difficulty, excludeIds): Promise<Word>
  async searchWords(query: string): Promise<Word[]>
}
```

**Validation**:
- Words load in <500ms on first startup
- Random selection is fair (Fisher-Yates)
- No word repeats in single session
- Search returns relevant results

---

### 3.4 Game Integration (Days 42-43)

**Tasks**:
- [ ] Connect word database to game flow
- [ ] Update GameBoard to fetch words from database
- [ ] Add difficulty selector in setup
- [ ] Implement category rotation logic
- [ ] Add word preview in game settings
- [ ] Update WordReveal to use database words
- [ ] Handle empty word database gracefully

**Deliverables**:
- Game uses real Hungarian words
- Difficulty affects word complexity
- Category rotates fairly
- Fallback for missing words

**Validation**:
- All game rounds use database words
- Word difficulty matches selection
- No placeholder words remain
- Error handling for empty database

---

### Phase 3 Milestone

**Definition of Done**:
- ✅ IndexedDB initialized with 1,000+ words
- ✅ Word selection uses Fisher-Yates
- ✅ Category/difficulty filtering works
- ✅ No word repetition in session
- ✅ Database loads <500ms
- ✅ Search functionality working
- ✅ Game fully functional with real words

**Database Performance**:
- **Load Time**: <500ms initial load
- **Query Time**: <10ms per query
- **Storage**: ~500KB for 1,000 words
- **Scalability**: Supports 10,000+ words

**Next Phase**: Polish UI, optimize performance, add animations

---

## Phase 4: Polish & Optimization

**Duration**: 1-2 weeks  
**Goal**: Production-ready experience with animations, accessibility, and performance optimization

### 4.1 Visual Polish (Days 44-46)

**Tasks**:
- [ ] Add animations (Framer Motion)
- [ ] Implement page transitions
- [ ] Add celebration animations (correct guess, round end)
- [ ] Create loading states for all async operations
- [ ] Add micro-interactions (button press, input focus)
- [ ] Implement confetti animation for game winner
- [ ] Add sound effects (optional)
- [ ] Polish timer visual design

**Deliverables**:
- Smooth page transitions (300ms)
- Celebration animations for wins
- Loading spinners for network actions
- Button press feedback

**Validation**:
- Animations run at 60fps
- No janky transitions
- CLS <0.1 maintained

---

### 4.2 Accessibility (Days 47-48)

**Tasks**:
- [ ] Add ARIA labels to all interactive elements
- [ ] Implement keyboard navigation
- [ ] Add focus indicators (visible outlines)
- [ ] Test with screen reader (VoiceOver/TalkBack)
- [ ] Ensure color contrast WCAG AA (4.5:1)
- [ ] Add skip-to-content link
- [ ] Implement reduced motion support
- [ ] Add alt text to icons

**Deliverables**:
- WCAG 2.1 AA compliance
- Keyboard navigation working
- Screen reader support
- Reduced motion mode

**Validation**:
- Lighthouse accessibility score >90
- Tab navigation works on all pages
- Screen reader announces content correctly
- Color contrast passes automated tests

---

### 4.3 Performance Optimization (Days 49-50)

**Tasks**:
- [ ] Run Lighthouse audit
- [ ] Optimize bundle size (code splitting)
- [ ] Implement image optimization (next/image)
- [ ] Add lazy loading for non-critical components
- [ ] Optimize Canvas rendering (React.memo)
- [ ] Minify CSS/JS for production
- [ ] Add service worker for offline support (PWA)
- [ ] Implement caching strategy

**Deliverables**:
- Lighthouse score >90 (all categories)
- Bundle size <500KB initial
- LCP <2.5s on 3G
- PWA installable

**Validation**:
- Core Web Vitals targets met
- Bundle analysis shows optimizations
- Works offline (cached assets)

---

### 4.4 Error Handling & Edge Cases (Days 51-52)

**Tasks**:
- [ ] Add ErrorBoundary components
- [ ] Implement graceful error messages
- [ ] Handle network disconnections
- [ ] Add retry logic for failed operations
- [ ] Validate all user inputs
- [ ] Handle empty game states
- [ ] Add timeout handling for long operations
- [ ] Implement fallback UI for errors

**Deliverables**:
- Comprehensive error handling
- User-friendly error messages
- Automatic retry for recoverable errors
- Fallback UI for critical errors

**Validation**:
- App doesn't crash on errors
- Users understand error messages
- Retry logic works correctly
- Network failures handled gracefully

---

### 4.5 Testing & Quality Assurance (Days 53-56)

**Tasks**:
- [ ] Write unit tests (Vitest) - 80% coverage
- [ ] Write integration tests - 70% coverage
- [ ] Write E2E tests (Playwright) - critical paths
- [ ] Test on multiple devices (iOS, Android, Desktop)
- [ ] Test on multiple browsers (Chrome, Safari, Firefox)
- [ ] Performance testing (3G, slow CPU)
- [ ] Security audit (XSS, CSRF prevention)
- [ ] Accessibility audit (manual + automated)

**Deliverables**:
- Test suite with 80%+ coverage
- E2E tests for critical flows
- Multi-device test report
- Security audit report

**Validation**:
- All tests passing
- No critical bugs
- Performance targets met
- Security vulnerabilities addressed

---

### Phase 4 Milestone

**Definition of Done**:
- ✅ Visual polish complete (animations, transitions)
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Core Web Vitals targets met (LCP, INP, CLS)
- ✅ 80%+ test coverage (unit + integration)
- ✅ E2E tests passing
- ✅ Multi-device/browser testing complete
- ✅ Error handling comprehensive
- ✅ PWA installable (offline support)

**Quality Metrics**:
- **Lighthouse Score**: >90 (all categories)
- **Test Coverage**: >80%
- **Bundle Size**: <500KB initial
- **Accessibility**: WCAG 2.1 AA
- **Performance**: LCP <2.5s, INP <100ms, CLS <0.1

**Next Phase**: Production deployment

---

## Dependencies & Blockers

### Critical Dependencies

| Task | Depends On | Blocker Risk |
|------|-----------|--------------|
| **Timer Sync** | WebSocket server | High - technical complexity |
| **Word Database** | IndexedDB setup | Low - straightforward |
| **Multi-Device Testing** | Timer sync complete | Medium - requires infrastructure |
| **Performance Optimization** | All features complete | Low - final step |

### External Dependencies

| Dependency | Purpose | Risk | Mitigation |
|------------|---------|------|------------|
| **Vercel** | Deployment platform | Low | Use Railway/Render as backup |
| **Word Sources** | Hungarian word data | Low | Curate manually if needed |
| **socket.io** | WebSocket library | Low | Use native WebSocket API as fallback |
| **IndexedDB** | Word storage | Low | Use localStorage for smaller dataset |

### Risk Mitigation

**High Risk: Timer Synchronization**
- **Risk**: Complex to implement, potential for bugs
- **Mitigation**: Implement fallback to client-side timer
- **Testing**: Multi-device testing early and often
- **Backup Plan**: Manual round advancement button

**Medium Risk: Multi-Device Testing**
- **Risk**: Requires multiple physical devices
- **Mitigation**: Use BrowserStack for remote testing
- **Testing**: Test on emulators first
- **Backup Plan**: Focus on single-device experience initially

---

## Effort Estimation

### Development Hours by Phase

| Phase | Tasks | Estimated Hours | Complexity |
|-------|-------|----------------|------------|
| **Phase 1: Core Game Loop** | 8 sub-phases | 120-160 hours | Medium |
| **Phase 2: Timer Sync** | 5 sub-phases | 60-80 hours | High |
| **Phase 3: Word Database** | 4 sub-phases | 30-40 hours | Low |
| **Phase 4: Polish & Optimization** | 5 sub-phases | 60-80 hours | Medium |
| **Total** | 22 sub-phases | **270-360 hours** | |

### Timeline by Team Size

| Team Size | Total Duration | Working Weeks |
|-----------|----------------|---------------|
| **1 Developer (full-time)** | 7-9 weeks | 7-9 weeks |
| **2 Developers (full-time)** | 4-5 weeks | 4-5 weeks |
| **3 Developers (full-time)** | 3-4 weeks | 3-4 weeks |

**Assumptions**:
- Full-time = 40 hours/week
- Includes testing, code review, documentation
- Excludes deployment and DevOps setup

---

## Testing Strategy

### Unit Testing (Vitest)

**Target**: 80% code coverage

**Focus Areas**:
- Game logic (scoring, turn rotation, randomization)
- State management (Zustand actions)
- Timer synchronization (server + client)
- Word database queries
- Utility functions

**Example**:
```typescript
import { describe, it, expect } from 'vitest'
import { fisherYatesShuffle } from '@/lib/game/randomization'

describe('fisherYatesShuffle', () => {
  it('returns array with same elements', () => {
    const input = [1, 2, 3, 4, 5]
    const output = fisherYatesShuffle(input)
    expect(output).toHaveLength(5)
    expect(output.sort()).toEqual(input.sort())
  })
})
```

---

### Integration Testing

**Target**: 70% coverage of critical flows

**Focus Areas**:
- Game flow (setup → lobby → play → results)
- WebSocket communication (client ↔ server)
- State synchronization across clients
- Database operations (load → query → select)

**Example**:
```typescript
import { describe, it, expect } from 'vitest'
import { useGameStore } from '@/stores/gameStore'

describe('Game Flow Integration', () => {
  it('progresses through game phases', () => {
    const store = useGameStore.getState()
    
    store.setGamePhase('setup')
    store.addPlayer({ id: '1', name: 'Player 1' })
    store.setGamePhase('lobby')
    expect(store.gamePhase).toBe('lobby')
    expect(store.players).toHaveLength(1)
  })
})
```

---

### E2E Testing (Playwright)

**Target**: 100% of critical user paths

**Critical Paths**:
1. Create game → Add players → Start game → Play round → View results
2. Join existing game → Wait in lobby → Participate in round
3. Submit guess → See feedback → Earn points
4. Complete all rounds → See final scores → Replay

**Example**:
```typescript
import { test, expect } from '@playwright/test'

test('complete game flow', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.click('text=New Game')
  
  // Setup
  await page.fill('[name="player1"]', 'Alice')
  await page.click('text=Start Game')
  
  // Play round
  await expect(page.locator('[data-testid="timer"]')).toBeVisible()
  await page.fill('[name="guess"]', 'kutya')
  await page.click('text=Submit')
  
  // Results
  await expect(page.locator('text=Round 1 Complete')).toBeVisible()
})
```

---

### Performance Testing

**Tools**: Lighthouse, WebPageTest, Chrome DevTools

**Metrics**:
- **LCP**: <2.5s on 3G
- **INP**: <100ms
- **CLS**: <0.1
- **Bundle Size**: <500KB initial
- **Timer Accuracy**: ±50ms

**Testing Procedure**:
1. Run Lighthouse audit (mobile + desktop)
2. Test on slow 3G (Chrome DevTools throttling)
3. Profile with Performance tab (identify bottlenecks)
4. Measure WebSocket latency (network tab)
5. Test on low-end device (old Android/iPhone)

---

## Deployment Plan

### Phase 1: Development Deployment

**Platform**: Vercel (preview deployments)

**Setup**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy preview
vercel

# Deploy production
vercel --prod
```

**Configuration**:
- Automatic deployments on Git push
- Preview URLs for pull requests
- Environment variables (WebSocket URL)

---

### Phase 2: Production Deployment

**Platform**: Vercel (Next.js optimized)

**Requirements**:
- Custom domain (optional)
- SSL certificate (automatic)
- Environment variables
- WebSocket server (same or separate)

**Deployment Checklist**:
- [ ] Build passes without errors
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] Performance audit passed (Lighthouse >90)
- [ ] Security headers configured
- [ ] Analytics integrated (Google Analytics / Plausible)
- [ ] Error monitoring (Sentry)
- [ ] Uptime monitoring (UptimeRobot)

---

### Monitoring & Observability

**Tools**:
- **Error Tracking**: Sentry (client + server errors)
- **Analytics**: Google Analytics or Plausible (privacy-focused)
- **Uptime**: UptimeRobot (free tier)
- **Performance**: Vercel Analytics (Core Web Vitals)

**Alerts**:
- Error rate >1%
- Response time >500ms
- Uptime <99.9%
- Core Web Vitals failing

---

## Implementation Roadmap Summary

### Timeline Overview

```
Week 1-3:  Phase 1 (Core Game Loop)
Week 4-5:  Phase 2 (Timer Sync)
Week 6:    Phase 3 (Word Database)
Week 7-8:  Phase 4 (Polish & Optimization)
───────────────────────────────────────
Total:     5-8 weeks (270-360 hours)
```

### Key Milestones

| Week | Milestone | Deliverable |
|------|-----------|-------------|
| **3** | Phase 1 Complete | Playable game (single device) |
| **5** | Phase 2 Complete | Real-time multiplayer working |
| **6** | Phase 3 Complete | Real Hungarian words integrated |
| **8** | Phase 4 Complete | Production-ready MVP |

### Success Metrics

**MVP Launch Criteria**:
- ✅ Core game loop functional (setup → play → results)
- ✅ Timer synchronization <50ms drift
- ✅ 1,000+ Hungarian words in database
- ✅ Mobile responsive (320px-600px)
- ✅ Core Web Vitals targets met
- ✅ 80% test coverage
- ✅ WCAG 2.1 AA compliance
- ✅ Multi-device testing passed

**Confidence Level**: 95% (based on proven patterns + phased approach)

**Status**: ✅ Implementation Roadmap Complete  
**Next**: Data Models, Risk Assessment documents

---

**Ready for Development**  
Architecture complete, roadmap defined, ready to start Phase 1 implementation.
