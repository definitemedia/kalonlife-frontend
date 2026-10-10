"use client";

import { useSearchParams } from "next/navigation";
import { ProductCatalog } from "./ProductCatalog";

export function ShopCatalog() {
  const query = useSearchParams().get("q") ?? "";
  return <ProductCatalog query={query} />;
}
