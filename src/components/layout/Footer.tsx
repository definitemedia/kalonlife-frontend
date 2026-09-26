import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { footerCompanyLinks, footerQuickLinks } from "@/config/navigation";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-logo-link" aria-label="Kalonlife">
            <Image
              src="/brand/kalonlife-logo-light.png"
              alt="Kalonlife"
              width={180}
              height={60}
              className="footer-logo"
            />
          </Link>
        </div>
        <nav aria-label={t("company")}>
          <h2>{t("company")}</h2>
          <ul>
            {footerCompanyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{t(item.label)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t("quickLinks")}>
          <h2>{t("quickLinks")}</h2>
          <ul>
            {footerQuickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{t(item.label)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-address">
          <h2>{t("addressHeading")}</h2>
          <p>
            {site.address.street}, {site.address.locality}, {site.address.region}{" "}
            – {site.address.postalCode}.
          </p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>
            <a href={site.phoneHref}>{site.phone}</a>
          </p>
        </div>
      </div>
      <div className="container footer-base">
        <p>
          © {year} {t("rights")}
        </p>
      </div>
    </footer>
  );
}
