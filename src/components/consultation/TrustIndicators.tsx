import { getTranslations } from "next-intl/server";
import { consultationHighlightIds } from "@/config/consultation";
import { BadgeIcon, LockIcon, PeopleIcon, ShieldIcon, StarIcon } from "./icons";

const statIds = ["rating", "private", "certified", "members"] as const;

const highlightIcons = {
  available: BadgeIcon,
  rating: StarIcon,
  private: LockIcon,
  certified: ShieldIcon,
  members: PeopleIcon,
} as const;

export async function TrustIndicators() {
  const t = await getTranslations("consultation");

  return (
    <section className="consult-section consult-trust" aria-labelledby="consult-trust-heading">
      <div className="container">
        <h2 id="consult-trust-heading" className="visually-hidden">
          {t("aria.trustStats")}
        </h2>
        <ul className="consult-stats">
          {statIds.map((id) => (
            <li key={id} className="consult-stat">
              <p className="consult-stat-value">{t(`trustStats.${id}.value`)}</p>
              <p className="consult-stat-label">{t(`trustStats.${id}.label`)}</p>
            </li>
          ))}
        </ul>
        <ul className="consult-highlights" aria-label={t("aria.trustHighlights")}>
          {consultationHighlightIds.map((id) => {
            const Icon = highlightIcons[id];
            const detail =
              id === "available" ? "" : t(`trustHighlights.${id}.detail`);
            return (
              <li key={id} className="consult-highlight">
                <Icon className="consult-highlight-icon" />
                <div>
                  <p className="consult-highlight-title">{t(`trustHighlights.${id}.title`)}</p>
                  {detail ? <p className="consult-highlight-detail">{detail}</p> : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
