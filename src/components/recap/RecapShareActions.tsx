"use client";

import { useState } from "react";

export interface RecapShareLabels {
  nativeShare: string;
  downloadPng: string;
  shareText: string;
  unavailable: string;
  failed: string;
}

export interface RecapShareCapabilities {
  nativeShare: boolean;
  pngDownload: boolean;
  textShare: boolean;
}

export interface RecapShareCallbacks {
  onNativeShare?: () => void | Promise<void>;
  onDownloadPng?: () => void | Promise<void>;
  onShareText?: () => void | Promise<void>;
}

interface RecapShareActionsProps {
  labels: RecapShareLabels;
  capabilities: RecapShareCapabilities;
  callbacks: RecapShareCallbacks;
}

interface ShareButtonProps {
  label: string;
  onAction: () => void | Promise<void>;
  onFailure: () => void;
}

function ShareButton({ label, onAction, onFailure }: ShareButtonProps) {
  const handleClick = async () => {
    try {
      await onAction();
    } catch {
      onFailure();
    }
  };

  return (
    <button className="secondary-button" type="button" onClick={handleClick}>
      {label}
    </button>
  );
}

/**
 * Capability-only share controls. Browser APIs and image generation remain in
 * the caller so this component is testable and usable in every runtime.
 */
export function RecapShareActions({
  labels,
  capabilities,
  callbacks,
}: RecapShareActionsProps) {
  const [error, setError] = useState<string | null>(null);
  const actions = [
    capabilities.nativeShare && callbacks.onNativeShare
      ? { label: labels.nativeShare, onAction: callbacks.onNativeShare }
      : null,
    capabilities.pngDownload && callbacks.onDownloadPng
      ? { label: labels.downloadPng, onAction: callbacks.onDownloadPng }
      : null,
    capabilities.textShare && callbacks.onShareText
      ? { label: labels.shareText, onAction: callbacks.onShareText }
      : null,
  ].filter((action): action is { label: string; onAction: () => void | Promise<void> } => Boolean(action));

  if (actions.length === 0) {
    return <p role="status">{labels.unavailable}</p>;
  }

  return (
    <div aria-label={labels.nativeShare} className="recap-share-actions">
      {actions.map((action) => (
        <ShareButton
          key={action.label}
          label={action.label}
          onAction={action.onAction}
          onFailure={() => setError(labels.failed)}
        />
      ))}
      {error ? <p role="alert">{error}</p> : null}
    </div>
  );
}
