import { getTranslations, setRequestLocale } from "next-intl/server";
import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";
import type { RouteKey } from "@/config/routes";

export async function renderRoute(locale: string, routeKey: RouteKey) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "routes" });

  return <RoutePlaceholder title={t(`${routeKey}.title`)} />;
}

export async function renderPublishedSoon(locale: string, routeKey: RouteKey) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "routes" });

  return (
    <div className="container page-shell">
      <h1>{t(`${routeKey}.title`)}</h1>
      <p className="page-note">{t("publishedSoon")}</p>
    </div>
  );
}
