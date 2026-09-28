import fs from "node:fs";

const bodies = {
  gu: {
    processing: {
      title: "1. ઑર્ડર પ્રોસેસિંગ",
      body: "ચુકવણીની પુષ્ટિ પછી, સપ્તાહાંત અને જાહેર રજાઓ સિવાય, ઑર્ડર 2–3 કાર્યદિવસમાં પ્રોસેસ કરવામાં આવે છે.",
    },
    timeline: {
      title: "2. ડિલિવરી સમયમર્યાદા",
      lead: "માનક ડિલિવરી: 5–7 કાર્યદિવસ",
      body: "ડિલિવરીનો સમય સ્થાન અને કુરિયર ભાગીદાર પર આધાર રાખીને બદલાઈ શકે છે.",
    },
    charges: {
      title: "3. શિપિંગ ચાર્જ",
      body: "શિપિંગ ચાર્જ, લાગુ પડે તો, ચેકઆઉટ પર અથવા ઇન્વૉઇસ પર સ્પષ્ટ રીતે દર્શાવવામાં આવશે.",
    },
    address: {
      title: "4. સરનામાની ચોકસાઈ",
      body: "ચોક્કસ શિપિંગ વિગતો આપવી ગ્રાહકોની જવાબદારી છે. ખોટા સરનામાંને કારણે થતા વિલંબ અથવા નુકસાન માટે Kalonlife જવાબદાર નથી.",
    },
    issues: {
      title: "5. ડિલિવરી સમસ્યાઓ",
      body: "તમારો ઑર્ડર મોડો પહોંચે, નુકસાન પામે અથવા ખૂટે, તો ડિલિવરીના 48 કલાકની અંદર ગ્રાહક સહાયનો સંપર્ક કરો.",
    },
  },
  pa: {
    processing: {
      title: "1. ਆਰਡਰ ਪ੍ਰੋਸੈਸਿੰਗ",
      body: "ਭੁਗਤਾਨ ਦੀ ਪੁਸ਼ਟੀ ਤੋਂ ਬਾਅਦ, ਵੀਕਐਂਡ ਅਤੇ ਜਨਤਕ ਛੁੱਟੀਆਂ ਨੂੰ ਛੱਡ ਕੇ, ਆਰਡਰ 2–3 ਕਾਰੋਬਾਰੀ ਦਿਨਾਂ ਵਿੱਚ ਪ੍ਰੋਸੈਸ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।",
    },
    timeline: {
      title: "2. ਡਿਲੀਵਰੀ ਸਮਾਂ",
      lead: "ਮਿਆਰੀ ਡਿਲੀਵਰੀ: 5–7 ਕਾਰੋਬਾਰੀ ਦਿਨ",
      body: "ਡਿਲੀਵਰੀ ਦਾ ਸਮਾਂ ਟਿਕਾਣੇ ਅਤੇ ਕੂਰੀਅਰ ਸਾਥੀ ਅਨੁਸਾਰ ਬਦਲ ਸਕਦਾ ਹੈ।",
    },
    charges: {
      title: "3. ਸ਼ਿਪਿੰਗ ਖਰਚੇ",
      body: "ਸ਼ਿਪਿੰਗ ਖਰਚੇ, ਜੇ ਲਾਗੂ ਹੋਣ, ਚੈਕਆਉਟ ਉੱਤੇ ਜਾਂ ਇਨਵੌਇਸ ਉੱਤੇ ਸਪਸ਼ਟ ਤੌਰ ਉੱਤੇ ਦੱਸੇ ਜਾਣਗੇ।",
    },
    address: {
      title: "4. ਪਤੇ ਦੀ ਸਹੀਤਾ",
      body: "ਸਹੀ ਸ਼ਿਪਿੰਗ ਵੇਰਵੇ ਦੇਣਾ ਗਾਹਕਾਂ ਦੀ ਜ਼ਿੰਮੇਵਾਰੀ ਹੈ। ਗਲਤ ਪਤੇ ਕਾਰਨ ਹੋਣ ਵਾਲੀ ਦੇਰੀ ਜਾਂ ਨੁਕਸਾਨ ਲਈ Kalonlife ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹੈ।",
    },
    issues: {
      title: "5. ਡਿਲੀਵਰੀ ਸਮੱਸਿਆਵਾਂ",
      body: "ਜੇ ਤੁਹਾਡਾ ਆਰਡਰ ਦੇਰ ਨਾਲ ਪਹੁੰਚੇ, ਖਰਾਬ ਹੋਵੇ, ਜਾਂ ਗੁੰਮ ਹੋਵੇ, ਤਾਂ ਡਿਲੀਵਰੀ ਦੇ 48 ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ ਗਾਹਕ ਸਹਾਇਤਾ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
    },
  },
};

function block(value) {
  const pretty = JSON.stringify(value, null, 2);
  return pretty
    .split("\n")
    .map((line, index) => (index === 0 ? line : `  ${line}`))
    .join("\n");
}

for (const locale of ["gu", "pa"]) {
  const path = `messages/${locale}.json`;
  const text = fs.readFileSync(path, "utf8");
  const data = JSON.parse(text);
  if (data.shippingBody) {
    console.log(`${locale} already present`);
    continue;
  }
  const trimmed = text.replace(/\s*$/, "");
  const cut = trimmed.lastIndexOf("}");
  const next = `${trimmed.slice(0, cut).replace(/\s*$/, "")},\n  "shippingBody": ${block(bodies[locale])}\n}\n`;
  const parsed = JSON.parse(next);
  if (!parsed.shippingBody?.processing?.body || !parsed.routes?.shipping?.description) {
    throw new Error(`${locale} lost required keys`);
  }
  fs.writeFileSync(path, next);
  console.log(`${locale} inserted`);
}
