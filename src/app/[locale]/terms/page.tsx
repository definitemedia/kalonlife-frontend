import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TermsOfUseDocument } from "@/components/layout/TermsOfUseDocument";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "terms");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const routes = await getTranslations({ locale, namespace: "routes.terms" });

  return <TermsOfUseDocument locale={locale} title={routes("title")} />;
}
