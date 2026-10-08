import { getTranslations } from "next-intl/server";
import { consultationRecapIds } from "@/config/consultation";

export async function StepRecap() {
  const t = await getTranslations("consultation");

  return (
    <section className="consult-section consult-recap" aria-labelledby="consult-recap-heading">
      <div className="container">
        <h2 id="consult-recap-heading" className="consult-title">
          {t("recap.heading")}
        </h2>
        <ol className="consult-recap-list">
          {consultationRecapIds.map((id, index) => (
            <li key={id} className="consult-recap-item">
              <span className="consult-recap-index" aria-hidden="true">
                {index + 1}
              </span>
              <h3>{t(`recap.steps.${id}.title`)}</h3>
              <p>{t(`recap.steps.${id}.body`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
