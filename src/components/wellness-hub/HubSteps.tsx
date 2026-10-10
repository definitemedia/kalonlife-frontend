import { getTranslations } from "next-intl/server";
import { ChatIcon, ExpertIcon, PathIcon } from "./icons";

const steps = [
  { id: "goals", Icon: ChatIcon },
  { id: "expert", Icon: ExpertIcon },
  { id: "next", Icon: PathIcon },
] as const;

export async function HubSteps() {
  const t = await getTranslations("wellnessHubPage.steps");

  return (
    <section className="wh-section wh-soft wh-steps" aria-labelledby="wh-steps-heading">
      <div className="container">
        <div className="wh-head">
          <h2 id="wh-steps-heading" className="wh-title">
            {t("heading")}
          </h2>
        </div>
        <ol className="wh-step-list">
          {steps.map(({ id, Icon }, index) => (
            <li key={id} className="wh-step">
              <div className="wh-step-top">
                <span className="wh-step-index" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="wh-step-icon">
                  <Icon />
                </span>
              </div>
              <h3 className="wh-card-title">{t(`items.${id}.title`)}</h3>
              <p className="wh-card-body">{t(`items.${id}.description`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
