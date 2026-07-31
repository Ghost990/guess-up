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
  it("renders honest Hungarian metadata with localized tags and no audible pronunciation control", () => {
    render(<WordAssist word={word} language="hu" />);

    fireEvent.click(screen.getByRole("button", { name: "Segítség mutatása" }));
    expect(screen.getByRole("heading", { name: "Segítség a feladathoz" })).toBeInTheDocument();
    expect(screen.getByText("Csak ellenőrzött jelentést és feladatadatokat mutatunk.")).toBeInTheDocument();
    expect(screen.getByText("Címkék: állat, háziállat")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Kiejtés meghallgatása" })).not.toBeInTheDocument();
  });

  it("shows a reviewed Hungarian gloss for a Low English prompt", () => {
    render(
      <WordAssist
        language="en"
        word={{
          id: "low-draw-001",
          text: "apple",
          categories: ["draw"],
          difficulty: "lowEnglish",
          length: 5,
          tags: ["low-english", "draw"],
        }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Show help" }));
    expect(screen.getByText("Hungarian meaning: alma")).toBeInTheDocument();
    expect(screen.getByText("No additional safe tags are available.")).toBeInTheDocument();
  });
});
