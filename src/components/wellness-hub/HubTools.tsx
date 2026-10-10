import { getTranslations } from "next-intl/server";
import { BookIcon, ChecklistIcon, PlateIcon } from "./icons";

const tools = [
  { id: "meals", Icon: PlateIcon },
  { id: "awareness", Icon: BookIcon },
  { id: "habits", Icon: ChecklistIcon },
] as const;

export async function HubTools() {
  const t = await getTranslations("wellnessHubPage.tools");

  return (
    <section className="wh-section wh-tools" aria-labelledby="wh-tools-heading">
      <div className="container">
        <div className="wh-head">
          <p className="wh-eyebrow">{t("eyebrow")}</p>
          <h2 id="wh-tools-heading" className="wh-title">
            {t("heading")}
          </h2>
        </div>
        <ul className="wh-grid wh-grid-3">
          {tools.map(({ id, Icon }) => (
            <li key={id} className="wh-card wh-tool">
              <div className="wh-tool-top">
                <span className="wh-icon-chip">
                  <Icon />
                </span>
                <span className="wh-badge">{t("comingSoon")}</span>
              </div>
              <h3 className="wh-card-title">{t(`items.${id}.title`)}</h3>
              <p className="wh-card-body">{t(`items.${id}.description`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
