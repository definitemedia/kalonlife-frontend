import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AboutSection } from "@/components/home/AboutSection";
import { MissionVisionSection } from "@/components/home/MissionVisionSection";
import { OurCommitmentSection } from "@/components/home/OurCommitmentSection";
import { OurPhilosophySection } from "@/components/home/OurPhilosophySection";
import { ProductsServicesSection } from "@/components/home/ProductsServicesSection";
import { WhyChooseKalonlifeSection } from "@/components/home/WhyChooseKalonlifeSection";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "about");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutSection />
      <MissionVisionSection />
      <OurPhilosophySection />
      <ProductsServicesSection />
      <OurCommitmentSection />
      <WhyChooseKalonlifeSection />
    </>
  );
}
