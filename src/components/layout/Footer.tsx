import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { footerLegal } from "@/config/footer-legal";
import { footerCompanyLinks, footerQuickLinks } from "@/config/navigation";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { FooterAccordion } from "./FooterAccordion";
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
          <div className="footer-app">
            <p className="footer-app-heading">
              <span>{t("app.heading")}</span>
              <span className="footer-app-badge">{t("app.launchingSoon")}</span>
            </p>
            <div className="footer-app-stores">
              <span
                className="footer-app-store"
                role="img"
                aria-label={t("app.googlePlayLabel")}
              >
                <GooglePlayIcon />
                <span className="footer-app-store-text" aria-hidden="true">
                  <span className="footer-app-store-kicker">{t("app.comingSoonOn")}</span>
                  <span className="footer-app-store-name">Google Play</span>
                </span>
              </span>
              <span
                className="footer-app-store"
                role="img"
                aria-label={t("app.appStoreLabel")}
              >
                <AppleIcon />
                <span className="footer-app-store-text" aria-hidden="true">
                  <span className="footer-app-store-kicker">{t("app.comingSoonOn")}</span>
                  <span className="footer-app-store-name">App Store</span>
                </span>
              </span>
            </div>
          </div>
          <LocaleSwitcher />
        </div>
        <FooterAccordion title={t("company")}>
          <ul>
            {footerCompanyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{t(item.label)}</Link>
              </li>
            ))}
          </ul>
        </FooterAccordion>
        <FooterAccordion title={t("quickLinks")}>
          <ul>
            {footerQuickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{t(item.label)}</Link>
              </li>
            ))}
          </ul>
        </FooterAccordion>
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

function GooglePlayIcon() {
  return (
    <svg
      className="footer-app-store-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.2 2.4c-.25.26-.4.66-.4 1.18v16.84c0 .52.15.92.4 1.18l.06.06L13.7 12.2v-.4L4.26 2.34z" />
      <path d="m16.85 15.35-3.15-3.15v-.4l3.15-3.15.07.04 3.73 2.12c1.07.6 1.07 1.59 0 2.2l-3.73 2.12z" opacity="0.8" />
      <path d="M16.92 15.31 13.7 12 4.2 21.6c.35.37.93.42 1.58.05l11.14-6.34" opacity="0.65" />
      <path d="M16.92 8.69 5.78 2.35c-.65-.37-1.23-.32-1.58.05L13.7 12z" opacity="0.9" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      className="footer-app-store-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16.37 12.62c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.77-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-2.99-.79-1.54.02-2.96.9-3.75 2.27-1.6 2.78-.41 6.9 1.15 9.15.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.38-.91-2.4-3.67zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.58.67-1.1 1.76-.96 2.8 1.01.08 2.05-.52 2.68-1.28z" />
    </svg>
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
