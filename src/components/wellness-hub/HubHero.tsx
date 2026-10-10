import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowIcon } from "./icons";
import { consultationHref, servicesAnchor } from "./pricing";

export async function HubHero() {
  const t = await getTranslations("wellnessHubPage.hero");

  return (
    <section className="wh-hero" aria-labelledby="wh-hero-heading">
      <div className="container wh-hero-grid">
        <div className="wh-hero-copy">
          <p className="wh-eyebrow">{t("eyebrow")}</p>
          <h1 id="wh-hero-heading" className="wh-display">
            {t("heading")}
          </h1>
          <p className="wh-lead">{t("description")}</p>
          <div className="wh-actions">
            <Link className="wh-btn wh-btn-primary" href={consultationHref}>
              {t("primaryCta")}
              <ArrowIcon className="wh-btn-icon" />
            </Link>
            <a className="wh-btn wh-btn-secondary" href={`#${servicesAnchor}`}>
              {t("secondaryCta")}
            </a>
          </div>
        </div>
        <div className="wh-media wh-hero-media">
          <Image
            src="/images/wellness-choices-kitchen.png"
            alt={t("imageAlt")}
            fill
            preload
            sizes="(max-width: 959px) calc(100vw - 1.5rem), 38rem"
            className="wh-media-image"
          />
        </div>
      </div>
    </section>
  );
}
