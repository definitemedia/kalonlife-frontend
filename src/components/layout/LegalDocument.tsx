import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { footerQuickLinks } from "@/config/navigation";
import { Link } from "@/i18n/navigation";
import type { LegalBlock, LegalInline } from "./legal-blocks";
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
  preface?: LegalBlock[];
  blocks?: LegalBlock[];
};

function richText(parts: LegalInline[]) {
  return parts.map((part, index) => {
    if (part === "\n") return <br key={index} />;
    if (typeof part === "string") return <span key={index}>{part}</span>;
    return <strong key={index}>{part.b}</strong>;
  });
}

function blockNode(block: LegalBlock, index: number): ReactNode {
  if (block.t === "p") {
    return <p key={index}>{richText(block.c)}</p>;
  }
  if (block.t === "h2") {
    return <h2 key={block.id} id={block.id}>{block.c}</h2>;
  }
  if (block.t === "h3") {
    return <h3 key={block.id} id={block.id}>{block.c}</h3>;
  }
  if (block.t === "ul" || block.t === "ol") {
    const List = block.t;
    return (
      <List key={index}>
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex}>{richText(item)}</li>
        ))}
      </List>
    );
  }
  return (
    <div key={index} className="legal-document-table-wrap">
      <table>
        <thead>
          <tr>
            {block.head.map((cell, cellIndex) => (
              <th key={cellIndex} scope="col" colSpan={cell.span && cell.span > 1 ? cell.span : undefined}>
                {richText(cell.c)}
              </th>
            ))}
          </tr>
        </thead>
        {block.body.length ? (
          <tbody>
            {block.body.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} colSpan={cell.span && cell.span > 1 ? cell.span : undefined}>
                    {richText(cell.c)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  );
}

function renderBlocks(blocks: LegalBlock[]) {
  return blocks.map((block, index) => blockNode(block, index));
}

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
  preface = [],
  blocks = [],
}: LegalDocumentProps) {
  const t = await getTranslations("footer");
  const related = footerQuickLinks.filter((item) => item.href !== currentHref);

  return (
    <div className="legal-page">
      <div className="legal-document-band">
        <header className="legal-document legal-document-header">
          {preface.length ? <div className="legal-document-preface">{renderBlocks(preface)}</div> : null}
          <h1>{title}</h1>
          {subtitle ? <p className="legal-document-subtitle">{subtitle}</p> : null}
          {intro ? <p className="legal-document-intro">{intro}</p> : null}
        </header>
      </div>
      <article className="legal-document">
        {blocks.length ? <div className="legal-document-flow">{renderBlocks(blocks)}</div> : null}

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
