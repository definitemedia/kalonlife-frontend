import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { WhyChoosePage } from "@/components/why-choose/WhyChoosePage";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await buildMetadata(locale, "whyChooseUs");
  const title = typeof metadata.title === "string" ? metadata.title : undefined;

  return title ? { ...metadata, title: { absolute: title } } : metadata;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WhyChoosePage />;
}
