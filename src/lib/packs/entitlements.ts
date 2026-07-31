import type {
  EntitlementProvider,
  PackAccessState,
  PackPickerItem,
  TaskPackManifest,
} from "@/types/packs";

function knownPackIds(manifests: readonly TaskPackManifest[]): Set<string> {
  return new Set(manifests.map((manifest) => manifest.id));
}

export function createFreeEntitlementProvider(
  manifests: readonly TaskPackManifest[],
): EntitlementProvider {
  const freePackIds = new Set(
    manifests
      .filter((manifest) => manifest.availability === "free")
      .map((manifest) => manifest.id),
  );

  return {
    async canAccessPack(packId: string): Promise<boolean> {
      return freePackIds.has(packId);
    },
  };
}

export function createLocalDemoEntitlementProvider(
  manifests: readonly TaskPackManifest[],
  demoUnlockedPackIds: readonly string[] = [],
): EntitlementProvider {
  const knownIds = knownPackIds(manifests);
  const freeProvider = createFreeEntitlementProvider(manifests);
  const demoIds = new Set(demoUnlockedPackIds.filter((packId) => knownIds.has(packId)));

  return {
    async canAccessPack(packId: string): Promise<boolean> {
      return (await freeProvider.canAccessPack(packId)) || demoIds.has(packId);
    },
  };
}

export async function resolvePackPickerItems(
  manifests: readonly TaskPackManifest[],
  entitlementProvider: EntitlementProvider,
): Promise<readonly PackPickerItem[]> {
  return Promise.all(
    manifests.map(async (manifest) => {
      const access: PackAccessState = (await entitlementProvider.canAccessPack(manifest.id))
        ? "available"
        : "locked";

      return { manifest, access };
    }),
  );
}
