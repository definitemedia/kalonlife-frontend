import { getTranslations } from "next-intl/server";
import "./certification-strip.css";

const MARKS = [
  "Start up India",
  "MSME",
  "Kosher",
  "US FDA",
  "Organic",
  "Halal",
] as const;

export async function CertificationStrip() {
  const t = await getTranslations("certifications");

  return (
    <section className="cert-strip" aria-labelledby="cert-strip-label">
      <h2 id="cert-strip-label" className="visually-hidden">
        {t("label")}
      </h2>
      <ul className="cert-strip-list">
        {MARKS.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
