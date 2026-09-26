type IconProps = {
  className?: string;
};

export function MissionIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        className="mission-path"
        cx="40"
        cy="40"
        r="30"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeDasharray="148 42"
      />
      <circle className="mission-goal" cx="40" cy="42" r="16.5" strokeWidth="2" />
      <circle className="mission-head" cx="40" cy="36.25" r="3.15" />
      <path
        className="mission-figure"
        d="M31.2 52.75c1.15-5.35 4.2-8.15 8.8-8.15s7.65 2.8 8.8 8.15"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="mission-mark" cx="63.5" cy="21.5" r="3.35" />
    </svg>
  );
}
