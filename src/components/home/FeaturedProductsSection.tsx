import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "./featured-products.css";

/**
 * No category routes exist for these product groups.
 * Placeholder hrefs stay on the existing shop page:
 * /shop?goal=wellness-supplements
 * /shop?goal=protein-nutrition
 * /shop?goal=millets-seeds-foods
 * /shop?goal=personal-care
 */
const products = [
  {
    id: "supplements",
    variant: "tall",
    href: "/shop?goal=wellness-supplements",
    src: "/images/featured-products/wellness-supplements.png",
  },
  {
    id: "protein",
    variant: "overlay",
    href: "/shop?goal=protein-nutrition",
    src: "/images/featured-products/protein-nutrition.png",
  },
  {
    id: "foods",
    variant: "aside",
    href: "/shop?goal=millets-seeds-foods",
    src: "/images/featured-products/millets-seeds-foods.png",
  },
  {
    id: "care",
    variant: "split",
    href: "/shop?goal=personal-care",
    src: "/images/featured-products/personal-care.png",
  },
] as const;

export async function FeaturedProductsSection() {
  const t = await getTranslations("featured");

  return (
    <section className="featured" aria-labelledby="featured-heading">
      <div className="container featured-layout">
        <header className="featured-header">
          <p className="featured-eyebrow">{t("eyebrow")}</p>
          <h2 className="featured-title" id="featured-heading">
            {t("heading")}
          </h2>
          <p className="featured-lead">{t("description")}</p>
        </header>
        <ul className="featured-bento">
          {products.map((product) => (
            <li key={product.id} className={`featured-cell featured-cell-${product.id}`}>
              <Link className={`featured-card featured-card-${product.variant}`} href={product.href}>
                {product.variant === "tall" ? (
                  <>
                    <span className="featured-tall-media">
                      <Image
                        className="featured-photo"
                        src={product.src}
                        alt={t(`${product.id}.imageAlt`)}
                        fill
                        sizes="(max-width: 1024px) 46vw, 30vw"
                      />
                    </span>
                    <span className="featured-tall-body">
                      <h3 className="featured-card-title">{t(`${product.id}.title`)}</h3>
                      <p className="featured-card-text">{t(`${product.id}.description`)}</p>
                      <ExploreControl label={t("explore")} />
                    </span>
                  </>
                ) : null}

                {product.variant === "overlay" ? (
                  <>
                    <span className="featured-overlay-media">
                      <Image
                        className="featured-photo featured-photo-protein"
                        src={product.src}
                        alt={t(`${product.id}.imageAlt`)}
                        fill
                        sizes="(max-width: 1024px) 46vw, 42vw"
                      />
                    </span>
                    <span className="featured-overlay-copy">
                      <h3 className="featured-card-title">{t(`${product.id}.title`)}</h3>
                      <p className="featured-card-text">{t(`${product.id}.description`)}</p>
                      <ExploreControl label={t("explore")} />
                    </span>
                  </>
                ) : null}

                {product.variant === "aside" ? (
                  <>
                    <span className="featured-aside-copy">
                      <h3 className="featured-card-title">{t(`${product.id}.title`)}</h3>
                      <p className="featured-card-text">{t(`${product.id}.description`)}</p>
                      <ExploreControl label={t("explore")} />
                    </span>
                    <span className="featured-aside-media">
                      <Image
                        className="featured-photo"
                        src={product.src}
                        alt={t(`${product.id}.imageAlt`)}
                        fill
                        sizes="(max-width: 1024px) 46vw, 22vw"
                      />
                    </span>
                  </>
                ) : null}

                {product.variant === "split" ? (
                  <>
                    <span className="featured-split-copy">
                      <h3 className="featured-card-title">{t(`${product.id}.title`)}</h3>
                      <p className="featured-card-text">{t(`${product.id}.description`)}</p>
                      <ExploreControl label={t("explore")} />
                    </span>
                    <span className="featured-split-media">
                      <Image
                        className="featured-photo featured-photo-care"
                        src={product.src}
                        alt={t(`${product.id}.imageAlt`)}
                        fill
                        sizes="(max-width: 1024px) 46vw, 36vw"
                      />
                    </span>
                  </>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ExploreControl({ label }: { label: string }) {
  return (
    <span className="featured-cta">
      <span className="featured-cta-label">{label}</span>
      <span className="featured-cta-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" focusable="false">
          <path
            d="M3 8h10M9.5 4.5 13 8l-3.5 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );
}
