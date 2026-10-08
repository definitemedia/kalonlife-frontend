import { getTranslations } from "next-intl/server";
import { consultationBenefitIds } from "@/config/consultation";
import { BadgeIcon, LeafIcon, PeopleIcon, VideoIcon } from "./icons";

const icons = {
  plans: LeafIcon,
  guidance: BadgeIcon,
  flexible: VideoIcon,
  holistic: PeopleIcon,
} as const;

export async function Benefits() {
  const t = await getTranslations("consultation");

  return (
    <section className="consult-section consult-benefits" aria-labelledby="consult-benefits-heading">
      <div className="container">
        <p className="consult-eyebrow">{t("benefits.eyebrow")}</p>
        <h2 id="consult-benefits-heading" className="consult-title">
          {t("benefits.heading")}
        </h2>
        <p className="consult-lead">{t("benefits.description")}</p>
        <ul className="consult-benefit-grid">
          {consultationBenefitIds.map((id) => {
            const Icon = icons[id];
            return (
              <li key={id} className="consult-benefit">
                <Icon />
                <h3>{t(`benefits.cards.${id}.title`)}</h3>
                <p>{t(`benefits.cards.${id}.body`)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
