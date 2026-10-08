type LeadershipPortraitProps = {
  initials: string;
  label: string;
};

export function LeadershipPortrait({ initials, label }: LeadershipPortraitProps) {
  return (
    <div className="leadership-portrait" role="img" aria-label={label}>
      <svg
        className="leadership-silhouette"
        viewBox="0 0 120 148"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="60" cy="42" r="22" />
        <path d="M22 140c6-34 18-50 38-50s32 16 38 50" />
      </svg>
      <span className="leadership-initials" aria-hidden="true">
        {initials}
      </span>
    </div>
  );
}
