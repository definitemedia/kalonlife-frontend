import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LaunchingSoon } from "@/components/layout/LaunchingSoon";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "nutrihub");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "hubPages" });

  return (
    <LaunchingSoon
      status={t("launchingSoon")}
      title={t("nutrihub.title")}
      description={t("nutrihub.description")}
    />
  );
}
