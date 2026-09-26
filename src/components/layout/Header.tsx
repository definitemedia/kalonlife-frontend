"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { companyLinks, headerLinks } from "@/config/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const companyActive = companyLinks.some((item) => item.href === pathname);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {t("skip")}
      </a>
      <div className="container header-bar">
        <Link href="/" className="brand" aria-label="Kalonlife" onClick={close}>
          <Image
            src="/brand/kalonlife-logo.png"
            alt="Kalonlife"
            width={180}
            height={60}
            priority
            className="brand-logo"
          />
        </Link>
        <nav
          id="site-nav"
          className="site-nav"
          data-open={open}
          aria-label={t("primary")}
        >
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            onClick={close}
          >
            {t("home")}
          </Link>
          <Link
            href="/shop"
            aria-current={pathname === "/shop" ? "page" : undefined}
            onClick={close}
          >
            {t("shop")}
          </Link>
          <details className="nav-group">
            <summary aria-current={companyActive ? "page" : undefined}>
              {t("company")}
            </summary>
            <div className="nav-group-panel">
              {companyLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={close}
                >
                  {t(item.label)}
                </Link>
              ))}
            </div>
          </details>
          {headerLinks
            .filter((item) => item.href !== "/" && item.href !== "/shop")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={close}
              >
                {t(item.label)}
              </Link>
            ))}
        </nav>
        <div className="header-tools">
          <LocaleSwitcher />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t("closeMenu") : t("openMenu")}
          </button>
        </div>
      </div>
    </header>
  );
}
