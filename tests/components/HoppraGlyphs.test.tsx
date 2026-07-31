import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HelpGlyph } from "@/components/icons";

describe("Hoppra Glyphs", () => {
  it("keeps decorative glyphs hidden by default and supports labeled SVG props", () => {
    const { container, rerender } = render(<HelpGlyph className="glyph-test" size={19} />);
    const decorative = container.querySelector("svg");

    expect(decorative).toHaveAttribute("aria-hidden", "true");
    expect(decorative).toHaveAttribute("class", "glyph-test");
    expect(decorative).toHaveAttribute("width", "19");
    expect(decorative).toHaveAttribute("height", "19");

    rerender(<HelpGlyph aria-label="Game rules" size="2rem" />);
    expect(screen.getByRole("img", { name: "Game rules" })).toHaveAttribute("aria-hidden", "false");
  });
});
