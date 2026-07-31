# Brand name research — GuessUp successor

**Research date:** 2026-07-31

**Status:** working-name recommendation for branch-level brand exploration; not legal clearance

**Recommended working name:** **Hoppra!**

## Decision

Use **Hoppra!** for the visual identity and review branch.

Why it wins:

- short, energetic, and easy to shout across a room;
- natural Hungarian association with “hopp, add it over / jump in”;
- pronounceable in English as “HOP-rah”;
- broad enough for drawing, explaining, acting, custom packs, classroom use, and future formats;
- supports a strong motion/card visual mark without explaining the game in the name;
- no exact party-game or exact Apple software collision was found in the public checks below.

This is not a trademark opinion. Do not purchase media, print packaging, or publish to app stores before a professional EU/Hungarian trademark clearance.

## Evaluation method

Candidates were scored on a five-point scale using:

- distinctiveness: 30%;
- pronunciation and shoutability: 20%;
- collision/search cleanliness: 20%;
- brand and logo potential: 20%;
- domain risk: 10%.

## Ranked shortlist

| Rank | Candidate | Weighted score | Main strength | Main risk |
|---:|---|---:|---|---|
| 1 | **Hoppra!** | **4.1 / 5** | Energy, Hungarian personality, strong motion identity | `hoppra.com` is registered; Hopp mobility creates some Hungarian search noise |
| 2 | Nodzo | 3.9 / 5 | Short and internationally pronounceable | Existing surname; close to Donzo/Donezo |
| 3 | Tuzzlo | 3.6 / 5 | Low apparent app collision; energetic visual form | Less natural pronunciation and spelling |
| 4 | Tiltto | 3.6 / 5 | Good gesture/device association | “Tilt” over-focuses the product on phone movement |
| 5 | Clapzo | 3.5 / 5 | Clear party energy | “Clap” narrows the interaction and has weaker domain/search quality |

Rejected directions included generic charades/guess compounds, names tied only to phone tilting, and names already crowded by apps, companies, surnames, or unrelated consumer products.

## Public collision checks

### Apple App Store

Apple’s public Search API was queried for `Hoppra`, `Nodzo`, `Tuzzlo`, `Tiltto`, and `Clapzo` in both Hungary and the United States with the `software` entity filter.

- exact title matches for all five candidates: **0**;
- this does not cover unpublished apps, other territories, or trademarks.

Reference endpoint pattern:

- <https://itunes.apple.com/search?term=Hoppra&country=hu&entity=software&limit=50>
- <https://itunes.apple.com/search?term=Hoppra&country=us&entity=software&limit=50>

### Google Play and public web search

Direct Google Play and general web searches did not reveal an exact `Hoppra` party-game listing. A search result for the established **Hopp** mobility app contains the Hungarian inflected phrase “Készen áll a Hoppra?”, which creates a real but manageable Hungarian search-noise risk.

References:

- <https://play.google.com/store/search?q=Hoppra&c=apps>
- <https://play.google.com/store/apps/details?id=bike.hopp&hl=hu>

### Domain signals

Public RDAP queries returned `404 / not found` on the research date for:

- `hoppra.app`;
- `hoppra.game`;
- `playhoppra.app`.

`hoppra.com` is already registered. RDAP “not found” is only a registration signal, not a purchase guarantee; registrar availability and premium pricing must be checked immediately before buying.

References:

- <https://rdap.org/domain/hoppra.app>
- <https://rdap.org/domain/hoppra.game>
- <https://rdap.org/domain/playhoppra.app>

## Naming architecture

Recommended public structure:

- master brand: **Hoppra!**
- free core pack: **Hoppra! Classic**
- challenge pack: **Hoppra! Nehéz menet / Challenge Night**
- custom deck feature: **Hoppra! Maker**
- event offer: **Hoppra! Events**
- premium one-time unlock: **Hoppra! Party Pass**

Internal code identifiers, repository name, local-storage keys, and persisted state keys remain `guess-up` / `guessup-*` during the transition. Renaming persisted keys would break recovery of existing games without adding product value.

## Visual identity direction

The logo should express **prompt cards in motion**, not a literal question mark or generic chat bubble.

- dark warm background;
- coral/orange front prompt card;
- cyan offset back card for multiplayer energy;
- acid-yellow exclamation and motion spark;
- heavy geometric wordmark;
- readable at 40 px and strong enough for a PWA icon;
- no dice, lightbulb, gradient blob, or mascot cliché.

The branch includes a vector exploration and regenerated PWA icons. It remains reversible until trademark and domain clearance are complete.
