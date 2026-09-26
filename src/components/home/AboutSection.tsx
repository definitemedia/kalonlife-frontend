import Image from "next/image";
import { getTranslations } from "next-intl/server";
import "./about-section.css";

const photos = [
  { id: "stretch", src: "/about/stretch.png", frame: "about-stretch" },
  { id: "family", src: "/about/family.png", frame: "about-family" },
  { id: "nutrition", src: "/about/nutrition.png", frame: "about-nutrition" },
  {
    id: "conversation",
    src: "/about/conversation.png",
    frame: "about-conversation",
  },
  { id: "walk", src: "/about/walk.png", frame: "about-walk" },
] as const;

export async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <section className="about" aria-labelledby="about-heading">
      <div className="container about-layout">
        <div className="about-copy">
          <p className="about-eyebrow">{t("eyebrow")}</p>
          <span className="about-mark" aria-hidden="true" />
          <h2 className="about-title" id="about-heading">
            {t("heading")}
          </h2>
          <p>{t("lead")}</p>
          <p>{t("belief")}</p>
        </div>
        <div className="about-collage">
          {photos.map((photo) => (
            <figure key={photo.id} className={`about-frame ${photo.frame}`}>
              <Image
                src={photo.src}
                alt={t(`images.${photo.id}`)}
                fill
                sizes="(max-width: 900px) 50vw, 36vw"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
