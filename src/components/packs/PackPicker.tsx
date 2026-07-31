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
    <section className="pack-picker" aria-labelledby="pack-picker-heading">
      <h2 id="pack-picker-heading" className="pack-picker__title">
        {copy.heading}
      </h2>
      {items.length === 0 ? (
        <p className="pack-picker__empty">{copy.emptyMessage}</p>
      ) : (
        <div className="pack-picker__grid">
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
