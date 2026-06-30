import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/locales";

type NotFoundContentType =
  | "post"
  | "poem"
  | "paper"
  | "album"
  | "caseStudy";

export async function getContentNotFoundMetadata(
  locale: Locale,
  type: NotFoundContentType,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "errors" });

  const keys: Record<NotFoundContentType, string> = {
    post: "postNotFound",
    poem: "poemNotFound",
    paper: "paperNotFound",
    album: "albumNotFound",
    caseStudy: "caseStudyNotFound",
  };

  return { title: t(keys[type]) };
}
