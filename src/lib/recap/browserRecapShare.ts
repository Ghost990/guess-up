import type { GameNightRecapViewModelV1 } from "@/types/recap";

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

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fill();
}

export async function createRecapPng(
  recap: GameNightRecapViewModelV1,
  brandName = "Hoppra!",
): Promise<Blob> {
  if (typeof document === "undefined") throw new Error("Canvas is unavailable.");
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas rendering is unavailable.");

  const copy = exportCopy[recap.language];
  const accent = "#f5b642";
  context.fillStyle = "#171412";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = context.createRadialGradient(870, 140, 40, 870, 140, 620);
  gradient.addColorStop(0, "rgba(245,182,66,0.28)");
  gradient.addColorStop(1, "rgba(245,182,66,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = accent;
  context.font = "700 30px system-ui, sans-serif";
  context.fillText(copy.title.toUpperCase(), 76, 102);

  context.fillStyle = "#fffaf4";
  context.font = "900 64px system-ui, sans-serif";
  context.fillText(winnerLine(recap).replace("🏆 ", ""), 76, 192);

  const metrics = [
    [copy.tasks, recap.roundCounts.tasksPlayed],
    [copy.correct, recap.roundCounts.correct],
    [copy.passed, recap.roundCounts.passed],
    [copy.timedOut, recap.roundCounts.timedOut],
  ] as const;
  metrics.forEach(([label, value], index) => {
    const x = 76 + (index % 2) * 466;
    const y = 260 + Math.floor(index / 2) * 142;
    context.fillStyle = "#25201d";
    roundedRect(context, x, y, 430, 112, 24);
    context.fillStyle = "#fffaf4";
    context.font = "900 38px system-ui, sans-serif";
    context.fillText(String(value), x + 28, y + 48);
    context.fillStyle = "#b9afa7";
    context.font = "600 24px system-ui, sans-serif";
    context.fillText(label, x + 28, y + 82);
  });

  context.fillStyle = "#fffaf4";
  context.font = "900 38px system-ui, sans-serif";
  context.fillText(copy.standings, 76, 606);

  recap.rankings.slice(0, 6).forEach((entry, index) => {
    const y = 646 + index * 88;
    context.fillStyle = index === 0 ? "#332a20" : "#25201d";
    roundedRect(context, 76, y, 896, 70, 18);
    context.fillStyle = index === 0 ? accent : "#fffaf4";
    context.font = "800 28px system-ui, sans-serif";
    context.fillText(`${entry.rank}. ${entry.playerName}`, 104, y + 44);
    context.textAlign = "right";
    context.fillText(`${entry.score} ${copy.points}`, 944, y + 44);
    context.textAlign = "left";
  });

  context.fillStyle = "#b9afa7";
  context.font = "600 24px system-ui, sans-serif";
  context.fillText("ONE PHONE · ONE NIGHT · YOUR SCORE", 76, 1260);
  context.fillStyle = accent;
  context.font = "900 34px system-ui, sans-serif";
  context.textAlign = "right";
  context.fillText(brandName, 972, 1260);
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
