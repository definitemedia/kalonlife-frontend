import type { Metadata } from "next";
import { renderRoute } from "@/lib/render-route";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  return buildMetadata(locale, "article", `/articles/${slug}`);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return renderRoute(locale, "article");
}
