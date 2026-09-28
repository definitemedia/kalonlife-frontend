import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { formatMrp, products } from "@/config/products";
import "./product-catalog.css";

export async function ProductCatalog() {
  const t = await getTranslations("catalog");

  return (
    <ul className="product-grid" aria-label={t("productsLabel")}>
      {products.map((product) => (
        <li key={product.id} className="product-card">
          <div
            className={product.image ? "product-media" : "product-placeholder"}
          >
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1200px) 16rem, (min-width: 960px) 22rem, 45vw"
                className="product-photo"
              />
            ) : (
              <span>{t("imageComingSoon")}</span>
            )}
          </div>
          <div className="product-copy">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-pack">{product.packSize}</p>
            <p className="product-price">{formatMrp(product.mrp)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
