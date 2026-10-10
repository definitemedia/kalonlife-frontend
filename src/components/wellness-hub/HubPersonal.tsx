import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowIcon, CheckIcon } from "./icons";
import { consultationHref } from "./pricing";

const benefits = ["discussions", "preferences", "meals", "habits", "followUp"] as const;

export async function HubPersonal() {
  const t = await getTranslations("wellnessHubPage.personal");

  return (
    <section className="wh-section wh-personal" aria-labelledby="wh-personal-heading">
      <div className="container wh-split wh-split-reverse">
        <div className="wh-split-copy">
          <p className="wh-eyebrow">{t("eyebrow")}</p>
          <h2 id="wh-personal-heading" className="wh-title">
            {t("heading")}
          </h2>
          <p className="wh-body">{t("description")}</p>
          <ul className="wh-checklist">
            {benefits.map((id) => (
              <li key={id}>
                <CheckIcon />
                <span>{t(`benefits.${id}`)}</span>
              </li>
            ))}
          </ul>
          <div className="wh-actions">
            <Link className="wh-btn wh-btn-primary" href={consultationHref}>
              {t("cta")}
              <ArrowIcon className="wh-btn-icon" />
            </Link>
          </div>
        </div>
        <div className="wh-media wh-media-portrait">
          <Image
            src="/images/offers/meal.png"
            alt={t("imageAlt")}
            fill
            sizes="(max-width: 959px) calc(100vw - 1.5rem), 32rem"
            className="wh-media-image"
          />
        </div>
      </div>
    </section>
  );
}
