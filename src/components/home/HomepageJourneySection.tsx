import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "./homepage-journey.css";

const cards = [
  { id: "product", href: "/shop" },
  { id: "guidance", href: "/consult-dietician" },
  { id: "hub", href: "/wellness-hub/locate" },
  { id: "learn", href: "/articles" },
] as const;

export async function HomepageJourneySection() {
  const t = await getTranslations("journey");

  return (
    <section className="journey" aria-labelledby="journey-heading">
      <div className="container journey-layout">
        <header className="journey-intro">
          <p className="journey-eyebrow">{t("eyebrow")}</p>
          <h2 className="journey-title" id="journey-heading">
            {t("heading")}
          </h2>
          <p className="journey-description">{t("description")}</p>
        </header>

        <ul className="journey-grid">
          {cards.map((card) => (
            <li key={card.id}>
              <Link className="journey-card" href={card.href}>
                <h3 className="journey-card-title">{t(`cards.${card.id}.title`)}</h3>
                <p className="journey-card-body">{t(`cards.${card.id}.description`)}</p>
                <span className="journey-card-action">
                  {t(`cards.${card.id}.action`)}
                  <span className="journey-arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="journey-banner">
          <div className="journey-banner-copy">
            <h3 className="journey-banner-title">{t("banner.heading")}</h3>
            <p className="journey-banner-body">{t("banner.description")}</p>
          </div>
          <Link className="journey-banner-cta" href="/about">
            {t("banner.action")}
            <span className="journey-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
