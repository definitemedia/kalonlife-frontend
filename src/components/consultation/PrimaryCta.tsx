import { getTranslations } from "next-intl/server";

export async function PrimaryCta() {
  const t = await getTranslations("consultation");

  return (
    <section className="consult-section consult-band" aria-labelledby="consult-cta-heading">
      <div className="container consult-band-inner">
        <h2 id="consult-cta-heading" className="consult-title">
          {t("cta.heading")}
        </h2>
        <div className="consult-accent" aria-hidden="true" />
        <p className="consult-lead">{t("cta.description")}</p>
        <div className="consult-actions consult-actions-center">
          <a className="consult-btn consult-btn-mint" href="#book-consultation">
            {t("cta.button")}
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <p className="consult-micro">{t("cta.microcopy")}</p>
      </div>
    </section>
  );
}
