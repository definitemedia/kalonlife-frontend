import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ArrowIcon,
  CommunityIcon,
  GlobeIcon,
  LeafIcon,
  MentorIcon,
  NatureIcon,
  PathIcon,
  ScaleIcon,
  ShieldIcon,
} from "./icons";
import "./why-choose-page.css";

const reasons = [
  {
    id: "quality",
    number: "01",
    tone: "white",
    icon: LeafIcon,
    photo: "/images/why-choose/botanicals.jpg",
    sizes: "(max-width: 900px) 92vw, 28vw",
  },
  {
    id: "science",
    number: "02",
    tone: "mint",
    icon: NatureIcon,
  },
  {
    id: "ethics",
    number: "03",
    tone: "pale",
    icon: ShieldIcon,
  },
  {
    id: "opportunity",
    number: "04",
    tone: "white",
    icon: PathIcon,
  },
  {
    id: "global",
    number: "05",
    tone: "pale",
    icon: GlobeIcon,
  },
  {
    id: "leadership",
    number: "06",
    tone: "white",
    icon: MentorIcon,
    photo: "/images/why-choose/leadership.jpg",
    sizes: "(max-width: 900px) 92vw, 32vw",
  },
  {
    id: "community",
    number: "07",
    tone: "wide",
    icon: CommunityIcon,
    photo: "/images/why-choose/community.jpg",
    sizes: "(max-width: 900px) 92vw, 40vw",
  },
] as const;

const promises = [
  { id: "quality", tone: "white", icon: LeafIcon },
  { id: "ethics", tone: "mint", icon: ScaleIcon },
  { id: "community", tone: "teal", icon: CommunityIcon },
  { id: "independence", tone: "accent", icon: PathIcon },
] as const;

function Actions({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <div className="wcu-actions">
      <Link className="wcu-btn wcu-btn-primary" href="/shop">
        {primary}
        <ArrowIcon className="wcu-btn-arrow" />
      </Link>
      <Link className="wcu-btn wcu-btn-secondary" href="/about">
        {secondary}
        <ArrowIcon className="wcu-btn-arrow" />
      </Link>
    </div>
  );
}

export async function WhyChoosePage() {
  const t = await getTranslations("whyChoose");

  return (
    <div className="wcu">
      <section className="wcu-hero" aria-labelledby="wcu-hero-title">
        <div className="wcu-hero-shapes" aria-hidden="true">
          <span className="wcu-shape wcu-shape-mint" />
          <span className="wcu-shape wcu-shape-teal" />
          <span className="wcu-shape wcu-shape-gold" />
        </div>
        <div className="container wcu-hero-grid">
          <div className="wcu-hero-copy">
            <p className="wcu-eyebrow">{t("hero.eyebrow")}</p>
            <h1 id="wcu-hero-title">{t("hero.title")}</h1>
            <p className="wcu-lead">{t("hero.description")}</p>
            <Actions
              primary={t("hero.primaryCta")}
              secondary={t("hero.secondaryCta")}
            />
          </div>
          <div className="wcu-hero-media">
            <Image
              src="/images/why-choose-hero.jpg"
              alt={t("hero.imageAlt")}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 54vw"
              className="wcu-photo"
            />
          </div>
        </div>
      </section>

      <section className="wcu-difference" aria-labelledby="wcu-difference-title">
        <div className="container wcu-center">
          <p className="wcu-eyebrow">{t("difference.eyebrow")}</p>
          <h2 id="wcu-difference-title">{t("difference.heading")}</h2>
          <p className="wcu-lead">{t("difference.description")}</p>
        </div>
      </section>

      <section className="wcu-reasons" aria-labelledby="wcu-reasons-title">
        <div className="container">
          <header className="wcu-reasons-intro">
            <p className="wcu-eyebrow">{t("reasons.eyebrow")}</p>
            <h2 id="wcu-reasons-title">{t("reasons.heading")}</h2>
            <p className="wcu-lead">{t("reasons.description")}</p>
          </header>
          <ul className="wcu-grid">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <li
                  key={reason.id}
                  className={`wcu-card wcu-card-${reason.id} wcu-card-${reason.tone}${"photo" in reason ? " wcu-card-has-photo" : ""}`}
                >
                  <div className="wcu-card-copy">
                    <div className="wcu-kicker">
                      <span className="wcu-num">{reason.number}</span>
                      <span className="wcu-icon">
                        <Icon />
                      </span>
                    </div>
                    <h3>{t(`reasons.${reason.id}.title`)}</h3>
                    <p>{t(`reasons.${reason.id}.description`)}</p>
                  </div>
                  {"photo" in reason ? (
                    <div className="wcu-card-photo">
                      <Image
                        src={reason.photo}
                        alt={t(`reasons.${reason.id}.imageAlt`)}
                        fill
                        sizes={reason.sizes}
                        className="wcu-photo"
                      />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="wcu-statement" aria-labelledby="wcu-statement-title">
        <div className="wcu-statement-media">
          <Image
            src="/images/why-choose/statement.jpg"
            alt={t("statement.imageAlt")}
            fill
            sizes="100vw"
            className="wcu-photo"
          />
        </div>
        <div className="wcu-statement-scrim" aria-hidden="true" />
        <div className="container wcu-statement-copy">
          <h2 id="wcu-statement-title">{t("statement.heading")}</h2>
          <p>{t("statement.description")}</p>
        </div>
      </section>

      <section className="wcu-promise" aria-labelledby="wcu-promise-title">
        <div className="container wcu-promise-layout">
          <div className="wcu-promise-intro">
            <p className="wcu-eyebrow">{t("promise.eyebrow")}</p>
            <h2 id="wcu-promise-title">{t("promise.heading")}</h2>
            <p className="wcu-lead">{t("promise.description")}</p>
          </div>
          <ul className="wcu-promise-grid">
            {promises.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.id}
                  className={`wcu-promise-card wcu-promise-card-${item.tone}`}
                >
                  <span className="wcu-icon">
                    <Icon />
                  </span>
                  <h3>{t(`promise.${item.id}.title`)}</h3>
                  <p>{t(`promise.${item.id}.description`)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="wcu-final-wrap" aria-labelledby="wcu-final-title">
        <div className="container wcu-final">
          <div className="wcu-final-copy">
            <h2 id="wcu-final-title">{t("cta.heading")}</h2>
            <p className="wcu-lead">{t("cta.description")}</p>
            <Actions
              primary={t("cta.primaryCta")}
              secondary={t("cta.secondaryCta")}
            />
          </div>
          <div className="wcu-final-media">
            <Image
              src="/images/why-choose/lifestyle.jpg"
              alt={t("cta.imageAlt")}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              className="wcu-photo"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
