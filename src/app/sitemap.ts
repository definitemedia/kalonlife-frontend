import type { MetadataRoute } from "next";
import { routeCatalog } from "@/config/routes";
import { site } from "@/config/site";
import { routing } from "@/i18n/routing";
import { absoluteLocalizedUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routeCatalog
    .filter((route) => route.index)
    .flatMap((route) =>
      routing.locales.map((locale) => ({
        url: absoluteLocalizedUrl(locale, route.path),
        lastModified,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((code) => [
              site.hrefLang[code],
              absoluteLocalizedUrl(code, route.path),
            ]),
          ),
        },
      })),
    );
}
