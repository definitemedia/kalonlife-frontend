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

export function LeafIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path {...stroke} d="M5 19.2C5 12.4 9.2 6.2 19.2 4.8 18.6 14.8 12.4 19.2 5 19.2z" />
      <path {...stroke} d="M9.2 14.6c1.6-1.8 3.6-3.4 6.4-4.6" />
    </svg>
  );
}

export function NatureIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path {...stroke} d="M12 20.2V10.4" />
      <path {...stroke} d="M12 13.2c-2.8-.2-5.2-2.2-5.8-5.2 3.2.2 5.4 2 5.8 5.2z" />
      <path {...stroke} d="M12 11.4c2.6-.6 4.8-2.6 5.4-5.4-3 .4-5 2.4-5.4 5.4z" />
      <path {...stroke} d="M8.2 20.2h7.6" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path {...stroke} d="M12 3.4 19 6.1v5.4c0 4.1-2.7 7-7 8.7-4.3-1.7-7-4.6-7-8.7V6.1L12 3.4z" />
      <path {...stroke} d="m8.8 11.3 2.2 2.2 4.2-4.3" />
    </svg>
  );
}

export function PathIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path {...stroke} d="M4.5 17.5h4.2v-3.2h4.1V10h4.2V6.8" />
      <path {...stroke} d="m14.6 4.8 2.4 2-2.4 2" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle {...stroke} cx="12" cy="12" r="8" />
      <path {...stroke} d="M4 12h16" />
      <path
        {...stroke}
        d="M12 4c2.1 2.3 3.2 5 3.2 8s-1.1 5.7-3.2 8c-2.1-2.3-3.2-5-3.2-8s1.1-5.7 3.2-8z"
      />
    </svg>
  );
}

export function MentorIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle {...stroke} cx="8.2" cy="8.2" r="2.2" />
      <circle {...stroke} cx="15.8" cy="8.6" r="2" />
      <path {...stroke} d="M3.8 18.4c.5-2.5 2.3-3.8 4.4-3.8s3.9 1.3 4.4 3.8" />
      <path {...stroke} d="M13.2 14.8c1.4-.2 2.8.4 3.6 2" />
    </svg>
  );
}

export function CommunityIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle {...stroke} cx="12" cy="8" r="2.15" />
      <circle {...stroke} cx="6.2" cy="9.2" r="1.7" />
      <circle {...stroke} cx="17.8" cy="9.2" r="1.7" />
      <path {...stroke} d="M8.6 18.6c.4-2.2 1.8-3.4 3.4-3.4s3 .1 3.4 3.4" />
      <path {...stroke} d="M3.6 18.2c.3-1.7 1.3-2.7 2.6-2.7" />
      <path {...stroke} d="M20.4 18.2c-.3-1.7-1.3-2.7-2.6-2.7" />
    </svg>
  );
}

export function ScaleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path {...stroke} d="M12 4.2v15.2" />
      <path {...stroke} d="M7.2 19.4h9.6" />
      <path {...stroke} d="M5 9.2h14" />
      <path {...stroke} d="M5 9.2 7.6 14h-5.2L5 9.2z" />
      <path {...stroke} d="M19 9.2 21.6 14h-5.2L19 9.2z" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path {...stroke} d="M5 12h14" />
      <path {...stroke} d="m13 6 6 6-6 6" />
    </svg>
  );
}
