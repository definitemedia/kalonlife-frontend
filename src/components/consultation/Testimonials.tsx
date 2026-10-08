import { getTranslations } from "next-intl/server";
import { consultationTestimonials } from "@/config/consultation";

export async function Testimonials() {
  const t = await getTranslations("consultation");

  return (
    <section className="consult-section consult-stories" aria-labelledby="consult-stories-heading">
      <div className="container">
        <p className="consult-eyebrow">{t("testimonials.eyebrow")}</p>
        <h2 id="consult-stories-heading" className="consult-title">
          {t("testimonials.heading")}
        </h2>
        <ul className="consult-story-grid">
          {consultationTestimonials.map((item) => (
            <li key={item.id}>
              <figure className="consult-story">
                <blockquote>
                  <p>{t(`testimonials.items.${item.id}.quote`)}</p>
                </blockquote>
                <figcaption>
                  {t(`testimonials.items.${item.id}.name`)}
                  {" · "}
                  {t(`testimonials.items.${item.id}.city`)}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
