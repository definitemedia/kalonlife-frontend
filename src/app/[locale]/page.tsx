import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CertificationStrip } from "@/components/home/CertificationStrip";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { GuidanceEducationSection } from "@/components/home/GuidanceEducationSection";
import { HomepageJourneySection } from "@/components/home/HomepageJourneySection";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ShopByWellnessGoalSection } from "@/components/home/ShopByWellnessGoalSection";
import { WellnessChoicesSection } from "@/components/home/WellnessChoicesSection";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "home");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <HeroBanner />
      <CertificationStrip />
      <WellnessChoicesSection />
      <ShopByWellnessGoalSection />
      <FeaturedProductsSection />
      <GuidanceEducationSection />
      <HomepageJourneySection />
    </>
  );
}
