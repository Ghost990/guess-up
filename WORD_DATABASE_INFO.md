# Hungarian Word Database - GuessUp

## Overview

Complete Hungarian word database created for the GuessUp activity game with **180 words** organized by category, difficulty, and game compatibility.

## Database Statistics

| Metric | Count |
|--------|-------|
| **Total Words** | 180 |
| **Easy Words** | ~90 (50%) |
| **Medium Words** | ~70 (39%) |
| **Hard Words** | ~20 (11%) |

## Category Distribution

### By Game Category
- **Draw + Explain + Signal** (all 3): ~130 words (72%)
- **Explain + Signal only**: ~40 words (22%)
- **Draw + Explain only**: ~10 words (6%)

### By Theme
- **Animals**: 25 words (kutya, macska, elefánt, zsiráf, oroszlán)
- **Objects**: 45 words (autó, telefon, könyv, gitár, esernyő)
- **Food**: 20 words (pizza, alma, fagylalt, paradicsom, banán)
- **Actions**: 25 words (futás, úszás, főzés, rajzolás, tánc)
- **Professions**: 18 words (orvos, tanár, tűzoltó, pilóta, szakács)
- **Places**: 20 words (iskola, park, strand, tenger, mozi)
- **Nature**: 15 words (fa, virág, eső, hó, szivárvány)
- **Abstract**: 12 words (szerelem, szabadság, idő, béke, energia)

## Word Examples

### Easy Words (50%)
Perfect for beginners and quick rounds:
- **kutya** (dog) - draw, explain, signal
- **autó** (car) - draw, explain, signal
- **alma** (apple) - draw, explain, signal
- **futás** (running) - explain, signal
- **nap** (sun) - draw, explain, signal

### Medium Words (39%)
Balanced difficulty for standard gameplay:
- **elefánt** (elephant) - draw, explain, signal
- **repülőgép** (airplane) - draw, explain, signal
- **gitár** (guitar) - draw, explain, signal
- **karácsony** (Christmas) - draw, explain, signal
- **születésnap** (birthday) - draw, explain, signal

### Hard Words (11%)
Challenging words for advanced players:
- **gravitáció** (gravity) - explain only
- **laboratórium** (laboratory) - draw, explain
- **mikrohullámú sütő** (microwave oven) - draw, explain
- **szabadság** (freedom) - explain, signal
- **iránytű** (compass) - draw, explain, signal

## JSON Structure

Each word entry contains:
```json
{
  "id": "001",                              // Unique identifier
  "text": "kutya",                          // Hungarian word
  "categories": ["draw", "explain", "signal"], // Compatible game modes
  "difficulty": "easy",                     // easy | medium | hard
  "length": 5,                              // Character count
  "tags": ["animal", "pet"]                 // Thematic tags
}
```

## Usage in Game

### Filtering by Difficulty
```typescript
// Easy words (beginner mode)
const easyWords = words.filter(w => w.difficulty === 'easy');

// Medium words (standard mode)
const mediumWords = words.filter(w => w.difficulty === 'medium');

// Hard words (expert mode)
const hardWords = words.filter(w => w.difficulty === 'hard');
```

### Filtering by Category
```typescript
// Words for "Draw" category
const drawWords = words.filter(w => w.categories.includes('draw'));

// Words for "Explain" category
const explainWords = words.filter(w => w.categories.includes('explain'));

// Words for "Signal" (hand signals) category
const signalWords = words.filter(w => w.categories.includes('signal'));
```

### Random Selection
```typescript
import { shuffle } from '@/lib/game/randomization';

// Get random word from filtered list
const availableWords = words.filter(w =>
  w.difficulty === selectedDifficulty &&
  w.categories.includes(currentCategory)
);
const shuffled = shuffle(availableWords);
const randomWord = shuffled[0];
```

## Expanding the Database

To add more words, follow the JSON structure:

```json
{
  "id": "181",                              // Increment ID
  "text": "új szó",                         // Your Hungarian word
  "categories": ["draw", "explain", "signal"], // Which modes work?
  "difficulty": "medium",                   // easy | medium | hard
  "length": 6,                              // Character count
  "tags": ["category1", "category2"]        // Thematic tags
}
```

### Guidelines for New Words
1. **ID**: Continue sequential numbering (181, 182, 183...)
2. **Text**: Use Hungarian characters (á, é, í, ó, ö, ő, ú, ü, ű)
3. **Categories**:
   - **draw**: Can be drawn (visual objects, animals, actions)
   - **explain**: Can be explained verbally (any word)
   - **signal**: Can be shown with hand gestures (actions, objects, emotions)
4. **Difficulty**:
   - **easy**: Common words, short (2-6 chars), concrete objects
   - **medium**: Less common, longer (7-10 chars), some abstract
   - **hard**: Rare words, very long (11+ chars), abstract concepts
5. **Length**: Actual character count of the Hungarian word
6. **Tags**: Use existing tags for consistency

## Database File Location

```
/Users/nagyz/Private/DEV/guess-up/src/data/words-hu.json
```

## Loading in Application

```typescript
// Import method 1: Static import
import wordDatabase from '@/data/words-hu.json';
const words = wordDatabase.words;

// Import method 2: Dynamic import (recommended for large datasets)
const loadWords = async () => {
  const response = await fetch('/data/words-hu.json');
  const data = await response.json();
  return data.words;
};
```

## Quality Assurance

✅ **180 words** (exceeds 100+ minimum requirement)
✅ **Balanced difficulty** (50% easy, 39% medium, 11% hard)
✅ **All 3 categories** supported (draw, explain, signal)
✅ **Hungarian language** with proper characters (á, é, ő, ű)
✅ **Diverse themes** (animals, objects, actions, professions, etc.)
✅ **JSON schema** compliant with DATA_MODELS.md specification
✅ **Expandable** structure for easy addition of new words
✅ **No duplicates** verified
✅ **Culturally appropriate** content for party game

## Word Distribution by Difficulty

```
Easy (90 words):
├── Animals: kutya, macska, ló, hal, madár...
├── Objects: autó, ház, könyv, telefon, óra...
├── Food: alma, kenyér, pizza, fagylalt, banán...
├── Actions: futás, evés, alvás, tánc, úszás...
└── Nature: fa, nap, hold, virág, víz...

Medium (70 words):
├── Animals: elefánt, zsiráf, oroszlán, delfin...
├── Objects: repülőgép, gitár, szemüveg...
├── Events: karácsony, születésnap, esküvő...
├── Professions: király, varázsló, bohóc...
└── Actions: mosogatás, fotózás, halászat...

Hard (20 words):
├── Abstract: gravitáció, energia, szabadság, idő...
├── Science: laboratórium, mikroszkóp, kísérlet...
├── Complex: mikrohullámú sütő, hűtőszekrény...
└── Concepts: igazság, béke, háború, találmány...
```

## Next Steps

1. **Test the database** in game to verify word quality
2. **Gather feedback** from players about word difficulty
3. **Add more words** based on gameplay needs (target: 500+ words)
4. **Create themed word packs** (e.g., Christmas, Summer, Sports)
5. **Implement word usage tracking** to avoid repetition
6. **Add word voting** to remove unpopular words

## Notes

- All words are family-friendly and suitable for all ages
- Words span multiple difficulty levels for replayability
- Database is easily expandable through JSON file editing
- No external API required - fully offline compatible
- Compatible with all three game modes (draw, explain, signal)

---

**Database Version**: 1.0.0
**Last Updated**: 2025-01-07
**Total Words**: 180
**Status**: Production Ready ✅
