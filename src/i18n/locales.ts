export const locales = ["en", "fa", "tr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fa: "فارسی",
  tr: "Türkçe",
};

export const dateLocales: Record<Locale, string> = {
  en: "en-US",
  fa: "fa-IR",
  tr: "tr-TR",
};

export function isRtl(locale: string) {
  return locale === "fa";
}
