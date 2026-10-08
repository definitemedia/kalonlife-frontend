import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const copyPath = path.join(root, "scripts", "why-choose-copy.json");
const copy = JSON.parse(fs.readFileSync(copyPath, "utf8"));
for (const locale of ["ta", "kn"]) {
  const extra = path.join(root, "scripts", `wcu-${locale}.json`);
  if (!copy[locale] && fs.existsSync(extra)) {
    copy[locale] = JSON.parse(fs.readFileSync(extra, "utf8"));
  }
}

const locales = ["en", "hi", "te", "ta", "kn", "ml", "mr", "bn", "gu", "or", "pa"].filter(
  (locale) => copy[locale],
);
const protectedKeys = [
  "consultation",
  "privacy",
  "terms",
  "disclaimer",
  "shipping",
  "returns",
  "shop",
  "goals",
  "featured",
  "shopCategories",
];

const exactEnglish = [
  "OUR DIFFERENCE",
  "Why Choose Kalonlife?",
  "Choosing Kalonlife means becoming part of a brand committed to health, innovation, and life-changing opportunities. We believe success is built on strong values, quality products, and empowering people to achieve their full potential.",
  "Explore Our Products",
  "Join Our Community",
  "What Sets Us Apart",
  "At Kalonlife, we believe that meaningful wellness goes beyond products. It is about combining quality, knowledge, opportunity, leadership, and community to create a better path forward for individuals and families.",
  "WHY KALONLIFE",
  "7 Reasons to Choose Kalonlife",
  "From product quality and innovation to ethical business practices and community development, Kalonlife is built around principles designed to create long-term value.",
  "Premium Quality Wellness Products",
  "Kalonlife offers carefully formulated nutritional supplements, wellness products, and personal care solutions developed using high-quality ingredients and advanced formulations to support healthier lifestyles.",
  "Science Meets Nature",
  "Our products combine modern nutritional science with natural herbal extracts, ensuring effective and safe solutions that support overall well-being.",
  "Ethical and Transparent Business",
  "Integrity is at the heart of Kalonlife. We follow ethical business practices, transparent systems, and fair reward structures that build long-term trust with our customers and associates.",
  "Powerful Entrepreneurial Opportunity",
  "Kalonlife provides a dynamic platform for individuals to build their own business, develop leadership skills, and create sustainable income streams through a structured growth system.",
  "Global Vision",
  "With a forward-thinking approach, Kalonlife aims to expand its presence globally while creating a strong community of leaders dedicated to health and prosperity.",
  "Leadership Development",
  "We focus on empowering individuals through training, mentorship, and leadership programs that help associates grow both personally and professionally.",
  "Community Impact",
  "Kalonlife is more than a business — it is a movement committed to improving health, creating opportunities, and uplifting communities.",
  "Wellness. Opportunity. Community.",
  "A stronger future begins when people have access to better choices, better support, and meaningful opportunities to grow.",
  "OUR PROMISE",
  "A Promise You Can Trust",
  "At Kalonlife, we are committed to delivering quality, opportunity, and trust — helping people live healthier lives while building a brighter future.",
  "Quality Wellness Products You Can Trust",
  "We are committed to maintaining high standards across our wellness and personal care products.",
  "Transparent and Ethical Business Practices",
  "We believe long-term relationships are built through integrity, transparency, and responsible business practices.",
  "A Community That Grows Together",
  "We believe individuals and communities become stronger when people learn, support, and grow together.",
  "Real Opportunities for Financial Independence",
  "Kalonlife provides an entrepreneurial platform for individuals who want to build skills, develop leadership capabilities, and pursue business opportunities.",
  "Choose a Better Way Forward",
  "Discover quality wellness products, meaningful guidance, and a community built around growth and well-being.",
  "Why Choose Kalonlife? | Our Difference",
  "Discover what sets Kalonlife apart — premium wellness products, science-backed formulations, ethical business practices, leadership development, entrepreneurial opportunities, and community impact.",
];

function flatten(value, prefix = "") {
  const keys = [];
  for (const [key, child] of Object.entries(value)) {
    const next = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === "object") keys.push(...flatten(child, next));
    else keys.push(next);
  }
  return keys;
}

const englishKeys = flatten(copy.en.whyChoose).sort();
const englishBlob = JSON.stringify(copy.en);
for (const sentence of exactEnglish) {
  if (!englishBlob.includes(sentence)) {
    throw new Error(`English copy missing exact sentence: ${sentence}`);
  }
}

