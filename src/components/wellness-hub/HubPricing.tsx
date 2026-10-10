import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CheckIcon } from "./icons";
import { consultationHref, consultationPrice } from "./pricing";

const included = ["session", "goals", "guidance"] as const;

export async function HubPricing() {
  const t = await getTranslations("wellnessHubPage.pricing");

  return (
    <section className="wh-section wh-pricing" aria-labelledby="wh-pricing-heading">
      <div className="container">
        <div className="wh-head wh-head-center">
          <p className="wh-eyebrow">{t("eyebrow")}</p>
          <h2 id="wh-pricing-heading" className="wh-title">
            {t("heading")}
          </h2>
        </div>
        <article className="wh-price-card" aria-labelledby="wh-price-name">
          <h3 id="wh-price-name" className="wh-price-name">
            {t("packageName")}
          </h3>
          <p className="wh-price">{consultationPrice}</p>
          <p className="wh-card-body">{t("description")}</p>
          <p id="wh-price-included" className="wh-price-included">
            {t("includedLabel")}
          </p>
          <ul className="wh-checklist" aria-labelledby="wh-price-included">
            {included.map((id) => (
              <li key={id}>
                <CheckIcon />
                <span>{t(`included.${id}`)}</span>
              </li>
            ))}
          </ul>
          <Link className="wh-btn wh-btn-primary wh-btn-block" href={consultationHref}>
            {t("cta", { price: consultationPrice })}
          </Link>
        </article>
      </div>
    </section>
  );
}
