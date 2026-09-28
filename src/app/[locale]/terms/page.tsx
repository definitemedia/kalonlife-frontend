import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/layout/LegalDocument";
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
  const t = await getTranslations({ locale, namespace: "terms" });

  return (
    <LegalDocument
      currentHref="/terms"
      title={t("title")}
      subtitle={t("subtitle")}
      intro={t("intro")}
      sections={[
        {
          id: "acceptance",
          title: t("acceptance.title"),
          paragraphs: [t("acceptance.body")],
        },
        {
          id: "usage",
          title: t("usage.title"),
          paragraphs: [t("usage.body")],
        },
        {
          id: "product-information",
          title: t("productInformation.title"),
          paragraphs: [t("productInformation.body")],
        },
        {
          id: "intellectual-property",
          title: t("intellectualProperty.title"),
          paragraphs: [t("intellectualProperty.body")],
        },
        {
          id: "liability",
          title: t("liability.title"),
          paragraphs: [t("liability.body")],
        },
        {
          id: "modifications",
          title: t("modifications.title"),
          paragraphs: [t("modifications.body")],
        },
      ]}
    />
  );
}
