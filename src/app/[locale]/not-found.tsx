import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="container page-shell">
      <h1>{t("title")}</h1>
    </div>
  );
}
