import type { Metadata } from "next";
import { renderRoute } from "@/lib/render-route";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "contact");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return renderRoute(locale, "contact");
}
