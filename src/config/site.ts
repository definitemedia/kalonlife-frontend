import type { Locale } from "@/i18n/routing";

export const site = {
  name: "Kalonlife International",
  legalName: "Kalonlife International India Private Limited",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mykalonlife.com",
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
