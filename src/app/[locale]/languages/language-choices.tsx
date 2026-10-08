"use client";

import { useLocale } from "next-intl";
import type { MouseEvent } from "react";
import { siteLanguages } from "@/config/site-languages";
import { Link, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const regions: Record<Locale, string> = {
  en: "Pan India",
  hi: "North and Central India",
  te: "Andhra Pradesh, Telangana",
  ta: "Tamil Nadu",
  kn: "Karnataka",
  ml: "Kerala",
  mr: "Maharashtra",
  bn: "West Bengal",
  gu: "Gujarat",
  or: "Odisha",
  pa: "Punjab",
};

function PinIcon() {
  return (
    <svg className="language-choice-pin" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21.15s-6.15-5.15-6.15-10.3a6.15 6.15 0 0 1 12.3 0c0 5.15-6.15 10.3-6.15 10.3z" />
      <circle cx="12" cy="10.85" r="2.05" />
    </svg>
  );
}

export function LanguageChoices() {
  const locale = useLocale();
  const router = useRouter();

  function selectLocale(event: MouseEvent<HTMLAnchorElement>, nextLocale: Locale) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    router.replace("/", { locale: nextLocale });
  }

  return (
    <ul className="language-choice-grid" aria-labelledby="choose-language">
      {siteLanguages.map((language) => {
        const selected = language.code === locale;
        return (
          <li key={language.code}>
            <Link
              href="/"
              locale={language.code}
              lang={language.code}
              className="language-choice"
              aria-current={selected ? "page" : undefined}
              onClick={(event) => selectLocale(event, language.code)}
            >
              <PinIcon />
              <span className="language-choice-copy">
                <span className="language-choice-native">{language.native}</span>
                <span className="language-choice-region">{regions[language.code]}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
