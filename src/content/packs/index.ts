import { createTaskPackRegistry } from "@/lib/packs";
import type { TaskPackManifest } from "@/types/packs";
import { taskContentSources } from "./contentSources";
import { classicEnglishPackManifest } from "./manifests/classic-en";
import { classicHungarianPackManifest } from "./manifests/classic-hu";

export { taskContentSources } from "./contentSources";
export { classicEnglishPackManifest } from "./manifests/classic-en";
export { classicHungarianPackManifest } from "./manifests/classic-hu";

export const taskPackManifests = [
  classicHungarianPackManifest,
  classicEnglishPackManifest,
] as const satisfies readonly TaskPackManifest[];

export const taskPackRegistry = createTaskPackRegistry(taskPackManifests, taskContentSources);
