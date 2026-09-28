"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी (Hindi)",
  te: "తెలుగు (Telugu)",
  ta: "தமிழ் (Tamil)",
  kn: "ಕನ್ನಡ (Kannada)",
  ml: "മലയാളം (Malayalam)",
  mr: "मराठी (Marathi)",
  bn: "বাংলা (Bengali)",
  gu: "ગુજરાતી (Gujarati)",
  or: "ଓଡ଼ିଆ (Odia)",
  pa: "ਪੰਜਾਬੀ (Punjabi)",
};

function GlobeIcon() {
  return (
    <svg className="footer-locale-globe" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 3.75c2.15 2.35 3.25 5.15 3.25 8.25s-1.1 5.9-3.25 8.25c-2.15-2.35-3.25-5.15-3.25-8.25s1.1-5.9 3.25-8.25z" />
      <path d="M4.2 12h15.6M5.15 8.25h13.7M5.15 15.75h13.7" />
    </svg>
  );
}

export function LocaleSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function onLocaleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    if (nextLocale === locale) return;
    router.replace(pathname + window.location.search, { locale: nextLocale });
  }

  return (
    <div className="footer-locale">
      <GlobeIcon />
      <select
        className="footer-locale-select"
        aria-label={t("language")}
        value={locale}
        onChange={onLocaleChange}
      >
        {routing.locales.map((code) => (
          <option key={code} value={code} lang={code}>
            {localeNames[code]}
          </option>
        ))}
      </select>
    </div>
  );
}
