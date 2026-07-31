# GuessUp — current project context

Egytelefonos, pass-and-play activity party game. A játékosok rajzolnak, körülírnak vagy mutogatnak; a presenter és a helyesen tippelő játékos is pontot kap.

## Aktuális stack

- Next.js 16.2.11 / App Router / Turbopack
- React 19.2.8
- TypeScript strict
- Tailwind CSS 4.3
- Zustand persist
- Vitest + React Testing Library + Playwright

## Kritikus szabályok

- 2–8 játékos, a sorrend a játék elején Fisher–Yates-szel egyszer randomizálódik.
- `totalRounds = playerCount × roundsPerPlayer`.
- Presenter +2, kiválasztott guesser +1; pass/no one = 0.
- A presenter nem választható guesserként.
- A reveal és a timer indítása explicit gombnyomás.
- A timer abszolút `roundEndsAt` időpontot használ; refresh nem indítja újra.
- A scorer dialog szünetelteti és perzisztálja a maradék időt.
- A játék state localStorage-ban marad; nincs hálózati multiplayer vagy cross-device sync.

## Task packok

- Magyar: 540 (`easy`, `medium`, `hard`)
- Angol: 900 (`lowEnglish`, `easy`, `medium`, `challenging`, `hard`)
- Kategóriák: `draw`, `explain`, `signal`

## Minőségkapu

```bash
npm run check
npm run test:e2e
```

## Dokumentáció

A jelenlegi viselkedés forrása: `GAME_RULES.md` + tesztelt kód. Olvasási sorrend: `README.md`, `PROJECT_STATUS.md`, `docs/DOCUMENTATION_MAP.md`. A régi root-level research/design/roadmap fájlok historical anyagok, nem élő specifikációk.

## PWA megjegyzés

Van manifest és production service-worker registration, de a jelenlegi `public/sw.js` network-only és törli a régi cache-eket. Ne állítsd, hogy a build offline-ready.
