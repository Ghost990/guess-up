import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { HomeLanding } from "@/components/home/HomeLanding";
import { useGameStore } from "@/stores/gameStore";

describe("HomeLanding", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.setState({
      game: null,
      language: "hu",
      lastResult: null,
      roundHistory: [],
    });
  });

  it("introduces the game and links every primary action to the setup route", () => {
    render(<HomeLanding />);

    expect(screen.getByRole("heading", { name: "Egy telefon. Az egész társaság játékban." }))
      .toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Így működik" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Rajzold le. Ne mondd ki." })).toBeInTheDocument();

    const newGameLinks = screen.getAllByRole("link", { name: /Új játék/i });
    expect(newGameLinks.length).toBeGreaterThanOrEqual(2);
    newGameLinks.forEach((link) => expect(link).toHaveAttribute("href", "/new-game"));
  });

  it("switches the complete home page to English", () => {
    render(<HomeLanding />);
    fireEvent.click(screen.getByRole("button", { name: "EN" }));

    expect(screen.getByRole("heading", { name: "One phone. Everyone is in the game." }))
      .toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How it works" })).toBeInTheDocument();
  });
});
