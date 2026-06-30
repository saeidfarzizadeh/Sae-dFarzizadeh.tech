import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { dateLocales, type Locale } from "@/i18n/locales";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
