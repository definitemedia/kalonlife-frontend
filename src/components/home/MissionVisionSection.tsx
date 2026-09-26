import { getTranslations } from "next-intl/server";
import { MissionIcon } from "@/components/icons/MissionIcon";
import { VisionIcon } from "@/components/icons/VisionIcon";
import "./mission-vision.css";

export async function MissionVisionSection() {
  const t = await getTranslations("purpose");

  return (
    <section className="purpose" aria-labelledby="purpose-heading">
      <div className="container">
        <header className="purpose-intro">
          <p className="purpose-eyebrow">{t("eyebrow")}</p>
          <h2 className="purpose-title" id="purpose-heading">
            {t("heading")}
          </h2>
        </header>
        <div className="purpose-grid">
          <article className="purpose-card purpose-card-mission">
            <div className="purpose-icon-plate">
              <MissionIcon className="purpose-icon" />
            </div>
            <h3>{t("missionTitle")}</h3>
            <p>{t("mission")}</p>
          </article>
          <article className="purpose-card purpose-card-vision">
            <div className="purpose-icon-plate">
              <VisionIcon className="purpose-icon" />
            </div>
            <h3>{t("visionTitle")}</h3>
            <p>{t("vision")}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
