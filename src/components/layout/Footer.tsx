import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { footerLegal } from "@/config/footer-legal";
import { footerCompanyLinks, footerQuickLinks } from "@/config/navigation";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export async function Footer() {
  const t = await getTranslations("footer");

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
          <LocaleSwitcher />
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
          <p className="footer-contact-line">
            <MapPinIcon />
            <span>
              {site.address.street}, {site.address.locality}, {site.address.region}{" "}
              – {site.address.postalCode}.
            </span>
          </p>
          <p className="footer-contact-line">
            <EnvelopeIcon />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p className="footer-contact-line">
            <PhoneIcon />
            <a href={site.phoneHref}>{site.phone}</a>
          </p>
        </div>
      </div>
      <div className="footer-legal">
        <div className="container footer-legal-inner">
          <nav className="footer-legal-nav" aria-label={t("legal.navLabel")}>
            <ul className="footer-legal-links">
              {footerLegal.links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{t(`legal.${item.label}`)}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="footer-legal-copy">{t("legal.copyright")}</p>
          <p className="footer-legal-license">
            {t("legal.fssai", { license: footerLegal.fssaiLicenseNumber })}
          </p>
          <p className="footer-legal-note">{t("legal.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}

function MapPinIcon() {
  return (
    <svg
      className="footer-contact-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 21.15s-6.15-5.15-6.15-10.3a6.15 6.15 0 0 1 12.3 0c0 5.15-6.15 10.3-6.15 10.3z" />
      <circle cx="12" cy="10.85" r="2.05" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg
      className="footer-contact-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3.5" y="5.25" width="17" height="13.5" rx="1.75" />
      <path d="m4.3 7.2 7.7 5.65L19.7 7.2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      className="footer-contact-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8.15 4.2h1.85c.52 0 .96.38 1.04.9l.32 2.05a1.05 1.05 0 0 1-.6 1.12l-1.28.52a10.2 10.2 0 0 0 5.03 5.03l.52-1.28a1.05 1.05 0 0 1 1.12-.6l2.05.32c.52.08.9.52.9 1.04v1.85c0 .62-.47 1.14-1.08 1.2A13.85 13.85 0 0 1 6.95 5.28c.06-.61.58-1.08 1.2-1.08z" />
    </svg>
  );
}
