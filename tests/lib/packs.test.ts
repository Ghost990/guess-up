import { describe, expect, it } from "vitest";
import {
  classicEnglishPackManifest,
  classicHungarianPackManifest,
  taskContentSources,
  taskPackManifests,
  taskPackRegistry,
} from "@/content/packs";
import {
  TaskPackRegistryError,
  createFreeEntitlementProvider,
  createLocalDemoEntitlementProvider,
  createTaskPackRegistry,
  resolvePackPickerItems,
  validateTaskPackManifests,
} from "@/lib/packs";
import type { TaskPackManifest } from "@/types/packs";

describe("task pack registry", () => {
  it("registers localized manifests that reference the existing word-pack sources", () => {
    expect(validateTaskPackManifests(taskPackManifests, taskContentSources)).toEqual([]);
    expect(taskPackRegistry.getAll().map((manifest) => manifest.id)).toEqual([
      "challenge-hungarian",
      "classic-english",
      "classic-hungarian",
      "easy-energy-english",
      "gaming-english",
      "gaming-hungarian",
      "movies-english",
      "movies-hungarian",
      "series-english",
      "series-hungarian",
    ]);
    expect(classicHungarianPackManifest.contentSource.location).toBe("src/data/words-hu.json");
    expect(classicEnglishPackManifest.contentSource.location).toBe("src/data/words-en.json");
  });

  it("filters deterministically by locale, audience, availability, and tags", () => {
    expect(taskPackRegistry.filter({ locale: "hu" }).map((manifest) => manifest.id)).toEqual([
      "challenge-hungarian",
      "classic-hungarian",
      "gaming-hungarian",
      "movies-hungarian",
      "series-hungarian",
    ]);
    expect(taskPackRegistry.filter({ audience: "family", tags: ["classic"] })).toHaveLength(2);
    expect(taskPackRegistry.filter({ locale: "hu", audience: "adult", tags: ["challenge"] }))
      .toHaveLength(1);
    expect(taskPackRegistry.filter({ availability: "premium" })).toEqual([]);
  });

  it("reports invalid schema and unknown content source references", () => {
    const invalidManifest = {
      ...classicHungarianPackManifest,
      schemaVersion: 99,
      contentSource: {
        ...classicHungarianPackManifest.contentSource,
        id: "unknown-source",
      },
    } as TaskPackManifest;

    expect(validateTaskPackManifests([invalidManifest], taskContentSources).map((entry) => entry.code)).toEqual(
      expect.arrayContaining(["unsupported_schema_version", "unknown_content_source"]),
    );
  });

  it("rejects duplicate manifest IDs before creating a registry", () => {
    expect(() =>
      createTaskPackRegistry(
        [classicHungarianPackManifest, classicHungarianPackManifest],
        taskContentSources,
      ),
    ).toThrow(TaskPackRegistryError);

    try {
      createTaskPackRegistry(
        [classicHungarianPackManifest, classicHungarianPackManifest],
        taskContentSources,
      );
    } catch (error) {
      expect(error).toBeInstanceOf(TaskPackRegistryError);
      expect((error as TaskPackRegistryError).issues.map((entry) => entry.code)).toContain(
        "duplicate_pack_id",
      );
    }
  });
});

describe("pack entitlements", () => {
  const premiumEnglishManifest: TaskPackManifest = {
    ...classicEnglishPackManifest,
    id: "english-demo-premium",
    availability: "premium",
  };
  const manifests = [classicHungarianPackManifest, premiumEnglishManifest] as const;

  it("allows free packs without exposing a premium flag to callers", async () => {
    const provider = createFreeEntitlementProvider(manifests);

    await expect(provider.canAccessPack("classic-hungarian")).resolves.toBe(true);
    await expect(provider.canAccessPack("english-demo-premium")).resolves.toBe(false);
  });

  it("supports a local demo unlock only for a registered pack", async () => {
    const provider = createLocalDemoEntitlementProvider(manifests, [
      "english-demo-premium",
      "not-a-pack",
    ]);

    await expect(provider.canAccessPack("english-demo-premium")).resolves.toBe(true);
    await expect(provider.canAccessPack("not-a-pack")).resolves.toBe(false);

    await expect(resolvePackPickerItems(manifests, provider)).resolves.toMatchObject([
      { manifest: { id: "classic-hungarian" }, access: "available" },
      { manifest: { id: "english-demo-premium" }, access: "available" },
    ]);
  });
});
