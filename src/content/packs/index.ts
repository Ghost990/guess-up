import { createTaskPackRegistry } from "@/lib/packs";
import type { TaskPackManifest } from "@/types/packs";
import { taskContentSources } from "./contentSources";
import { classicEnglishPackManifest } from "./manifests/classic-en";
import { classicHungarianPackManifest } from "./manifests/classic-hu";
import { challengeHungarianPackManifest } from "./manifests/challenge-hu";
import { easyEnergyEnglishPackManifest } from "./manifests/easy-energy-en";

export { taskContentSources } from "./contentSources";
export { classicEnglishPackManifest } from "./manifests/classic-en";
export { classicHungarianPackManifest } from "./manifests/classic-hu";
export { challengeHungarianPackManifest } from "./manifests/challenge-hu";
export { easyEnergyEnglishPackManifest } from "./manifests/easy-energy-en";

export const taskPackManifests = [
  classicHungarianPackManifest,
  challengeHungarianPackManifest,
  classicEnglishPackManifest,
  easyEnergyEnglishPackManifest,
] as const satisfies readonly TaskPackManifest[];

export const taskPackRegistry = createTaskPackRegistry(taskPackManifests, taskContentSources);
