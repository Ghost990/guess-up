import { CATEGORIES, DIFFICULTY_LEVELS } from "@/types";
import {
  PACK_AUDIENCES,
  PACK_AVAILABILITIES,
  PACK_CONTENT_SOURCE_KINDS,
  TASK_PACK_MANIFEST_SCHEMA_VERSION,
  type RegisteredTaskContentSource,
  type TaskPackManifest,
} from "@/types/packs";

export type PackValidationIssueCode =
  | "duplicate_pack_id"
  | "duplicate_content_source_id"
  | "unsupported_schema_version"
  | "invalid_pack_id"
  | "invalid_semantic_version"
  | "invalid_metadata"
  | "invalid_audience"
  | "invalid_availability"
  | "invalid_content_source"
  | "unknown_content_source"
  | "content_source_mismatch"
  | "incompatible_category"
  | "incompatible_difficulty"
  | "invalid_visual_theme";

export interface PackValidationIssue {
  code: PackValidationIssueCode;
  packId: string;
  message: string;
}

const packIdPattern = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const semanticVersionPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

function issue(
  code: PackValidationIssueCode,
  manifest: TaskPackManifest,
  message: string,
): PackValidationIssue {
  return { code, packId: manifest.id || "<unknown>", message };
}

function hasNonBlankText(value: string): boolean {
  return value.trim().length > 0;
}

export function validateTaskPackManifest(
  manifest: TaskPackManifest,
  contentSources: readonly RegisteredTaskContentSource[],
): PackValidationIssue[] {
  const issues: PackValidationIssue[] = [];

  if (manifest.schemaVersion !== TASK_PACK_MANIFEST_SCHEMA_VERSION) {
    issues.push(issue("unsupported_schema_version", manifest, "Schema version is not supported."));
  }

  if (!packIdPattern.test(manifest.id)) {
    issues.push(issue("invalid_pack_id", manifest, "Pack IDs must be stable lowercase kebab-case values."));
  }

  if (!semanticVersionPattern.test(manifest.version)) {
    issues.push(issue("invalid_semantic_version", manifest, "Pack version must use semantic versioning."));
  }

  if (
    manifest.metadata.locale !== manifest.locale ||
    !hasNonBlankText(manifest.metadata.title) ||
    !hasNonBlankText(manifest.metadata.description)
  ) {
    issues.push(issue("invalid_metadata", manifest, "Metadata must be localized and include title and description."));
  }

  if (!PACK_AUDIENCES.includes(manifest.audience)) {
    issues.push(issue("invalid_audience", manifest, "Audience is not supported."));
  }

  if (!PACK_AVAILABILITIES.includes(manifest.availability)) {
    issues.push(issue("invalid_availability", manifest, "Availability is not supported."));
  }

  if (
    !PACK_CONTENT_SOURCE_KINDS.includes(manifest.contentSource.kind) ||
    !hasNonBlankText(manifest.contentSource.id) ||
    !hasNonBlankText(manifest.contentSource.location)
  ) {
    issues.push(issue("invalid_content_source", manifest, "Content source must have an ID, kind, and location."));
  }

  if (
    !hasNonBlankText(manifest.visualTheme.accentColor) ||
    !hasNonBlankText(manifest.visualTheme.coverAsset)
  ) {
    issues.push(issue("invalid_visual_theme", manifest, "Visual theme must have an accent color and cover asset."));
  }

  const source = contentSources.find((candidate) => candidate.id === manifest.contentSource.id);
  if (!source) {
    issues.push(issue("unknown_content_source", manifest, "Content source is not registered."));
    return issues;
  }

  if (
    source.kind !== manifest.contentSource.kind ||
    source.location !== manifest.contentSource.location ||
    source.locale !== manifest.locale
  ) {
    issues.push(issue("content_source_mismatch", manifest, "Content source does not match the pack locale or reference."));
  }

  for (const category of manifest.compatibility.categories) {
    if (!CATEGORIES.includes(category) || !source.categories.includes(category)) {
      issues.push(issue("incompatible_category", manifest, `Category "${category}" is unavailable in the content source.`));
    }
  }

  for (const difficulty of manifest.compatibility.difficulties) {
    if (!DIFFICULTY_LEVELS.includes(difficulty) || !source.difficulties.includes(difficulty)) {
      issues.push(issue("incompatible_difficulty", manifest, `Difficulty "${difficulty}" is unavailable in the content source.`));
    }
  }

  return issues;
}

export function validateTaskPackManifests(
  manifests: readonly TaskPackManifest[],
  contentSources: readonly RegisteredTaskContentSource[],
): PackValidationIssue[] {
  const issues: PackValidationIssue[] = [];
  const seenPackIds = new Set<string>();
  const seenSourceIds = new Set<string>();

  for (const source of contentSources) {
    if (seenSourceIds.has(source.id)) {
      issues.push({
        code: "duplicate_content_source_id",
        packId: source.id,
        message: "Content source IDs must be unique.",
      });
    }
    seenSourceIds.add(source.id);
  }

  for (const manifest of manifests) {
    if (seenPackIds.has(manifest.id)) {
      issues.push(issue("duplicate_pack_id", manifest, "Pack IDs must be unique."));
    }
    seenPackIds.add(manifest.id);
    issues.push(...validateTaskPackManifest(manifest, contentSources));
  }

  return issues;
}
