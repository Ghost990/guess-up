"use client";

import { useEffect, useRef } from "react";
import { Check, TimerOff, UserRound, X } from "lucide-react";
import { messages } from "@/i18n/translations";
import type { Language, Player } from "@/types";

interface ScoringDialogProps {
  open: boolean;
  players: Player[];
  presenterId: string;
  language: Language;
  timeExpired: boolean;
  onSelect: (playerId: string) => void;
  onNoOne: () => void;
  onCancel: () => void;
}

export function ScoringDialog({
  open,
  players,
  presenterId,
  language,
  timeExpired,
  onSelect,
  onNoOne,
  onCancel,
}: ScoringDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const copy = messages[language];
  const selectablePlayers = players.filter((player) => player.id !== presenterId);

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
    <dialog
      ref={dialogRef}
      className="scoring-dialog"
      aria-labelledby="scoring-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!timeExpired) onCancel();
      }}
    >
      <div className="dialog-heading">
        <span className="dialog-icon">
          {timeExpired ? <TimerOff aria-hidden="true" /> : <Check aria-hidden="true" />}
        </span>
        <div>
          <h2 id="scoring-title">
            {timeExpired ? copy.play.timeUp : copy.play.whoGuessed}
          </h2>
          <p>{timeExpired ? copy.play.timeUpHint : copy.play.selectGuesser}</p>
        </div>
        {!timeExpired && (
          <button
            className="icon-button"
            type="button"
            aria-label={copy.common.cancel}
            onClick={onCancel}
          >
            <X aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="guesser-list">
        {selectablePlayers.map((player, index) => (
          <button
            key={player.id}
            type="button"
            autoFocus={index === 0}
            onClick={() => onSelect(player.id)}
          >
            <UserRound aria-hidden="true" size={20} />
            <span>{player.name}</span>
            <strong>{player.score}</strong>
          </button>
        ))}
      </div>

      <button className="secondary-button" type="button" onClick={onNoOne}>
        {copy.play.noOne}
      </button>
    </dialog>
  );
}
