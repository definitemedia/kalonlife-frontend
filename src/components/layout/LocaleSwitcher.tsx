"use client";

import { useLocale, useTranslations } from "next-intl";
import { siteLanguages } from "@/config/site-languages";
import { Link, usePathname } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";

function PinIcon() {
  return (
    <svg className="footer-locale-pin" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21.15s-6.15-5.15-6.15-10.3a6.15 6.15 0 0 1 12.3 0c0 5.15-6.15 10.3-6.15 10.3z" />
      <circle cx="12" cy="10.85" r="2.05" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="footer-locale-chevron" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 6.25 8 10.25 12 6.25" />
    </svg>
  );
}

export function LocaleSwitcher() {
  const t = useTranslations("languages");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const onLanguages = pathname === "/languages" || pathname.startsWith("/languages/");
  const label = siteLanguages.find((language) => language.code === locale)?.native ?? locale;

  return (
    <Link
      href={
        onLanguages
          ? "/languages"
          : {
              pathname: "/languages",
              query: { next: pathname },
            }
      }
      className="footer-locale-link"
      aria-label={`${t("ariaLabel")}: ${label}`}
    >
      <PinIcon />
      <span className="footer-locale-name">{label}</span>
      <ChevronIcon />
    </Link>
  );
}
