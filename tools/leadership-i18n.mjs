import fs from "fs";
import path from "path";
import { extraLocales } from "./leadership-extra.mjs";
import { extraLocalesB } from "./leadership-extra-b.mjs";
import { extraLocalesC } from "./leadership-extra-c.mjs";

const root = path.resolve(import.meta.dirname, "..");
const messagesDir = path.join(root, "messages");

const identity = {
  chairman: {
    number: "01",
    name: "Mr. Tulasi Venkatesh Samidala",
    company: "Kalonlife International India Private Limited",
    initials: "TVS",
    compactCompany: "Kalonlife International India Pvt. Ltd.",
  },
  advisor: {
    number: "02",
    name: "Dr. Tulasi Anagha",
    company: "Kalonlife International India Private Limited",
    initials: "TA",
    compactCompany: "Kalonlife International India Pvt. Ltd.",
  },
};

const numbers = {
  quality: "01",
  integrity: "02",
  empowerment: "03",
  wellbeing: "01",
  care: "02",
  positivity: "03",
};

const locales = {};

locales.en = {
  seo: {
    title: "Leadership | Chairman's Message | Kalonlife",
    description:
      "Meet the leadership behind Kalonlife International India Private Limited and discover the vision, values, and wellness philosophy guiding the company.",
  },
  leadership: {
    hero: {
      eyebrow: "Leadership",
      title: "Who We Are",
      subheading: "Kalonlife International India Private Limited",
      description:
        "Leadership at Kalonlife is built on a commitment to health, integrity, empowerment, and meaningful opportunities.",
      exploreProducts: "Explore Our Products",
      whyChoose: "Why Choose Kalonlife",
      imageAlt:
        "Indian families walking together and sharing a simple meal outdoors in a leafy community space",
    },
    chairman: {
      eyebrow: "Leadership",
      heading: "Message from the Chairman & Managing Director",
      title: "Chairman & Managing Director",
      portraitAlt:
        "Initials placeholder for Mr. Tulasi Venkatesh Samidala, Chairman and Managing Director. No photograph is shown.",
      p1: "At Kalonlife International India Private Limited, our journey is driven by a simple yet powerful belief — that true prosperity begins with good health, strong values, and meaningful opportunities. Kalonlife was founded with a vision to create a platform where wellness and entrepreneurship come together to transform lives.",
      p2: "In today's fast-changing world, people are looking not only for better health solutions but also for sustainable opportunities that allow them to grow, lead, and build a secure future. Kalonlife was established to address both these needs by offering high-quality nutritional and wellness products while empowering individuals with a transparent and rewarding business model.",
      p3: "Our commitment is rooted in three core pillars: quality, integrity, and empowerment. We strive to deliver products developed with carefully selected ingredients and advanced formulations that support healthier lifestyles. At the same time, we are dedicated to creating a community where individuals can develop leadership skills, achieve financial independence, and build lasting success.",
      p4: "The success of Kalonlife is built on the passion and dedication of our associates, customers, and leadership teams who believe in our mission of creating positive change. Together, we are building not just a company, but a movement that encourages people to dream bigger, live healthier, and achieve more.",
      p5: "As we move forward, our focus remains on innovation, ethical practices, and global expansion while continuing to uphold the trust placed in us by thousands of people who are part of the Kalonlife family.",
      p6: "I extend my sincere gratitude to everyone who believes in our vision and contributes to our growth. Let us continue this journey together and create a future defined by health, opportunity, and success.",
      regards: "Warm regards,",
    },
    pillars: {
      eyebrow: "Our Three Core Pillars",
      quality: {
        title: "Quality",
        description:
          "Products crafted with carefully selected ingredients and advanced formulations.",
      },
      integrity: {
        title: "Integrity",
        description: "Transparent, ethical business practices that build lasting trust.",
      },
      empowerment: {
        title: "Empowerment",
        description:
          "A platform to develop leadership skills and achieve financial independence.",
      },
    },
    chairmanCta: {
      text: "Join thousands of people transforming their health and building a brighter future with Kalonlife.",
      button: "Explore Products",
    },
    advisor: {
      eyebrow: "Nutrition & Wellness Leadership",
      heading: "Message from Dr. Tulasi Anagha",
      credential: "PhD, Food Science & Nutrition",
      role: "Nutrition Advisory Board Member",
      portraitAlt:
        "Initials placeholder for Dr. Tulasi Anagha, Nutrition Advisory Board Member. No photograph is shown.",
      p1: "At Kalonlife, we believe that true well-being goes beyond physical health — it includes confidence, balance, and the opportunity to grow. Our mission is to inspire healthier lifestyles while empowering individuals and families to build a better future.",
      p2: "Every product we create and every initiative we undertake is guided by our commitment to quality, care, and community. We are proud to be part of a movement that encourages people to take charge of their health and unlock their potential.",
      p3: "Together, let us continue to spread positivity, wellness, and opportunity through the Kalonlife family.",
      regards: "With warmth,",
    },
    beliefs: {
      eyebrow: "Our Core Beliefs",
      wellbeing: {
        title: "Holistic Well-being",
        description:
          "True health includes confidence, balance, and growth — not just physical fitness.",
      },
      care: {
        title: "Quality & Care",
        description:
          "Every product reflects our unwavering commitment to quality and community.",
      },
      positivity: {
        title: "Positivity",
        description: "Spreading wellness and opportunity through the Kalonlife family.",
      },
    },
    visual: {
      heading: "Leading With Purpose",
      description:
        "Building a healthier future requires more than products. It requires vision, integrity, knowledge, and people who are committed to making a positive difference.",
      imageAlt:
        "Indian adults and a child preparing a home meal of grains, greens, and fruit together",
    },
    closing: {
      heading: "Building the Future of Wellness Together",
      description:
        "At Kalonlife, leadership means creating an environment where people can pursue better health, develop their potential, and contribute to stronger communities.",
    },
    finalCta: {
      heading: "Be Part of the Kalonlife Journey",
      description:
        "Explore our wellness products and discover the values, people, and vision behind Kalonlife.",
      explore: "Explore Products",
      whyChoose: "Why Choose Kalonlife",
    },
  },
};

