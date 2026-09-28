/**
 * Shop catalog. Drop product photos in public/images/products/.
 * Leave `image` unset until that file is actually in the folder.
 */
export type CatalogProduct = {
  id: string;
  name: string;
  packSize: string;
  /** MRP in Indian rupees. */
  mrp: number;
  /** Public image path. Empty until product photography is added. */
  image?: string;
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
    image: "/images/products/gut-fighter.webp",
  },
  {
    id: "fat-out",
    name: "Fat Out",
    packSize: "60 Tablets",
    mrp: 2100,
    image: "/images/products/fat-out.webp",
  },
  {
    id: "fiber-plus",
    name: "Fiber Plus",
    packSize: "60 Tablets",
    mrp: 1595,
    image: "/images/products/fiber-plus.webp",
  },
  {
    id: "fem-balance",
    name: "Fem Balance",
    packSize: "60 Tablets",
    mrp: 2250,
    image: "/images/products/fem-balance.webp",
  },
  {
    id: "daily-vita-plus-30",
    name: "Daily Vita+",
    packSize: "30 Tablets",
    mrp: 820,
    image: "/images/products/daily-vita.webp",
  },
  {
    id: "daily-vita-plus-60",
    name: "Daily Vita+",
    packSize: "60 Tablets",
    mrp: 1595,
    image: "/images/products/daily-vita.webp",
  },
  {
    id: "joint-flex",
    name: "Joint Flex",
    packSize: "60 Tablets",
    mrp: 2780,
    image: "/images/products/joint-flex.webp",
  },
  {
    id: "liver-shield",
    name: "Liver Shield",
    packSize: "60 Tablets",
    mrp: 3150,
    image: "/images/products/liver-shield.webp",
  },
  {
    id: "male-vitality",
    name: "Male Vitality",
    packSize: "60 Tablets",
    mrp: 3695,
    image: "/images/products/male-vitality.webp",
  },
  {
    id: "heart-harmony",
    name: "Heart Harmony",
    packSize: "30 Tablets",
    mrp: 2260,
    image: "/images/products/heart-harmony.webp",
  },
  {
    id: "grow-well-junior",
    name: "Grow Well Junior",
    packSize: "400 g",
    mrp: 2920,
    image: "/images/products/grow-well-junior.webp",
  },
  {
    id: "protnergy-vanilla",
    name: "Protnergy (Vanilla Flavour)",
    packSize: "600 g (20 Sachets)",
    mrp: 4290,
    image: "/images/products/protnergy-vanilla.webp",
  },
  {
    id: "protnergy-strawberry",
    name: "Protnergy (Strawberry Flavour)",
    packSize: "600 g (20 Sachets)",
    mrp: 4290,
    image: "/images/products/protnergy-vanilla.webp",
  },
];
