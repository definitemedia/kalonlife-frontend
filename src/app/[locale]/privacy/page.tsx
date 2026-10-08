import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "privacy");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const routes = await getTranslations({ locale, namespace: "routes.privacy" });
  const body = await getTranslations({ locale, namespace: "privacy" });

  return (
    <LegalDocument
      currentHref="/privacy"
      title={routes("title")}
      intro={body("intro")}
      sections={[
        {
          id: "information-we-collect",
          title: body("collect.title"),
          paragraphs: [body("collect.body")],
        },
        {
          id: "use-of-information",
          title: body("use.title"),
          paragraphs: [body("use.body")],
        },
        {
          id: "data-protection",
          title: body("protection.title"),
          paragraphs: [body("protection.body")],
        },
        {
          id: "information-sharing",
          title: body("sharing.title"),
          paragraphs: [body("sharing.body")],
        },
        {
          id: "user-rights",
          title: body("rights.title"),
          paragraphs: [body("rights.body")],
        },
      ]}
    />
  );
}
