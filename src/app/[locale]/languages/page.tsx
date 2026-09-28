import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { LanguageChoices } from "./language-choices";
import "./languages.css";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "languages");
}

export default async function LanguagesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="language-page">
      <div className="container page-shell">
        <h1 id="choose-language">Choose Your Language</h1>
        <LanguageChoices />
      </div>
    </div>
  );
}
