type IconProps = {
  className?: string;
};

export function VisionIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="vision-brow"
        d="M24 27.5c5.2-5.4 10.6-8 16-8s10.8 2.6 16 8"
        strokeWidth="2.15"
        strokeLinecap="round"
      />
      <path
        className="vision-eye"
        d="M8.5 42c9-13.5 18.2-20 31.5-20s22.5 6.5 31.5 20c-9 13.5-18.2 20-31.5 20S17.5 55.5 8.5 42z"
        strokeWidth="2.35"
        strokeLinejoin="round"
      />
      <circle className="vision-iris" cx="40" cy="42" r="9.5" strokeWidth="2.15" />
      <circle className="vision-pupil" cx="40" cy="42" r="4" />
      <circle className="vision-glint" cx="43.1" cy="39.1" r="1.55" />
    </svg>
  );
}
