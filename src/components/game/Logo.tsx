interface LogoProps {
  compact?: boolean;
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <span className={`logo${compact ? " logo--compact" : ""}`} aria-label="Hoppra!">
      <svg
        className="logo__mark"
        viewBox="0 0 40 40"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          className="logo__card-back"
          x="5"
          y="8"
          width="25"
          height="25"
          rx="7"

        />
        <rect
          className="logo__bubble"
          x="10"
          y="5"
          width="25"
          height="27"
          rx="7"

        />
        <path
          className="logo__arrow"
          d="M23 11.5v10"
        />
        <circle className="logo__spark" cx="23" cy="26" r="2" />
        <path className="logo__motion" d="M32.5 5.5 35 3M35 9h3M31.5 2l1-2" />
      </svg>
      <span className="logo__type">
        Hoppra<span>!</span>
      </span>
    </span>
  );
}
