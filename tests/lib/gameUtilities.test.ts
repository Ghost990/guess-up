import { describe, expect, it, vi } from "vitest";
import { fisherYatesShuffle, getRandomItem } from "@/lib/game/randomization";

describe("randomization and rotation utilities", () => {
  it("shuffles without mutating the input", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const original = [1, 2, 3, 4];
    const shuffled = fisherYatesShuffle(original);
    expect(shuffled).toEqual([2, 3, 4, 1]);
    expect(original).toEqual([1, 2, 3, 4]);
    vi.restoreAllMocks();
  });

  it("selects one or multiple random items safely", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(getRandomItem(["a", "b"])).toBe("a");
    expect(getRandomItem([])).toBeUndefined();
    vi.restoreAllMocks();
  });
});
