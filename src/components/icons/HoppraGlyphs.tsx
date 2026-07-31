import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Shared props for the first-party Hoppra Glyph family. */
export interface HoppraGlyphProps
  extends Omit<ComponentPropsWithoutRef<"svg">, "children" | "height" | "width"> {
  /** Square rendered dimensions; numbers are interpreted as CSS pixels. */
  size?: number | string;
}

const ink = "#17130e";
const paper = "#fff8e8";
const coral = "#ef5d7a";
const cyan = "#6dc6dd";
const yellow = "#f5b642";
const mint = "#9fe870";

function GlyphFrame({
  children,
  size = 24,
  "aria-hidden": ariaHidden,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  role,
  ...props
}: HoppraGlyphProps & { children: ReactNode }) {
  const hasAccessibleName = Boolean(ariaLabel || ariaLabelledBy);

  return (
    <svg
      aria-hidden={ariaHidden ?? !hasAccessibleName}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      fill="none"
      focusable="false"
      height={size}
      role={role ?? (hasAccessibleName ? "img" : undefined)}
      stroke={ink}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.25"
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CheckGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="m4 12 5 5 11-11" /><path d="M4 17h4" stroke={mint} strokeWidth="3.5" /></GlyphFrame>;
}

export function CloseGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="m6 6 12 12M18 6 6 18" /><circle cx="12" cy="12" fill={coral} opacity=".22" r="8" /></GlyphFrame>;
}

export function ArrowGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M4 12h14M13 6l6 6-6 6" /><path d="M5 8v8" stroke={cyan} strokeWidth="3.5" /></GlyphFrame>;
}

export function SkipGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="m5 6 9 6-9 6z" fill={yellow} /><path d="M18 6v12" /></GlyphFrame>;
}

export function RevealGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M3 12s3.2-5 9-5 9 5 9 5-3.2 5-9 5-9-5-9-5Z" fill={cyan} /><circle cx="12" cy="12" fill={paper} r="2.6" /><path d="M12 10.6v2.8" /></GlyphFrame>;
}

export function HideGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M3 12s3.2-5 9-5c1.7 0 3.2.4 4.4 1M21 12s-3.2 5-9 5c-1.7 0-3.2-.4-4.4-1" fill={cyan} /><path d="m5 5 14 14" /><path d="M10.3 10.3a2.5 2.5 0 0 0 3.4 3.4" /></GlyphFrame>;
}

export function TrophyGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M7 4h10v5a5 5 0 0 1-10 0z" fill={yellow} /><path d="M7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5M12 14v4M8 20h8" /><path d="m12 6 .7 1.5 1.7.2-1.3 1.1.4 1.6-1.5-.8-1.5.8.4-1.6-1.3-1.1 1.7-.2z" fill={coral} stroke="none" /></GlyphFrame>;
}

export function ReplayGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M7 8V4l-4 4 4 4V8a7 7 0 1 1-1 8.8" /><path d="M7 4h4" stroke={cyan} strokeWidth="3.5" /></GlyphFrame>;
}

export function SoundOnGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M4 10h4l5-4v12l-5-4H4z" fill={coral} /><path d="M16 9c1 .7 1.5 1.7 1.5 3S17 14.3 16 15M18.5 6.5c1.7 1.4 2.5 3.2 2.5 5.5s-.8 4.1-2.5 5.5" /></GlyphFrame>;
}

export function SoundOffGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M4 10h4l5-4v12l-5-4H4z" fill={coral} /><path d="m16 9 5 6M21 9l-5 6" /></GlyphFrame>;
}

export function PhoneGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><rect fill={cyan} height="17" rx="2.5" width="10" x="7" y="3.5" /><path d="M10 6h4M11 17h2" /><path d="M17 8h2" stroke={mint} strokeWidth="3.5" /></GlyphFrame>;
}

export function GlobeGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><circle cx="12" cy="12" fill={cyan} r="8" /><path d="M4.8 9h14.4M4.8 15h14.4M12 4c2 2.1 3 4.8 3 8s-1 5.9-3 8c-2-2.1-3-4.8-3-8s1-5.9 3-8Z" /><circle cx="18.5" cy="6" fill={coral} r="2" /></GlyphFrame>;
}

