type IconProps = { className?: string };

const shared = {
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ScaleIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M8 9.2a5.6 5.6 0 0 1 8 0" />
      <path d="m12 10.6 1.4-1.9" />
    </svg>
  );
}

export function PulseIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M12 20s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7.4 4.2 4.2 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z" />
      <path d="M6.8 12.6h2.6l1.3-2.4 2 4.4 1.3-2h3.2" />
    </svg>
  );
}

export function BlossomIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="12" cy="10" r="2.2" />
      <path d="M12 7.8c-1.6-3.6 1.6-4.6 0-4.6s1.6 1 0 4.6z" />
      <path d="M12 7.8C10.6 4 7.2 5 8 7.4c.6 1.8 2.8 1.6 4 2.6" />
      <path d="M12 7.8C13.4 4 16.8 5 16 7.4c-.6 1.8-2.8 1.6-4 2.6" />
      <path d="M12 12.2V20.5" />
      <path d="M12 17c-1.6-1.8-3.6-2.2-5-1.6M12 17c1.6-1.8 3.6-2.2 5-1.6" />
    </svg>
  );
}

export function FamilyIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="7.5" cy="6.8" r="2.3" />
      <circle cx="16.5" cy="6.8" r="2.3" />
      <circle cx="12" cy="12.4" r="1.7" />
      <path d="M3.8 19c.3-3.6 1.8-5.8 3.7-5.8.9 0 1.7.4 2.3 1.1" />
      <path d="M20.2 19c-.3-3.6-1.8-5.8-3.7-5.8-.9 0-1.7.4-2.3 1.1" />
      <path d="M9.4 19.6c.3-2.2 1.3-3.6 2.6-3.6s2.3 1.4 2.6 3.6" />
    </svg>
  );
}

export function ActiveIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="14.6" cy="4.6" r="1.8" />
      <path d="m7.6 9.4 3.2-2.2 3.4 1.6 1.4 3 2.8.8" />
      <path d="m10.8 7.2-1.6 5.4 3.6 2.6-1 5.2" />
      <path d="m9.2 12.6-2.6 3.6-3.2.4" />
    </svg>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 3.6v1.8M12 18.6v1.8M3.6 12h1.8M18.6 12h1.8M6.1 6.1l1.3 1.3M16.6 16.6l1.3 1.3M6.1 17.9l1.3-1.3M16.6 7.4l1.3-1.3" />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 17h-8.2L6.5 20.2V17H5a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 5 5.5z" />
      <path d="M8 10h8M8 13.2h5" />
    </svg>
  );
}

export function ExpertIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="12" cy="7.6" r="3.2" />
      <path d="M5.6 20c.4-3.8 3-6 6.4-6s6 2.2 6.4 6" />
      <path d="m9.6 16.4 2.4 2.2 2.4-2.2" />
    </svg>
  );
}

export function PathIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M4 19.5h5v-5h5v-5h6" />
      <path d="m17 6.5 3 3-3 3" />
    </svg>
  );
}

export function PlateIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="12" cy="12" r="6.4" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M3 4.5v5.2a1.6 1.6 0 0 0 1.6 1.6M4.6 4.5v15M21 4.5c-1.4 0-2.2 1.6-2.2 4.2s.8 3.2 2.2 3.2v7.6" />
    </svg>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M12 6.8C10 5.4 7.4 5 4.5 5.2v12.6c2.9-.2 5.5.2 7.5 1.6 2-1.4 4.6-1.8 7.5-1.6V5.2C16.6 5 14 5.4 12 6.8z" />
      <path d="M12 6.8v12.6" />
    </svg>
  );
}

export function ChecklistIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <rect x="4.5" y="3.8" width="15" height="16.4" rx="2" />
      <path d="m7.6 9 1.4 1.4 2.4-2.6M13.4 9.2h3.2M7.6 14.4l1.4 1.4 2.4-2.6M13.4 14.6h3.2" />
    </svg>
  );
}

export function TargetIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="12" cy="12" r="7.6" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" />
    </svg>
  );
}

export function BadgeIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="12" cy="9.4" r="5.6" />
      <path d="m9.6 9.6 1.7 1.7 3.1-3.2" />
      <path d="m8.4 13.8-1.4 6.6 5-2.4 5 2.4-1.4-6.6" />
    </svg>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M5 15.5C5 9.5 10 5 19 5c0 9-4.5 14-10.5 14-1.4 0-2.6-.4-3.5-1" />
      <path d="M8.5 15.2c1.8-2.2 4-4 7.8-5.4" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M12 3.2 19.2 6v5.5c0 4.3-2.9 7.3-7.2 8.8-4.3-1.5-7.2-4.5-7.2-8.8V6L12 3.2z" />
      <path d="M12 8.6v5.6M9.2 11.4h5.6" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="m8.4 12.2 2.4 2.4 4.8-5" />
    </svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="m6 9.4 6 6 6-6" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M5 12h14M13.5 6.5 19 12l-5.5 5.5" />
    </svg>
  );
}
