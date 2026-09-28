"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const tabs = [
  { href: "/", key: "home", match: (path: string) => path === "/" },
  {
    href: "/shop",
    key: "products",
    match: (path: string) => path === "/shop" || path.startsWith("/product"),
  },
  {
    href: "/consult-dietician",
    key: "consult",
    match: (path: string) => path.startsWith("/consult-dietician"),
  },
  {
    href: "/articles",
    key: "articles",
    match: (path: string) => path === "/articles" || path.startsWith("/articles/"),
  },
  {
    href: "/login",
    key: "account",
    match: (path: string) => path === "/login",
  },
] as const;

export function MobileTabBar() {
  const t = useTranslations("nav");
  const footer = useTranslations("footer");
  const pathname = usePathname();

  const labelFor = (key: (typeof tabs)[number]["key"]) => {
    if (key === "products") return footer("products");
    if (key === "consult") return t("consultShort");
    if (key === "account") return t("account");
    return t(key);
  };

  return (
    <nav className="mobile-tabbar" aria-label={t("primary")}>
      {tabs.map((tab) => {
        const active = tab.match(pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="mobile-tab"
            aria-current={active ? "page" : undefined}
          >
            <TabIcon name={tab.key} />
            <span className="mobile-tab-label">{labelFor(tab.key)}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function TabIcon({ name }: { name: (typeof tabs)[number]["key"] }) {
  const common = {
    className: "mobile-tab-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };

  if (name === "home") {
    return (
      <svg {...common}>
        <path d="M4.5 10.5 12 4.25l7.5 6.25V19a1.25 1.25 0 0 1-1.25 1.25h-4.1v-4.6h-4.3v4.6H5.75A1.25 1.25 0 0 1 4.5 19v-8.5Z" />
      </svg>
    );
  }

  if (name === "products") {
    return (
      <svg {...common}>
        <path d="M6.75 8.25h10.5l-.85 10.15a1.25 1.25 0 0 1-1.24 1.15H8.84a1.25 1.25 0 0 1-1.24-1.15L6.75 8.25Z" />
        <path d="M9 8.25V7a3 3 0 0 1 6 0v1.25" />
      </svg>
    );
  }

  if (name === "consult") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3" />
        <path d="M6.25 18.75v-.2a4.15 4.15 0 0 1 4.15-4.15h3.2a4.15 4.15 0 0 1 4.15 4.15v.2" />
        <path d="M17.25 8.25h2.5M18.5 7v2.5" />
      </svg>
    );
  }

  if (name === "articles") {
    return (
      <svg {...common}>
        <path d="M7 4.75h7.2L19 9.4V19.25a1.25 1.25 0 0 1-1.25 1.25H7A1.25 1.25 0 0 1 5.75 19.25V6A1.25 1.25 0 0 1 7 4.75Z" />
        <path d="M14 4.85V9.2h4.35M8.5 13h7M8.5 16.25h5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.75 19.25v-.35a4.4 4.4 0 0 1 4.4-4.4h3.7a4.4 4.4 0 0 1 4.4 4.4v.35" />
    </svg>
  );
}
