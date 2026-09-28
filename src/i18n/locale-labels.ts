import type { Locale } from "./routing";

type LocaleName = {
  native: string;
  english: string;
};

export const localeNames: Record<Locale, LocaleName> = {
  en: { native: "English", english: "English" },
  hi: { native: "हिन्दी (Hindi)", english: "Hindi" },
  te: { native: "తెలుగు (Telugu)", english: "Telugu" },
  ta: { native: "தமிழ் (Tamil)", english: "Tamil" },
  kn: { native: "ಕನ್ನಡ (Kannada)", english: "Kannada" },
  ml: { native: "മലയാളം (Malayalam)", english: "Malayalam" },
  mr: { native: "मराठी (Marathi)", english: "Marathi" },
  bn: { native: "বাংলা (Bengali)", english: "Bengali" },
  gu: { native: "ગુજરાતી (Gujarati)", english: "Gujarati" },
  or: { native: "ଓଡ଼ିଆ (Odia)", english: "Odia" },
  pa: { native: "ਪੰਜਾਬੀ (Punjabi)", english: "Punjabi" },
};
