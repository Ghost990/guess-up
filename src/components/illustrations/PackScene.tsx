import { useId, type ReactNode } from "react";

export const PACK_SCENE_COVER_ASSETS = [
  "classic-hungarian-party",
  "challenge-hungarian-climb",
  "classic-english-table",
  "easy-energy-english-city",
] as const;

export type PackSceneCoverAsset = (typeof PACK_SCENE_COVER_ASSETS)[number];
export type PackSceneVariant = "cover" | "setup" | "handoff" | "reveal" | "recap";

export interface PackSceneProps {
  /** A pack manifest's coverAsset. Unknown assets receive the reusable signal-board scene. */
  coverAsset: string;
  /** Lets later game surfaces share this language without duplicating scene components. */
  variant?: PackSceneVariant;
  /** Decorative art is hidden from assistive technology by default. */
  decorative?: boolean;
  /** Used as the accessible SVG title when decorative is false. */
  title?: string;
  className?: string;
}

const ink = "#17130e";
const coral = "#ef5d7a";
const cyan = "#6dc6dd";
const yellow = "#f5b642";
const paper = "#fff8e8";
const mint = "#9fe870";

function Outline({ children }: { children: ReactNode }) {
  return <g stroke={ink} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">{children}</g>;
}

function Person({
  x,
  y,
  shirt,
  pose = "wave",
}: {
  x: number;
  y: number;
  shirt: string;
  pose?: "wave" | "point" | "climb";
}) {
  const arms =
    pose === "climb" ? (
      <>
        <path d={`M ${x + 13} ${y + 35} L ${x + 1} ${y + 25} L ${x - 2} ${y + 14}`} fill="none" />
        <path d={`M ${x + 29} ${y + 35} L ${x + 42} ${y + 22} L ${x + 50} ${y + 22}`} fill="none" />
      </>
    ) : pose === "point" ? (
      <>
        <path d={`M ${x + 13} ${y + 35} L ${x + 1} ${y + 41} L ${x - 8} ${y + 36}`} fill="none" />
        <path d={`M ${x + 29} ${y + 35} L ${x + 43} ${y + 25} L ${x + 53} ${y + 25}`} fill="none" />
      </>
    ) : (
      <>
        <path d={`M ${x + 13} ${y + 35} L ${x + 1} ${y + 26} L ${x - 5} ${y + 17}`} fill="none" />
        <path d={`M ${x + 29} ${y + 35} L ${x + 42} ${y + 38} L ${x + 48} ${y + 32}`} fill="none" />
      </>
    );

  return (
    <Outline>
      <circle cx={x + 21} cy={y + 16} fill={paper} r="11" />
      <path d={`M ${x + 11} ${y + 14} Q ${x + 20} ${y + 3} ${x + 30} ${y + 12} L ${x + 30} ${y + 18} L ${x + 11} ${y + 18} Z`} fill={ink} stroke="none" />
      <path d={`M ${x + 12} ${y + 35} Q ${x + 21} ${y + 27} ${x + 30} ${y + 35} L ${x + 32} ${y + 56} L ${x + 10} ${y + 56} Z`} fill={shirt} />
      {arms}
      <path d={`M ${x + 16} ${y + 56} L ${x + 13} ${y + 69}`} fill="none" />
      <path d={`M ${x + 27} ${y + 56} L ${x + 31} ${y + 69}`} fill="none" />
      <path d={`M ${x + 7} ${y + 69} H ${x + 18}`} fill="none" />
      <path d={`M ${x + 27} ${y + 69} H ${x + 38}`} fill="none" />
    </Outline>
  );
}

function ClassicHungarianScene() {
  return (
    <>
      <path d="M 12 89 L 42 64 L 72 84 L 106 52 L 140 87 L 176 67 L 218 89 Z" fill={yellow} opacity="0.48" />
      <g fill={ink} opacity="0.2">
        <path d="M 73 19 l 10 6 -10 6 z" />
        <path d="M 144 14 l 8 5 -8 5 z" />
        <circle cx="99" cy="20" r="3" />
      </g>
      <g transform="rotate(-11 104 39)">
        <rect fill={ink} height="38" rx="4" width="52" x="82" y="22" />
        <rect fill={coral} height="38" rx="4" stroke={ink} strokeWidth="3" width="52" x="78" y="18" />
        <path d="M 93 28 L 115 37 L 94 47 Z" fill={paper} />
      </g>
      <Person shirt={cyan} x={27} y={25} />
      <Person pose="point" shirt={coral} x={159} y={26} />
      <Outline>
        <path d="M 59 81 H 168" fill="none" />
        <path d="M 67 81 V 91" fill="none" />
        <path d="M 158 81 V 91" fill="none" />
      </Outline>
    </>
  );
}

function ChallengeHungarianScene() {
  return (
    <>
      <path d="M 7 88 L 52 44 L 78 65 L 123 18 L 171 67 L 198 48 L 218 88 Z" fill={coral} />
      <path d="M 7 88 L 52 44 L 53 73 L 78 65 L 79 86 L 123 18 L 124 76 L 171 67 L 172 86 L 198 48 L 218 88 Z" fill={yellow} opacity="0.68" />
      <Outline>
        <path d="M 7 88 L 52 44 L 78 65 L 123 18 L 171 67 L 198 48 L 218 88" fill="none" />
        <path d="M 123 18 V 7" fill="none" />
        <path d="M 123 7 H 144 L 138 14 L 144 20 H 123" fill={cyan} />
        <path d="M 17 28 H 62 V 37 H 35 V 48 H 73" fill="none" />
      </Outline>
      <Person pose="climb" shirt={cyan} x={91} y={29} />
      <g fill={paper} stroke={ink} strokeWidth="3">
        <circle cx="180" cy="28" r="10" />
        <path d="M 174 28 H 186 M 180 22 V 34" />
      </g>
    </>
  );
}

