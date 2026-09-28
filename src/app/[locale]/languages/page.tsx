import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteLanguages } from "@/config/site-languages";
import { Link } from "@/i18n/navigation";
import { safeNextPath } from "@/lib/safe-next-path";
import { buildMetadata } from "@/lib/seo";
import "./languages.css";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string | string[] }>;
};

function PinIcon() {
  return (
    <svg className="language-choice-pin" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21.15s-6.15-5.15-6.15-10.3a6.15 6.15 0 0 1 12.3 0c0 5.15-6.15 10.3-6.15 10.3z" />
      <circle cx="12" cy="10.85" r="2.05" />
    </svg>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "languages");
}

export default async function LanguagesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { next } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations("languages");
  const destination = safeNextPath(next) ?? "/";

  return (
    <div className="language-page">
      <div className="container page-shell">
        <h1>{t("heading")}</h1>
        <ul className="language-choice-grid">
          {siteLanguages.map((language) => {
            const current = language.code === locale;
            const region = t(`regions.${language.code}`);
            const showEnglish = language.english !== language.native;
            return (
              <li key={language.code}>
                <Link
                  href={destination}
                  locale={language.code}
                  lang={language.code}
                  className="language-choice"
                  aria-current={current ? "page" : undefined}
                >
                  <PinIcon />
                  <span className="language-choice-copy">
                    <span className="language-choice-native">{language.native}</span>
                    {showEnglish ? (
                      <span className="language-choice-english" lang="en">
                        {language.english}
                      </span>
                    ) : null}
                    <span className="language-choice-region">{region}</span>
                    {current ? (
                      <span className="language-choice-current">{t("current")}</span>
                    ) : null}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
