import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { PlayerSetup } from "@/components/game/PlayerSetup";
import { useGameStore } from "@/stores/gameStore";

describe("PlayerSetup", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.setState({
      game: null,
      language: "hu",
      lastResult: null,
      roundHistory: [],
    });
  });

  it("switches the interface and task language together", () => {
    render(<PlayerSetup />);
    expect(screen.getByRole("heading", { name: "Készítsétek elő a játékot" }))
      .toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "English" })[0]);
    expect(screen.getByRole("heading", { name: "Set up your game" }))
      .toBeInTheDocument();
  });

  it("opens a localized illustrated how-to-play guide", () => {
    render(<PlayerSetup />);
    fireEvent.click(screen.getByRole("button", { name: "Hogyan játssz?" }));

    const dialog = screen.getByRole("dialog", { name: "Így játsszatok" });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText("Add tovább titokban")).toBeInTheDocument();
    expect(within(dialog).getByText(/a bemutató 2, a kitaláló 1 pontot kap/i))
      .toBeInTheDocument();
  });

  it("starts a valid English game with the selected settings", () => {
    render(<PlayerSetup />);
    fireEvent.click(screen.getAllByRole("button", { name: "English" })[0]);
    fireEvent.change(screen.getByLabelText("Player name 1"), {
      target: { value: "Anna" },
    });
    fireEvent.change(screen.getByLabelText("Player name 2"), {
      target: { value: "Ben" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Start game" }));

    expect(useGameStore.getState().game).toMatchObject({
      phase: "wordReveal",
      settings: { language: "en", roundsPerPlayer: 2 },
    });
  });

  it("offers English-only difficulty tiers and resets Challenging when switching back", () => {
    render(<PlayerSetup />);
    expect(screen.queryByRole("radio", { name: /Low English/i })).not
      .toBeInTheDocument();
    expect(screen.queryByRole("radio", { name: /Challenging/i })).not
      .toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "English" })[0]);
    expect(screen.getByRole("radio", { name: /Low English/i })).toBeInTheDocument();
    const challenging = screen.getByRole("radio", { name: /Challenging/i });
    fireEvent.click(challenging);
    expect(challenging).toBeChecked();

    fireEvent.click(screen.getAllByRole("button", { name: "Magyar" })[0]);
    expect(screen.queryByRole("radio", { name: /Low English/i })).not
      .toBeInTheDocument();
    expect(screen.queryByRole("radio", { name: /Challenging/i })).not
      .toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Könnyű/i })).toBeChecked();
  });

  it("selects an experience pack, constrains difficulty, and freezes it into the game", async () => {
    render(<PlayerSetup />);
    const challengePack = await screen.findByRole("article", { name: "Nehéz menet" });
    fireEvent.click(within(challengePack).getByRole("button", { name: "Ezt választom" }));

    expect(screen.getByRole("radio", { name: /Nehéz/i })).toBeChecked();
    expect(screen.queryByRole("radio", { name: /Közepes/i })).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Játékos neve 1"), {
      target: { value: "Anna" },
    });
    fireEvent.change(screen.getByLabelText("Játékos neve 2"), {
      target: { value: "Béla" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Játék indítása" }));

    expect(useGameStore.getState().game?.settings.packId).toBe("challenge-hungarian");
  });
});