export function HelpGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" fill={yellow} /><path d="M9.5 9a2.6 2.6 0 1 1 4.2 2.1c-1.2.9-1.7 1.4-1.7 2.9M12 17h.01" /><path d="M4.8 5.4 6.5 7" stroke={coral} strokeWidth="3" /></GlyphFrame>;
}

export function PlayersGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><circle cx="9" cy="8" fill={mint} r="3" /><circle cx="17" cy="9" fill={cyan} r="2.5" /><path d="M3.8 19c.5-3.3 2.3-5 5.2-5s4.7 1.7 5.2 5M14.5 19c.3-2.2 1.5-3.6 3.6-3.6 1.4 0 2.4.7 3 2" /></GlyphFrame>;
}

export function ControlsGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M5 6h14M5 12h14M5 18h14" /><circle cx="9" cy="6" fill={coral} r="2" /><circle cx="15" cy="12" fill={cyan} r="2" /><circle cx="11" cy="18" fill={mint} r="2" /></GlyphFrame>;
}

export function TimerGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M8 3h8M12 6a7 7 0 1 1-5 2.1M12 10v3l3 2" /><path d="M16 5l2-2" stroke={coral} strokeWidth="3" /><circle cx="12" cy="13" fill={yellow} r="1.4" /></GlyphFrame>;
}

export function TimeUpGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M8 3h8M12 6a7 7 0 1 1-5 2.1M12 10v3l3 2" /><path d="m5 5 14 14" /><path d="M16 5l2-2" stroke={coral} strokeWidth="3" /></GlyphFrame>;
}

export function PencilGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="m6 17-1 3 3-1L19 8l-2-2z" fill={yellow} /><path d="m15 5 2 2M5 20h5" /><path d="m7 15 2 2" stroke={coral} strokeWidth="3" /></GlyphFrame>;
}

export function SpeakGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M5 5h14v10H10l-4 4v-4z" fill={cyan} /><path d="M9 9h6M9 12h3" /><path d="M18 17l2 2" stroke={coral} strokeWidth="3" /></GlyphFrame>;
}

export function SignalGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M9 20v-6l-2-2V8.5a1.5 1.5 0 0 1 3 0V11M10 11V6.5a1.5 1.5 0 0 1 3 0V11M13 11V8a1.5 1.5 0 0 1 3 0v3M16 11V9.5a1.5 1.5 0 0 1 3 0V15c0 3-2 5-5 5z" fill={mint} /><path d="M6 5 4 3M18 5l2-2" stroke={coral} strokeWidth="3" /></GlyphFrame>;
}

export function AwardGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M12 4 14 6l3-.2.2 3 2 2-2 2-.2 3-3-.2-2 2-2-2-3 .2-.2-3-2-2 2-2 .2-3 3 .2z" fill={yellow} /><path d="m9.7 11.5 1.5 1.5 3.1-3.2M9 16l-1 4 4-2 4 2-1-4" /></GlyphFrame>;
}

export function AddGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M12 5v14M5 12h14" /><circle cx="12" cy="12" fill={mint} opacity=".35" r="7.5" /></GlyphFrame>;
}

export function DeleteGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="M6 7h12l-1 13H7z" fill={coral} /><path d="M4 7h16M9 7V4h6v3M10 11v5M14 11v5" /></GlyphFrame>;
}

export function LayersGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><path d="m12 4 8 4-8 4-8-4z" fill={cyan} /><path d="m5 12 7 4 7-4M5 16l7 4 7-4" /></GlyphFrame>;
}

export function PlayerGlyph(props: HoppraGlyphProps) {
  return <GlyphFrame {...props}><circle cx="12" cy="8" fill={mint} r="3.3" /><path d="M5 20c.7-4.1 3-6.2 7-6.2s6.3 2.1 7 6.2" /><path d="M18 6h3v3" stroke={coral} strokeWidth="3" /></GlyphFrame>;
}
