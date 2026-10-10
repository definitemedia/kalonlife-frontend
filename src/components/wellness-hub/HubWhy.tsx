import { getTranslations } from "next-intl/server";
import { BadgeIcon, LeafIcon, ShieldIcon, TargetIcon } from "./icons";

const reasons = [
  { id: "personal", Icon: TargetIcon },
  { id: "qualified", Icon: BadgeIcon },
  { id: "practical", Icon: LeafIcon },
  { id: "responsible", Icon: ShieldIcon },
] as const;

export async function HubWhy() {
  const t = await getTranslations("wellnessHubPage.why");

  return (
    <section className="wh-section wh-soft wh-why" aria-labelledby="wh-why-heading">
      <div className="container">
        <div className="wh-head">
          <h2 id="wh-why-heading" className="wh-title">
            {t("heading")}
          </h2>
        </div>
        <ul className="wh-grid wh-grid-4">
          {reasons.map(({ id, Icon }) => (
            <li key={id} className="wh-card wh-card-lift">
              <span className="wh-icon-chip">
                <Icon />
              </span>
              <h3 className="wh-card-title">{t(`items.${id}.title`)}</h3>
              <p className="wh-card-body">{t(`items.${id}.description`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
