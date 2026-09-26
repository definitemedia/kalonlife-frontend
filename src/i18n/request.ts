import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { routing } from "./routing";

type MessageTree = { [key: string]: string | MessageTree };

function mergeMessages(base: MessageTree, overlay: MessageTree): MessageTree {
  const merged: MessageTree = { ...base };

  for (const [key, value] of Object.entries(overlay)) {
    const current = merged[key];
    if (
      value &&
      typeof value === "object" &&
      current &&
      typeof current === "object"
    ) {
      merged[key] = mergeMessages(current, value);
    } else {
      merged[key] = value;
    }
  }

  return merged;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      notFound();
    }
  }

  const messages = (await import(`../../messages/${locale}.json`)).default as MessageTree;
  const fallback =
    locale === routing.defaultLocale
      ? messages
      : mergeMessages(
          (await import("../../messages/en.json")).default as MessageTree,
          messages,
        );

  return {
    locale,
    messages: fallback,
    onError(error) {
      if (error.code === "MISSING_MESSAGE") return;
      console.error(error);
    },
    getMessageFallback({ namespace, key }) {
      return namespace ? `${namespace}.${key}` : key;
    },
  };
});
