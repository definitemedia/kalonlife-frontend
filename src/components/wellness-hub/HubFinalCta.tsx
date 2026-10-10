import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowIcon } from "./icons";
import { consultationHref, consultationPrice } from "./pricing";

export async function HubFinalCta() {
  const t = await getTranslations("wellnessHubPage");

  return (
    <>
      <section className="wh-section wh-band" aria-labelledby="wh-final-heading">
        <div className="container wh-band-inner">
          <p className="wh-eyebrow">{t("finalCta.eyebrow")}</p>
          <h2 id="wh-final-heading" className="wh-title">
            {t("finalCta.heading")}
          </h2>
          <div className="wh-accent" aria-hidden="true" />
          <p className="wh-lead">{t("finalCta.description")}</p>
          <div className="wh-actions wh-actions-center">
            <Link className="wh-btn wh-btn-primary" href={consultationHref}>
              {t("finalCta.cta", { price: consultationPrice })}
              <ArrowIcon className="wh-btn-icon" />
            </Link>
          </div>
        </div>
      </section>
      <aside className="wh-disclaimer-wrap">
        <div className="container">
          <p className="wh-disclaimer">{t("disclaimer")}</p>
        </div>
      </aside>
    </>
  );
}
