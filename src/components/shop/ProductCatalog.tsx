"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  flavourOf,
  formatMrp,
  formatRupee,
  priceBands,
  productInPriceBand,
  products,
  shopCategoryCounts,
  shopCategoryOrder,
  shopFlavourOptions,
  shopPackSizeOptions,
  type PriceBand,
  type ShopCategoryId,
} from "@/config/products";
import { useIsMobile, useOverlay } from "@/lib/overlay";
import "./product-catalog.css";

type FilterOption = {
  id: string;
  label: string;
};

type FilterGroupId = "flavour" | "mrp" | "size";

function FilterSlidersIcon() {
  return (
    <svg
      className="shop-filter-pill-icon"
      viewBox="0 0 20 20"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.25 6.25h13.5M3.25 13.75h13.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle
        cx="7.25"
        cy="6.25"
        r="2.05"
        fill="var(--kl-white)"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="12.75"
        cy="13.75"
        r="2.05"
        fill="var(--kl-white)"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={open ? "shop-filter-chevron is-open" : "shop-filter-chevron"}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.25 6.1 8 10.85 12.75 6.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FilterGroup({
  headingId,
  heading,
  anyLabel,
  value,
  options,
  expanded,
  onToggle,
  onChange,
}: {
  headingId: string;
  heading: string;
  anyLabel: string;
  value: string | null;
  options: FilterOption[];
  expanded: boolean;
  onToggle: () => void;
  onChange: (next: string | null) => void;
}) {
  const panelId = `${headingId}-options`;

  return (
    <div className="shop-filter">
      <button
        type="button"
        className="shop-filter-toggle"
        id={headingId}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="shop-filter-toggle-label">{heading}</span>
        <ChevronIcon open={expanded} />
      </button>
      <div
        id={panelId}
        className="shop-filter-options"
        role="group"
        aria-labelledby={headingId}
        hidden={!expanded}
      >
        <button
          type="button"
          className="shop-filter-option"
          aria-pressed={value === null}
          onClick={() => onChange(null)}
        >
          {anyLabel}
        </button>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="shop-filter-option"
            aria-pressed={value === option.id}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const categoryFallback: Record<ShopCategoryId, string> = {
  all: "All Products",
  accessories: "Accessories",
  antiAging: "Anti-Aging & Longevity",
  boneHealth: "Bone Health",
  heartDiabetes: "Heart & Diabetes Care",
  kidsNutrition: "Kids\u2019 Nutrition & Growth Support",
  mealReplacements: "Meal Replacements & Functional Nutrition",
  mensHealth: "Men\u2019s Health & Performance",
  sportsNutrition: "Sports Nutrition & Performance",
  weightManagement: "Weight Management & Metabolism Boosters",
  womensHealth: "Women\u2019s Health & Wellness",
  personalCare: "Personal Care",
};

function categoryLabel(
  id: ShopCategoryId,
  categories: ReturnType<typeof useTranslations>,
): string {
  if (!categories.has(id)) return categoryFallback[id];
  const label = categories(id);
  if (!label || label === id || label.startsWith("shopCategories.")) {
    return categoryFallback[id];
  }
  return label;
}

function CategoryGroup({
  headingId,
  heading,
  expanded,
  onToggle,
  selected,
  onSelect,
  labelFor,
}: {
  headingId: string;
  heading: string;
  expanded: boolean;
  onToggle: () => void;
  selected: ShopCategoryId;
  onSelect: (id: ShopCategoryId) => void;
  labelFor: (id: ShopCategoryId) => string;
}) {
  const panelId = `${headingId}-options`;

  return (
    <div className="shop-filter shop-categories">
      <button
        type="button"
        className="shop-filter-toggle"
        id={headingId}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="shop-filter-toggle-label">{heading}</span>
        <ChevronIcon open={expanded} />
      </button>
      <div
        id={panelId}
        className="shop-filter-options"
        role="group"
        aria-labelledby={headingId}
        hidden={!expanded}
      >
        <ul className="shop-category-list">
          {shopCategoryOrder.map((id) => {
            const count = id === "all" ? products.length : shopCategoryCounts[id];

            return (
              <li key={id}>
                <button
                  type="button"
                  className="shop-category"
                  aria-pressed={selected === id}
                  onClick={() => onSelect(id)}
                >
                  <span className="shop-category-name">{labelFor(id)}</span>
                  <span className="shop-category-count">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function priceBandLabel(
  band: PriceBand,
  filters: ReturnType<typeof useTranslations>,
): string {
  if (band.min == null && band.max != null) {
    return filters("priceUnder", { amount: formatRupee(band.max) });
  }

  if (band.min != null && band.max != null) {
    return filters("priceBetween", {
      min: formatRupee(band.min),
      max: formatRupee(band.max),
    });
  }

  return filters("priceAbove", { amount: formatRupee(band.min ?? 0) });
}

export function ProductCatalog() {
  const catalog = useTranslations("catalog");
  const categories = useTranslations("shopCategories");
  const filters = useTranslations("shopFilters");
  const [selected, setSelected] = useState<ShopCategoryId>("all");
  const [flavour, setFlavour] = useState<string | null>(null);
  const [packSize, setPackSize] = useState<string | null>(null);
  const [priceBandId, setPriceBandId] = useState<PriceBand["id"] | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<FilterGroupId, boolean>>({
    flavour: false,
    mrp: false,
    size: false,
  });
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const mobile = useIsMobile();
  const sheetRef = useRef<HTMLDivElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const wasSheetOpen = useRef(false);
  useOverlay(sheetOpen, closeSheet, sheetRef);

  useEffect(() => {
    if (!mobile) setSheetOpen(false);
  }, [mobile]);

  useEffect(() => {
    if (wasSheetOpen.current && !sheetOpen) {
      launchRef.current?.focus();
    }
    wasSheetOpen.current = sheetOpen;
  }, [sheetOpen]);

  function toggleGroup(id: FilterGroupId) {
    setOpenGroups((current) => ({ ...current, [id]: !current[id] }));
  }

  const flavourOptions: FilterOption[] = shopFlavourOptions.map((name) => ({
    id: name,
    label: filters.has(`flavours.${name}`) ? filters(`flavours.${name}`) : name,
  }));

  const packOptions: FilterOption[] = shopPackSizeOptions.map((size) => ({
    id: size,
    label: size,
  }));

  const priceOptions: FilterOption[] = priceBands.map((band) => ({
    id: band.id,
    label: priceBandLabel(band, filters),
  }));

  const visible = products.filter((product) => {
    if (selected !== "all" && product.category !== selected) return false;
    if (flavour && flavourOf(product) !== flavour) return false;
    if (packSize && product.packSize !== packSize) return false;

    if (priceBandId) {
      const band = priceBands.find((item) => item.id === priceBandId);
      if (band && !productInPriceBand(product.mrp, band)) return false;
    }

    return true;
  });

  return (
    <div className="shop-layout">
      <button
        ref={launchRef}
        type="button"
        className="shop-filter-launch"
        aria-expanded={sheetOpen}
        aria-controls="shop-filters-sheet"
        onClick={() => setSheetOpen(true)}
      >
        <FilterSlidersIcon />
        <span>{filters("filter")}</span>
      </button>
      <button
        type="button"
        className="shop-sheet-backdrop"
        data-open={sheetOpen ? "true" : "false"}
        tabIndex={-1}
        aria-hidden="true"
        onClick={closeSheet}
      />
      <div
        ref={sheetRef}
        id="shop-filters-sheet"
        className="shop-sidebar"
        data-open={sheetOpen ? "true" : "false"}
        role={sheetOpen ? "dialog" : undefined}
        aria-modal={sheetOpen ? true : undefined}
        aria-label={filters("filter")}
        inert={mobile && !sheetOpen ? true : undefined}
      >
        <div className="shop-filters">
          <div className="shop-sheet-bar">
            <p className="shop-filter-pill">
              <FilterSlidersIcon />
              <span>{filters("filter")}</span>
            </p>
            <button type="button" className="shop-sheet-close" onClick={closeSheet}>
              {filters("close")}
            </button>
          </div>
          <FilterGroup
            headingId="shop-filter-flavour"
            heading={filters("flavour")}
            anyLabel={filters("any")}
            value={flavour}
            options={flavourOptions}
            expanded={openGroups.flavour}
            onToggle={() => toggleGroup("flavour")}
            onChange={setFlavour}
          />
          <FilterGroup
            headingId="shop-filter-mrp"
            heading={filters("mrp")}
            anyLabel={filters("any")}
            value={priceBandId}
            options={priceOptions}
            expanded={openGroups.mrp}
            onToggle={() => toggleGroup("mrp")}
            onChange={(next) => setPriceBandId(next as PriceBand["id"] | null)}
          />
          <FilterGroup
            headingId="shop-filter-size"
            heading={filters("size")}
            anyLabel={filters("any")}
            value={packSize}
            options={packOptions}
            expanded={openGroups.size}
            onToggle={() => toggleGroup("size")}
            onChange={setPackSize}
          />
          <CategoryGroup
            headingId="shop-categories"
            heading={
              categories.has("label") &&
              !categories("label").startsWith("shopCategories.")
                ? categories("label")
                : "Product Categories"
            }
            expanded={categoriesOpen}
            onToggle={() => setCategoriesOpen((open) => !open)}
            selected={selected}
            onSelect={setSelected}
            labelFor={(id) => categoryLabel(id, categories)}
          />
        </div>
      </div>

      <div className="shop-products">
        {visible.length === 0 ? (
          <p className="shop-empty">{categories("empty")}</p>
        ) : (
          <ul className="product-grid" aria-label={catalog("productsLabel")}>
            {visible.map((product) => (
              <li key={product.id} className="product-card">
                <div
                  className={
                    product.image ? "product-media" : "product-placeholder"
                  }
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
                    <span>{catalog("imageComingSoon")}</span>
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
        )}
      </div>
    </div>
  );
}
