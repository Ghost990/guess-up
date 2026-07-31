import type { GameNightRecapViewModelV1 } from "@/types/recap";
import { fitTextToWidth, planPosterRankingRows, posterWinnerText } from "./recapPosterLayout";

interface RecapExportCopy {
  title: string;
  tasks: string;
  correct: string;
  passed: string;
  timedOut: string;
  standings: string;
  points: string;
}

const exportCopy: Record<GameNightRecapViewModelV1["language"], RecapExportCopy> = {
  hu: {
    title: "Játékesti összefoglaló",
    tasks: "feladat",
    correct: "találat",
    passed: "passz",
    timedOut: "lejárt idő",
    standings: "Végeredmény",
    points: "pont",
  },
  en: {
    title: "Game Night Recap",
    tasks: "tasks",
    correct: "correct",
    passed: "passed",
    timedOut: "timed out",
    standings: "Final standings",
    points: "pts",
  },
};

const POSTER = {
  width: 1080,
  height: 1350,
  ink: "#241c1a",
  paper: "#fff8e9",
  coral: "#ef6657",
  cyan: "#54cbd1",
  yellow: "#f5c74b",
  mint: "#92d7ac",
  pink: "#f5a6b7",
} as const;

function winnerLine(recap: GameNightRecapViewModelV1): string {
  if (recap.winner.kind === "winner") {
    return recap.language === "hu"
      ? `🏆 ${recap.winner.playerNames[0]} nyert`
      : `🏆 ${recap.winner.playerNames[0]} wins`;
  }
  if (recap.winner.kind === "tie") {
    const names = recap.winner.playerNames.join(", ");
    return recap.language === "hu" ? `🏆 Holtverseny: ${names}` : `🏆 Tied: ${names}`;
  }
  return recap.language === "hu" ? "Játékeste" : "Game night";
}

export function formatRecapShareText(
  recap: GameNightRecapViewModelV1,
  brandName = "Hoppra!",
): string {
  const copy = exportCopy[recap.language];
  const standings = recap.rankings
    .map((entry) => `${entry.rank}. ${entry.playerName} — ${entry.score} ${copy.points}`)
    .join("\n");

  return [
    winnerLine(recap),
    `${recap.roundCounts.tasksPlayed} ${copy.tasks} · ${recap.roundCounts.correct} ${copy.correct} · ${recap.roundCounts.passed} ${copy.passed}`,
    "",
    standings,
    "",
    `— ${brandName}`,
  ].join("\n");
}

function fillRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  color: string,
): void {
  context.fillStyle = color;
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fill();
}

function strokeRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  color: string,
  lineWidth: number,
): void {
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.stroke();
}

function drawBurst(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
): void {
  context.save();
  context.translate(x, y);
  context.fillStyle = color;
  context.beginPath();
  for (let index = 0; index < 16; index += 1) {
    const angle = (Math.PI * 2 * index) / 16 - Math.PI / 2;
    const pointRadius = index % 2 === 0 ? radius : radius * 0.48;
    const pointX = Math.cos(angle) * pointRadius;
    const pointY = Math.sin(angle) * pointRadius;
    if (index === 0) context.moveTo(pointX, pointY);
    else context.lineTo(pointX, pointY);
  }
  context.closePath();
  context.fill();
  context.restore();
}

function drawConfetti(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  angle: number,
): void {
  context.save();
  context.translate(x, y);
  context.rotate(angle);
  context.fillStyle = color;
  context.fillRect(-10, -25, 20, 50);
  context.strokeStyle = POSTER.ink;
  context.lineWidth = 5;
  context.strokeRect(-10, -25, 20, 50);
  context.restore();
}

function drawTrophy(context: CanvasRenderingContext2D, x: number, y: number): void {
  context.save();
  context.translate(x, y);
  context.lineJoin = "round";
  context.lineCap = "round";
  context.lineWidth = 14;
  context.strokeStyle = POSTER.ink;

  context.fillStyle = POSTER.coral;
  context.beginPath();
  context.moveTo(-124, -112);
  context.lineTo(-84, -112);
  context.lineTo(-84, 4);
  context.bezierCurveTo(-84, 72, -40, 108, 0, 112);
  context.bezierCurveTo(40, 108, 84, 72, 84, 4);
  context.lineTo(84, -112);
  context.lineTo(124, -112);
  context.lineTo(124, -18);
  context.bezierCurveTo(124, 55, 78, 112, 35, 126);
  context.lineTo(35, 164);
  context.lineTo(94, 164);
  context.lineTo(94, 206);
  context.lineTo(-94, 206);
  context.lineTo(-94, 164);
  context.lineTo(-35, 164);
  context.lineTo(-35, 126);
  context.bezierCurveTo(-78, 112, -124, 55, -124, -18);
  context.closePath();
  context.fill();
  context.stroke();

  context.fillStyle = POSTER.yellow;
  context.beginPath();
  context.moveTo(-84, -112);
  context.lineTo(84, -112);
  context.lineTo(84, 2);
  context.bezierCurveTo(84, 70, 41, 111, 0, 116);
  context.bezierCurveTo(-41, 111, -84, 70, -84, 2);
  context.closePath();
  context.fill();
  context.stroke();

  drawBurst(context, 0, -5, 45, POSTER.cyan);
  context.restore();
}

