import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  HandshakeIcon,
  HeartIcon,
  RocketIcon,
  TrophyIcon,
} from "@/components/icons/BeliefIcons";
import "./our-philosophy.css";

const beliefs = [
  { id: "health", src: "/images/our-philosophy/health-first.png", Icon: HeartIcon },
  { id: "integrity", src: "/images/our-philosophy/integrity.png", Icon: TrophyIcon },
  { id: "community", src: "/images/our-philosophy/community.png", Icon: HandshakeIcon },
  { id: "growth", src: "/images/our-philosophy/growth.png", Icon: RocketIcon },
] as const;

export async function OurPhilosophySection() {
  const t = await getTranslations("philosophy");

  return (
    <section className="philosophy" aria-labelledby="philosophy-heading">
      <div className="container">
        <header className="philosophy-intro">
          <p className="philosophy-eyebrow">{t("eyebrow")}</p>
          <h2 className="philosophy-title" id="philosophy-heading">
            {t("heading")}
          </h2>
          <p className="philosophy-lead">{t("intro")}</p>
        </header>
        <ul className="philosophy-grid">
          {beliefs.map((belief) => (
            <li
              key={belief.id}
              className={`philosophy-card philosophy-card-${belief.id}`}
            >
              <div className="philosophy-media">
                <Image
                  src={belief.src}
                  alt={t(`${belief.id}.imageAlt`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                />
              </div>
              <div className="philosophy-body">
                <div className="philosophy-icon-plate">
                  <belief.Icon className="philosophy-icon" />
                </div>
                <h3>{t(`${belief.id}.title`)}</h3>
                <p>{t(`${belief.id}.description`)}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="philosophy-close">
          <span className="philosophy-mark" aria-hidden="true" />
          <p>{t("closing")}</p>
        </div>
      </div>
    </section>
  );
}
