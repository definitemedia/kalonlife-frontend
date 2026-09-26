import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HandshakeIcon } from "@/components/icons/BeliefIcons";
import { AwardIcon, LightbulbIcon } from "@/components/icons/CommitmentIcons";
import { SproutIcon } from "@/components/icons/OfferIcons";
import "./our-commitment.css";

const commitments = [
  { id: "standards", Icon: AwardIcon },
  { id: "ethics", Icon: HandshakeIcon },
  { id: "community", Icon: SproutIcon },
  { id: "opportunities", Icon: LightbulbIcon },
] as const;

export async function OurCommitmentSection() {
  const t = await getTranslations("commitment");

  return (
    <section className="commitment" aria-labelledby="commitment-heading">
      <div className="container commitment-layout">
        <div className="commitment-copy">
          <header className="commitment-intro">
            <p className="commitment-eyebrow">{t("eyebrow")}</p>
            <span className="commitment-mark" aria-hidden="true" />
            <h2 className="commitment-title" id="commitment-heading">
              {t("heading")}
            </h2>
            <p className="commitment-lead">{t("intro")}</p>
          </header>
          <ul className="commitment-grid">
            {commitments.map((item) => (
              <li key={item.id} className={`commitment-card commitment-card-${item.id}`}>
                <div className="commitment-icon-plate">
                  <item.Icon className="commitment-icon" />
                </div>
                <div>
                  <h3>{t(`${item.id}.title`)}</h3>
                  <p>{t(`${item.id}.description`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <figure className="commitment-photo">
          <Image
            src="/images/our-commitment/indian-wellness-professional.png"
            alt={t("imageAlt")}
            fill
            sizes="(max-width: 800px) 100vw, 38vw"
          />
        </figure>
      </div>
    </section>
  );
}
