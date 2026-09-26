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

export function HeartIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path
        {...stroke}
        d="M12 19.2S5.6 15.3 5.6 11A3.6 3.6 0 0 1 12 8.2 3.6 3.6 0 0 1 18.4 11c0 4.3-6.4 8.2-6.4 8.2z"
      />
    </Icon>
  );
}

export function TrophyIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path {...stroke} d="M8 3.75h8v5.1a4 4 0 0 1-8 0v-5.1z" />
      <path {...stroke} d="M8 5.4H5.4A2.2 2.2 0 0 0 7.6 8.8" />
      <path {...stroke} d="M16 5.4h2.6A2.2 2.2 0 0 1 16.4 8.8" />
      <path {...stroke} d="M12 12.85V15.1" />
      <path {...stroke} d="M9.25 18.6h5.5" />
      <path {...stroke} d="M10.15 15.1h3.7v3.5h-3.7z" />
    </Icon>
  );
}

export function HandshakeIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path {...stroke} d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path
        {...stroke}
        d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"
      />
      <path {...stroke} d="m21 3 1 11h-2" />
      <path {...stroke} d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path {...stroke} d="M3 4h8" />
    </Icon>
  );
}

export function RocketIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path {...stroke} d="M9 9.2 12 3.2l3 6V16l-3 2.1L9 16V9.2z" />
      <circle {...stroke} cx="12" cy="10.6" r="1.35" />
      <path {...stroke} d="M9 13.2 6.2 15.8V18L9 16.1" />
      <path {...stroke} d="M15 13.2 17.8 15.8V18L15 16.1" />
      <path {...stroke} d="M10.6 18.3 12 21l1.4-2.7" />
    </Icon>
  );
}
