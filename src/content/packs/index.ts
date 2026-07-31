import { createTaskPackRegistry } from "@/lib/packs";
import type { TaskPackManifest } from "@/types/packs";
import { taskContentSources } from "./contentSources";
import { classicEnglishPackManifest } from "./manifests/classic-en";
import { classicHungarianPackManifest } from "./manifests/classic-hu";
import { challengeHungarianPackManifest } from "./manifests/challenge-hu";
import { easyEnergyEnglishPackManifest } from "./manifests/easy-energy-en";
import { gamingEnglishPackManifest } from "./manifests/gaming-en";
import { gamingHungarianPackManifest } from "./manifests/gaming-hu";
import { moviesEnglishPackManifest } from "./manifests/movies-en";
import { moviesHungarianPackManifest } from "./manifests/movies-hu";
import { seriesEnglishPackManifest } from "./manifests/series-en";
import { seriesHungarianPackManifest } from "./manifests/series-hu";

export { taskContentSources } from "./contentSources";
export { classicEnglishPackManifest } from "./manifests/classic-en";
export { classicHungarianPackManifest } from "./manifests/classic-hu";
export { challengeHungarianPackManifest } from "./manifests/challenge-hu";
export { easyEnergyEnglishPackManifest } from "./manifests/easy-energy-en";
export { gamingEnglishPackManifest } from "./manifests/gaming-en";
export { gamingHungarianPackManifest } from "./manifests/gaming-hu";
export { moviesEnglishPackManifest } from "./manifests/movies-en";
export { moviesHungarianPackManifest } from "./manifests/movies-hu";
export { seriesEnglishPackManifest } from "./manifests/series-en";
export { seriesHungarianPackManifest } from "./manifests/series-hu";

export const taskPackManifests = [
  classicHungarianPackManifest,
  challengeHungarianPackManifest,
  moviesHungarianPackManifest,
  seriesHungarianPackManifest,
  gamingHungarianPackManifest,
  classicEnglishPackManifest,
  easyEnergyEnglishPackManifest,
  moviesEnglishPackManifest,
  seriesEnglishPackManifest,
  gamingEnglishPackManifest,
] as const satisfies readonly TaskPackManifest[];

export const taskPackRegistry = createTaskPackRegistry(taskPackManifests, taskContentSources);
