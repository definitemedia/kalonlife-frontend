import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "./guidance-education.css";

const supportItems = ["plan", "followUp", "food", "lifestyle"] as const;

export async function GuidanceEducationSection() {
  const t = await getTranslations("guidance");

  return (
    <section className="guidance">
      <div className="container guidance-layout">
        <article className="guidance-card guidance-card-consult">
          <p className="guidance-eyebrow">{t("consult.eyebrow")}</p>
          <h2 className="guidance-title">{t("consult.heading")}</h2>
          <p className="guidance-body">{t("consult.description")}</p>
          <ul className="guidance-support">
            {supportItems.map((item) => (
              <li key={item}>{t(`consult.support.${item}`)}</li>
            ))}
          </ul>
          <div className="guidance-action">
            <Link className="guidance-cta guidance-cta-filled" href="/consult-your-dietician">
              {t("consult.cta")}
            </Link>
          </div>
        </article>

        <article className="guidance-card guidance-card-learn">
          <p className="guidance-eyebrow">{t("articles.eyebrow")}</p>
          <h2 className="guidance-title">{t("articles.heading")}</h2>
          <p className="guidance-body">{t("articles.description")}</p>
          <div className="guidance-action">
            <Link className="guidance-cta guidance-cta-outline" href="/articles">
              {t("articles.cta")}
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
