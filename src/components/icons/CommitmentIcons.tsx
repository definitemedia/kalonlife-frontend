type IconProps = {
  className?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function AwardIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle {...stroke} cx="12" cy="9" r="4.25" />
      <path {...stroke} d="M9.15 12.7 8 20.2 12 17.8l4 2.4-1.15-7.5" />
    </svg>
  );
}

export function LightbulbIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        {...stroke}
        d="M9.2 16.4h5.6M9.7 18.6h4.6M12 3.6a4.8 4.8 0 0 0-2.5 8.9c.4.35.6.8.6 1.3v1.2h3.8v-1.2c0-.5.2-.95.6-1.3A4.8 4.8 0 0 0 12 3.6z"
      />
    </svg>
  );
}
