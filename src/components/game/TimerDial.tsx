interface TimerDialProps {
  remainingMs: number;
  totalMs: number;
  label: string;
  unit: string;
}

export function TimerDial({ remainingMs, totalMs, label, unit }: TimerDialProps) {
  const seconds = Math.max(0, Math.ceil(remainingMs / 1000));
  const progress = Math.max(0, Math.min(1, remainingMs / totalMs));
  const state = progress > 0.5 ? "safe" : progress > 0.2 ? "warning" : "critical";

  return (
    <div
      className="timer-dial"
      data-state={state}
      style={{ "--timer-progress": `${progress * 360}deg` } as React.CSSProperties}
      role="timer"
      aria-label={`${label}: ${seconds}`}
    >
      <div>
        <strong>{seconds}</strong>
        <span>{unit}</span>
      </div>
    </div>
  );
}
