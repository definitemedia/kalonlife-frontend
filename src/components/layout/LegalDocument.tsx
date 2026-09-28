export type LegalSection = {
  id: string;
  title: string;
  lead?: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalDocumentProps = {
  title: string;
  subtitle?: string;
  intro?: string;
  paragraphs?: string[];
  sections?: LegalSection[];
};

export function LegalDocument({
  title,
  subtitle,
  intro,
  paragraphs = [],
  sections = [],
}: LegalDocumentProps) {
  return (
    <article className="container page-shell legal-document">
      <h1>{title}</h1>
      {subtitle ? <p className="legal-document-subtitle">{subtitle}</p> : null}
      {intro ? <p>{intro}</p> : null}
      {paragraphs.length ? (
        <div className="legal-document-paragraphs">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id}>{section.title}</h2>
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
      ))}
    </article>
  );
}
