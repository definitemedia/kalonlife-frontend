import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

function messageList(value: unknown): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error("Returns list messages must be strings");
  }
  return value;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "returns");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const routes = await getTranslations({ locale, namespace: "routes.returns" });
  const body = await getTranslations({ locale, namespace: "returnsBody" });

  return (
    <LegalDocument
      currentHref="/returns"
      title={routes("title")}
      intro={body("intro")}
      sections={[
        {
          id: "no-return",
          title: body("noReturn.title"),
          paragraphs: [body("noReturn.body")],
        },
        {
          id: "damaged-or-incorrect",
          title: body("damaged.title"),
          paragraphs: [body("damaged.intro")],
          items: messageList(body.raw("damaged.items")),
        },
        {
          id: "non-eligibility",
          title: body("ineligible.title"),
          paragraphs: [body("ineligible.intro")],
          items: messageList(body.raw("ineligible.items")),
        },
        {
          id: "associate-promotional",
          title: body("associate.title"),
          paragraphs: [body("associate.body")],
        },
      ]}
    />
  );
}
