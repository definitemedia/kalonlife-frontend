import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

const PARAGRAPH_KEYS = [
  "results",
  "purchase",
  "diet",
  "outcomes",
  "accuracy",
  "liability",
  "changes",
  "agreement",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "disclaimer");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const routes = await getTranslations({ locale, namespace: "routes.disclaimer" });
  const body = await getTranslations({ locale, namespace: "disclaimerBody" });

  return (
    <LegalDocument
      title={routes("title")}
      subtitle={routes("description")}
      paragraphs={PARAGRAPH_KEYS.map((key) => body(key))}
    />
  );
}
