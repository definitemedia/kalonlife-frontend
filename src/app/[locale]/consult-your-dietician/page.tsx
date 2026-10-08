import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ConsultationPage } from "@/components/consultation/ConsultationPage";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await buildMetadata(locale, "consultDietician");
  const t = await getTranslations({ locale, namespace: "routes" });
  const title = t("consultDietician.title");
  const description = t("consultDietician.description");

  return {
    ...metadata,
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: metadata.openGraph?.url,
      siteName: metadata.openGraph?.siteName,
      locale: metadata.openGraph?.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ConsultationPage />;
}
