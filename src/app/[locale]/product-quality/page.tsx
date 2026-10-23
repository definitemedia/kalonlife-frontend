import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PublishedLegalPage } from "@/components/layout/PublishedLegalPage";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "productQuality");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PublishedLegalPage
      locale={locale}
      routeKey="productQuality"
      namespace="productQualityBody"
      href="/product-quality"
    />
  );
}
