import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  CareIcon,
  EmpowermentIcon,
  IntegrityIcon,
  PositivityIcon,
  QualityIcon,
  WellbeingIcon,
} from "@/components/icons/LeadershipIcons";
import { Link } from "@/i18n/navigation";
import { LeadershipPortrait } from "./LeadershipPortrait";
import "./leadership.css";

const chairmanParagraphs = ["p1", "p2", "p3", "p4", "p5", "p6"] as const;
const advisorParagraphs = ["p1", "p2", "p3"] as const;

const pillars = [
  { id: "quality", Icon: QualityIcon },
  { id: "integrity", Icon: IntegrityIcon },
  { id: "empowerment", Icon: EmpowermentIcon },
] as const;

const beliefs = [
  { id: "wellbeing", Icon: WellbeingIcon },
  { id: "care", Icon: CareIcon },
  { id: "positivity", Icon: PositivityIcon },
] as const;

export async function LeadershipPage() {
  const t = await getTranslations("leadership");

  return (
    <div className="leadership">
      <section className="leadership-hero" aria-labelledby="leadership-hero-title">
        <div className="leadership-hero-media">
          <Image
            className="leadership-hero-photo"
            src="/images/leadership/hero.jpg"
            alt={t("hero.imageAlt")}
            fill
            priority
            sizes="100vw"
          />
          <div className="leadership-hero-scrim" aria-hidden="true" />
        </div>
        <div className="leadership-hero-copy">
          <p className="leadership-eyebrow leadership-eyebrow-on-dark">
            {t("hero.eyebrow")}
          </p>
          <h1 id="leadership-hero-title">{t("hero.title")}</h1>
          <p className="leadership-hero-sub">{t("hero.subheading")}</p>
          <p className="leadership-hero-lead">{t("hero.description")}</p>
          <div className="leadership-actions">
            <Link className="leadership-btn leadership-btn-primary" href="/shop">
              {t("hero.exploreProducts")}
            </Link>
            <Link
              className="leadership-btn leadership-btn-secondary"
              href="/why-choose-us"
            >
              {t("hero.whyChoose")}
            </Link>
          </div>
        </div>
      </section>

      <section className="leadership-chairman" aria-labelledby="leadership-chairman-title">
        <div className="container">
          <div className="leadership-profile">
            <LeadershipPortrait
              initials={t("chairman.initials")}
              label={t("chairman.portraitAlt")}
            />
            <div className="leadership-prose">
              <p className="leadership-kicker">
                <span className="leadership-num">{t("chairman.number")}</span>
                <span className="leadership-eyebrow">{t("chairman.eyebrow")}</span>
              </p>
              <h2 id="leadership-chairman-title">{t("chairman.heading")}</h2>
              <p className="leadership-person">{t("chairman.name")}</p>
              <p className="leadership-role">{t("chairman.title")}</p>
              <p className="leadership-company">{t("chairman.company")}</p>
              {chairmanParagraphs.map((key) => (
                <p key={key}>{t(`chairman.${key}`)}</p>
              ))}
              <div className="leadership-signoff">
                <p>{t("chairman.regards")}</p>
                <p className="leadership-person">{t("chairman.name")}</p>
                <p>{t("chairman.title")}</p>
                <p>{t("chairman.company")}</p>
              </div>
            </div>
          </div>
          <aside className="leadership-compact" aria-label={t("chairman.name")}>
            <p className="leadership-person">{t("chairman.name")}</p>
            <p>{t("chairman.title")}</p>
            <p>{t("chairman.compactCompany")}</p>
          </aside>
        </div>
      </section>

      <section className="leadership-pillars" aria-labelledby="leadership-pillars-title">
        <div className="container">
          <h2 className="leadership-eyebrow leadership-section-label" id="leadership-pillars-title">
            {t("pillars.eyebrow")}
          </h2>
          <ul className="leadership-card-grid">
            {pillars.map((pillar) => (
              <li key={pillar.id} className={`leadership-pillar leadership-pillar-${pillar.id}`}>
                <span className="leadership-card-num">{t(`pillars.${pillar.id}.number`)}</span>
                <pillar.Icon className="leadership-card-icon" />
                <h3>{t(`pillars.${pillar.id}.title`)}</h3>
                <p>{t(`pillars.${pillar.id}.description`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="leadership-band" aria-labelledby="leadership-band-text">
        <div className="container leadership-band-inner">
          <p id="leadership-band-text">{t("chairmanCta.text")}</p>
          <div className="leadership-actions">
            <Link className="leadership-btn leadership-btn-primary" href="/shop">
              {t("chairmanCta.button")}
            </Link>
          </div>
        </div>
      </section>

      <section className="leadership-advisor" aria-labelledby="leadership-advisor-title">
        <div className="container">
          <div className="leadership-profile">
            <LeadershipPortrait
              initials={t("advisor.initials")}
              label={t("advisor.portraitAlt")}
            />
            <div className="leadership-prose">
              <p className="leadership-kicker">
                <span className="leadership-num">{t("advisor.number")}</span>
                <span className="leadership-eyebrow">{t("advisor.eyebrow")}</span>
              </p>
              <h2 id="leadership-advisor-title">{t("advisor.heading")}</h2>
              <p className="leadership-person">{t("advisor.name")}</p>
              <p className="leadership-role">{t("advisor.credential")}</p>
              <p className="leadership-role">{t("advisor.role")}</p>
              <p className="leadership-company">{t("advisor.company")}</p>
              {advisorParagraphs.map((key) => (
                <p key={key}>{t(`advisor.${key}`)}</p>
              ))}
              <div className="leadership-signoff">
                <p>{t("advisor.regards")}</p>
                <p className="leadership-person">{t("advisor.name")}</p>
                <p>{t("advisor.credential")}</p>
                <p>{t("advisor.role")}</p>
                <p>{t("advisor.company")}</p>
              </div>
            </div>
          </div>
          <aside className="leadership-compact leadership-compact-light" aria-label={t("advisor.name")}>
            <p className="leadership-person">{t("advisor.name")}</p>
            <p>{t("advisor.credential")}</p>
            <p>{t("advisor.role")}</p>
            <p>{t("advisor.compactCompany")}</p>
          </aside>
        </div>
      </section>

      <section className="leadership-beliefs" aria-labelledby="leadership-beliefs-title">
        <div className="container">
          <h2 className="leadership-eyebrow leadership-section-label" id="leadership-beliefs-title">
            {t("beliefs.eyebrow")}
          </h2>
          <ul className="leadership-card-grid">
            {beliefs.map((belief) => (
              <li key={belief.id} className={`leadership-belief leadership-belief-${belief.id}`}>
                <span className="leadership-card-num">{t(`beliefs.${belief.id}.number`)}</span>
                <belief.Icon className="leadership-card-icon" />
                <h3>{t(`beliefs.${belief.id}.title`)}</h3>
                <p>{t(`beliefs.${belief.id}.description`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="leadership-break" aria-labelledby="leadership-break-title">
        <div className="leadership-break-media">
          <Image
            className="leadership-break-photo"
            src="/images/leadership/community.jpg"
            alt={t("visual.imageAlt")}
            fill
            sizes="100vw"
          />
          <div className="leadership-break-scrim" aria-hidden="true" />
        </div>
        <div className="container leadership-break-copy">
          <h2 id="leadership-break-title">{t("visual.heading")}</h2>
          <p>{t("visual.description")}</p>
        </div>
      </section>

      <section className="leadership-closing" aria-labelledby="leadership-closing-title">
        <div className="container">
          <h2 id="leadership-closing-title">{t("closing.heading")}</h2>
          <p>{t("closing.description")}</p>
        </div>
      </section>

      <section className="leadership-final" aria-labelledby="leadership-final-title">
        <div className="container">
          <h2 id="leadership-final-title">{t("finalCta.heading")}</h2>
          <p>{t("finalCta.description")}</p>
          <div className="leadership-actions">
            <Link className="leadership-btn leadership-btn-primary" href="/shop">
              {t("finalCta.explore")}
            </Link>
            <Link
              className="leadership-btn leadership-btn-secondary"
              href="/why-choose-us"
            >
              {t("finalCta.whyChoose")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
