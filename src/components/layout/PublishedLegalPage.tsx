import { getTranslations } from "next-intl/server";
import type { RouteKey } from "@/config/routes";
import { LegalDocument } from "./LegalDocument";
import { parseLegalBlocks } from "./legal-blocks";

type PublishedLegalPageProps = {
  locale: string;
  routeKey: RouteKey;
  namespace: string;
  href: string;
};

export async function PublishedLegalPage({
  locale,
  routeKey,
  namespace,
  href,
}: PublishedLegalPageProps) {
  const routes = await getTranslations({ locale, namespace: `routes.${routeKey}` });
  const body = await getTranslations({ locale, namespace });

  return (
    <LegalDocument
      currentHref={href}
      title={routes("title")}
      preface={parseLegalBlocks(body.raw("preface"))}
      blocks={parseLegalBlocks(body.raw("blocks"))}
    />
  );
}
