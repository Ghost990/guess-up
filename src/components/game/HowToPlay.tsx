"use client";

import { useEffect, useRef, useState } from "react";
import {
  AwardGlyph,
  CloseGlyph,
  ControlsGlyph,
  HelpGlyph,
  HideGlyph,
  PencilGlyph,
  PhoneGlyph,
  PlayersGlyph,
  SignalGlyph,
  SpeakGlyph,
  TimerGlyph,
  TrophyGlyph,
} from "@/components/icons";
import { messages } from "@/i18n/translations";
import type { Language } from "@/types";

interface HowToPlayProps {
  language: Language;
  compact?: boolean;
}

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <span className="howto-visual" aria-hidden="true">
        <PlayersGlyph size={48} />
        <ControlsGlyph className="howto-visual__detail" size={25} />
      </span>
    );
  }
  if (index === 1) {
    return (
      <span className="howto-visual" aria-hidden="true">
        <PhoneGlyph size={50} />
        <HideGlyph className="howto-visual__detail" size={25} />
      </span>
    );
  }
  if (index === 2) {
    return (
      <span className="howto-visual howto-visual--wide" aria-hidden="true">
        <TimerGlyph size={46} />
        <span className="howto-visual__modes">
          <PencilGlyph size={20} />
          <SpeakGlyph size={20} />
          <SignalGlyph size={20} />
        </span>
      </span>
    );
  }
  return (
    <span className="howto-visual" aria-hidden="true">
      <TrophyGlyph size={48} />
      <AwardGlyph className="howto-visual__detail" size={25} />
    </span>
  );
}

export function HowToPlay({ language, compact = false }: HowToPlayProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const copy = messages[language].howToPlay;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button
        className={`help-button${compact ? " help-button--compact" : ""}`}
        type="button"
        aria-label={copy.button}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <HelpGlyph aria-hidden="true" size={19} />
        <span>{copy.button}</span>
      </button>

      <dialog
        ref={dialogRef}
        className="howto-dialog"
        aria-labelledby="howto-title"
        onClose={() => setOpen(false)}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="howto-dialog__header">
          <div>
            <h2 id="howto-title">{copy.title}</h2>
            <p>{copy.intro}</p>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label={copy.close}
            onClick={() => setOpen(false)}
          >
            <CloseGlyph aria-hidden="true" />
          </button>
        </div>

        <ol className="howto-steps">
          {copy.steps.map((step, index) => (
            <li key={step.title}>
              <StepVisual index={index} />
              <div>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <button
          className="primary-button howto-dialog__close"
          type="button"
          onClick={() => setOpen(false)}
        >
          <AwardGlyph aria-hidden="true" size={20} />
          {copy.close}
        </button>
      </dialog>
    </>
  );
}
