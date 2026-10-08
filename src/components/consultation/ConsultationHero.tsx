import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function ConsultationHero() {
  const t = await getTranslations("consultation");

  return (
    <section className="consult-hero" aria-labelledby="consult-hero-heading">
      <div className="container consult-hero-grid">
        <div>
          <p className="consult-eyebrow">{t("hero.eyebrow")}</p>
          <h1 id="consult-hero-heading" className="consult-title">
            {t("hero.heading")}
          </h1>
          <p className="consult-lead">{t("hero.description")}</p>
          <div className="consult-fee">
            <p className="consult-fee-label">{t("hero.feeLabel")}</p>
            <p className="consult-fee-price">{t("hero.price")}</p>
            <p className="consult-fee-support">{t("hero.support")}</p>
          </div>
          <div className="consult-actions">
            <a className="consult-btn consult-btn-primary" href="#book-consultation">
              {t("hero.primaryCta")}
            </a>
            <a className="consult-btn consult-btn-secondary" href="#how-it-works">
              {t("hero.secondaryCta")}
            </a>
          </div>
          <p className="consult-micro">{t("hero.microcopy")}</p>
        </div>
        <div className="consult-hero-media">
          <Image
            src="/images/consultation-hero.jpg"
            alt={t("hero.imageAlt")}
            fill
            priority
            sizes="(max-width: 959px) 100vw, 40rem"
            className="consult-hero-image"
          />
        </div>
      </div>
    </section>
  );
}