function drawFittedText(
  context: CanvasRenderingContext2D,
  value: string,
  maxWidth: number,
  x: number,
  y: number,
): void {
  context.fillText(
    fitTextToWidth(value, maxWidth, { measureText: (text) => context.measureText(text).width }).text,
    x,
    y,
  );
}

export async function createRecapPng(
  recap: GameNightRecapViewModelV1,
  brandName = "Hoppra!",
): Promise<Blob> {
  if (typeof document === "undefined") throw new Error("Canvas is unavailable.");
  const canvas = document.createElement("canvas");
  canvas.width = POSTER.width;
  canvas.height = POSTER.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas rendering is unavailable.");

  const copy = exportCopy[recap.language];
  const winner = posterWinnerText(recap.winner, recap.language);
  const rankings = recap.rankings.slice(0, 6);
  context.fillStyle = POSTER.paper;
  context.fillRect(0, 0, POSTER.width, POSTER.height);
  context.lineJoin = "round";

  // Flat offset-print blocks establish a party-poster field without gradients.
  context.fillStyle = POSTER.cyan;
  context.fillRect(0, 0, POSTER.width, 90);
  context.fillStyle = POSTER.coral;
  context.fillRect(0, 90, 24, POSTER.height - 90);
  context.fillStyle = POSTER.yellow;
  context.fillRect(24, 0, 166, 90);
  context.strokeStyle = POSTER.ink;
  context.lineWidth = 12;
  context.strokeRect(24, 24, POSTER.width - 48, POSTER.height - 48);

  drawConfetti(context, 250, 130, POSTER.coral, -0.55);
  drawConfetti(context, 890, 155, POSTER.mint, 0.45);
  drawConfetti(context, 956, 610, POSTER.yellow, -0.3);
  drawConfetti(context, 111, 674, POSTER.pink, 0.38);
  drawBurst(context, 909, 740, 30, POSTER.coral);
  drawBurst(context, 104, 1175, 25, POSTER.cyan);

  context.fillStyle = POSTER.ink;
  context.font = "900 34px Arial Black, system-ui, sans-serif";
  context.fillText("HOPPRA!", 70, 79);
  context.textAlign = "right";
  context.font = "800 24px system-ui, sans-serif";
  context.fillText(recap.language === "hu" ? "PARTY PRINT" : "PARTY PRINT", 1005, 75);
  context.textAlign = "left";

  context.fillStyle = POSTER.ink;
  context.font = "900 86px Arial Black, system-ui, sans-serif";
  context.fillText(recap.language === "hu" ? "JÁTÉKESTI" : "GAME NIGHT", 70, 202);
  context.fillStyle = POSTER.coral;
  context.font = "900 61px Arial Black, system-ui, sans-serif";
  context.fillText(recap.language === "hu" ? "ÖSSZEFOGLALÓ" : "RECAP", 74, 269);
  context.fillStyle = POSTER.ink;
  context.fillRect(72, 290, 590, 12);

  // Offset ribbon turns the outcome into the unmistakable primary moment.
  fillRoundedRect(context, 64, 352, 630, 230, 28, POSTER.coral);
  fillRoundedRect(context, 52, 338, 630, 230, 28, POSTER.yellow);
  strokeRoundedRect(context, 52, 338, 630, 230, 28, POSTER.ink, 10);
  context.fillStyle = POSTER.ink;
  context.font = "900 24px system-ui, sans-serif";
  context.fillText(winner.label, 84, 390);
  context.font = "900 55px Arial Black, system-ui, sans-serif";
  drawFittedText(context, winner.name, 548, 84, 474);
  context.fillStyle = POSTER.ink;
  context.fillRect(84, 502, 390, 9);
  context.font = "800 22px system-ui, sans-serif";
  const winnerCaption = recap.language === "hu" ? "A mai este főszereplője" : "Tonight's leading player";
  context.fillText(winnerCaption, 84, 542);

  drawTrophy(context, 846, 410);

  const metrics = [
    [String(recap.roundCounts.tasksPlayed), copy.tasks],
    [String(recap.roundCounts.correct), copy.correct],
    [String(recap.roundCounts.passed), copy.passed],
    [String(recap.roundCounts.timedOut), copy.timedOut],
  ] as const;
  fillRoundedRect(context, 52, 640, 976, 100, 20, POSTER.mint);
  strokeRoundedRect(context, 52, 640, 976, 100, 20, POSTER.ink, 9);
  metrics.forEach(([value, label], index) => {
    const x = 78 + index * 236;
    if (index > 0) {
      context.strokeStyle = POSTER.ink;
      context.lineWidth = 6;
      context.beginPath();
      context.moveTo(x - 28, 656);
      context.lineTo(x - 28, 724);
      context.stroke();
    }
    context.fillStyle = POSTER.ink;
    context.font = "900 42px Arial Black, system-ui, sans-serif";
    context.fillText(value, x, 690);
    context.font = "800 19px system-ui, sans-serif";
    drawFittedText(context, label.toUpperCase(), 170, x, 719);
  });

  context.fillStyle = POSTER.ink;
  context.font = "900 37px Arial Black, system-ui, sans-serif";
  context.fillText(copy.standings.toUpperCase(), 70, 797);
  context.fillStyle = POSTER.cyan;
  context.fillRect(70, 812, 530, 12);

  const rowColors = [POSTER.yellow, POSTER.coral, POSTER.cyan, POSTER.mint, POSTER.pink, POSTER.paper];
  const rows = planPosterRankingRows(rankings.length, 850, 1166);
  rows.forEach((row) => {
    const entry = rankings[row.index];
    if (!entry) return;
    const color = rowColors[row.index] ?? POSTER.paper;
    const shadowOffset = row.index % 2 === 0 ? 12 : -12;
    fillRoundedRect(context, 70 + shadowOffset, row.y + 10, 940, row.height, 15, POSTER.ink);
    fillRoundedRect(context, 70, row.y, 940, row.height, 15, color);
    strokeRoundedRect(context, 70, row.y, 940, row.height, 15, POSTER.ink, 7);

    const rankSize = row.index < 3 ? 38 : 31;
    context.fillStyle = POSTER.ink;
    context.font = `900 ${rankSize}px Arial Black, system-ui, sans-serif`;
    context.fillText(String(entry.rank), 100, row.y + row.height * 0.64);
    context.fillRect(158, row.y + 15, 6, row.height - 30);

    const scoreText = `${entry.score} ${copy.points}`;
    context.textAlign = "right";
    context.font = `900 ${row.index < 3 ? 29 : 24}px Arial Black, system-ui, sans-serif`;
    context.fillText(scoreText, 970, row.y + row.height * 0.62);
    const scoreStart = 970 - context.measureText(scoreText).width;

    context.textAlign = "left";
    context.font = `900 ${row.index === 0 ? 35 : row.index < 3 ? 30 : 25}px Arial Black, system-ui, sans-serif`;
    const nameMaxWidth = Math.max(90, scoreStart - 192);
    drawFittedText(context, entry.playerName, nameMaxWidth, 190, row.y + row.height * 0.63);
  });

  context.fillStyle = POSTER.ink;
  context.fillRect(70, 1211, 940, 8);
  context.font = "800 19px system-ui, sans-serif";
  context.fillText(recap.language === "hu" ? "EGY TELEFON / EGY ESTE / SOK NEVETÉS" : "ONE PHONE / ONE NIGHT / ALL THE NOISE", 70, 1251);
  context.fillStyle = POSTER.coral;
  context.textAlign = "right";
  context.font = "900 39px Arial Black, system-ui, sans-serif";
  drawFittedText(context, brandName.toUpperCase(), 310, 1006, 1258);
  context.textAlign = "left";

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("PNG generation failed."));
    }, "image/png");
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function copyRecapText(recap: GameNightRecapViewModelV1): Promise<void> {
  if (!navigator.clipboard?.writeText) throw new Error("Clipboard is unavailable.");
  await navigator.clipboard.writeText(formatRecapShareText(recap));
}

export async function shareRecapNative(recap: GameNightRecapViewModelV1): Promise<void> {
  if (!navigator.share) throw new Error("Native sharing is unavailable.");
  const text = formatRecapShareText(recap);
  const blob = await createRecapPng(recap);
  const file = new File([blob], "game-night-recap.png", { type: "image/png" });
  const shareData: ShareData = { title: "Game Night Recap", text };
  if (navigator.canShare?.({ files: [file] })) shareData.files = [file];
  await navigator.share(shareData);
}
