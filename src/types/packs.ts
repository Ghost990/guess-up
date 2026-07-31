import type { Category, Difficulty, Language } from "./word";

export const TASK_PACK_MANIFEST_SCHEMA_VERSION = 2;

export const PACK_AUDIENCES = ["family", "kids", "adult", "office"] as const;
export type PackAudience = (typeof PACK_AUDIENCES)[number];

export const PACK_AVAILABILITIES = ["free", "premium", "event"] as const;
export type PackAvailability = (typeof PACK_AVAILABILITIES)[number];

export const PACK_CONTENT_SOURCE_KINDS = [
  "existing-word-pack",
  "pack-data",
  "custom",
] as const;
export type PackContentSourceKind = (typeof PACK_CONTENT_SOURCE_KINDS)[number];

export interface LocalizedPackMetadata {
  locale: Language;
  title: string;
  description: string;
}

export interface PackContentSource {
  id: string;
  kind: PackContentSourceKind;
  location: string;
}

export interface PackCompatibility {
  categories: readonly Category[];
  difficulties: readonly Difficulty[];
}

export const PACK_SURFACE_STYLES = [
  "classic",
  "summit",
  "city",
  "cinema",
  "broadcast",
  "arcade",
] as const;
export type PackSurfaceStyle = (typeof PACK_SURFACE_STYLES)[number];

export interface PackVisualTheme {
  accentColor: string;
  coverAsset: string;
  backgroundStyle: "warm" | "cool" | "neutral" | "playful";
  surfaceStyle: PackSurfaceStyle;
}

export interface TaskPackManifest {
  id: string;
  schemaVersion: number;
  locale: Language;
  metadata: LocalizedPackMetadata;
  audience: PackAudience;
  availability: PackAvailability;
  version: string;
  contentSource: PackContentSource;
  compatibility: PackCompatibility;
  visualTheme: PackVisualTheme;
  tags: readonly string[];
}

export interface RegisteredTaskContentSource extends PackContentSource {
  locale: Language;
  categories: readonly Category[];
  difficulties: readonly Difficulty[];
}

export interface PackFilter {
  locale?: Language;
  audience?: PackAudience | readonly PackAudience[];
  availability?: PackAvailability | readonly PackAvailability[];
  tags?: readonly string[];
}

export interface EntitlementProvider {
  canAccessPack(packId: string): Promise<boolean>;
}

export type PackAccessState = "available" | "locked";

export interface PackPickerItem {
  manifest: TaskPackManifest;
  access: PackAccessState;
}
