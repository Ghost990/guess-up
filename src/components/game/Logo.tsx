interface LogoProps {
  compact?: boolean;
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <span className={`logo${compact ? " logo--compact" : ""}`} aria-label="GuessUp">
      <svg
        className="logo__mark"
        viewBox="0 0 40 40"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="logo__bubble"
          d="M8 5h24a5 5 0 0 1 5 5v16a5 5 0 0 1-5 5H19l-7 5v-5H8a5 5 0 0 1-5-5V10a5 5 0 0 1 5-5Z"
        />
        <path
          className="logo__arrow"
          d="m14.5 19 5.5-5.5 5.5 5.5M20 14v11"
        />
        <circle className="logo__spark" cx="31.5" cy="8.5" r="3.5" />
      </svg>
      <span className="logo__type">
        Guess<span>Up</span>
      </span>
    </span>
  );
}