locales.hi = {
  seo: {
    title: "नेतृत्व | चेयरमैन का संदेश | Kalonlife",
    description:
      "Kalonlife International India Private Limited के नेतृत्व से मिलें और कंपनी का मार्गदर्शन करने वाली दृष्टि, मूल्यों और स्वास्थ्य-दर्शन को जानें।",
  },
  leadership: {
    hero: {
      eyebrow: "नेतृत्व",
      title: "हम कौन हैं",
      subheading: "Kalonlife International India Private Limited",
      description:
        "Kalonlife का नेतृत्व स्वास्थ्य, सत्यनिष्ठा, सशक्तिकरण और सार्थक अवसरों के प्रति प्रतिबद्धता पर टिका है।",
      exploreProducts: "हमारे उत्पाद देखें",
      whyChoose: "Kalonlife को क्यों चुनें",
      imageAlt:
        "भारतीय परिवार हरी-भरी सामुदायिक जगह में साथ टहलते हुए और खुले में साधारण भोजन साझा करते हुए",
    },
    chairman: {
      eyebrow: "नेतृत्व",
      heading: "चेयरमैन और प्रबंध निदेशक का संदेश",
      title: "चेयरमैन और प्रबंध निदेशक",
      portraitAlt:
        "Mr. Tulasi Venkatesh Samidala, चेयरमैन और प्रबंध निदेशक, के लिए आद्याक्षर वाला प्लेसहोल्डर। कोई फ़ोटोग्राफ़ नहीं दिखाया गया है।",
      p1: "Kalonlife International India Private Limited में हमारी यात्रा एक सरल किंतु सशक्त विश्वास से आगे बढ़ती है — कि सच्ची समृद्धि अच्छे स्वास्थ्य, मजबूत मूल्यों और सार्थक अवसरों से शुरू होती है। Kalonlife की स्थापना इस दृष्टि से हुई कि एक ऐसा मंच बने जहाँ स्वास्थ्य और उद्यमशीलता साथ आकर जीवन बदल सकें।",
      p2: "आज की तेज़ी से बदलती दुनिया में लोग केवल बेहतर स्वास्थ्य समाधान ही नहीं, बल्कि ऐसे टिकाऊ अवसर भी खोज रहे हैं जिनसे वे आगे बढ़ें, नेतृत्व करें और एक सुरक्षित भविष्य बना सकें। Kalonlife की स्थापना इन दोनों आवश्यकताओं को पूरा करने के लिए हुई — उच्च गुणवत्ता वाले पोषण और स्वास्थ्य उत्पाद देते हुए, और एक पारदर्शी तथा लाभप्रद व्यावसायिक मॉडल के माध्यम से लोगों को सशक्त बनाते हुए।",
      p3: "हमारी प्रतिबद्धता तीन मूल स्तंभों पर टिकी है: गुणवत्ता, सत्यनिष्ठा और सशक्तिकरण। हम ऐसे उत्पाद देने का प्रयास करते हैं जो सावधानी से चुनी गई सामग्री और उन्नत फ़ॉर्मूलेशन से तैयार हों और स्वस्थ जीवनशैली का समर्थन करें। साथ ही, हम एक ऐसा समुदाय बनाने के लिए समर्पित हैं जहाँ लोग नेतृत्व कौशल विकसित कर सकें, वित्तीय स्वतंत्रता प्राप्त कर सकें और स्थायी सफलता बना सकें।",
      p4: "Kalonlife की सफलता हमारे सहयोगियों, ग्राहकों और नेतृत्व टीमों के जुनून और समर्पण पर टिकी है, जो सकारात्मक बदलाव लाने के हमारे उद्देश्य में विश्वास करते हैं। साथ मिलकर हम केवल एक कंपनी ही नहीं, बल्कि एक ऐसा आंदोलन बना रहे हैं जो लोगों को बड़े सपने देखने, स्वस्थ जीवन जीने और अधिक प्राप्त करने के लिए प्रोत्साहित करता है।",
      p5: "आगे बढ़ते हुए भी हमारा ध्यान नवाचार, नैतिक व्यवहार और वैश्विक विस्तार पर बना रहेगा, और साथ ही उन हज़ारों लोगों के भरोसे को कायम रखेंगे जो Kalonlife परिवार का हिस्सा हैं।",
      p6: "मैं उन सभी का हार्दिक आभार व्यक्त करता हूँ जो हमारी दृष्टि पर विश्वास करते हैं और हमारी वृद्धि में योगदान देते हैं। आइए, यह यात्रा साथ जारी रखें और स्वास्थ्य, अवसर और सफलता से परिभाषित भविष्य बनाएँ।",
      regards: "सादर,",
    },
    pillars: {
      eyebrow: "हमारे तीन मूल स्तंभ",
      quality: {
        title: "गुणवत्ता",
        description: "सावधानी से चुनी गई सामग्री और उन्नत फ़ॉर्मूलेशन से तैयार उत्पाद।",
      },
      integrity: {
        title: "सत्यनिष्ठा",
        description: "पारदर्शी, नैतिक व्यावसायिक व्यवहार जो स्थायी भरोसा बनाते हैं।",
      },
      empowerment: {
        title: "सशक्तिकरण",
        description: "नेतृत्व कौशल विकसित करने और वित्तीय स्वतंत्रता प्राप्त करने का एक मंच।",
      },
    },
    chairmanCta: {
      text: "हज़ारों लोगों के साथ जुड़ें जो Kalonlife के साथ अपने स्वास्थ्य को बदल रहे हैं और एक उज्जवल भविष्य बना रहे हैं।",
      button: "उत्पाद देखें",
    },
    advisor: {
      eyebrow: "पोषण और स्वास्थ्य नेतृत्व",
      heading: "Dr. Tulasi Anagha का संदेश",
      credential: "PhD, खाद्य विज्ञान और पोषण",
      role: "पोषण सलाहकार बोर्ड सदस्य",
      portraitAlt:
        "Dr. Tulasi Anagha, पोषण सलाहकार बोर्ड सदस्य, के लिए आद्याक्षर वाला प्लेसहोल्डर। कोई फ़ोटोग्राफ़ नहीं दिखाया गया है।",
      p1: "Kalonlife में हम मानते हैं कि सच्ची तंदुरुस्ती शारीरिक स्वास्थ्य से आगे की बात है — इसमें आत्मविश्वास, संतुलन और आगे बढ़ने का अवसर भी शामिल है। हमारा उद्देश्य स्वस्थ जीवनशैली को प्रेरित करना है, और व्यक्तियों तथा परिवारों को एक बेहतर भविष्य बनाने के लिए सशक्त बनाना है।",
      p2: "हम जो भी उत्पाद बनाते हैं और जो भी पहल करते हैं, उसमें गुणवत्ता, देखभाल और समुदाय के प्रति हमारी प्रतिबद्धता मार्गदर्शक रहती है। हमें गर्व है कि हम एक ऐसे आंदोलन का हिस्सा हैं जो लोगों को अपने स्वास्थ्य की ज़िम्मेदारी लेने और अपनी क्षमता को खोलने के लिए प्रोत्साहित करता है।",
      p3: "आइए, Kalonlife परिवार के माध्यम से सकारात्मकता, स्वास्थ्य और अवसर को साथ मिलकर आगे बढ़ाते रहें।",
      regards: "स्नेह सहित,",
    },
    beliefs: {
      eyebrow: "हमारे मूल विश्वास",
      wellbeing: {
        title: "समग्र तंदुरुस्ती",
        description:
          "सच्चा स्वास्थ्य केवल शारीरिक फ़िटनेस नहीं है — इसमें आत्मविश्वास, संतुलन और विकास भी शामिल है।",
      },
      care: {
        title: "गुणवत्ता और देखभाल",
        description: "हर उत्पाद गुणवत्ता और समुदाय के प्रति हमारी अटल प्रतिबद्धता को दर्शाता है।",
      },
      positivity: {
        title: "सकारात्मकता",
        description: "Kalonlife परिवार के माध्यम से स्वास्थ्य और अवसर फैलाना।",
      },
    },
    visual: {
      heading: "उद्देश्य के साथ नेतृत्व",
      description:
        "एक स्वस्थ भविष्य बनाने के लिए केवल उत्पाद पर्याप्त नहीं। इसके लिए दृष्टि, सत्यनिष्ठा, ज्ञान और ऐसे लोगों की ज़रूरत है जो सकारात्मक बदलाव के लिए प्रतिबद्ध हों।",
      imageAlt: "भारतीय वयस्क और एक बच्चा अनाज, साग और फल का घरेलू भोजन साथ तैयार करते हुए",
    },
    closing: {
      heading: "साथ मिलकर स्वास्थ्य का भविष्य बनाना",
      description:
        "Kalonlife में नेतृत्व का अर्थ ऐसा वातावरण बनाना है जहाँ लोग बेहतर स्वास्थ्य का प्रयास कर सकें, अपनी क्षमता विकसित कर सकें और मज़बूत समुदायों में योगदान दे सकें।",
    },
    finalCta: {
      heading: "Kalonlife की यात्रा का हिस्सा बनें",
      description:
        "हमारे स्वास्थ्य उत्पाद देखें और Kalonlife के पीछे के मूल्यों, लोगों और दृष्टि को जानें।",
      explore: "उत्पाद देखें",
      whyChoose: "Kalonlife को क्यों चुनें",
    },
  },
};