for (const locale of locales) {
  if (!copy[locale]) throw new Error(`Missing locale ${locale}`);
  const keys = flatten(copy[locale].whyChoose).sort();
  if (keys.join("\n") !== englishKeys.join("\n")) {
    throw new Error(`Key mismatch in ${locale}`);
  }
  if (!copy[locale].seo?.title || !copy[locale].seo?.description) {
    throw new Error(`Missing SEO in ${locale}`);
  }
}

function newlineOf(text) {
  return text.includes("\r\n") ? "\r\n" : "\n";
}

function removeTopLevelKey(text, key) {
  const nl = newlineOf(text);
  const marker = `${nl}  "${key}":`;
  const start = text.indexOf(marker);
  if (start === -1) return text;

  let i = text.indexOf("{", start);
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (; i < text.length; i += 1) {
    const char = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        i += 1;
        if (text[i] === ",") i += 1;
        if (text.slice(i, i + nl.length) === nl) i += nl.length;
        return `${text.slice(0, start)}${nl}${text.slice(i)}`;
      }
    }
  }

  throw new Error(`Unbalanced ${key} object`);
}

function formatWhyChoose(value, nl) {
  const lines = JSON.stringify(value, null, 2).split("\n");
  const body = lines
    .map((line, index) => (index === 0 ? `  "whyChoose": ${line}` : `  ${line}`))
    .join(nl);
  return `${body},${nl}`;
}

function replaceRouteSeo(text, title, description) {
  const routesAt = text.indexOf('"routes"');
  if (routesAt === -1) throw new Error("routes missing");
  const marker = '"whyChooseUs": {';
  const start = text.indexOf(marker, routesAt);
  if (start === -1) throw new Error("routes.whyChooseUs missing");
  const end = text.indexOf("}", start);
  if (end === -1) throw new Error("routes.whyChooseUs not closed");
  const slice = text.slice(start, end);
  const next = slice
    .replace(
      /"title"\s*:\s*"(?:\\.|[^"\\])*"/,
      `"title": ${JSON.stringify(title)}`,
    )
    .replace(
      /"description"\s*:\s*"(?:\\.|[^"\\])*"/,
      `"description": ${JSON.stringify(description)}`,
    );
  if (next === slice) throw new Error("SEO title/description were not replaced");
  return text.slice(0, start) + next + text.slice(end);
}

for (const locale of locales) {
  const file = path.join(root, "messages", `${locale}.json`);
  const beforeText = fs.readFileSync(file, "utf8");
  const before = JSON.parse(beforeText);
  const nl = newlineOf(beforeText);
  let text = removeTopLevelKey(beforeText, "whyChoose");
  const anchor = `${nl}  "certifications":`;
  const at = text.indexOf(anchor);
  if (at === -1) throw new Error(`${locale}: certifications anchor missing`);
  text =
    text.slice(0, at) +
    nl +
    formatWhyChoose(copy[locale].whyChoose, nl) +
    text.slice(at + 1);
  text = replaceRouteSeo(text, copy[locale].seo.title, copy[locale].seo.description);

  const after = JSON.parse(text);
  for (const key of Object.keys(before)) {
    if (key === "whyChoose") continue;
    if (key === "routes") {
      for (const routeKey of Object.keys(before.routes)) {
        if (routeKey === "whyChooseUs") {
          const previous = before.routes.whyChooseUs;
          const next = after.routes.whyChooseUs;
          for (const field of Object.keys(previous)) {
            if (field !== "title" && field !== "description" && previous[field] !== next[field]) {
              throw new Error(`${locale}: whyChooseUs.${field} changed`);
            }
          }
          if (!next.title || !next.description) {
            throw new Error(`${locale}: SEO fields missing`);
          }
          continue;
        }
        if (JSON.stringify(before.routes[routeKey]) !== JSON.stringify(after.routes[routeKey])) {
          throw new Error(`${locale}: route ${routeKey} changed`);
        }
      }
      for (const routeKey of Object.keys(after.routes)) {
        if (!(routeKey in before.routes)) {
          throw new Error(`${locale}: unexpected route ${routeKey}`);
        }
      }
      continue;
    }
    if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
      throw new Error(`${locale}: protected or unrelated key changed: ${key}`);
    }
  }

  for (const key of protectedKeys) {
    if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
      throw new Error(`${locale}: protected key changed: ${key}`);
    }
  }

  if (!after.whyChoose?.hero?.title) {
    throw new Error(`${locale}: whyChoose namespace missing after write`);
  }

  fs.writeFileSync(file, text);
  console.log(`updated ${locale}`);
}
