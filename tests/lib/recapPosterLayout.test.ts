import { describe, expect, it } from "vitest";
import { fitTextToWidth, planPosterRankingRows, posterWinnerText } from "@/lib/recap/recapPosterLayout";

const monospaceMeasurer = { measureText: (text: string) => text.length * 10 };

describe("recap poster layout", () => {
  it("leaves already fitting text untouched", () => {
    expect(fitTextToWidth("Anna", 40, monospaceMeasurer)).toEqual({ text: "Anna", truncated: false });
  });

  it("truncates long unbroken names deterministically", () => {
    expect(fitTextToWidth("AlexandriaMontgomery", 60, monospaceMeasurer)).toEqual({
      text: "Alexa…",
      truncated: true,
    });
  });

  it("formats tied winners as an icon-free label that can use the same fitting contract", () => {
    const tie = posterWinnerText(
      { kind: "tie", playerNames: ["Alexandria Montgomery", "Bartholomew Hyperion"] },
      "en",
    );
    expect(tie.label).toBe("SHARED GLORY");
    expect(tie.name).toBe("Alexandria Montgomery + Bartholomew Hyperion");
    expect(fitTextToWidth(tie.name, 100, monospaceMeasurer)).toEqual({ text: "Alexandri…", truncated: true });
  });

  it("builds bounded rows for every supported player count", () => {
    for (let count = 1; count <= 6; count += 1) {
      const rows = planPosterRankingRows(count, 790, 1160);
      expect(rows).toHaveLength(count);
      expect(rows[0]?.y).toBe(790);
      expect(rows.every((row) => row.height >= 34 && row.y + row.height <= 1160)).toBe(true);
      expect(rows.slice(1).every((row, index) => row.y > (rows[index]?.y ?? 0) + (rows[index]?.height ?? 0))).toBe(true);
    }
  });

  it("caps unexpected ranking counts at six rows", () => {
    expect(planPosterRankingRows(9, 790, 1160)).toHaveLength(6);
  });
});
