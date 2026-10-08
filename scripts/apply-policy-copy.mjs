import { readFileSync, writeFileSync } from "node:fs";

const locales = ["en", "hi", "te", "ta", "kn", "ml", "mr", "bn", "gu", "or", "pa"];

const privacy = {
  intro: "Our policy on how we collect, use, and protect your information.",
  collect: {
    title: "Information We Collect",
    body: "We may collect personal details such as name, contact number, email address, shipping address, and order information.",
  },
  use: {
    title: "Use of Information",
    body: "Information is used for order processing, customer support, service improvement, and communication related to purchases.",
  },
  protection: {
    title: "Data Protection",
    body: "Reasonable security measures are implemented to protect user information. However, no online transmission is completely secure.",
  },
  sharing: {
    title: "Information Sharing",
    body: "We do not sell or rent personal information. Information may be shared only with service providers required to fulfill orders or legal obligations.",
  },
  rights: {
    title: "User Rights",
    body: "Users may request access, correction, or deletion of their personal information by contacting customer support.",
  },
};

const terms = {
  title: "Terms of Use",
  intro: "Please read these terms carefully before using this website.",
  acceptance: {
    title: "Acceptance of Terms",
    body: "By accessing or using this website, you agree to these Terms of Use.",
  },
  eligibility: {
    title: "Eligibility",
    body: "Users must be 18 years or older to place orders or register.",
  },
  usage: {
    title: "Use of Website",
    body: "You agree to use the website only for lawful purposes and not to misuse content, services, or systems.",
  },
  productInformation: {
    title: "Product Information",
    body: "Product descriptions, images, and details are provided for general information and may be updated without notice.",
  },
  health: {
    title: "Health Disclaimer",
    body: "Nutraceutical products are not intended to diagnose, treat, cure, or prevent any disease. Results may vary.",
  },
  intellectualProperty: {
    title: "Intellectual Property",
    body: "All website content, trademarks, logos, and materials belong to Kalonlife International India Private Limited unless otherwise stated.",
  },
  liability: {
    title: "Limitation of Liability",
    body: "The company is not liable for indirect, incidental, or consequential damages arising from website use or product usage.",
  },
  modifications: {
    title: "Changes to Terms",
    body: "Terms may be updated at any time. Continued use of the website constitutes acceptance of revised terms.",
  },
};

const shippingBody = {
  intro: "How we process and deliver orders.",
  processing: {
    title: "Order Processing",
    body: "Orders are processed within 2–3 business days after payment confirmation. Weekends and public holidays are excluded.",
  },
  timeline: {
    title: "Delivery Timeline",
    body: "Standard delivery usually takes 5–7 business days after dispatch. Delivery time may vary based on location and courier partner.",
  },
  charges: {
    title: "Shipping Charges",
    body: "Shipping charges, if applicable, are displayed at checkout or on the invoice.",
  },
  address: {
    title: "Delivery Address",
    body: "Customers are responsible for providing a complete and accurate delivery address. The company is not responsible for delays caused by incorrect address details.",
  },
  issues: {
    title: "Delays or Issues",
    body: "If an order is delayed, damaged, or missing, contact customer support within 48 hours of the expected delivery date.",
  },
};

const returnsBody = {
  intro: "Our policy on returns, refunds, and replacements.",
  noReturn: {
    title: "No Return / No Refund Policy",
    body: "Due to the nature of wellness and nutraceutical products, all sales are final. Products once sold are not returnable or refundable.",
  },
  damaged: {
    title: "Damaged or Incorrect Products",
    intro: "In case of damaged or wrong product delivery:",
    items: [
      "Notify us within 24 hours of receiving the order.",
      "Share clear images and invoice details.",
      "Replacement may be provided at the company's discretion after verification.",
    ],
  },
  ineligible: {
    title: "Non-Eligibility for Refund",
    intro: "Refunds will not be issued for:",
    items: [
      "Change of mind",
      "Improper usage",
      "Opened or used products",
      "Delays caused by courier partners",
    ],
  },
  associate: {
    title: "Associate & Promotional Purchases",
    body: "Products purchased under offers, discounts, rewards, or business volumes are non-refundable and non-returnable.",
  },
};

const disclaimerBody = {
  intro: "Important information about our products and website content.",
  general: {
    title: "General Information",
    body: "Information on this website is provided for general wellness education and product awareness.",
  },
  results: {
    title: "Individual Results",
    body: "Results may vary from person to person. No specific outcome is guaranteed.",
  },
  medical: {
    title: "Not a Medical Claim",
    body: "Products are not intended to diagnose, treat, cure, or prevent any disease.",
  },
  label: {
    title: "Label Information",
    body: "Always review product packaging, ingredients, usage directions, and warnings before use.",
  },
  advice: {
    title: "Professional Advice",
    body: "Consult a qualified healthcare or nutrition professional before using any nutraceutical product, especially if pregnant, nursing, under medication, or managing a medical condition.",
  },
  lifestyle: {
    title: "Lifestyle Responsibility",
    body: "Products are not a substitute for a balanced diet, healthy lifestyle, or medical advice.",
  },
  outcomes: {
    title: "No Guaranteed Outcomes",
    body: "Weight management, wellness, or performance-related outcomes depend on multiple individual factors.",
  },
  accuracy: {
    title: "Accuracy of Information",
    body: "While care is taken to keep information accurate, content may contain errors or omissions and may change without notice.",
  },
  liability: {
    title: "Limitation of Liability",
    body: "Kalonlife International India Private Limited is not responsible for misuse of products or reliance on website information.",
  },
  changes: {
    title: "Changes",
    body: "The company reserves the right to modify products, formulations, packaging, and website content without prior notice.",
  },
  acceptance: {
    title: "Acceptance",
    body: "Use of this website or purchase of products indicates acceptance of this disclaimer.",
  },
};

for (const locale of locales) {
  const path = new URL(`../messages/${locale}.json`, import.meta.url);
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.privacy = privacy;
  data.terms = terms;
  data.shippingBody = shippingBody;
  data.returnsBody = returnsBody;
  data.disclaimerBody = disclaimerBody;

  if (data.routes) {
    data.routes.privacy.description = privacy.intro;
    data.routes.terms.description = terms.intro;
    data.routes.shipping.description = shippingBody.intro;
    data.routes.returns.description = returnsBody.intro;
    data.routes.disclaimer.description = disclaimerBody.intro;
    if (data.routes.termsAndConditions) {
      data.routes.termsAndConditions.description = terms.intro;
    }
  }

  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}
