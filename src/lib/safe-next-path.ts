import { routeCatalog } from "@/config/routes";
import { routing } from "@/i18n/routing";

const localePrefixes = new Set<string>(routing.locales);

function matchesCatalog(path: string) {
  return routeCatalog.some((route) => {
    if (route.path === path) return true;
    if (!route.path.includes("[")) return false;
    const pattern = new RegExp(`^${route.path.replace(/\[[^\]]+\]/g, "[^/]+")}$`);
    return pattern.test(path);
  });
}

/**
 * Safe in-app path without a locale prefix.
 * Returns null when the value is unsafe or does not match a known route.
 */
export function safeNextPath(value: string | string[] | undefined): string | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || raw.length > 400) return null;

  let path = raw;
  try {
    path = decodeURIComponent(raw);
  } catch {
    return null;
  }

  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("/\\")) return null;
  if (path.includes("\\") || path.includes("://") || path.includes("?") || path.includes("#")) {
    return null;
  }
  if (path.includes("..")) return null;

  const normalized = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  const [first] = normalized.split("/").filter(Boolean);
  if (first && localePrefixes.has(first)) return null;
  if (!matchesCatalog(normalized)) return null;

  return normalized;
}
