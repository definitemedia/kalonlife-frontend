import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const locales = ["en", "hi", "te", "ta", "kn", "ml", "mr", "bn", "gu", "or", "pa"];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function leaves(value, prefix = "", out = []) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      leaves(child, prefix ? `${prefix}.${key}` : key, out);
    }
    return out;
  }
  out.push(prefix);
  return out;
}

const en = readJson(path.join(root, "scripts", "consultation-en.json"));
const enKeys = leaves(en.consultation).sort();
const packs = { en };

for (const locale of locales.slice(1)) {
  const pack = readJson(path.join(root, "scripts", "consultation-locales", `${locale}.json`));
  const keys = leaves(pack.consultation).sort();
  if (keys.join("\n") !== enKeys.join("\n")) {
    const missing = enKeys.filter((key) => !keys.includes(key));
    const extra = keys.filter((key) => !enKeys.includes(key));
    throw new Error(`${locale} key mismatch\nmissing ${missing.join(", ")}\nextra ${extra.join(", ")}`);
  }
  packs[locale] = pack;
}

const allowSame = new Set([
  "hero.price",
  "booking.price",
  "questions.phone",
  "questions.email",
  "form.datePlaceholder",
  "trustStats.rating.value",
  "trustStats.private.value",
  "trustStats.members.value",
  "trustHighlights.available.detail",
  "testimonials.items.ananya.name",
  "testimonials.items.ananya.city",
  "testimonials.items.rahul.name",
  "testimonials.items.rahul.city",
  "testimonials.items.sneha.name",
  "testimonials.items.sneha.city",
]);

function valueAt(tree, leaf) {
  return leaf.split(".").reduce((current, key) => current[key], tree);
}

for (const locale of locales.slice(1)) {
  for (const leaf of enKeys) {
    const local = valueAt(packs[locale].consultation, leaf);
    const english = valueAt(en.consultation, leaf);
    if (local === english && !allowSame.has(leaf)) {
      throw new Error(`${locale} left English at ${leaf}`);
    }
  }
}

for (const locale of locales) {
  const file = path.join(root, "messages", `${locale}.json`);
  const raw = fs.readFileSync(file, "utf8");
  const newline = raw.includes("\r\n") ? "\r\n" : "\n";
  const data = JSON.parse(raw);
  const before = JSON.stringify(Object.keys(data));
  if (!data.routes?.consultDietician) {
    throw new Error(`${locale} missing routes.consultDietician`);
  }
  const pack = packs[locale];
  data.routes.consultDietician.title = pack.title;
  data.routes.consultDietician.description = pack.description;
  data.consultation = pack.consultation;
  const afterKeys = Object.keys(data);
  if (JSON.stringify(afterKeys.filter((key) => key !== "consultation")) !== before && !JSON.parse(before).includes("consultation")) {
    const lost = JSON.parse(before).filter((key) => !afterKeys.includes(key));
    if (lost.length) throw new Error(`${locale} lost keys ${lost.join(", ")}`);
  }
  const text = `${JSON.stringify(data, null, 2).replace(/\n/g, newline)}${newline}`;
  fs.writeFileSync(file, text);
  const reread = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const key of JSON.parse(before)) {
    if (!(key in reread)) throw new Error(`${locale} dropped ${key} on write`);
  }
  if (!reread.consultation?.hero?.heading) throw new Error(`${locale} consultation missing`);
  console.log(`${locale} keys ${Object.keys(reread).length} consultation leaves ${leaves(reread.consultation).length}`);
}
