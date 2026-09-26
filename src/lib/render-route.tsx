import { getTranslations, setRequestLocale } from "next-intl/server";
import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";
import type { RouteKey } from "@/config/routes";

export async function renderRoute(locale: string, routeKey: RouteKey) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "routes" });

  return <RoutePlaceholder title={t(`${routeKey}.title`)} />;
}
