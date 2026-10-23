import { getTranslations } from "next-intl/server";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { parseLegalBlocks } from "@/components/layout/legal-blocks";

type TermsOfUseDocumentProps = {
  locale: string;
  title: string;
  currentHref?: string;
};

export async function TermsOfUseDocument({
  locale,
  title,
  currentHref = "/terms",
}: TermsOfUseDocumentProps) {
  const t = await getTranslations({ locale, namespace: "terms" });

  return (
    <LegalDocument
      currentHref={currentHref}
      title={title}
      preface={parseLegalBlocks(t.raw("preface"))}
      blocks={parseLegalBlocks(t.raw("blocks"))}
    />
  );
}
