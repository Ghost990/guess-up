import type { CSSProperties } from "react";
import type { PackSurfaceStyle, TaskPackManifest } from "@/types/packs";

interface PackSurfaceProperties extends CSSProperties {
  "--pack-accent": string;
  "--pack-secondary": string;
  "--pack-stage-radius": string;
  "--pack-control-radius": string;
  "--pack-pattern-size": string;
}

export interface PackSurfaceAttributes {
  "data-pack-id"?: string;
  "data-pack-theme": PackSurfaceStyle;
  "data-pack-surface": PackSurfaceStyle;
  "data-pack-background"?: TaskPackManifest["visualTheme"]["backgroundStyle"];
  style: PackSurfaceProperties;
}

const themeTokens: Record<
  PackSurfaceStyle,
  Omit<PackSurfaceProperties, "--pack-accent">
> = {
  classic: {
    "--pack-secondary": "#ef6b59",
    "--pack-stage-radius": "16px",
    "--pack-control-radius": "10px",
    "--pack-pattern-size": "28px",
  },
  summit: {
    "--pack-secondary": "#f5b642",
    "--pack-stage-radius": "10px",
    "--pack-control-radius": "8px",
    "--pack-pattern-size": "34px",
  },
  city: {
    "--pack-secondary": "#63c9a6",
    "--pack-stage-radius": "18px",
    "--pack-control-radius": "12px",
    "--pack-pattern-size": "30px",
  },
  cinema: {
    "--pack-secondary": "#f5b642",
    "--pack-stage-radius": "8px",
    "--pack-control-radius": "6px",
    "--pack-pattern-size": "24px",
  },
  broadcast: {
    "--pack-secondary": "#63c9a6",
    "--pack-stage-radius": "12px",
    "--pack-control-radius": "8px",
    "--pack-pattern-size": "10px",
  },
  arcade: {
    "--pack-secondary": "#58b9d6",
    "--pack-stage-radius": "4px",
    "--pack-control-radius": "3px",
    "--pack-pattern-size": "16px",
  },
};

const defaultSurface: PackSurfaceAttributes = {
  "data-pack-theme": "classic",
  "data-pack-surface": "classic",
  style: { "--pack-accent": "#f5b642", ...themeTokens.classic },
};

export function getPackSurfaceAttributes(
  manifest: TaskPackManifest | null | undefined,
): PackSurfaceAttributes {
  if (!manifest) return defaultSurface;

  return {
    "data-pack-id": manifest.id,
    "data-pack-theme": manifest.visualTheme.surfaceStyle,
    "data-pack-surface": manifest.visualTheme.surfaceStyle,
    "data-pack-background": manifest.visualTheme.backgroundStyle,
    style: {
      "--pack-accent": manifest.visualTheme.accentColor,
      ...themeTokens[manifest.visualTheme.surfaceStyle],
    },
  };
}