function ClassicEnglishScene() {
  return (
    <>
      <path d="M 0 75 H 220 V 92 H 0 Z" fill={cyan} opacity="0.55" />
      <g fill={yellow} stroke={ink} strokeWidth="3">
        <path d="M 88 53 H 140 L 133 72 H 95 Z" />
        <path d="M 101 53 V 43 H 127 V 53" fill={paper} />
      </g>
      <Outline>
        <path d="M 84 72 H 144" fill="none" />
        <path d="M 95 72 V 90" fill="none" />
        <path d="M 133 72 V 90" fill="none" />
        <path d="M 98 43 C 99 32 111 32 112 43" fill="none" />
        <path d="M 117 43 C 118 32 130 32 131 43" fill="none" />
      </Outline>
      <g fill={coral} stroke={ink} strokeWidth="3">
        <circle cx="112" cy="45" r="5" />
        <path d="M 80 15 L 91 24 L 102 15 L 113 24 L 124 15 L 135 24 L 146 15" fill="none" />
      </g>
      <Person pose="wave" shirt={coral} x={24} y={21} />
      <Person pose="wave" shirt={mint} x={162} y={21} />
    </>
  );
}

function EasyEnergyEnglishScene() {
  return (
    <>
      <path d="M 0 83 H 220 V 92 H 0 Z" fill={yellow} opacity="0.62" />
      <g fill={cyan} stroke={ink} strokeWidth="3">
        <path d="M 16 83 V 42 H 53 V 83" />
        <path d="M 153 83 V 31 H 196 V 83" />
      </g>
      <g fill={paper} stroke={ink} strokeWidth="3">
        <rect height="9" rx="1" width="10" x="25" y="52" />
        <rect height="9" rx="1" width="10" x="40" y="52" />
        <rect height="10" rx="1" width="11" x="164" y="42" />
        <rect height="10" rx="1" width="11" x="181" y="42" />
      </g>
      <Outline>
        <path d="M 111 83 V 32" fill="none" />
        <path d="M 111 32 L 92 23 V 42 L 111 47 Z" fill={coral} />
        <path d="M 111 32 L 130 23 V 42 L 111 47 Z" fill={mint} />
        <path d="M 54 82 C 76 66 79 86 96 71 S 127 58 146 78" fill="none" />
      </Outline>
      <g fill={yellow} stroke={ink} strokeWidth="3">
        <circle cx="151" cy="73" r="7" />
        <path d="M 151 66 V 57 M 151 80 V 89 M 144 73 H 135 M 158 73 H 167" />
      </g>
      <Person pose="point" shirt={coral} x={65} y={18} />
    </>
  );
}

function SignalBoardScene() {
  return (
    <>
      <g fill={paper} stroke={ink} strokeWidth="3">
        <rect height="50" rx="6" width="116" x="52" y="20" />
        <circle cx="82" cy="45" fill={coral} r="10" />
        <path d="M 105 39 H 145 M 105 50 H 132" fill="none" />
      </g>
      <Outline>
        <path d="M 72 70 L 54 88 M 148 70 L 166 88" fill="none" />
      </Outline>
      <g fill={cyan} stroke={ink} strokeWidth="3">
        <path d="M 20 24 l 12 7 -12 7 z" />
        <path d="M 188 54 l 12 7 -12 7 z" />
      </g>
    </>
  );
}

function VariantMotif({ variant }: { variant: PackSceneVariant }) {
  if (variant === "cover") return null;

  const motif = {
    setup: <path d="M 11 13 H 37 M 24 4 V 22" />,
    handoff: <path d="M 10 13 H 35 L 28 6 M 35 13 L 28 20" />,
    reveal: <path d="M 24 3 V 23 M 14 7 L 18 11 M 34 7 L 30 11" />,
    recap: <path d="M 10 19 L 18 11 L 24 15 L 34 5 M 10 24 H 38" />,
  }[variant];

  return (
    <g fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" transform="translate(176 7)">
      {motif}
    </g>
  );
}

const sceneByAsset: Record<PackSceneCoverAsset, () => ReactNode> = {
  "classic-hungarian-party": ClassicHungarianScene,
  "challenge-hungarian-climb": ChallengeHungarianScene,
  "classic-english-table": ClassicEnglishScene,
  "easy-energy-english-city": EasyEnergyEnglishScene,
};

export function PackScene({
  coverAsset,
  variant = "cover",
  decorative = true,
  title,
  className,
}: PackSceneProps) {
  const titleId = `pack-scene-title-${useId().replace(/:/g, "")}`;
  const Scene = sceneByAsset[coverAsset as PackSceneCoverAsset] ?? SignalBoardScene;

  return (
    <svg
      aria-hidden={decorative || undefined}
      aria-labelledby={decorative ? undefined : titleId}
      className={className}
      data-pack-scene={coverAsset}
      data-scene-variant={variant}
      fill="none"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      role={decorative ? undefined : "img"}
      viewBox="0 0 220 96"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!decorative ? <title id={titleId}>{title ?? "Hoppra pack scene"}</title> : null}
      <rect fill={paper} height="96" rx="10" width="220" />
      <path d="M 0 11 H 220 M 0 85 H 220" opacity="0.12" stroke={ink} strokeWidth="2" />
      <Scene />
      <VariantMotif variant={variant} />
    </svg>
  );
}
