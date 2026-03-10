# Guess Up — Party Word Guessing Game

Pass-and-play szójátszma app. Csapatok felváltva tippelnek szavakat, amíg az időzítő le nem jár. 540+ szavas magyar adatbázis. Offline-ready PWA.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Framer Motion animációk
- **PWA**: `@ducanh2912/next-pwa` — offline support, SW cache
- **Icons**: Lucide React

## File Structure
```
src/app/
  page.tsx          — Főoldal, játék state gép (PlayerSetup → GamePlay → Results)
  layout.tsx        — Root layout, PWA meta
src/components/
  game/
    PlayerSetup.tsx — Játékosok nevei, csapat konfig
    GamePlay.tsx    — Aktív játék, timer, kártya fordítás
    Results.tsx     — Eredmény képernyő
src/data/
  words.ts          — 540+ szavas magyar adatbázis, kategóriák szerint
```

## Game Logic — Kritikus szabályok
- **Fisher-Yates randomizáció** — mindig ezt használd, ne `sort(() => Math.random() - 0.5)` (biased!)
- **Race condition guard**: `prevTimeLeft` ref a timer reset-nél — ne töröld ki
- **Game-level used words**: külön `gameUsedWords` Set a session-on belüli duplikáció ellen
- **Pass-and-play**: eszközöket passzolnak körönként, nincs hálózat

## PWA Cache
- Service Worker automatikusan kezel offline-t
- Ha PWA-t módosítasz → `next build` után teszteld offline módban
- Cache bust: `public/sw.js` nem kézzel szerkesztendő (generált)

## Deployment
- Tailscale URL: `https://ankyr-thinkpad-t470-w10dg.taila52c96.ts.net:8444`
- Start: `bash /home/ankyr/clawd/scripts/start_guessup.sh`

## Design
- Neon Arcade stílus: élénk színek, nagy gombok, mobil-first
- Framer Motion: kártya flip animáció, képernyő átmenetek
- **Ne változtasd** a timer logikát vagy a round state gépet anélkül hogy megérted a race condition javítást
