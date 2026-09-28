import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import "./terms.css";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "terms");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "terms" });

  return (
    <div className="container page-shell">
      <article className="terms-of-use">
        <h1>{t("title")}</h1>
        <p className="terms-of-use-subtitle">{t("subtitle")}</p>
        <p className="terms-of-use-intro">{t("intro")}</p>

        <section>
          <h2>{t("acceptance.title")}</h2>
          <p>{t("acceptance.body")}</p>
        </section>

        <section>
          <h2>{t("usage.title")}</h2>
          <p>{t("usage.body")}</p>
        </section>

        <section>
          <h2>{t("productInformation.title")}</h2>
          <p>{t("productInformation.body")}</p>
        </section>

        <section>
          <h2>{t("intellectualProperty.title")}</h2>
          <p>{t("intellectualProperty.body")}</p>
        </section>

        <section>
          <h2>{t("liability.title")}</h2>
          <p>{t("liability.body")}</p>
        </section>

        <section>
          <h2>{t("modifications.title")}</h2>
          <p>{t("modifications.body")}</p>
        </section>
      </article>
    </div>
  );
}
