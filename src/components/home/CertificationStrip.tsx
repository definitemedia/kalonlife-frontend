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

/** Repeated so each half stays wider than a large viewport and the loop has no gap. */
const COPIES_PER_HALF = 4;

function MarkList({ repeat = false }: { repeat?: boolean }) {
  return (
    <ul
      className={repeat ? "cert-strip-list cert-strip-list--repeat" : "cert-strip-list"}
      aria-hidden={repeat ? true : undefined}
    >
      {MARKS.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}

function StripHalf({ decorative = false }: { decorative?: boolean }) {
  return (
    <div className="cert-strip-half" aria-hidden={decorative ? true : undefined}>
      {Array.from({ length: COPIES_PER_HALF }, (_, index) => (
        <MarkList key={index} repeat={decorative || index > 0} />
      ))}
    </div>
  );
}

export async function CertificationStrip() {
  const t = await getTranslations("certifications");

  return (
    <section className="cert-strip" aria-labelledby="cert-strip-label" tabIndex={0}>
      <h2 id="cert-strip-label" className="visually-hidden">
        {t("label")}
      </h2>
      <div className="cert-strip-viewport">
        <div className="cert-strip-track">
          <StripHalf />
          <StripHalf decorative />
        </div>
      </div>
    </section>
  );
}
