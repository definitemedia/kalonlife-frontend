import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

function messageList(value: unknown): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error("Privacy list messages must be strings");
  }
  return value;
}

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
      subtitle={routes("description")}
      intro={body("intro")}
      sections={[
        {
          id: "information-we-collect",
          title: body("collect.title"),
          items: messageList(body.raw("collect.items")),
        },
        {
          id: "use-of-information",
          title: body("use.title"),
          lead: body("use.lead"),
          items: messageList(body.raw("use.items")),
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
