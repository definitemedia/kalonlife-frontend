import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getRoute, type RouteKey } from "@/config/routes";
import { site } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

function isLocale(value: string): value is Locale {
  return routing.locales.some((locale) => locale === value);
}

export function absoluteLocalizedUrl(locale: Locale, href: string) {
  const pathname = getPathname({ locale, href });
  return new URL(pathname, site.url).toString();
}

export async function buildMetadata(
  locale: string,
  routeKey: RouteKey,
  href?: string,
): Promise<Metadata> {
  if (!isLocale(locale)) {
    throw new Error(`Unknown locale: ${locale}`);
  }

  const route = getRoute(routeKey);
  const path = href ?? route.path;
  if (path.includes("[")) {
    throw new Error(`Missing pathname for ${routeKey}`);
  }

  const t = await getTranslations({ locale, namespace: "routes" });
  const title = t(`${routeKey}.title`);
  const description = t(`${routeKey}.description`);
  const canonical = absoluteLocalizedUrl(locale, path);
  const languages = Object.fromEntries(
    routing.locales.map((code) => [
      site.hrefLang[code],
      absoluteLocalizedUrl(code, path),
    ]),
  );
  languages["x-default"] = absoluteLocalizedUrl("en", path);

  return {
    title: routeKey === "home" ? { absolute: site.name } : title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: routeKey === "home" ? site.name : title,
      description,
      url: canonical,
      siteName: site.name,
      locale: site.ogLocale[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: routeKey === "home" ? site.name : title,
      description,
    },
  };
}
