import { getLocale } from "next-intl/server";
import { localeNames } from "@/i18n/locale-labels";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function LocaleSwitcher() {
  const locale = (await getLocale()) as Locale;
  const name = localeNames[locale]?.native ?? "English";

  return (
    <Link href="/languages" className="footer-locale-link" lang={locale}>
      <PinIcon />
      <span className="footer-locale-name">{name}</span>
      <ChevronIcon />
    </Link>
  );
}

function PinIcon() {
  return (
    <svg
      className="footer-locale-pin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 21.2s-6.4-5.6-6.4-10.7a6.4 6.4 0 1 1 12.8 0c0 5.1-6.4 10.7-6.4 10.7z" />
      <circle cx="12" cy="10.5" r="2.1" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="footer-locale-chevron"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
