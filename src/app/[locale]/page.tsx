import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroBanner } from "@/components/home/HeroBanner";
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
  return <HeroBanner />;
}
