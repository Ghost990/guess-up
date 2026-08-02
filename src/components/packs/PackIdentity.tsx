import type { Language } from "@/types";
import type { TaskPackManifest } from "@/types/packs";

interface PackIdentityProps {
  manifest: TaskPackManifest;
  language: Language;
  compact?: boolean;
}

export function PackIdentity({ manifest, language, compact = false }: PackIdentityProps) {
  const label = language === "hu" ? "Aktív csomag" : "Active pack";

  return (
    <p
      className="pack-identity"
      data-compact={compact}
      aria-label={`${label}: ${manifest.metadata.title}`}
    >
      <span aria-hidden="true" />
      {!compact && <small>{label}</small>}
      <strong>{manifest.metadata.title}</strong>
    </p>
  );
}
