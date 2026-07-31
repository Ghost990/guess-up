import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { EffectsProvider } from "@/components/effects/EffectsProvider";
import { EffectsSettings } from "@/components/effects/EffectsSettings";
import { EFFECTS_PREFERENCES_KEY } from "@/lib/effects/preferences";

beforeEach(() => {
  window.localStorage.clear();
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn(() => ({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  Object.defineProperty(navigator, "vibrate", {
    configurable: true,
    value: vi.fn(() => true),
  });
});

describe("EffectsSettings", () => {
  it("exposes localized persistent sound and haptics controls", async () => {
    render(
      <EffectsProvider>
        <EffectsSettings language="en" />
      </EffectsProvider>,
    );

    const sound = await screen.findByRole("button", { name: "Sound on" });
    expect(await screen.findByRole("button", { name: "Haptics on" })).toBeEnabled();

    fireEvent.click(sound);
    expect(screen.getByRole("button", { name: "Sound off" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    await waitFor(() =>
      expect(JSON.parse(window.localStorage.getItem(EFFECTS_PREFERENCES_KEY) ?? "null")).toEqual({
        sound: false,
        haptics: true,
      }),
    );
  });
});
