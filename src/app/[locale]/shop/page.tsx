import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductCatalog } from "@/components/shop/ProductCatalog";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "shop");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "routes" });

  return (
    <div className="shop-shell page-shell">
      <h1>{t("shop.title")}</h1>
      <Suspense fallback={<ProductCatalog />}>
        <ShopCatalog />
      </Suspense>
    </div>
  );
}
