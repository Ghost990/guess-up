import type {
  PackFilter,
  RegisteredTaskContentSource,
  TaskPackManifest,
} from "@/types/packs";
import {
  type PackValidationIssue,
  validateTaskPackManifests,
} from "./packValidation";

export class TaskPackRegistryError extends Error {
  readonly issues: readonly PackValidationIssue[];

  constructor(issues: readonly PackValidationIssue[]) {
    super(`Task pack registry is invalid: ${issues.map((entry) => entry.code).join(", ")}`);
    this.name = "TaskPackRegistryError";
    this.issues = issues;
  }
}

export interface TaskPackRegistry {
  getAll(): readonly TaskPackManifest[];
  getById(id: string): TaskPackManifest | undefined;
  filter(filter?: PackFilter): readonly TaskPackManifest[];
}

function comparePackIds(left: TaskPackManifest, right: TaskPackManifest): number {
  if (left.id === right.id) {
    return 0;
  }

  return left.id < right.id ? -1 : 1;
}

function asArray<T>(value: T | readonly T[] | undefined): readonly T[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  return (Array.isArray(value) ? value : [value]) as readonly T[];
}

function matchesFilter(manifest: TaskPackManifest, filter: PackFilter): boolean {
  const audiences = asArray(filter.audience);
  const availabilities = asArray(filter.availability);

  return (
    (filter.locale === undefined || manifest.locale === filter.locale) &&
    (audiences === undefined || audiences.includes(manifest.audience)) &&
    (availabilities === undefined || availabilities.includes(manifest.availability)) &&
    (filter.tags === undefined || filter.tags.every((tag) => manifest.tags.includes(tag)))
  );
}

export function createTaskPackRegistry(
  manifests: readonly TaskPackManifest[],
  contentSources: readonly RegisteredTaskContentSource[],
): TaskPackRegistry {
  const issues = validateTaskPackManifests(manifests, contentSources);
  if (issues.length > 0) {
    throw new TaskPackRegistryError(issues);
  }

  const orderedPacks = [...manifests].sort(comparePackIds);
  const packsById = new Map(orderedPacks.map((manifest) => [manifest.id, manifest]));

  return {
    getAll: () => orderedPacks,
    getById: (id) => packsById.get(id),
    filter: (filter = {}) => orderedPacks.filter((manifest) => matchesFilter(manifest, filter)),
  };
}
