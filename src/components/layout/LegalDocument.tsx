import { getTranslations } from "next-intl/server";
import { footerQuickLinks } from "@/config/navigation";
import { Link } from "@/i18n/navigation";
import "./legal-document.css";

export type LegalSection = {
  id: string;
  title: string;
  lead?: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalDocumentProps = {
  title: string;
  currentHref: string;
  subtitle?: string;
  intro?: string;
  paragraphs?: string[];
  sections?: LegalSection[];
};

function sectionHeading(title: string, index: number) {
  const numbered = /^(\d+)\.\s+([\s\S]+)$/.exec(title.trim());
  if (numbered) {
    return { number: numbered[1], heading: numbered[2] };
  }
  return { number: String(index + 1), heading: title };
}

export async function LegalDocument({
  title,
  currentHref,
  subtitle,
  intro,
  paragraphs = [],
  sections = [],
}: LegalDocumentProps) {
  const t = await getTranslations("footer");
  const related = footerQuickLinks.filter((item) => item.href !== currentHref);

  return (
    <div className="legal-page">
      <div className="legal-document-band">
        <header className="legal-document legal-document-header">
          <h1>{title}</h1>
          {subtitle ? <p className="legal-document-subtitle">{subtitle}</p> : null}
          {intro ? <p className="legal-document-intro">{intro}</p> : null}
        </header>
      </div>
      <article className="legal-document">
        {paragraphs.length ? (
          <div className="legal-document-paragraphs">
            {paragraphs.map((paragraph, index) => (
              <p key={`${index}:${paragraph}`}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        {sections.length ? (
          <div className="legal-document-sections">
            {sections.map((section, index) => {
              const heading = sectionHeading(section.title, index);
              return (
                <section key={section.id} className="legal-document-section" aria-labelledby={section.id}>
                  <h2 id={section.id}>
                    <span className="legal-document-index">{heading.number}</span>
                    <span className="legal-document-heading">{heading.heading}</span>
                  </h2>
                  {section.lead ? <p className="legal-document-lead">{section.lead}</p> : null}
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.items?.length ? (
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              );
            })}
          </div>
        ) : null}

        <nav className="legal-document-related" aria-label={t("quickLinks")}>
          <ul>
            {related.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{t(item.label)}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </div>
  );
}
