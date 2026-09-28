import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const copy = {
  en: {
    chooseLanguage: "Choose your language",
    regions: {
      en: "Pan India",
      hi: "North and Central India",
      te: "Andhra Pradesh, Telangana",
      ta: "Tamil Nadu",
      kn: "Karnataka",
      ml: "Kerala",
      mr: "Maharashtra",
      bn: "West Bengal",
      gu: "Gujarat",
      or: "Odisha",
      pa: "Punjab",
    },
  },
  hi: {
    chooseLanguage: "अपनी भाषा चुनें",
    regions: {
      en: "पूरे भारत",
      hi: "उत्तर और मध्य भारत",
      te: "आंध्र प्रदेश, तेलंगाना",
      ta: "तमिलनाडु",
      kn: "कर्नाटक",
      ml: "केरल",
      mr: "महाराष्ट्र",
      bn: "पश्चिम बंगाल",
      gu: "गुजरात",
      or: "ओडिशा",
      pa: "पंजाब",
    },
  },
  te: {
    chooseLanguage: "మీ భాషను ఎంచుకోండి",
    regions: {
      en: "భారతదేశం అంతటా",
      hi: "ఉత్తర మరియు మధ్య భారతదేశం",
      te: "ఆంధ్రప్రదేశ్, తెలంగాణ",
      ta: "తమిళనాడు",
      kn: "కర్ణాటక",
      ml: "కేరళ",
      mr: "మహారాష్ట్ర",
      bn: "పశ్చిమ బెంగాల్",
      gu: "గుజరాత్",
      or: "ఒడిశా",
      pa: "పంజాబ్",
    },
  },
  ta: {
    chooseLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    regions: {
      en: "இந்தியா முழுவதும்",
      hi: "வடக்கு மற்றும் மத்திய இந்தியா",
      te: "ஆந்திரப் பிரதேசம், தெலங்கானா",
      ta: "தமிழ்நாடு",
      kn: "கர்நாடகா",
      ml: "கேரளா",
      mr: "மகாராஷ்டிரா",
      bn: "மேற்கு வங்கம்",
      gu: "குஜராத்",
      or: "ஒடிசா",
      pa: "பஞ்சாப்",
    },
  },
  kn: {
    chooseLanguage: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    regions: {
      en: "ಭಾರತದಾದ್ಯಂತ",
      hi: "ಉತ್ತರ ಮತ್ತು ಮಧ್ಯ ಭಾರತ",
      te: "ಆಂಧ್ರಪ್ರದೇಶ, ತೆಲಂಗಾಣ",
      ta: "ತಮಿಳುನಾಡು",
      kn: "ಕರ್ನಾಟಕ",
      ml: "ಕೇರಳ",
      mr: "ಮಹಾರಾಷ್ಟ್ರ",
      bn: "ಪಶ್ಚಿಮ ಬಂಗಾಳ",
      gu: "ಗುಜರಾತ್",
      or: "ಒಡಿಶಾ",
      pa: "ಪಂಜಾಬ್",
    },
  },
  ml: {
    chooseLanguage: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക",
    regions: {
      en: "ഇന്ത്യ മുഴുവൻ",
      hi: "വടക്കൻ, മധ്യ ഇന്ത്യ",
      te: "ആന്ധ്രാപ്രദേശ്, തെലങ്കാന",
      ta: "തമിഴ്നാട്",
      kn: "കർണാടക",
      ml: "കേരളം",
      mr: "മഹാരാഷ്ട്ര",
      bn: "പശ്ചിമ ബംഗാൾ",
      gu: "ഗുജറാത്ത്",
      or: "ഒഡിശ",
      pa: "പഞ്ചാബ്",
    },
  },
  mr: {
    chooseLanguage: "आपली भाषा निवडा",
    regions: {
      en: "संपूर्ण भारत",
      hi: "उत्तर आणि मध्य भारत",
      te: "आंध्र प्रदेश, तेलंगणा",
      ta: "तमिळनाडू",
      kn: "कर्नाटक",
      ml: "केरळ",
      mr: "महाराष्ट्र",
      bn: "पश्चिम बंगाल",
      gu: "गुजरात",
      or: "ओडिशा",
      pa: "पंजाब",
    },
  },
  bn: {
    chooseLanguage: "আপনার ভাষা বেছে নিন",
    regions: {
      en: "সমগ্র ভারত",
      hi: "উত্তর ও মধ্য ভারত",
      te: "অন্ধ্রপ্রদেশ, তেলেঙ্গানা",
      ta: "তামিলনাড়ু",
      kn: "কর্ণাটক",
      ml: "কেরল",
      mr: "মহারাষ্ট্র",
      bn: "পশ্চিমবঙ্গ",
      gu: "গুজরাত",
      or: "ওড়িশা",
      pa: "পাঞ্জাব",
    },
  },
  gu: {
    chooseLanguage: "તમારી ભાષા પસંદ કરો",
    regions: {
      en: "સમગ્ર ભારત",
      hi: "ઉત્તર અને મધ્ય ભારત",
      te: "આંધ્ર પ્રદેશ, તેલંગાણા",
      ta: "તમિલનાડુ",
      kn: "કર્ણાટક",
      ml: "કેરળ",
      mr: "મહારાષ્ટ્ર",
      bn: "પશ્ચિમ બંગાળ",
      gu: "ગુજરાત",
      or: "ઓડિશા",
      pa: "પંજાબ",
    },
  },
  or: {
    chooseLanguage: "ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ",
    regions: {
      en: "ସମଗ୍ର ଭାରତ",
      hi: "ଉତ୍ତର ଏବଂ ମଧ୍ୟ ଭାରତ",
      te: "ଆନ୍ଧ୍ରପ୍ରଦେଶ, ତେଲେଙ୍ଗାନା",
      ta: "ତାମିଲନାଡୁ",
      kn: "କର୍ଣ୍ଣାଟକ",
      ml: "କେରଳ",
      mr: "ମହାରାଷ୍ଟ୍ର",
      bn: "ପଶ୍ଚିମବଙ୍ଗ",
      gu: "ଗୁଜରାଟ",
      or: "ଓଡ଼ିଶା",
      pa: "ପଞ୍ଜାବ",
    },
  },
  pa: {
    chooseLanguage: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
    regions: {
      en: "ਪੂਰਾ ਭਾਰਤ",
      hi: "ਉੱਤਰੀ ਅਤੇ ਮੱਧ ਭਾਰਤ",
      te: "ਆਂਧਰਾ ਪ੍ਰਦੇਸ਼, ਤੇਲੰਗਾਨਾ",
      ta: "ਤਮਿਲਨਾਡੂ",
      kn: "ਕਰਨਾਟਕ",
      ml: "ਕੇਰਲ",
      mr: "ਮਹਾਰਾਸ਼ਟਰ",
      bn: "ਪੱਛਮੀ ਬੰਗਾਲ",
      gu: "ਗੁਜਰਾਤ",
      or: "ਓਡੀਸ਼ਾ",
      pa: "ਪੰਜਾਬ",
    },
  },
};

