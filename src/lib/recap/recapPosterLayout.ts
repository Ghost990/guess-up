export interface TextMeasurer {
  measureText(text: string): number;
}

export interface FittedText {
  text: string;
  truncated: boolean;
}

export interface PosterRankingRow {
  index: number;
  y: number;
  height: number;
}

export interface PosterWinnerText {
  label: string;
  name: string;
}

const ELLIPSIS = "…";

/** Builds the poster-specific winner copy without adding icon glyphs to the PNG. */
export function posterWinnerText(
  winner: { kind: "winner" | "tie" | "none"; playerNames: string[] },
  language: "hu" | "en",
): PosterWinnerText {
  if (winner.kind === "winner") {
    return {
      label: language === "hu" ? "A BAJNOK" : "THE CHAMPION",
      name: winner.playerNames[0] ?? "",
    };
  }
  if (winner.kind === "tie") {
    return {
      label: language === "hu" ? "KÖZÖS GYŐZELEM" : "SHARED GLORY",
      name: winner.playerNames.join(" + "),
    };
  }
  return {
    label: language === "hu" ? "JÁTÉKESTE" : "GAME NIGHT",
    name: language === "hu" ? "Együtt jobb" : "Better together",
  };
}

/**
 * Returns a single-line label that is guaranteed to fit a measured width.
 * Names are deliberately shortened from the end so score and rank columns
 * retain their fixed, readable positions in the exported poster.
 */
export function fitTextToWidth(
  value: string,
  maxWidth: number,
  measurer: TextMeasurer,
): FittedText {
  if (maxWidth <= 0 || value.length === 0) return { text: "", truncated: value.length > 0 };
  if (measurer.measureText(value) <= maxWidth) return { text: value, truncated: false };
  if (measurer.measureText(ELLIPSIS) > maxWidth) return { text: "", truncated: true };

  let low = 0;
  let high = value.length;
  while (low < high) {
    const midpoint = Math.ceil((low + high) / 2);
    if (measurer.measureText(`${value.slice(0, midpoint)}${ELLIPSIS}`) <= maxWidth) low = midpoint;
    else high = midpoint - 1;
  }

  return { text: `${value.slice(0, low)}${ELLIPSIS}`, truncated: true };
}

/**
 * Creates a bounded, vertically balanced row plan for one through six players.
 * The first three rows intentionally receive a taller treatment to establish a
 * podium hierarchy without allowing a six-player game to enter the footer.
 */
export function planPosterRankingRows(
  playerCount: number,
  top: number,
  bottom: number,
): PosterRankingRow[] {
  const count = Math.max(0, Math.min(6, Math.floor(playerCount)));
  if (count === 0 || bottom <= top) return [];

  const gaps = count - 1;
  const availableHeight = bottom - top;
  const gap = Math.min(12, Math.max(6, Math.floor(availableHeight * 0.025)));
  const contentHeight = availableHeight - gaps * gap;
  const weights = Array.from({ length: count }, (_, index) => (index === 0 ? 1.28 : index === 1 ? 1.12 : index === 2 ? 1 : 0.82));
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

  let cursor = top;
  return weights.map((weight, index) => {
    const height = index === count - 1 ? bottom - cursor : Math.max(34, Math.floor((contentHeight * weight) / totalWeight));
    const row = { index, y: cursor, height };
    cursor += height + gap;
    return row;
  });
}
