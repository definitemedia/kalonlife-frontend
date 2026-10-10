import { getTranslations } from "next-intl/server";
import { ActiveIcon, BlossomIcon, FamilyIcon, PulseIcon, ScaleIcon, SunIcon } from "./icons";
import { servicesAnchor } from "./pricing";

const services = [
  { id: "weight", Icon: ScaleIcon },
  { id: "metabolic", Icon: PulseIcon },
  { id: "women", Icon: BlossomIcon },
  { id: "family", Icon: FamilyIcon },
  { id: "active", Icon: ActiveIcon },
  { id: "ageing", Icon: SunIcon },
] as const;

export async function HubServices() {
  const t = await getTranslations("wellnessHubPage.services");

  return (
    <section
      id={servicesAnchor}
      className="wh-section wh-soft wh-services"
      aria-labelledby="wh-services-heading"
    >
      <div className="container">
        <div className="wh-head">
          <p className="wh-eyebrow">{t("eyebrow")}</p>
          <h2 id="wh-services-heading" className="wh-title">
            {t("heading")}
          </h2>
        </div>
        <ul className="wh-grid wh-grid-3">
          {services.map(({ id, Icon }) => (
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
