/**
 * Shop catalog. Drop product photos in public/images/products/.
 * Leave `image` unset until that file is actually in the folder.
 */

/** Sidebar order. `all` shows the full catalog. */
export const shopCategoryOrder = [
  "all",
  "accessories",
  "antiAging",
  "boneHealth",
  "heartDiabetes",
  "kidsNutrition",
  "mealReplacements",
  "mensHealth",
  "sportsNutrition",
  "weightManagement",
  "womensHealth",
  "personalCare",
] as const;

export type ShopCategoryId = (typeof shopCategoryOrder)[number];

export type ProductCategoryId = Exclude<ShopCategoryId, "all">;

/**
 * Counts shown in the category sidebar. These are display labels.
 * All Products uses the live catalog length instead.
 */
export const shopCategoryCounts: Record<ProductCategoryId, number> = {
  accessories: 1,
  antiAging: 3,
  boneHealth: 1,
  heartDiabetes: 5,
  kidsNutrition: 1,
  mealReplacements: 4,
  mensHealth: 2,
  sportsNutrition: 4,
  weightManagement: 5,
  womensHealth: 3,
  personalCare: 1,
};

export type CatalogProduct = {
  id: string;
  name: string;
  packSize: string;
  /** MRP in Indian rupees. */
  mrp: number;
  /** Public image path. Empty until product photography is added. */
  image?: string;
  /** Set only when the product name clearly belongs in that category. */
  category?: ProductCategoryId;
};

const inrAmount = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatMrp(amountInRupees: number): string {
  return `₹${inrAmount.format(amountInRupees)}`;
}

export const products: CatalogProduct[] = [
  {
    id: "gut-fighter",
    name: "Gut Fighter",
    packSize: "45 Tablets",
    mrp: 2415,
  },
  {
    id: "fat-out",
    name: "Fat Out",
    packSize: "60 Tablets",
    mrp: 2100,
    category: "weightManagement",
  },
  {
    id: "fiber-plus",
    name: "Fiber Plus",
    packSize: "60 Tablets",
    mrp: 1595,
  },
  {
    id: "fem-balance",
    name: "Fem Balance",
    packSize: "60 Tablets",
    mrp: 2250,
    category: "womensHealth",
  },
  {
    id: "daily-vita-plus-30",
    name: "Daily Vita+",
    packSize: "30 Tablets",
    mrp: 820,
  },
  {
    id: "daily-vita-plus-60",
    name: "Daily Vita+",
    packSize: "60 Tablets",
    mrp: 1595,
  },
  {
    id: "joint-flex",
    name: "Joint Flex",
    packSize: "60 Tablets",
    mrp: 2780,
    category: "boneHealth",
  },
  {
    id: "liver-shield",
    name: "Liver Shield",
    packSize: "60 Tablets",
    mrp: 3150,
  },
  {
    id: "male-vitality",
    name: "Male Vitality",
    packSize: "60 Tablets",
    mrp: 3695,
    category: "mensHealth",
  },
  {
    id: "heart-harmony",
    name: "Heart Harmony",
    packSize: "30 Tablets",
    mrp: 2260,
    category: "heartDiabetes",
  },
  {
    id: "grow-well-junior",
    name: "Grow Well Junior",
    packSize: "400 g",
    mrp: 2920,
    category: "kidsNutrition",
  },
  {
    id: "protnergy-vanilla",
    name: "Protnergy (Vanilla Flavour)",
    packSize: "600 g (20 Sachets)",
    mrp: 4290,
    category: "mealReplacements",
  },
  {
    id: "protnergy-strawberry",
    name: "Protnergy (Strawberry Flavour)",
    packSize: "600 g (20 Sachets)",
    mrp: 4290,
    category: "mealReplacements",
  },
];

/** "Protnergy (Vanilla Flavour)" → "Vanilla". Names without a flavour stay null. */
const flavourInName = /\(([^)]+?)\s+Flavour\)/i;

export function flavourOf(product: CatalogProduct): string | null {
  const match = product.name.match(flavourInName);
  const flavour = match?.[1]?.trim();
  return flavour ? flavour : null;
}

function uniqueInOrder(values: string[]): string[] {
  const seen = new Set<string>();
  const options: string[] = [];

  for (const value of values) {
    if (seen.has(value)) continue;
    seen.add(value);
    options.push(value);
  }

  return options;
}

/** Flavour names that actually appear in product titles, in catalog order. */
export const shopFlavourOptions: string[] = uniqueInOrder(
  products.flatMap((product) => {
    const flavour = flavourOf(product);
    return flavour ? [flavour] : [];
  }),
);

function packSizeRank(packSize: string): number {
  const tablets = /^(\d+)\s+Tablets$/i.exec(packSize);
  if (tablets) return Number(tablets[1]);

  const grams = /^(\d+)\s*g\b/i.exec(packSize);
  if (grams) return 10_000 + Number(grams[1]);

  return 100_000;
}

/** Distinct pack-size strings, tablets first by count, then weights by grams. */
export const shopPackSizeOptions: string[] = uniqueInOrder(
  products.map((product) => product.packSize),
).sort((a, b) => packSizeRank(a) - packSizeRank(b) || a.localeCompare(b));

/**
 * Inclusive lower bound, exclusive upper bound.
 * Null means that side is open. Bands cover every current MRP without overlap.
 */
export type PriceBand = {
  id: "under-1000" | "1000-2000" | "2000-3000" | "3000-up";
  min: number | null;
  max: number | null;
};

export const priceBands: PriceBand[] = [
  { id: "under-1000", min: null, max: 1000 },
  { id: "1000-2000", min: 1000, max: 2000 },
  { id: "2000-3000", min: 2000, max: 3000 },
  { id: "3000-up", min: 3000, max: null },
];

export function productInPriceBand(mrp: number, band: PriceBand): boolean {
  if (band.min != null && mrp < band.min) return false;
  if (band.max != null && mrp >= band.max) return false;
  return true;
}

const inrWhole = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

/** Whole-rupee labels for filter bands, same ₹ and en-IN grouping as card prices. */
export function formatRupee(amountInRupees: number): string {
  return `₹${inrWhole.format(amountInRupees)}`;
}
