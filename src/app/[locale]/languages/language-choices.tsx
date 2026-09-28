"use client";

import { useLocale } from "next-intl";
import type { MouseEvent } from "react";
import { localeNames } from "@/i18n/locale-labels";
import { Link, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const languageChoices = [
  { code: "en", region: "Pan India" },
  { code: "hi", region: "North and Central India" },
  { code: "te", region: "Andhra Pradesh, Telangana" },
  { code: "ta", region: "Tamil Nadu" },
  { code: "kn", region: "Karnataka" },
  { code: "ml", region: "Kerala" },
  { code: "mr", region: "Maharashtra" },
  { code: "bn", region: "West Bengal" },
  { code: "gu", region: "Gujarat" },
  { code: "or", region: "Odisha" },
  { code: "pa", region: "Punjab" },
] as const satisfies readonly { code: Locale; region: string }[];

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
      {languageChoices.map((choice) => {
        const selected = choice.code === locale;
        return (
          <li key={choice.code}>
            <Link
              href="/"
              locale={choice.code}
              lang={choice.code}
              className="language-choice"
              aria-current={selected ? "true" : undefined}
              onClick={(event) => selectLocale(event, choice.code)}
            >
              <span className="language-choice-name">{localeNames[choice.code].native}</span>
              <span className="language-choice-region">{choice.region}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
