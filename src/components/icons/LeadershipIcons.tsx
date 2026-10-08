import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function QualityIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path
        {...stroke}
        d="M12 20.5s6.2-3.6 6.2-8.8C18.2 8 15.8 5.8 12 7.2 8.2 5.8 5.8 8 5.8 11.7c0 5.2 6.2 8.8 6.2 8.8z"
      />
      <path {...stroke} d="M12 20.5V9.2" />
    </Icon>
  );
}

export function IntegrityIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path
        {...stroke}
        d="M12 3.6 18.6 6.2v5.1c0 3.9-2.6 6.7-6.6 8.3-4-1.6-6.6-4.4-6.6-8.3V6.2L12 3.6z"
      />
      <path {...stroke} d="M8.9 12.1 11 14.2l4.2-4.4" />
    </Icon>
  );
}

export function EmpowermentIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle {...stroke} cx="12" cy="8" r="2.2" />
      <path {...stroke} d="M7.6 19.2c.6-3 2.3-4.6 4.4-4.6s3.8 1.6 4.4 4.6" />
      <path {...stroke} d="M16.4 6.8 18.8 4.6" />
      <path {...stroke} d="M18.8 7.2V4.6H16.2" />
    </Icon>
  );
}

export function WellbeingIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle {...stroke} cx="12" cy="12" r="8" />
      <path
        {...stroke}
        d="M12 16.2s-3.4-2.1-3.4-4.4a1.9 1.9 0 0 1 3.4-1.2 1.9 1.9 0 0 1 3.4 1.2c0 2.3-3.4 4.4-3.4 4.4z"
      />
    </Icon>
  );
}

export function CareIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path {...stroke} d="M8 14.5c-2.2-2-3.2-4.2-2.2-6.1 1.4-2.6 4.6-1.6 6.2.8 1.6-2.4 4.8-3.4 6.2-.8 1 1.9 0 4.1-2.2 6.1L12 19.2 8 14.5z" />
      <path {...stroke} d="M12 10.2v4.2" />
    </Icon>
  );
}

export function PositivityIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle {...stroke} cx="12" cy="12" r="3.1" />
      <path {...stroke} d="M12 3.6v2.1M12 18.3v2.1M3.6 12h2.1M18.3 12h2.1" />
      <path {...stroke} d="m6.1 6.1 1.5 1.5M16.4 16.4l1.5 1.5M17.9 6.1l-1.5 1.5M7.6 16.4l-1.5 1.5" />
    </Icon>
  );
}
