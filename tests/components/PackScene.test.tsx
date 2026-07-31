import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { taskPackManifests } from "@/content/packs";
import { PACK_SCENE_COVER_ASSETS, PackScene } from "@/components/illustrations/PackScene";

describe("PackScene", () => {
  it("resolves every current pack manifest to a named scene", () => {
    expect(taskPackManifests.map((manifest) => manifest.visualTheme.coverAsset)).toEqual(
      expect.arrayContaining([...PACK_SCENE_COVER_ASSETS]),
    );
  });

  it.each(PACK_SCENE_COVER_ASSETS)("renders the %s cover as original inline SVG", (coverAsset) => {
    const { container } = render(<PackScene coverAsset={coverAsset} />);
    const scene = container.querySelector("svg");

    expect(scene).toHaveAttribute("data-pack-scene", coverAsset);
    expect(scene).toHaveAttribute("aria-hidden", "true");
    expect(scene).toHaveAttribute("focusable", "false");
    expect(scene?.querySelectorAll("image")).toHaveLength(0);
  });

  it.each([
    ["movies-cinema-reel", "movies-cinema"],
    ["series-episode-screen", "series-episode"],
    ["gaming-pixel-arcade", "gaming-pixel"],
  ])("renders %s as the %s themed scene family", (coverAsset, sceneFamily) => {
    const { container } = render(
      <PackScene coverAsset={coverAsset} decorative={false} title={`${sceneFamily} artwork`} />,
    );

    expect(screen.getByRole("img", { name: `${sceneFamily} artwork` })).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute("data-scene-family", sceneFamily);
  });

  it("uses crisp pixel-grid geometry for the gaming scene", () => {
    const { container } = render(<PackScene coverAsset="gaming-pixel-arcade" />);

    expect(container.querySelector('g[data-scene-family="gaming-pixel"]')).toHaveAttribute(
      "shape-rendering",
      "crispEdges",
    );
  });

  it("uses a titled image contract when artwork is meaningful", () => {
    render(
      <PackScene
        coverAsset="classic-hungarian-party"
        decorative={false}
        title="Two players sharing a party card"
      />,
    );

    expect(screen.getByRole("img", { name: "Two players sharing a party card" })).toBeInTheDocument();
  });

  it("exposes a reusable non-cover scene variant", () => {
    const { container } = render(
      <PackScene coverAsset="easy-energy-english-city" variant="handoff" />,
    );

    expect(container.querySelector("svg")).toHaveAttribute("data-scene-variant", "handoff");
  });
});
