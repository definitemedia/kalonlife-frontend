import Image from "next/image";
import { getTranslations } from "next-intl/server";

const paragraphs = ["p1", "p2", "p3"] as const;

export async function HubAbout() {
  const t = await getTranslations("wellnessHubPage.about");

  return (
    <section className="wh-section wh-about" aria-labelledby="wh-about-heading">
      <div className="container wh-split">
        <div className="wh-split-copy">
          <p className="wh-eyebrow">{t("eyebrow")}</p>
          <h2 id="wh-about-heading" className="wh-title">
            {t("heading")}
          </h2>
          <div className="wh-accent" aria-hidden="true" />
          {paragraphs.map((id) => (
            <p key={id} className="wh-body">
              {t(id)}
            </p>
          ))}
        </div>
        <div className="wh-media wh-media-portrait">
          <Image
            src="/images/offers/guidance.png"
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
