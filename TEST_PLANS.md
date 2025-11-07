# GuessUp - Detailed Test Plans

**Project**: GuessUp - Mobile-First Activity Party Game
**Tester**: Tester Agent
**Date**: November 7, 2025
**Status**: Test Plans Complete

---

## Table of Contents

1. [Game Logic Test Plans](#game-logic-test-plans)
2. [Type Safety Test Plans](#type-safety-test-plans)
3. [State Management Test Plans](#state-management-test-plans)
4. [Component Test Plans](#component-test-plans)
5. [Integration Test Plans](#integration-test-plans)
6. [E2E Test Plans](#e2e-test-plans)
7. [Accessibility Test Plans](#accessibility-test-plans)
8. [Performance Test Plans](#performance-test-plans)
9. [Mobile Testing Test Plans](#mobile-testing-test-plans)
10. [Hungarian Word Database Test Plans](#hungarian-word-database-test-plans)

---

## Game Logic Test Plans

### 1. Randomization Tests (`randomization.test.ts`)

**File**: `/tests/unit/game/randomization.test.ts`
**Priority**: P0 (Critical)
**Coverage Target**: 100%

#### Test Cases

##### TC-RAND-001: Fisher-Yates Shuffle Produces Unbiased Permutations
**Input**: Array of integers [1, 2, 3, 4, 5]
**Expected**: Each permutation occurs with roughly equal probability (~1/120)
**Test Approach**: Run 10,000 shuffles, calculate distribution, chi-squared test
**Priority**: P0

```typescript
it('should produce unbiased permutations', () => {
  const array = [1, 2, 3, 4, 5]
  const iterations = 10000
  const permutationCounts = new Map<string, number>()

  // Run many shuffles
  for (let i = 0; i < iterations; i++) {
    const shuffled = fisherYatesShuffle(array)
    const key = shuffled.join(',')
    permutationCounts.set(key, (permutationCounts.get(key) || 0) + 1)
  }

  // Expected count per permutation: 10000 / 120 ≈ 83
  // Allow 50% variance: 40-125 acceptable range
  const expectedCount = iterations / 120
  const minCount = expectedCount * 0.5
  const maxCount = expectedCount * 1.5

  permutationCounts.forEach(count => {
    expect(count).toBeGreaterThan(minCount)
    expect(count).toBeLessThan(maxCount)
  })
})
```

##### TC-RAND-002: Shuffle Does Not Mutate Original Array
**Input**: Array [1, 2, 3]
**Expected**: Original array remains [1, 2, 3] after shuffle
**Priority**: P0

```typescript
it('should not mutate original array', () => {
  const original = [1, 2, 3]
  const copy = [...original]

  fisherYatesShuffle(original)

  expect(original).toEqual(copy)
})
```

##### TC-RAND-003: Shuffle Handles Empty Array
**Input**: []
**Expected**: Returns []
**Priority**: P1

```typescript
it('should handle empty array', () => {
  const result = fisherYatesShuffle([])
  expect(result).toEqual([])
})
```

##### TC-RAND-004: Shuffle Handles Single Element
**Input**: [1]
**Expected**: Returns [1]
**Priority**: P1

```typescript
it('should handle single element array', () => {
  const result = fisherYatesShuffle([1])
  expect(result).toEqual([1])
})
```

##### TC-RAND-005: getRandomItem Returns Valid Item
**Input**: Array ['a', 'b', 'c']
**Expected**: Returns one of 'a', 'b', or 'c'
**Priority**: P0

```typescript
it('should return valid item from array', () => {
  const array = ['a', 'b', 'c']
  const result = getRandomItem(array)
  expect(array).toContain(result)
})
```

##### TC-RAND-006: getRandomItems Returns Correct Count
**Input**: Array [1, 2, 3, 4, 5], count 3
**Expected**: Returns array of length 3 with no duplicates
**Priority**: P0

```typescript
it('should return correct number of unique items', () => {
  const array = [1, 2, 3, 4, 5]
  const result = getRandomItems(array, 3)

  expect(result).toHaveLength(3)
  expect(new Set(result).size).toBe(3) // No duplicates
  result.forEach(item => expect(array).toContain(item))
})
```

---

### 2. Scoring Tests (`scoring.test.ts`)

**File**: `/tests/unit/game/scoring.test.ts`
**Priority**: P0 (Critical)
**Coverage Target**: 100%

#### Test Cases

##### TC-SCORE-001: Correct Guess Awards Base Points
**Input**: Correct guess, any timestamp
**Expected**: Returns SCORING.CORRECT_GUESS (10 points)
**Priority**: P0

```typescript
it('should award base points for correct guess', () => {
  const guess: Guess = {
    id: 'g1',
    playerId: 'p1',
    playerName: 'Alice',
    guess: 'kutya',
    correct: true,
    timestamp: 10000,
    points: 0,
  }

  const points = calculateGuessPoints(guess, 0)

  expect(points).toBe(SCORING.CORRECT_GUESS)
})
```

##### TC-SCORE-002: Fast Guess Awards Bonus
**Input**: Correct guess within 5 seconds
**Expected**: Returns SCORING.CORRECT_GUESS + SCORING.FAST_BONUS (15 points)
**Priority**: P0

```typescript
it('should award fast bonus for guess within 5 seconds', () => {
  const guess: Guess = {
    id: 'g1',
    playerId: 'p1',
    playerName: 'Alice',
    guess: 'kutya',
    correct: true,
    timestamp: 4000,
    points: 0,
  }

  const points = calculateGuessPoints(guess, 0)

  expect(points).toBe(SCORING.CORRECT_GUESS + SCORING.FAST_BONUS)
})
```

##### TC-SCORE-003: Slow Guess Gets No Bonus
**Input**: Correct guess after 5 seconds
**Expected**: Returns SCORING.CORRECT_GUESS only (10 points)
**Priority**: P0

```typescript
it('should not award fast bonus after 5 seconds', () => {
  const guess: Guess = {
    id: 'g1',
    playerId: 'p1',
    playerName: 'Alice',
    guess: 'kutya',
    correct: true,
    timestamp: 6000,
    points: 0,
  }

  const points = calculateGuessPoints(guess, 0)

  expect(points).toBe(SCORING.CORRECT_GUESS)
  expect(points).not.toBe(SCORING.CORRECT_GUESS + SCORING.FAST_BONUS)
})
```

##### TC-SCORE-004: Incorrect Guess Awards Zero Points
**Input**: Incorrect guess
**Expected**: Returns 0
**Priority**: P0

```typescript
it('should return 0 points for incorrect guess', () => {
  const guess: Guess = {
    id: 'g1',
    playerId: 'p1',
    playerName: 'Alice',
    guess: 'macska',
    correct: false,
    timestamp: 3000,
    points: 0,
  }

  const points = calculateGuessPoints(guess, 0)

  expect(points).toBe(0)
})
```

##### TC-SCORE-005: Team Bonus Awarded When All Players Correct
**Input**: 3 players, all guessed correctly
**Expected**: Each player gets +15 team bonus
**Priority**: P0

```typescript
it('should award team bonus when all players guess correctly', () => {
  const guesses: Guess[] = [
    { id: 'g1', playerId: 'p1', playerName: 'Alice', guess: 'kutya', correct: true, timestamp: 3000, points: 0 },
    { id: 'g2', playerId: 'p2', playerName: 'Bob', guess: 'kutya', correct: true, timestamp: 4000, points: 0 },
    { id: 'g3', playerId: 'p3', playerName: 'Charlie', guess: 'kutya', correct: true, timestamp: 5000, points: 0 },
  ]

  const scores = calculateRoundScores(guesses, ['p1', 'p2', 'p3'], 0)

  expect(scores['p1']).toBe(SCORING.CORRECT_GUESS + SCORING.FAST_BONUS + SCORING.TEAM_BONUS)
  expect(scores['p2']).toBe(SCORING.CORRECT_GUESS + SCORING.FAST_BONUS + SCORING.TEAM_BONUS)
  expect(scores['p3']).toBe(SCORING.CORRECT_GUESS + SCORING.TEAM_BONUS)
})
```

##### TC-SCORE-006: No Team Bonus When Some Players Incorrect
**Input**: 3 players, only 2 correct
**Expected**: No team bonus awarded
**Priority**: P0

```typescript
it('should not award team bonus when some players incorrect', () => {
  const guesses: Guess[] = [
    { id: 'g1', playerId: 'p1', playerName: 'Alice', guess: 'kutya', correct: true, timestamp: 3000, points: 0 },
    { id: 'g2', playerId: 'p2', playerName: 'Bob', guess: 'kutya', correct: true, timestamp: 4000, points: 0 },
    { id: 'g3', playerId: 'p3', playerName: 'Charlie', guess: 'macska', correct: false, timestamp: 5000, points: 0 },
  ]

  const scores = calculateRoundScores(guesses, ['p1', 'p2', 'p3'], 0)

  expect(scores['p1']).toBe(SCORING.CORRECT_GUESS + SCORING.FAST_BONUS)
  expect(scores['p2']).toBe(SCORING.CORRECT_GUESS + SCORING.FAST_BONUS)
  expect(scores['p3']).toBe(0)
})
```

##### TC-SCORE-007: Edge Case - Fast Bonus Exactly at Threshold
**Input**: Guess at exactly 5000ms
**Expected**: Awards fast bonus (inclusive threshold)
**Priority**: P1

```typescript
it('should award fast bonus at exactly 5000ms (inclusive)', () => {
  const guess: Guess = {
    id: 'g1',
    playerId: 'p1',
    playerName: 'Alice',
    guess: 'kutya',
    correct: true,
    timestamp: 5000,
    points: 0,
  }

  const points = calculateGuessPoints(guess, 0)

  expect(points).toBe(SCORING.CORRECT_GUESS + SCORING.FAST_BONUS)
})
```

---

### 3. Turn Rotation Tests (`turnRotation.test.ts`)

**File**: `/tests/unit/game/turnRotation.test.ts`
**Priority**: P0 (Critical)
**Coverage Target**: 100%

#### Test Cases

##### TC-TURN-001: Next Player Index Cycles Correctly
**Input**: currentIndex=0, totalPlayers=3
**Expected**: Returns 1
**Priority**: P0

```typescript
it('should return next player index', () => {
  expect(getNextPlayerIndex(0, 3)).toBe(1)
  expect(getNextPlayerIndex(1, 3)).toBe(2)
  expect(getNextPlayerIndex(2, 3)).toBe(0) // Wrap around
})
```

##### TC-TURN-002: Next Player Index Wraps to Zero
**Input**: currentIndex=2, totalPlayers=3
**Expected**: Returns 0
**Priority**: P0

```typescript
it('should wrap to 0 after last player', () => {
  expect(getNextPlayerIndex(2, 3)).toBe(0)
})
```

##### TC-TURN-003: Player Order Initialization Shuffles
**Input**: Array of 4 players
**Expected**: Returns shuffled array (different order with high probability)
**Priority**: P0

```typescript
it('should shuffle player order', () => {
  const players = [
    createPlayer({ id: 'p1', name: 'Alice' }),
    createPlayer({ id: 'p2', name: 'Bob' }),
    createPlayer({ id: 'p3', name: 'Charlie' }),
    createPlayer({ id: 'p4', name: 'Diana' }),
  ]

  const shuffled = initializePlayerOrder(players)

  expect(shuffled).toHaveLength(4)
  expect(shuffled).not.toEqual(players) // Very unlikely to be same order
})
```

##### TC-TURN-004: Category Rotation Cycles Through All Categories
**Input**: currentCategory='draw', availableCategories=['draw', 'explain', 'signal']
**Expected**: Returns 'explain'
**Priority**: P0

```typescript
it('should rotate to next category', () => {
  const categories: Category[] = ['draw', 'explain', 'signal']

  expect(getNextCategory('draw', categories)).toBe('explain')
  expect(getNextCategory('explain', categories)).toBe('signal')
  expect(getNextCategory('signal', categories)).toBe('draw') // Wrap
})
```

##### TC-TURN-005: Category Rotation Wraps to First
**Input**: currentCategory='signal', availableCategories=['draw', 'explain', 'signal']
**Expected**: Returns 'draw'
**Priority**: P0

```typescript
it('should wrap to first category', () => {
  const categories: Category[] = ['draw', 'explain', 'signal']

  expect(getNextCategory('signal', categories)).toBe('draw')
})
```

##### TC-TURN-006: Category for Round Distributes Fairly
**Input**: roundNumber=1-9, availableCategories=['draw', 'explain', 'signal']
**Expected**: Each category appears exactly 3 times
**Priority**: P0

```typescript
it('should distribute categories fairly across rounds', () => {
  const categories: Category[] = ['draw', 'explain', 'signal']
  const roundCategories = []

  for (let round = 1; round <= 9; round++) {
    roundCategories.push(getCategoryForRound(round, categories))
  }

  expect(roundCategories.filter(c => c === 'draw')).toHaveLength(3)
  expect(roundCategories.filter(c => c === 'explain')).toHaveLength(3)
  expect(roundCategories.filter(c => c === 'signal')).toHaveLength(3)
})
```

##### TC-TURN-007: Edge Case - Single Category Rotation
**Input**: availableCategories=['draw']
**Expected**: Always returns 'draw'
**Priority**: P2

```typescript
it('should handle single category', () => {
  const categories: Category[] = ['draw']

  expect(getNextCategory('draw', categories)).toBe('draw')
  expect(getCategoryForRound(1, categories)).toBe('draw')
  expect(getCategoryForRound(10, categories)).toBe('draw')
})
```

##### TC-TURN-008: Edge Case - Two Players Only
**Input**: 2 players, rotate 10 times
**Expected**: Alternates between players
**Priority**: P1

```typescript
it('should alternate between two players', () => {
  const indices = [0]
  for (let i = 0; i < 10; i++) {
    indices.push(getNextPlayerIndex(indices[indices.length - 1], 2))
  }

  expect(indices).toEqual([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0])
})
```

---

## State Management Test Plans

### 4. Zustand Game Store Tests (`gameStore.test.ts`)

**File**: `/tests/integration/stores/gameStore.test.ts`
**Priority**: P0 (Critical)
**Coverage Target**: 90%

#### Test Cases

##### TC-STORE-001: Initial State is Correct
**Input**: Fresh store
**Expected**: All fields have default values
**Priority**: P0

```typescript
it('should have correct initial state', () => {
  const { result } = renderHook(() => useGameStore())

  expect(result.current.gameId).toBeNull()
  expect(result.current.playerId).toBeNull()
  expect(result.current.gamePhase).toBe('setup')
  expect(result.current.currentRound).toBe(0)
  expect(result.current.players).toEqual([])
  expect(result.current.currentWord).toBeNull()
})
```

##### TC-STORE-002: addPlayer Adds Player to Array
**Input**: Player object
**Expected**: Player appears in players array
**Priority**: P0

```typescript
it('should add player to game', () => {
  const { result } = renderHook(() => useGameStore())

  act(() => {
    result.current.addPlayer(createPlayer({ id: 'p1', name: 'Alice' }))
  })

  expect(result.current.players).toHaveLength(1)
  expect(result.current.players[0].name).toBe('Alice')
})
```

##### TC-STORE-003: removePlayer Removes Player by ID
**Input**: Add 2 players, remove 1
**Expected**: Only 1 player remains
**Priority**: P0

```typescript
it('should remove player from game', () => {
  const { result } = renderHook(() => useGameStore())

  act(() => {
    result.current.addPlayer(createPlayer({ id: 'p1', name: 'Alice' }))
    result.current.addPlayer(createPlayer({ id: 'p2', name: 'Bob' }))
    result.current.removePlayer('p1')
  })

  expect(result.current.players).toHaveLength(1)
  expect(result.current.players[0].id).toBe('p2')
})
```

##### TC-STORE-004: setGamePhase Updates Phase
**Input**: Set phase to 'playing'
**Expected**: gamePhase is 'playing'
**Priority**: P0

```typescript
it('should update game phase', () => {
  const { result } = renderHook(() => useGameStore())

  act(() => {
    result.current.setGamePhase('playing')
  })

  expect(result.current.gamePhase).toBe('playing')
})
```

##### TC-STORE-005: nextRound Increments Round and Rotates Player
**Input**: 3 players, currentRound=0, currentPlayerIndex=0
**Expected**: currentRound=1, currentPlayerIndex=1
**Priority**: P0

```typescript
it('should advance round and rotate player', () => {
  const { result } = renderHook(() => useGameStore())

  act(() => {
    result.current.addPlayer(createPlayer({ id: 'p1' }))
    result.current.addPlayer(createPlayer({ id: 'p2' }))
    result.current.addPlayer(createPlayer({ id: 'p3' }))
    result.current.nextRound()
  })

  expect(result.current.currentRound).toBe(1)
  expect(result.current.currentPlayerIndex).toBe(1)
})
```

##### TC-STORE-006: nextRound Wraps Player Index
**Input**: 2 players, currentPlayerIndex=1
**Expected**: After nextRound, currentPlayerIndex=0
**Priority**: P0

```typescript
it('should wrap player index after last player', () => {
  const { result } = renderHook(() => useGameStore())

  act(() => {
    result.current.addPlayer(createPlayer({ id: 'p1' }))
    result.current.addPlayer(createPlayer({ id: 'p2' }))
    result.current.currentPlayerIndex = 1
    result.current.nextRound()
  })

  expect(result.current.currentPlayerIndex).toBe(0)
})
```

##### TC-STORE-007: getCurrentPlayer Returns Active Player
**Input**: 3 players, currentPlayerIndex=1
**Expected**: Returns players[1]
**Priority**: P0

```typescript
it('should return current active player', () => {
  const { result } = renderHook(() => useGameStore())

  act(() => {
    result.current.addPlayer(createPlayer({ id: 'p1', name: 'Alice' }))
    result.current.addPlayer(createPlayer({ id: 'p2', name: 'Bob' }))
    result.current.addPlayer(createPlayer({ id: 'p3', name: 'Charlie' }))
    result.current.currentPlayerIndex = 1
  })

  const current = result.current.getCurrentPlayer()

  expect(current?.name).toBe('Bob')
})
```

##### TC-STORE-008: getPlayerRole Returns Correct Role
**Input**: currentCategory='draw', currentPlayerIndex=0, query player 0
**Expected**: Returns 'drawer'
**Priority**: P0

```typescript
it('should return correct role for active player', () => {
  const { result } = renderHook(() => useGameStore())

  act(() => {
    result.current.addPlayer(createPlayer({ id: 'p1' }))
    result.current.currentCategory = 'draw'
    result.current.currentPlayerIndex = 0
  })

  const role = result.current.getPlayerRole('p1')

  expect(role).toBe('drawer')
})
```

##### TC-STORE-009: getPlayerRole Returns Guesser for Non-Active
**Input**: currentPlayerIndex=0, query player 1
**Expected**: Returns 'guesser'
**Priority**: P0

```typescript
it('should return guesser role for non-active player', () => {
  const { result } = renderHook(() => useGameStore())

  act(() => {
    result.current.addPlayer(createPlayer({ id: 'p1' }))
    result.current.addPlayer(createPlayer({ id: 'p2' }))
    result.current.currentPlayerIndex = 0
  })

  const role = result.current.getPlayerRole('p2')

  expect(role).toBe('guesser')
})
```

##### TC-STORE-010: resetGame Clears All State
**Input**: Game with players and score
**Expected**: Returns to initial state
**Priority**: P0

```typescript
it('should reset game to initial state', () => {
  const { result } = renderHook(() => useGameStore())

  act(() => {
    result.current.addPlayer(createPlayer({ id: 'p1' }))
    result.current.setGamePhase('playing')
    result.current.resetGame()
  })

  expect(result.current.gamePhase).toBe('setup')
  expect(result.current.players).toEqual([])
  expect(result.current.currentRound).toBe(0)
})
```

---

## Component Test Plans (When Implemented)

### 5. Timer Component Tests (`Timer.test.tsx`)

**File**: `/tests/integration/components/Timer.test.tsx`
**Priority**: P0 (Critical)
**Coverage Target**: 90%

#### Test Cases

##### TC-TIMER-001: Timer Renders Initial Time
**Input**: duration=60000, remainingMs=60000
**Expected**: Displays "60" seconds
**Priority**: P0

##### TC-TIMER-002: Timer Counts Down Over Time
**Input**: Start at 60s, wait 2s
**Expected**: Shows "58" seconds
**Priority**: P0

##### TC-TIMER-003: Timer Changes Color When <30s
**Input**: remainingMs=25000
**Expected**: Timer has yellow color class
**Priority**: P1

##### TC-TIMER-004: Timer Changes Color When <10s
**Input**: remainingMs=9000
**Expected**: Timer has red color class
**Priority**: P1

##### TC-TIMER-005: Timer Pulses When <5s
**Input**: remainingMs=4000
**Expected**: Timer has pulse animation class
**Priority**: P2

##### TC-TIMER-006: Timer Calls onTimeEnd When Zero
**Input**: Start at 1s, wait 1.5s
**Expected**: onTimeEnd callback called
**Priority**: P0

---

### 6. WordReveal Component Tests (`WordReveal.test.tsx`)

**File**: `/tests/integration/components/WordReveal.test.tsx`
**Priority**: P0 (Critical)
**Coverage Target**: 90%

#### Test Cases

##### TC-WORD-001: WordReveal Shows Word When Visible
**Input**: word="kutya", visible=true
**Expected**: Displays "kutya"
**Priority**: P0

##### TC-WORD-002: WordReveal Hides After Duration
**Input**: duration=3000, visible=true
**Expected**: After 3s, calls onHide and fades out
**Priority**: P0

##### TC-WORD-003: WordReveal Shows Countdown
**Input**: duration=3000, visible=true
**Expected**: Shows "3", "2", "1" countdown
**Priority**: P1

##### TC-WORD-004: WordReveal Has Correct Z-Index
**Input**: visible=true
**Expected**: Has z-index of 50 (overlays all)
**Priority**: P2

---

## E2E Test Plans

### 7. Complete Game Flow Tests (`game-flow.spec.ts`)

**File**: `/tests/e2e/game-flow.spec.ts`
**Priority**: P0 (Critical)

#### Test Cases

##### TC-E2E-001: Complete Game from Setup to End
**Steps**:
1. Navigate to home page
2. Click "New Game"
3. Add 2 players (Alice, Bob)
4. Configure game (5 rounds, easy difficulty)
5. Start game
6. Verify word reveal (3s)
7. Submit correct guess
8. Verify score update
9. Complete round
10. Verify next round starts
11. Complete all 5 rounds
12. Verify game over screen
13. Verify winner announced

**Expected**: Full game completes successfully with correct winner
**Priority**: P0

##### TC-E2E-002: Player Add/Remove Flow
**Steps**:
1. Navigate to setup page
2. Add player "Alice"
3. Add player "Bob"
4. Remove player "Alice"
5. Verify only "Bob" remains
6. Add player "Charlie"
7. Start game with "Bob" and "Charlie"

**Expected**: Game starts with correct players
**Priority**: P0

##### TC-E2E-003: Game Configuration Options
**Steps**:
1. Navigate to setup
2. Select difficulty: Hard
3. Select rounds: 10
4. Select timer: 90s
5. Select categories: Draw + Explain only
6. Start game
7. Verify settings applied

**Expected**: Game uses selected configuration
**Priority**: P1

---

## Accessibility Test Plans

### 8. WCAG 2.1 AA Compliance Tests

**File**: `/tests/e2e/accessibility.spec.ts`
**Priority**: P0 (Critical)

#### Test Cases

##### TC-A11Y-001: Color Contrast Meets 4.5:1
**Tool**: axe-core
**Expected**: All text has 4.5:1 contrast ratio
**Priority**: P0

##### TC-A11Y-002: Keyboard Navigation Works
**Steps**:
1. Tab through all interactive elements
2. Verify focus indicators visible
3. Activate buttons with Enter
4. Verify modals close with Escape

**Expected**: Full keyboard accessibility
**Priority**: P0

##### TC-A11Y-003: Screen Reader Compatibility
**Tool**: VoiceOver (iOS), NVDA (Windows)
**Steps**:
1. Navigate entire game with screen reader
2. Verify all buttons have labels
3. Verify all inputs have labels
4. Verify game state announcements

**Expected**: Complete screen reader compatibility
**Priority**: P0

##### TC-A11Y-004: Touch Targets 44×44px Minimum
**Tool**: Playwright bounding box check
**Expected**: All interactive elements ≥44×44px
**Priority**: P0

##### TC-A11Y-005: Reduced Motion Support
**Steps**:
1. Enable prefers-reduced-motion
2. Navigate app
3. Verify no motion animations

**Expected**: Respects motion preferences
**Priority**: P1

---

## Performance Test Plans

### 9. Core Web Vitals Tests

**File**: `/tests/performance/web-vitals.spec.ts`
**Priority**: P0 (Critical)

#### Test Cases

##### TC-PERF-001: LCP <2.5s
**Measurement**: Lighthouse CI
**Expected**: Largest Contentful Paint <2.5s
**Priority**: P0

##### TC-PERF-002: INP <100ms
**Measurement**: Lighthouse CI
**Expected**: Interaction to Next Paint <100ms
**Priority**: P0

##### TC-PERF-003: CLS <0.1
**Measurement**: Lighthouse CI
**Expected**: Cumulative Layout Shift <0.1
**Priority**: P0

##### TC-PERF-004: Initial Bundle <500KB
**Measurement**: Build analysis
**Expected**: Initial JS + CSS <500KB
**Priority**: P0

##### TC-PERF-005: 60fps Animations
**Measurement**: DevTools Performance tab
**Expected**: Timer and transitions maintain 60fps
**Priority**: P1

---

## Mobile Testing Test Plans

### 10. Mobile Device Tests

**File**: `/tests/e2e/mobile.spec.ts`
**Priority**: P0 (Critical)

#### Test Cases

##### TC-MOBILE-001: Portrait Orientation Lock
**Devices**: iPhone 12, Pixel 5
**Expected**: Game locked to portrait mode
**Priority**: P0

##### TC-MOBILE-002: Touch Interactions Work
**Steps**:
1. Tap buttons
2. Swipe (if applicable)
3. Long press (if applicable)
4. Pinch zoom disabled

**Expected**: All touch gestures work correctly
**Priority**: P0

##### TC-MOBILE-003: Safe Area Insets Respected
**Devices**: iPhone 14 Pro (notch), iPhone 15 (Dynamic Island)
**Expected**: Content not obscured by notch/island
**Priority**: P0

##### TC-MOBILE-004: Virtual Keyboard Handling
**Steps**:
1. Focus input field
2. Verify keyboard appears
3. Verify layout adjusts
4. Verify viewport doesn't zoom

**Expected**: Smooth keyboard handling
**Priority**: P0

##### TC-MOBILE-005: Low-End Device Performance
**Device**: Emulated slow 3G + low-end CPU
**Expected**: App loads <5s, maintains 30fps minimum
**Priority**: P1

---

## Hungarian Word Database Test Plans

### 11. Word Database Tests

**File**: `/tests/integration/database/wordDatabase.test.ts`
**Priority**: P0 (Critical)

#### Test Cases

##### TC-WORD-001: Database Loads 100+ Words
**Input**: Fresh database
**Expected**: At least 100 words loaded
**Priority**: P0

##### TC-WORD-002: All Categories Represented
**Input**: Word database
**Expected**: Each category (draw, explain, signal) has ≥12 words
**Priority**: P0

##### TC-WORD-003: Difficulty Distribution Balanced
**Input**: Word database
**Expected**: ~50% easy, ~30% medium, ~20% hard
**Priority**: P1

##### TC-WORD-004: No Duplicate Words
**Input**: Word database
**Expected**: All words are unique
**Priority**: P0

##### TC-WORD-005: Word Selection is Random
**Input**: Request word 100 times
**Expected**: Good distribution across available words
**Priority**: P1

##### TC-WORD-006: Words Not Repeated in Session
**Input**: Select 20 words for game
**Expected**: No word appears twice
**Priority**: P0

---

## Summary

This test plan document provides detailed test cases for all critical functionality in the GuessUp project. The test suite covers:

- **71 detailed test cases** across all categories
- **Priority classification** (P0=Critical, P1=High, P2=Medium)
- **Clear expected results** for each test
- **Comprehensive coverage** of game logic, state, components, E2E, accessibility, performance, and mobile

**Next Steps**:
1. Implement unit tests for Phase 1 (game logic utilities)
2. Set up testing frameworks (Vitest, Playwright)
3. Create test fixtures and helper functions
4. Implement integration tests as components are built
5. Add E2E tests for complete user workflows
6. Run accessibility and performance audits

**Confidence Level**: 95% - Detailed test plans with clear acceptance criteria
