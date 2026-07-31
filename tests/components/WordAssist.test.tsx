import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WordAssist } from "@/components/game/WordAssist";
import type { Word } from "@/types";

const word: Word = {
  id: "kutya",
  text: "kutya",
  categories: ["draw"],
  difficulty: "easy",
  length: 5,
  tags: ["animal", "pet"],
};

describe("WordAssist", () => {
  it("renders honest Hungarian metadata with localized tags and no unsupported speech control", () => {
    render(<WordAssist word={word} language="hu" />);

    fireEvent.click(screen.getByRole("button", { name: "Segítség mutatása" }));
    expect(screen.getByRole("heading", { name: "Segítség a feladathoz" })).toBeInTheDocument();
    expect(screen.getByText("Ez csak a feladat adatait mutatja, nem magyarázat.")).toBeInTheDocument();
    expect(screen.getByText("Címkék: állat, háziállat")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Kiejtés meghallgatása" })).not.toBeInTheDocument();
  });
});
