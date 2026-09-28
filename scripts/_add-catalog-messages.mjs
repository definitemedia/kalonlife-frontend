import fs from "node:fs";
import path from "node:path";

const catalogs = {
  en: {
    packSize: "Pack size",
    mrp: "MRP",
    imageComingSoon: "Image coming soon",
    productsLabel: "Products",
  },
  hi: {
    packSize: "पैक आकार",
    mrp: "एमआरपी",
    imageComingSoon: "छवि जल्द आ रही है",
    productsLabel: "उत्पाद",
  },
  te: {
    packSize: "ప్యాక్ పరిమాణం",
    mrp: "ఎంఆర్‌పీ",
    imageComingSoon: "చిత్రం త్వరలో వస్తుంది",
    productsLabel: "ఉత్పత్తులు",
  },
  ta: {
    packSize: "பேக் அளவு",
    mrp: "எம்ஆர்பி",
    imageComingSoon: "படம் விரைவில் வரும்",
    productsLabel: "தயாரிப்புகள்",
  },
  kn: {
    packSize: "ಪ್ಯಾಕ್ ಗಾತ್ರ",
    mrp: "ಎಂಆರ್‌ಪಿ",
    imageComingSoon: "ಚಿತ್ರ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ",
    productsLabel: "ಉತ್ಪನ್ನಗಳು",
  },
  ml: {
    packSize: "പാക്ക് വലുപ്പം",
    mrp: "എംആർപി",
    imageComingSoon: "ചിത്രം ഉടൻ വരും",
    productsLabel: "ഉൽപ്പന്നങ്ങൾ",
  },
  mr: {
    packSize: "पॅक आकार",
    mrp: "एमआरपी",
    imageComingSoon: "प्रतिमा लवकर येईल",
    productsLabel: "उत्पादने",
  },
  bn: {
    packSize: "প্যাকের আকার",
    mrp: "এমআরপি",
    imageComingSoon: "ছবি শীঘ্রই আসছে",
    productsLabel: "পণ্য",
  },
  gu: {
    packSize: "પેકનું કદ",
    mrp: "એમઆરપી",
    imageComingSoon: "છબી ટૂંક સમયમાં આવશે",
    productsLabel: "ઉત્પાદનો",
  },
  or: {
    packSize: "ପ୍ୟାକ୍ ଆକାର",
    mrp: "ଏମ୍‌ଆର୍‌ପି",
    imageComingSoon: "ଛବି ଶୀଘ୍ର ଆସିବ",
    productsLabel: "ଉତ୍ପାଦ",
  },
  pa: {
    packSize: "ਪੈਕ ਆਕਾਰ",
    mrp: "ਐਮਆਰਪੀ",
    imageComingSoon: "ਤਸਵੀਰ ਜਲਦੀ ਆਵੇਗੀ",
    productsLabel: "ਉਤਪਾਦ",
  },
};

function countLeaves(node) {
  if (node && typeof node === "object" && !Array.isArray(node)) {
    return Object.values(node).reduce((total, value) => total + countLeaves(value), 0);
  }
  return 1;
}

const dir = "messages";

for (const [locale, catalog] of Object.entries(catalogs)) {
  const file = path.join(dir, `${locale}.json`);
  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw);
  const beforeKeys = Object.keys(data);
  const beforeLeaves = countLeaves(data);

  if (data.catalog) {
    throw new Error(`${locale} already has catalog`);
  }

  const trimmed = raw.replace(/\s+$/, "");
  if (!trimmed.endsWith("}")) {
    throw new Error(`${locale} does not end with }`);
  }

  const body = trimmed.slice(0, -1).replace(/\s+$/, "");
  if (!body.endsWith("}")) {
    throw new Error(`${locale} unexpected ending`);
  }

  const block = `,
  "catalog": {
    "packSize": ${JSON.stringify(catalog.packSize)},
    "mrp": ${JSON.stringify(catalog.mrp)},
    "imageComingSoon": ${JSON.stringify(catalog.imageComingSoon)},
    "productsLabel": ${JSON.stringify(catalog.productsLabel)}
  }
}
`;

  const next = body + block;
  const parsed = JSON.parse(next);
  const afterKeys = Object.keys(parsed);

  if (afterKeys.length !== beforeKeys.length + 1) {
    throw new Error(`${locale} key count changed unexpectedly`);
  }

  for (const key of beforeKeys) {
    if (JSON.stringify(parsed[key]) !== JSON.stringify(data[key])) {
      throw new Error(`${locale} wiped key ${key}`);
    }
  }

  if (countLeaves(parsed) !== beforeLeaves + 4) {
    throw new Error(`${locale} leaf count mismatch`);
  }

  fs.writeFileSync(file, next);
  console.log(
    locale,
    "keys",
    beforeKeys.length,
    "->",
    afterKeys.length,
    "leaves",
    beforeLeaves,
    "->",
    countLeaves(parsed),
  );
}
