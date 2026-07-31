"use client";

import type { CSSProperties } from "react";
import { PackScene } from "@/components/illustrations/PackScene";
import type { PackAccessState, PackAudience, TaskPackManifest } from "@/types/packs";

export interface PackCardCopy {
  selectLabel: string;
  selectedLabel: string;
  lockedLabel: string;
  audienceLabels?: Partial<Record<PackAudience, string>>;
}

export interface PackCardProps {
  manifest: TaskPackManifest;
  access: PackAccessState;
  selected: boolean;
  copy: PackCardCopy;
  onSelect?: (packId: string) => void;
}

export function PackCard({
  manifest,
  access,
  selected,
  copy,
  onSelect,
}: PackCardProps) {
  const locked = access === "locked";
  const actionLabel = locked
    ? copy.lockedLabel
    : selected
      ? copy.selectedLabel
      : copy.selectLabel;
  const style = {
    "--pack-card-accent": manifest.visualTheme.accentColor,
  } as CSSProperties;

  return (
    <article
      aria-label={manifest.metadata.title}
      className="pack-card"
      data-cover-asset={manifest.visualTheme.coverAsset}
      data-pack-id={manifest.id}
      data-pack-style={manifest.visualTheme.backgroundStyle}
      data-selected={selected}
      data-testid={`pack-card-${manifest.id}`}
      style={style}
    >
      <div className="pack-card__art">
        <PackScene
          className="block h-auto w-full"
          coverAsset={manifest.visualTheme.coverAsset}
        />
      </div>
      <div className="pack-card__copy">
        <p className="pack-card__audience">
          {copy.audienceLabels?.[manifest.audience] ?? manifest.audience}
        </p>
        <h3>{manifest.metadata.title}</h3>
        <p className="pack-card__description">{manifest.metadata.description}</p>
      </div>
      <button
        aria-pressed={!locked && selected}
        className={selected && !locked ? "primary-button pack-card__action" : "secondary-button pack-card__action"}
        disabled={locked}
        onClick={() => onSelect?.(manifest.id)}
        type="button"
      >
        {actionLabel}
      </button>
    </article>
  );
}
