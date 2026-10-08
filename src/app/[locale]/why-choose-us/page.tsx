import type { Metadata } from "next";
import { renderPublishedSoon } from "@/lib/render-route";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "whyChooseUs");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return renderPublishedSoon(locale, "whyChooseUs");
}
