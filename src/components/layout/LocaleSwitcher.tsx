"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

function isLocale(value: string): value is Locale {
  return routing.locales.some((locale) => locale === value);
}

const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  te: "తెలుగు",
};

export function LocaleSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <label className="locale-switcher">
      <span className="visually-hidden">{t("language")}</span>
      <select
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value;
          if (isLocale(nextLocale)) {
            router.replace(pathname, { locale: nextLocale });
          }
        }}
      >
        {routing.locales.map((code) => (
          <option key={code} value={code}>
            {localeNames[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
