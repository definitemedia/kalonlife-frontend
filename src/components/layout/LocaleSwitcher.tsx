"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  te: "తెలుగు",
  ta: "தமிழ்",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  mr: "मराठी",
  bn: "বাংলা",
  gu: "ગુજરાતી",
  or: "ଓଡ଼ିଆ",
  pa: "ਪੰਜਾਬੀ",
};

function GlobeIcon() {
  return (
    <svg className="locale-switcher-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9s1.3-6.2 3.8-9Z" />
    </svg>
  );
}

type LocaleSwitcherProps = {
  onSelect?: () => void;
};

export function LocaleSwitcher({ onSelect }: LocaleSwitcherProps) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function selectLocale(nextLocale: Locale) {
    setOpen(false);
    onSelect?.();
    if (nextLocale === locale) return;

    const query = window.location.search;
    router.replace(query ? `${pathname}${query}` : pathname, { locale: nextLocale });
  }

  return (
    <div className="locale-switcher" ref={rootRef}>
      <button
        type="button"
        className="locale-switcher-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={menuId}
        aria-label={`${t("language")}: ${localeNames[locale]}`}
        onClick={() => setOpen((value) => !value)}
      >
        <GlobeIcon />
        <span>{localeNames[locale]}</span>
      </button>
      {open ? (
        <ul className="locale-switcher-menu" id={menuId} role="listbox" aria-label={t("language")}>
          {routing.locales.map((code) => {
            const selected = code === locale;
            return (
              <li key={code} role="presentation">
                <button
                  type="button"
                  className="locale-switcher-option"
                  role="option"
                  aria-selected={selected}
                  lang={code}
                  onClick={() => selectLocale(code)}
                >
                  {localeNames[code]}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
