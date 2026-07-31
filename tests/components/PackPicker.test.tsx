import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  classicEnglishPackManifest,
  classicHungarianPackManifest,
} from "@/content/packs";
import { PackPicker } from "@/components/packs/PackPicker";

const copy = {
  heading: "Choose a pack",
  emptyMessage: "No packs are available.",
  card: {
    selectLabel: "Choose",
    selectedLabel: "Selected",
    lockedLabel: "Locked",
  },
};

describe("PackPicker", () => {
  it("renders selected and locked pack states without entitlement or store access", () => {
    const onSelect = vi.fn();

    render(
      <PackPicker
        copy={copy}
        items={[
          { manifest: classicHungarianPackManifest, access: "available" },
          { manifest: classicEnglishPackManifest, access: "locked" },
        ]}
        onSelect={onSelect}
        selectedPackId="classic-hungarian"
      />,
    );

    expect(screen.getByRole("heading", { name: "Choose a pack" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Selected" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "Selected" }));
    expect(onSelect).toHaveBeenCalledWith("classic-hungarian");

    expect(screen.getByRole("button", { name: "Locked" })).toBeDisabled();
    expect(screen.getByTestId("pack-card-classic-english")).toHaveAttribute(
      "data-selected",
      "false",
    );
  });

  it("renders typed empty-state copy", () => {
    render(<PackPicker copy={copy} items={[]} />);

    expect(screen.getByText("No packs are available.")).toBeInTheDocument();
  });
});
