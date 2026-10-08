import { getTranslations } from "next-intl/server";
import { LegalDocument } from "@/components/layout/LegalDocument";

type TermsOfUseDocumentProps = {
  locale: string;
  title: string;
  currentHref?: string;
};

export async function TermsOfUseDocument({
  locale,
  title,
  currentHref = "/terms",
}: TermsOfUseDocumentProps) {
  const t = await getTranslations({ locale, namespace: "terms" });

  return (
    <LegalDocument
      currentHref={currentHref}
      title={title}
      intro={t("intro")}
      sections={[
        {
          id: "acceptance",
          title: t("acceptance.title"),
          paragraphs: [t("acceptance.body")],
        },
        {
          id: "eligibility",
          title: t("eligibility.title"),
          paragraphs: [t("eligibility.body")],
        },
        {
          id: "use-of-website",
          title: t("usage.title"),
          paragraphs: [t("usage.body")],
        },
        {
          id: "product-information",
          title: t("productInformation.title"),
          paragraphs: [t("productInformation.body")],
        },
        {
          id: "health-disclaimer",
          title: t("health.title"),
          paragraphs: [t("health.body")],
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
          id: "changes",
          title: t("modifications.title"),
          paragraphs: [t("modifications.body")],
        },
      ]}
    />
  );
}
