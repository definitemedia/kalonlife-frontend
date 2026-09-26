import { getTranslations } from "next-intl/server";
import { OfferCarousel, type OfferItem } from "@/components/home/OfferCarousel";
import "./products-services.css";

const services = [
  { id: "supplements", icon: "pill", src: "/images/offers/supplements.png" },
  { id: "meal", icon: "glass", src: "/images/offers/meal.png" },
  { id: "herbal", icon: "sprout", src: "/images/offers/herbal.png" },
  { id: "care", icon: "sparkles", src: "/images/offers/care.png" },
  { id: "programs", icon: "activity", src: "/images/offers/programs.png" },
  { id: "guidance", icon: "apple", src: "/images/offers/guidance.png" },
] as const;

export async function ProductsServicesSection() {
  const t = await getTranslations("offers");
  const items: OfferItem[] = services.map((service) => ({
    id: service.id,
    icon: service.icon,
    src: service.src,
    title: t(`${service.id}.title`),
    description: t(`${service.id}.description`),
    imageAlt: t(`${service.id}.imageAlt`),
  }));

  return (
    <section className="offers" aria-labelledby="offers-heading">
      <div className="container offer-layout">
        <header className="offer-intro">
          <p className="offer-eyebrow">{t("eyebrow")}</p>
          <span className="offer-mark" aria-hidden="true" />
          <h2 className="offer-title" id="offers-heading">
            {t("heading")}
          </h2>
          <p className="offer-lead">{t("intro")}</p>
        </header>
        <OfferCarousel
          items={items}
          carouselLabel={t("carousel")}
          previousLabel={t("previous")}
          nextLabel={t("next")}
        />
      </div>
    </section>
  );
}
