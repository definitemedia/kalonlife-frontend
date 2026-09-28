import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "shipping");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const routes = await getTranslations({ locale, namespace: "routes.shipping" });
  const body = await getTranslations({ locale, namespace: "shippingBody" });

  return (
    <LegalDocument
      title={routes("title")}
      subtitle={routes("description")}
      sections={[
        {
          id: "order-processing",
          title: body("processing.title"),
          paragraphs: [body("processing.body")],
        },
        {
          id: "delivery-timeline",
          title: body("timeline.title"),
          lead: body("timeline.lead"),
          paragraphs: [body("timeline.body")],
        },
        {
          id: "shipping-charges",
          title: body("charges.title"),
          paragraphs: [body("charges.body")],
        },
        {
          id: "address-accuracy",
          title: body("address.title"),
          paragraphs: [body("address.body")],
        },
        {
          id: "delivery-issues",
          title: body("issues.title"),
          paragraphs: [body("issues.body")],
        },
      ]}
    />
  );
}
