"use client";

import { Suspense, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

type HeaderSearchProps = {
  id: string;
  className: string;
  onSubmitted?: () => void;
};

export function HeaderSearch({ id, className, onSubmitted }: HeaderSearchProps) {
  const t = useTranslations("mobileShop");
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const field = event.currentTarget.elements.namedItem("q") as HTMLInputElement | null;
    const query = field?.value.trim() ?? "";
    field?.blur();
    onSubmitted?.();
    router.push(query ? { pathname: "/shop", query: { q: query } } : "/shop");
  }

  return (
    <form className={`header-search ${className}`} role="search" onSubmit={onSubmit}>
      <label htmlFor={id} className="visually-hidden">
        {t("searchLabel")}
      </label>
      <Suspense fallback={<SearchInput id={id} placeholder={t("searchPlaceholder")} />}>
        <SyncedSearchInput id={id} placeholder={t("searchPlaceholder")} />
      </Suspense>
      <button type="submit" className="header-search-submit" aria-label={t("searchSubmit")}>
        <SearchIcon />
      </button>
    </form>
  );
}

function SearchInput({
  id,
  placeholder,
  value = "",
}: {
  id: string;
  placeholder: string;
  value?: string;
}) {
  return (
    <input
      id={id}
      name="q"
      type="search"
      className="header-search-input"
      placeholder={placeholder}
      defaultValue={value}
      enterKeyHint="search"
      autoComplete="off"
    />
  );
}

function SyncedSearchInput({ id, placeholder }: { id: string; placeholder: string }) {
  const pathname = usePathname();
  const query = useSearchParams().get("q") ?? "";
  const value = pathname === "/shop" ? query : "";
  return <SearchInput key={`${pathname}?${value}`} id={id} placeholder={placeholder} value={value} />;
}

function SearchIcon() {
  return (
    <svg
      className="header-search-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10.75" cy="10.75" r="6" />
      <path d="m15.25 15.25 4.5 4.5" />
    </svg>
  );
}
