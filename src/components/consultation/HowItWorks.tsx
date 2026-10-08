import { getTranslations } from "next-intl/server";
import { consultationFeatureKeys, consultationStepIds } from "@/config/consultation";
import { BadgeIcon } from "./icons";

export async function HowItWorks() {
  const t = await getTranslations("consultation");

  return (
    <section id="how-it-works" className="consult-section consult-how" aria-labelledby="consult-how-heading">
      <div className="container">
        <p className="consult-eyebrow">{t("how.eyebrow")}</p>
        <h2 id="consult-how-heading" className="consult-title">
          {t("how.heading")}
        </h2>
        <p className="consult-lead">{t("how.description")}</p>
        <ol className="consult-steps">
          {consultationStepIds.map((id, index) => (
            <li key={id} className="consult-step">
              <span className="consult-step-index" aria-hidden="true">
                {index + 1}
              </span>
              <p className="consult-step-time">{t(`how.steps.${id}.time`)}</p>
              <h3 className="consult-step-title">{t(`how.steps.${id}.title`)}</h3>
              <p className="consult-step-body">{t(`how.steps.${id}.body`)}</p>
              <ul className="consult-features">
                {consultationFeatureKeys.map((feature) => (
                  <li key={feature}>
                    <BadgeIcon />
                    <span>{t(`how.steps.${id}.features.${feature}`)}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
