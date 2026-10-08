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

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M12 3.2 19.2 6v5.5c0 4.3-2.9 7.3-7.2 8.8-4.3-1.5-7.2-4.5-7.2-8.8V6L12 3.2z" />
      <path d="m8.7 12.1 2.2 2.2 4.4-4.6" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <rect x="5" y="10.2" width="14" height="9.2" rx="2" />
      <path d="M8.2 10.2V8.1a3.8 3.8 0 0 1 7.6 0v2.1" />
    </svg>
  );
}

export function BadgeIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="12" cy="12" r="7.2" />
      <path d="m8.8 12.2 2.1 2.1 4.3-4.6" />
    </svg>
  );
}

export function PeopleIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="9" cy="9" r="2.6" />
      <path d="M4.8 17.4c.5-2.2 2.2-3.4 4.2-3.4s3.7 1.2 4.2 3.4" />
      <circle cx="16.2" cy="9.4" r="2.1" />
      <path d="M15.2 14.1c1.6.2 2.9 1.2 3.4 3.1" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="m12 4.2 1.8 3.8 4.2.6-3 3 .7 4.2L12 13.8 8.3 15.8l.7-4.2-3-3 4.2-.6L12 4.2z" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="12" cy="12" r="7.4" />
      <path d="M12 8.2V12l2.6 1.8" />
    </svg>
  );
}

export function CardIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M3.5 10h17M7 14.2h4" />
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

export function VideoIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <rect x="3.4" y="7" width="11.2" height="10" rx="2" />
      <path d="m14.6 10.2 6-2.4v8.4l-6-2.4" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M8.2 4.8h2.1l1.1 2.6-1.4 1a11 11 0 0 0 4.6 4.6l1-1.4 2.6 1.1v2.1c0 .7-.6 1.4-1.4 1.4A13.2 13.2 0 0 1 6.8 6.2c0-.8.7-1.4 1.4-1.4z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7.2 7.5 5.4 7.5-5.4" />
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
