import { getTranslations } from "next-intl/server";
import { ChevronIcon } from "./icons";
import { consultationPrice } from "./pricing";

const questions = ["what", "plan", "online", "medical", "cost"] as const;

export async function HubFaq() {
  const t = await getTranslations("wellnessHubPage.faq");

  return (
    <section className="wh-section wh-soft wh-faq" aria-labelledby="wh-faq-heading">
      <div className="container wh-faq-inner">
        <h2 id="wh-faq-heading" className="wh-title">
          {t("heading")}
        </h2>
        <div className="wh-faq-list">
          {questions.map((id) => (
            <details key={id} className="wh-faq-item">
              <summary className="wh-faq-question">
                <span>{t(`items.${id}.question`)}</span>
                <ChevronIcon className="wh-faq-chevron" />
              </summary>
              <p className="wh-faq-answer">
                {t(`items.${id}.answer`, { price: consultationPrice })}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
