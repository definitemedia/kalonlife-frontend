export type BrandId = "kalonlife" | "wellnessHub" | "nutrihub";

export const brandNames: Record<BrandId, string> = {
  kalonlife: "Kalonlife",
  wellnessHub: "Wellness Hub",
  nutrihub: "NutriHub",
};

function within(pathname: string, base: string) {
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function activeBrandFor(pathname: string): BrandId {
  if (within(pathname, "/wellness-hub")) return "wellnessHub";
  if (within(pathname, "/nutrihub")) return "nutrihub";
  return "kalonlife";
}
