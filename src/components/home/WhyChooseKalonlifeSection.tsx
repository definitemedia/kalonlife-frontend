import Image from "next/image";
import { getTranslations } from "next-intl/server";
import "./why-choose.css";

const reasons = [
  {
    id: "quality",
    kind: "photo",
    src: "/images/why-choose/premium-quality.png",
  },
  {
    id: "science",
    kind: "panel",
    tone: "pale",
  },
  {
    id: "ethics",
    kind: "photo",
    src: "/images/why-choose/ethical-business.png",
  },
  {
    id: "platform",
    kind: "panel",
    tone: "dark",
  },
  {
    id: "global",
    kind: "photo",
    src: "/images/why-choose/global-vision.png",
  },
  {
    id: "community",
    kind: "split",
    src: "/images/why-choose/community-impact.png",
  },
] as const;

export async function WhyChooseKalonlifeSection() {
  const t = await getTranslations("choose");

  return (
    <section className="choose" aria-labelledby="choose-heading">
      <div className="container choose-layout">
        <header className="choose-intro">
          <p className="choose-eyebrow">{t("eyebrow")}</p>
          <span className="choose-mark" aria-hidden="true" />
          <h2 className="choose-title" id="choose-heading">
            {t("heading")}
          </h2>
          <p className="choose-lead">{t("intro")}</p>
        </header>
        <ul className="choose-mosaic">
          {reasons.map((reason) => {
            const title = t(`${reason.id}.title`);
            const description = t(`${reason.id}.description`);

            if (reason.kind === "split") {
              return (
                <li
                  key={reason.id}
                  className={`choose-card choose-card-${reason.id} choose-split`}
                >
                  <div className="choose-copy">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <div className="choose-split-photo">
                    <Image
                      src={reason.src}
                      alt={t(`${reason.id}.imageAlt`)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1100px) 46vw, 28vw"
                    />
                  </div>
                </li>
              );
            }

            if (reason.kind === "panel") {
              return (
                <li
                  key={reason.id}
                  className={`choose-card choose-card-${reason.id} choose-panel choose-panel-${reason.tone}`}
                >
                  <div className="choose-copy">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              );
            }

            return (
              <li
                key={reason.id}
                className={`choose-card choose-card-${reason.id} choose-photo`}
              >
                <Image
                  src={reason.src}
                  alt={t(`${reason.id}.imageAlt`)}
                  fill
                  sizes={
                    reason.id === "global"
                      ? "(max-width: 1100px) 100vw, 46vw"
                      : "(max-width: 640px) 100vw, (max-width: 1100px) 46vw, 22vw"
                  }
                />
                <div className="choose-shade" aria-hidden="true" />
                <div className="choose-copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