Object.assign(locales, extraLocales, extraLocalesB, extraLocalesC);

function applyIdentity(leadership) {
  leadership.chairman = { ...leadership.chairman, ...identity.chairman };
  leadership.advisor = { ...leadership.advisor, ...identity.advisor };
  for (const id of ["quality", "integrity", "empowerment"]) {
    leadership.pillars[id].number = numbers[id];
  }
  for (const id of ["wellbeing", "care", "positivity"]) {
    leadership.beliefs[id].number = numbers[id];
  }
  if (!leadership.advisor.credential.startsWith("PhD")) {
    throw new Error("Credential must keep the PhD title");
  }
  return leadership;
}

function flatten(value, prefix = "") {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.entries(value).flatMap(([key, child]) =>
      flatten(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

const protectedNamespaces = [
  "consultation",
  "whyChoose",
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

const enKeys = flatten(applyIdentity(structuredClone(locales.en.leadership))).sort();

for (const [locale, copy] of Object.entries(locales)) {
  const leadership = applyIdentity(structuredClone(copy.leadership));
  const keys = flatten(leadership).sort();
  if (keys.join("\n") !== enKeys.join("\n")) {
    const missing = enKeys.filter((key) => !keys.includes(key));
    const extra = keys.filter((key) => !enKeys.includes(key));
    throw new Error(`${locale} key mismatch missing=${missing} extra=${extra}`);
  }

  const file = path.join(messagesDir, `${locale}.json`);
  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw);
  const before = new Set(Object.keys(data));
  for (const name of protectedNamespaces) {
    if (name in data && data[name] == null) {
      throw new Error(`${locale} namespace ${name} is empty before write`);
    }
  }

  data.leadership = leadership;
  if (!data.routes?.chairmanMessage) {
    throw new Error(`${locale} is missing routes.chairmanMessage`);
  }
  data.routes.chairmanMessage.title = copy.seo.title;
  data.routes.chairmanMessage.description = copy.seo.description;

  for (const key of before) {
    if (!(key in data)) {
      throw new Error(`${locale} dropped namespace ${key}`);
    }
  }

  const next = `${JSON.stringify(data, null, 2)}\n`;
  const check = JSON.parse(next);
  for (const name of protectedNamespaces) {
    if (name in data && JSON.stringify(check[name]) !== JSON.stringify(data[name])) {
      throw new Error(`${locale} changed protected namespace ${name}`);
    }
  }
  if (!String(next).includes("10125999000084") && raw.includes("10125999000084")) {
    throw new Error(`${locale} lost the FSSAI license`);
  }
  fs.writeFileSync(file, next);
  console.log(`updated ${locale}`);
}

console.log("locales written", Object.keys(locales).join(", "));
