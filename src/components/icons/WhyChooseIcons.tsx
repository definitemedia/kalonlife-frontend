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

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path {...stroke} d="M12 3.4 19 6.1v5.4c0 4.1-2.7 7-7 8.7-4.3-1.7-7-4.6-7-8.7V6.1L12 3.4z" />
      <path {...stroke} d="m8.8 11.3 2.2 2.2 4.2-4.3" />
    </svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle {...stroke} cx="12" cy="12" r="8" />
      <path {...stroke} d="m8.4 12.2 2.4 2.4 4.8-5.1" />
    </svg>
  );
}

export function TrendingUpIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path {...stroke} d="M4 16.4 9.2 11l3.1 3.1L20 6.8" />
      <path {...stroke} d="M14.2 6.8H20v5.8" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle {...stroke} cx="12" cy="12" r="8" />
      <path {...stroke} d="M4 12h16" />
      <path {...stroke} d="M12 4c2.1 2.3 3.2 5 3.2 8s-1.1 5.7-3.2 8c-2.1-2.3-3.2-5-3.2-8s1.1-5.7 3.2-8z" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle {...stroke} cx="9" cy="8.4" r="2.35" />
      <circle {...stroke} cx="16.1" cy="9.2" r="1.9" />
      <path {...stroke} d="M4.4 18.3c.6-2.7 2.6-4.1 4.6-4.1s4 1.4 4.6 4.1" />
      <path {...stroke} d="M13.8 14.5c1.5-.3 3.1.4 3.9 2.2" />
    </svg>
  );
}
