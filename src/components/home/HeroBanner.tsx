import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "./hero-banner.css";

const lifestyleImage = "/hero/lifestyle.png";

type HeroBannerProps = {
  portraitSrc?: string;
};

export async function HeroBanner({ portraitSrc }: HeroBannerProps) {
  const t = await getTranslations("hero");

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-media">
        <Image
          className="hero-photo"
          src={portraitSrc ?? lifestyleImage}
          alt={t("portraitAlt")}
          fill
          priority
          sizes="(max-width: 699px) 100vw, 78vw"
        />
        <div className="hero-shade" aria-hidden="true" />
      </div>
      <div className="hero-copy">
        <p className="hero-eyebrow">{t("eyebrow")}</p>
        <h1 className="hero-title" id="hero-heading">
          {t("heading")}
        </h1>
        <p className="hero-description">{t("description")}</p>
        <div className="hero-actions">
          <Link className="hero-cta hero-cta-primary" href="/about">
            {t("primaryCta")}
          </Link>
          <Link className="hero-cta hero-cta-secondary" href="/shop">
            {t("secondaryCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
