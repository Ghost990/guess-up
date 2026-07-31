"use client";

import type { PackPickerItem } from "@/types/packs";
import { PackCard, type PackCardCopy } from "./PackCard";

export interface PackPickerCopy {
  heading: string;
  emptyMessage: string;
  card: PackCardCopy;
}

export interface PackPickerProps {
  items: readonly PackPickerItem[];
  selectedPackId?: string;
  copy: PackPickerCopy;
  onSelect?: (packId: string) => void;
}

export function PackPicker({
  items,
  selectedPackId,
  copy,
  onSelect,
}: PackPickerProps) {
  return (
    <section aria-labelledby="pack-picker-heading">
      <h2 id="pack-picker-heading" className="text-2xl font-extrabold tracking-tight">
        {copy.heading}
      </h2>
      {items.length === 0 ? (
        <p className="mt-3 text-[var(--muted)]">{copy.emptyMessage}</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map(({ manifest, access }) => (
            <PackCard
              key={manifest.id}
              access={access}
              copy={copy.card}
              manifest={manifest}
              onSelect={onSelect}
              selected={selectedPackId === manifest.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}
