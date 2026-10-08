import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LeadershipPage } from "@/components/leadership/LeadershipPage";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await buildMetadata(locale, "chairmanMessage");
  const t = await getTranslations({
    locale,
    namespace: "routes.chairmanMessage",
  });
  const title = t("title");

  return {
    ...metadata,
    title: { absolute: title },
    openGraph: {
      ...metadata.openGraph,
      title,
    },
    twitter: {
      ...metadata.twitter,
      title,
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LeadershipPage />;
}
