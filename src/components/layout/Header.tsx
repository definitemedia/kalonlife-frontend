"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { activeBrandFor, brandNames, type BrandId } from "@/config/brands";
import { companyLinks, headerLinks } from "@/config/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { useIsMobile, useOverlay } from "@/lib/overlay";
import { HeaderSearch } from "./HeaderSearch";

const shopTabs: { brand: BrandId; href: string; label: string }[] = [
  { brand: "kalonlife", href: "/shop", label: "KALONLIFE" },
  { brand: "wellnessHub", href: "/wellness-hub", label: "WELLNESS HUB" },
  { brand: "nutrihub", href: "/nutrihub", label: "NUTRIHUB" },
];

const brandOptions: { brand: BrandId; href: string }[] = [
  { brand: "kalonlife", href: "/" },
  { brand: "wellnessHub", href: "/wellness-hub" },
  { brand: "nutrihub", href: "/nutrihub" },
];

export function Header() {
  const t = useTranslations("nav");
  const footer = useTranslations("footer");
  const shop = useTranslations("mobileShop");
  const brandText = useTranslations("brandSwitch");
  const track = useTranslations("trackOrder");
  const pathname = usePathname();
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);
  const brandTriggerRef = useRef<HTMLButtonElement>(null);
  const brandFocusFirst = useRef(false);
  const drawerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const companyRef = useRef<HTMLDetailsElement>(null);
  const companyTriggerRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);
  const close = useCallback(() => setOpen(false), []);
  const closeCompany = useCallback(() => setCompanyOpen(false), []);
  const closeAll = useCallback(() => {
    setCompanyOpen(false);
    setOpen(false);
  }, []);
  const companyActive = companyLinks.some((item) => item.href === pathname);
  const activeBrand = activeBrandFor(pathname);

  useOverlay(open, close, drawerRef);

  useEffect(() => {
    if (!mobile) setOpen(false);
    setCompanyOpen(false);
    setBrandOpen(false);
  }, [mobile]);

  useEffect(() => {
    setOpen(false);
    setCompanyOpen(false);
    setBrandOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!brandOpen) return;
    if (brandFocusFirst.current) {
      brandFocusFirst.current = false;
      brandRef.current?.querySelector<HTMLElement>(".brand-switch-option")?.focus();
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!brandRef.current?.contains(event.target as Node)) {
        setBrandOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setBrandOpen(false);
        brandTriggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [brandOpen]);

  function toggleBrand() {
    setCompanyOpen(false);
    setBrandOpen((value) => !value);
  }

  function onBrandKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    if (!brandOpen) {
      brandFocusFirst.current = true;
      setCompanyOpen(false);
      setBrandOpen(true);
      return;
    }
    const options = Array.from(
      brandRef.current?.querySelectorAll<HTMLElement>(".brand-switch-option") ?? [],
    );
    const index = options.indexOf(document.activeElement as HTMLElement);
    const step = event.key === "ArrowDown" ? 1 : -1;
    const next = index === -1 ? (step === 1 ? 0 : options.length - 1) : index + step;
    options[(next + options.length) % options.length]?.focus();
  }

  useEffect(() => {
    if (!companyOpen || open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!companyRef.current?.contains(event.target as Node)) {
        setCompanyOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCompanyOpen(false);
        companyTriggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [companyOpen, open]);

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
        <Link href="/" className="brand" aria-label="Kalonlife" onClick={closeAll}>
          <Image
            src="/brand/kalonlife-logo.png"
            alt="Kalonlife"
            width={180}
            height={60}
            priority
            className="brand-logo"
          />
        </Link>
        <div className="brand-switch" ref={brandRef} onKeyDown={onBrandKeyDown}>
          <button
            ref={brandTriggerRef}
            type="button"
            className="brand-switch-trigger"
            aria-haspopup="menu"
            aria-expanded={brandOpen}
            aria-controls="brand-switch-menu"
            onClick={toggleBrand}
          >
            <span className="brand-switch-dot" aria-hidden="true" />
            <span className="visually-hidden">{brandText("label")}: </span>
            <span>{brandNames[activeBrand]}</span>
            <ChevronDownIcon />
          </button>
          <div id="brand-switch-menu" className="brand-switch-panel" hidden={!brandOpen}>
            <ul className="brand-switch-list">
              {brandOptions.map((option) => (
                <li key={option.brand}>
                  <Link
                    href={option.href}
                    className="brand-switch-option"
                    data-active={option.brand === activeBrand ? "true" : undefined}
                    aria-current={pathname === option.href ? "page" : undefined}
                    onClick={() => setBrandOpen(false)}
                  >
                    <span className="brand-switch-name">{brandNames[option.brand]}</span>
                    <span className="brand-switch-desc">{brandText(option.brand)}</span>
                    {option.brand === activeBrand ? <CheckIcon /> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <HeaderSearch id="header-search-desktop" className="desktop-search" onSubmitted={closeAll} />
        <div className="header-tools">
          <Link
            href="/track-order"
            className="header-icon-link header-track-link"
            aria-label={track("label")}
            title={track("label")}
            aria-current={pathname === "/track-order" ? "page" : undefined}
            onClick={closeAll}
          >
            <TruckIcon />
            <span className="visually-hidden">{track("label")}</span>
          </Link>
          <Link
            href="/login"
            className="header-icon-link"
            aria-label={t("login")}
            aria-current={pathname === "/login" ? "page" : undefined}
            onClick={closeAll}
          >
            <LoginIcon />
            <span className="visually-hidden">{t("login")}</span>
          </Link>
          <Link
            href="/cart"
            className="header-icon-link header-cart-link"
            aria-label={t("cart")}
            aria-current={pathname === "/cart" ? "page" : undefined}
            onClick={closeAll}
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
      <div className="header-nav-row">
        <div className="container">
          <nav className="site-nav" aria-label={t("primary")}>
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              onClick={closeCompany}
            >
              {t("home")}
            </Link>
            <Link
              href="/shop"
              aria-current={pathname === "/shop" ? "page" : undefined}
              onClick={closeCompany}
            >
              {t("shop")}
            </Link>
            <details
              ref={companyRef}
              className="nav-group"
              open={companyOpen}
              onToggle={(event) => {
                const next = event.currentTarget.open;
                setCompanyOpen(next);
                if (next) setBrandOpen(false);
              }}
            >
              <summary
                ref={companyTriggerRef}
                aria-haspopup="menu"
                aria-expanded={companyOpen}
                aria-current={companyActive ? "page" : undefined}
              >
                {t("company")}
              </summary>
              <div className="nav-group-panel">
                {companyLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={closeCompany}
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
                  onClick={closeCompany}
                >
                  {t(item.label)}
                </Link>
              ))}
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              onClick={closeCompany}
            >
              {footer("contact")}
            </Link>
          </nav>
        </div>
      </div>
      <div className="mobile-shop">
        <nav className="mobile-shop-tabs" aria-label={shop("categoriesLabel")}>
          <ul className="mobile-shop-tab-list">
            {shopTabs.map((tab) => (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className={
                    tab.brand === activeBrand ? "mobile-shop-tab is-active" : "mobile-shop-tab"
                  }
                  aria-current={pathname === tab.href ? "page" : undefined}
                  onClick={closeAll}
                >
                  <span className="mobile-shop-tab-name">{tab.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-shop-toolbar">
          <HeaderSearch
            id="header-search-mobile"
            className="mobile-shop-search"
            onSubmitted={closeAll}
          />
          <button
            type="button"
            className="mobile-shop-icon"
            aria-disabled="true"
            aria-label={shop("wishlist")}
            aria-describedby="mobile-shop-wishlist-note"
          >
            <HeartIcon />
          </button>
          <span id="mobile-shop-wishlist-note" className="visually-hidden">
            {shop("launchingSoon")}
          </span>
          <Link
            href="/cart"
            className="mobile-shop-icon"
            aria-label={shop("cart")}
            aria-current={pathname === "/cart" ? "page" : undefined}
            onClick={closeAll}
          >
            <CartIcon />
          </Link>
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
          onClick={closeAll}
        >
          {t("home")}
        </Link>
        <Link
          href="/shop"
          aria-current={pathname === "/shop" ? "page" : undefined}
          onClick={closeAll}
        >
          {t("shop")}
        </Link>
        <details
          className="nav-group"
          open={companyOpen}
          onToggle={(event) => setCompanyOpen(event.currentTarget.open)}
        >
          <summary
            aria-expanded={companyOpen}
            aria-current={companyActive ? "page" : undefined}
          >
            {t("company")}
          </summary>
          <div className="nav-group-panel">
            {companyLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={closeAll}
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
              onClick={closeAll}
            >
              {t(item.label)}
            </Link>
          ))}
        <Link
          href="/contact"
          aria-current={pathname === "/contact" ? "page" : undefined}
          onClick={closeAll}
        >
          {footer("contact")}
        </Link>
        <Link
          href="/track-order"
          aria-current={pathname === "/track-order" ? "page" : undefined}
          onClick={closeAll}
        >
          {track("label")}
        </Link>
        <Link
          href="/login"
          aria-current={pathname === "/login" ? "page" : undefined}
          onClick={closeAll}
        >
          {t("login")}
        </Link>
        <Link
          href="/cart"
          aria-current={pathname === "/cart" ? "page" : undefined}
          onClick={closeAll}
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

function TruckIcon() {
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
      <path d="M6 16.75H4.25a1 1 0 0 1-1-1v-8.5a1 1 0 0 1 1-1h9.5a1 1 0 0 1 1 1v9.5H9.5" />
      <path d="M14.75 10h3.1a1 1 0 0 1 .83.45l1.87 2.8a1 1 0 0 1 .2.6v2.9H19" />
      <circle cx="7.75" cy="17" r="1.75" />
      <circle cx="17.25" cy="17" r="1.75" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="brand-switch-chevron"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6.25 8 10.25l4-4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="brand-switch-check"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3.5 8.25 3 3 6-6.5" />
    </svg>
  );
}

function HeartIcon() {
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
      <path d="M12 19.25s-7.25-4.3-7.25-9.6A4.15 4.15 0 0 1 12 7.1a4.15 4.15 0 0 1 7.25 2.55c0 5.3-7.25 9.6-7.25 9.6Z" />
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
