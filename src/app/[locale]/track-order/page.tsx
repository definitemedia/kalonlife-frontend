import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrackOrderBanner } from "@/components/track-order/TrackOrderBanner";
import { TrackOrderForm } from "@/components/track-order/TrackOrderForm";
import { buildMetadata } from "@/lib/seo";
import "@/components/track-order/track-order.css";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "trackOrder");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "trackOrder" });

  return (
    <div className="track-page">
      <TrackOrderBanner
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("bannerDescription")}
        cta={t("bannerCta")}
        appBadge={t("appBadge")}
        phoneAlt={t("phoneAlt")}
      />
      <TrackOrderForm />
    </div>
  );
}
