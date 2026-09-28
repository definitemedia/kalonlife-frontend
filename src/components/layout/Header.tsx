"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { companyLinks, headerLinks } from "@/config/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { useIsMobile, useOverlay } from "@/lib/overlay";

export function Header() {
  const t = useTranslations("nav");
  const footer = useTranslations("footer");
  const pathname = usePathname();
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const close = useCallback(() => setOpen(false), []);
  const closeSoon = useCallback(() => {
    window.setTimeout(() => setOpen(false), 0);
  }, []);
  const companyActive = companyLinks.some((item) => item.href === pathname);

  useOverlay(open, close, drawerRef);

  useEffect(() => {
    if (!mobile) setOpen(false);
  }, [mobile]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (wasOpen.current && !open) {
      menuRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {t("skip")}
      </a>
      <div className="container header-bar">
        <Link href="/" className="brand" aria-label="Kalonlife" onClick={closeSoon}>
          <Image
            src="/brand/kalonlife-logo.png"
            alt="Kalonlife"
            width={180}
            height={60}
            priority
            className="brand-logo"
          />
        </Link>
        <nav className="site-nav" aria-label={t("primary")}>
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
            {t("home")}
          </Link>
          <Link
            href="/shop"
            aria-current={pathname === "/shop" ? "page" : undefined}
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
                >
                  {t(item.label)}
                </Link>
              ))}
            </div>
          </details>
          {headerLinks
            .filter(
              (item) =>
                item.href !== "/" &&
                item.href !== "/shop" &&
                item.href !== "/login" &&
                item.href !== "/cart",
            )
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {t(item.label)}
              </Link>
            ))}
        </nav>
        <div className="header-tools">
          <Link
            href="/login"
            className="header-icon-link"
            aria-label={t("login")}
            aria-current={pathname === "/login" ? "page" : undefined}
            onClick={closeSoon}
          >
            <LoginIcon />
            <span className="visually-hidden">{t("login")}</span>
          </Link>
          <Link
            href="/cart"
            className="header-icon-link"
            aria-label={t("cart")}
            aria-current={pathname === "/cart" ? "page" : undefined}
            onClick={closeSoon}
          >
            <CartIcon />
            <span className="visually-hidden">{t("cart")}</span>
          </Link>
          <button
            ref={menuRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-drawer"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="visually-hidden">
              {open ? t("closeMenu") : t("openMenu")}
            </span>
          </button>
        </div>
      </div>
      <button
        type="button"
        className="nav-backdrop"
        data-open={open ? "true" : "false"}
        tabIndex={open ? 0 : -1}
        aria-label={t("closeMenu")}
        onClick={close}
      />
      <nav
        ref={drawerRef}
        id="site-drawer"
        className="site-drawer"
        data-open={open ? "true" : "false"}
        aria-label={t("primary")}
        aria-modal={open ? true : undefined}
        role="dialog"
        inert={!open ? true : undefined}
      >
        <button type="button" className="drawer-close" onClick={close}>
          <CloseIcon />
          <span>{t("closeMenu")}</span>
        </button>
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          onClick={closeSoon}
        >
          {t("home")}
        </Link>
        <Link
          href="/shop"
          aria-current={pathname === "/shop" ? "page" : undefined}
          onClick={closeSoon}
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
                onClick={closeSoon}
              >
                {t(item.label)}
              </Link>
            ))}
          </div>
        </details>
        {headerLinks
          .filter(
            (item) =>
              item.href !== "/" &&
              item.href !== "/shop" &&
              item.href !== "/login" &&
              item.href !== "/cart",
          )
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={closeSoon}
            >
              {t(item.label)}
            </Link>
          ))}
        <Link
          href="/contact"
          aria-current={pathname === "/contact" ? "page" : undefined}
          onClick={closeSoon}
        >
          {footer("contact")}
        </Link>
        <Link
          href="/login"
          aria-current={pathname === "/login" ? "page" : undefined}
          onClick={closeSoon}
        >
          {t("login")}
        </Link>
        <Link
          href="/cart"
          aria-current={pathname === "/cart" ? "page" : undefined}
          onClick={closeSoon}
        >
          {t("cart")}
        </Link>
      </nav>
    </header>
  );
}

function LoginIcon() {
  return (
    <svg
      className="header-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.75 19.25v-.35a4.4 4.4 0 0 1 4.4-4.4h3.7a4.4 4.4 0 0 1 4.4 4.4v.35" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      className="header-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.75 8.25h10.5l-.85 10.15a1.25 1.25 0 0 1-1.24 1.15H8.84a1.25 1.25 0 0 1-1.24-1.15L6.75 8.25Z" />
      <path d="M9 8.25V7a3 3 0 0 1 6 0v1.25" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      className="header-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 7h15M4.5 12h15M4.5 17h15" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="header-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
    </svg>
  );
}