const regionKeys = ["en", "hi", "te", "ta", "kn", "ml", "mr", "bn", "gu", "or", "pa"];

for (const locale of regionKeys) {
  const filePath = path.join(root, "messages", `${locale}.json`);
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  if (!data.footer || typeof data.footer !== "object") {
    throw new Error(`${locale}: missing footer object`);
  }

  if (data.footer.chooseLanguage && data.footer.regions) {
    console.log(`${locale}: already present, skipped`);
    continue;
  }

  const newline = raw.includes("\r\n") ? "\r\n" : "\n";
  const footerKey = `${newline}  "footer":`;
  const footerStart = raw.indexOf(footerKey);
  const notFoundKey = `${newline}  "notFound":`;
  const notFoundIdx = raw.indexOf(notFoundKey, footerStart + footerKey.length);

  if (footerStart < 0 || notFoundIdx < 0) {
    throw new Error(`${locale}: could not locate footer/notFound markers`);
  }

  const closeBrace = raw.lastIndexOf("}", notFoundIdx);
  if (closeBrace < footerStart) {
    throw new Error(`${locale}: could not locate footer closing brace`);
  }

  const entry = copy[locale];
  const regionLines = regionKeys
    .map((key) => `      "${key}": ${JSON.stringify(entry.regions[key])}`)
    .join(`,${newline}`);
  const block = [
    `"chooseLanguage": ${JSON.stringify(entry.chooseLanguage)},`,
    `"regions": {`,
    regionLines,
    `    }`,
  ].join(newline);

  const before = raw.slice(0, closeBrace).replace(/\s*$/, "");
  const withComma = before.endsWith(",") ? before : `${before},`;
  const next = `${withComma}${newline}    ${block}${newline}  ${raw.slice(closeBrace)}`;
  const parsed = JSON.parse(next);

  if (parsed.footer.chooseLanguage !== entry.chooseLanguage) {
    throw new Error(`${locale}: chooseLanguage mismatch after insert`);
  }

  for (const key of regionKeys) {
    if (parsed.footer.regions[key] !== entry.regions[key]) {
      throw new Error(`${locale}: region ${key} mismatch`);
    }
  }

  const originalKeys = Object.keys(data);
  const nextKeys = Object.keys(parsed);
  if (originalKeys.join("|") !== nextKeys.join("|")) {
    throw new Error(`${locale}: top-level keys changed`);
  }

  fs.writeFileSync(filePath, next);
  console.log(`${locale}: added footer.chooseLanguage and footer.regions`);
}
