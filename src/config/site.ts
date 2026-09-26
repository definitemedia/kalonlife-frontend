import type { Locale } from "@/i18n/routing";

const PRODUCTION_URL = "https://mykalonlife.com";

function resolveSiteUrl(value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return PRODUCTION_URL;

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return PRODUCTION_URL;
    }
    return url.origin;
  } catch {
    return PRODUCTION_URL;
  }
}

export const site = {
  name: "Kalonlife International",
  legalName: "Kalonlife International India Private Limited",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  email: "info@mykalonlife.com",
  phone: "+91 89777 23492",
  phoneHref: "tel:+918977723492",
  address: {
    street:
      "D. No. 49-58-1, 1st Floor, Green Park Colony, Beside Port Stadium",
    locality: "Visakhapatnam",
    region: "Andhra Pradesh",
    postalCode: "530013",
    country: "IN",
  },
  hrefLang: {
    en: "en-IN",
    hi: "hi-IN",
    te: "te-IN",
  } satisfies Record<Locale, string>,
  ogLocale: {
    en: "en_IN",
    hi: "hi_IN",
    te: "te_IN",
  } satisfies Record<Locale, string>,
};
