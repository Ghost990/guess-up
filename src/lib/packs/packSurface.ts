import type { CSSProperties } from "react";
import type { PackSurfaceStyle, TaskPackManifest } from "@/types/packs";

interface PackSurfaceProperties extends CSSProperties {
  "--pack-accent": string;
}

export interface PackSurfaceAttributes {
  "data-pack-surface": PackSurfaceStyle;
  style: PackSurfaceProperties;
}

const defaultSurface: PackSurfaceAttributes = {
  "data-pack-surface": "classic",
  style: { "--pack-accent": "#f5b642" },
};

export function getPackSurfaceAttributes(
  manifest: TaskPackManifest | null | undefined,
): PackSurfaceAttributes {
  if (!manifest) return defaultSurface;

  return {
    "data-pack-surface": manifest.visualTheme.surfaceStyle,
    style: { "--pack-accent": manifest.visualTheme.accentColor },
  };
}
