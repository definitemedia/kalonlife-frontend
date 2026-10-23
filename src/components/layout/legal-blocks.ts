export type LegalInline = string | { b: string };

export type LegalCell = {
  c: LegalInline[];
  span?: number;
};

export type LegalBlock =
  | { t: "p"; c: LegalInline[] }
  | { t: "h2"; c: string; id: string }
  | { t: "h3"; c: string; id: string }
  | { t: "ul"; items: LegalInline[][] }
  | { t: "ol"; items: LegalInline[][] }
  | { t: "table"; head: LegalCell[]; body: LegalCell[][] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isInline(value: unknown): value is LegalInline {
  if (typeof value === "string") return true;
  return isRecord(value) && typeof value.b === "string" && Object.keys(value).every((key) => key === "b");
}

function isInlineList(value: unknown): value is LegalInline[] {
  return Array.isArray(value) && value.every(isInline);
}

function isCell(value: unknown): value is LegalCell {
  if (!isRecord(value) || !isInlineList(value.c)) return false;
  return value.span === undefined || typeof value.span === "number";
}

function isBlock(value: unknown): value is LegalBlock {
  if (!isRecord(value) || typeof value.t !== "string") return false;
  if (value.t === "p") return isInlineList(value.c);
  if (value.t === "h2" || value.t === "h3") {
    return typeof value.c === "string" && typeof value.id === "string";
  }
  if (value.t === "ul" || value.t === "ol") {
    return Array.isArray(value.items) && value.items.every(isInlineList);
  }
  if (value.t === "table") {
    return (
      Array.isArray(value.head) &&
      value.head.every(isCell) &&
      Array.isArray(value.body) &&
      value.body.every((row) => Array.isArray(row) && row.every(isCell))
    );
  }
  return false;
}

export function parseLegalBlocks(value: unknown): LegalBlock[] {
  if (!Array.isArray(value) || !value.every(isBlock)) {
    throw new Error("Legal document blocks are not in the expected format");
  }
  return value;
}
