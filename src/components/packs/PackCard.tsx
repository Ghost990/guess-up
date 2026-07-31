"use client";

import type { CSSProperties } from "react";
import type { PackAccessState, TaskPackManifest } from "@/types/packs";

export interface PackCardCopy {
  selectLabel: string;
  selectedLabel: string;
  lockedLabel: string;
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
  const style: CSSProperties = { borderColor: manifest.visualTheme.accentColor };

  return (
    <article
      aria-label={manifest.metadata.title}
      className="flex min-h-52 flex-col rounded-xl border bg-[var(--surface-raised)] p-5"
      data-cover-asset={manifest.visualTheme.coverAsset}
      data-pack-id={manifest.id}
      data-pack-style={manifest.visualTheme.backgroundStyle}
      data-selected={selected}
      data-testid={`pack-card-${manifest.id}`}
      style={style}
    >
      <div className="mb-5 h-2 w-16 rounded-full" style={{ backgroundColor: manifest.visualTheme.accentColor }} />
      <div className="flex-1">
        <p className="mb-2 text-sm font-semibold text-[var(--muted)]">{manifest.audience}</p>
        <h3 className="text-xl font-extrabold tracking-tight">{manifest.metadata.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{manifest.metadata.description}</p>
      </div>
      <button
        aria-pressed={!locked && selected}
        className={selected && !locked ? "primary-button mt-5" : "secondary-button mt-5"}
        disabled={locked}
        onClick={() => onSelect?.(manifest.id)}
        type="button"
      >
        {actionLabel}
      </button>
    </article>
  );
}
