import type { ReactNode } from "react";

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

function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export function PillIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect {...stroke} x="3.25" y="8" width="17.5" height="8" rx="4" />
      <path {...stroke} d="M12 8v8" />
    </Icon>
  );
}

export function GlassWaterIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path {...stroke} d="M8 3.75h8l-1.15 13.6a2.1 2.1 0 0 1-2.1 1.9h-1.5a2.1 2.1 0 0 1-2.1-1.9L8 3.75z" />
      <path {...stroke} d="M8.5 10.2h7" />
    </Icon>
  );
}

export function SproutIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path {...stroke} d="M12 21V11" />
      <path {...stroke} d="M12 14.2C8.6 14.2 6 12 6 9c3.1.1 5.8 2 6 5.2z" />
      <path {...stroke} d="M12 12.4c3-.4 5.2-2.5 5.6-5.4-2.9.2-5.2 2.1-5.6 5.4z" />
    </Icon>
  );
}

export function SparklesIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path {...stroke} d="M12 3.4 13.15 8 17.7 9.15 13.15 10.3 12 14.9 10.85 10.3 6.3 9.15 10.85 8z" />
      <path {...stroke} d="M17.2 14.6 17.75 16.3 19.45 16.85 17.75 17.4 17.2 19.1 16.65 17.4 14.95 16.85 16.65 16.3z" />
    </Icon>
  );
}

export function ActivityIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path {...stroke} d="M3 12h4.2l2.1-5.2L13.2 17l2.2-5H21" />
    </Icon>
  );
}

export function AppleIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path {...stroke} d="M12 7.4c.7-1.7 2.4-2.8 3.8-2.5-.3 1.9-1.8 3.1-3.4 3.3" />
      <path {...stroke} d="M16.2 9.2c1.5 1.1 2.2 2.8 2.1 4.6-.2 3.2-2.4 6.4-5.1 6.4-1.5 0-2.2-.8-3.2-.8s-1.8.8-3.2.8c-2.6 0-4.8-3-5.1-6.2-.2-2 .6-4 2.1-5.1 1.1-.8 2.4-1.1 3.6-.8 1 .2 1.8.8 2.6.8s1.5-.6 2.6-.9c.8-.2 1.6-.2 2.6.2z" />
    </Icon>
  );
}
