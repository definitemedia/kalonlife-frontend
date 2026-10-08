import type { Locale } from "./routing";

type LocaleName = {
  native: string;
  english: string;
};

export const localeNames: Record<Locale, LocaleName> = {
  en: { native: "English", english: "English" },
  hi: { native: "हिन्दी", english: "Hindi" },
  te: { native: "తెలుగు", english: "Telugu" },
  ta: { native: "தமிழ்", english: "Tamil" },
  kn: { native: "ಕನ್ನಡ", english: "Kannada" },
  ml: { native: "മലയാളം", english: "Malayalam" },
  mr: { native: "मराठी", english: "Marathi" },
  bn: { native: "বাংলা", english: "Bengali" },
  gu: { native: "ગુજરાતી", english: "Gujarati" },
  or: { native: "ଓଡ଼ିଆ", english: "Odia" },
  pa: { native: "ਪੰਜਾਬੀ", english: "Punjabi" },
};
