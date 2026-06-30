import { allBlogs, allGalleries, allInventions, allPapers, allPoetries } from "content-collections";
import type { Locale } from "@/i18n/locales";

export function getPublishedBlogs(locale: Locale) {
  return allBlogs
    .filter((post) => post.published && post.locale === locale)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getBlogBySlug(locale: Locale, slug: string) {
  return allBlogs.find(
    (post) => post.slug === slug && post.locale === locale,
  );
}

export function getPublishedInventions(locale: Locale) {
  return allInventions
    .filter((item) => item.published && item.locale === locale)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getInventionBySlug(locale: Locale, slug: string) {
  return allInventions.find(
    (item) => item.slug === slug && item.locale === locale,
  );
}

export function getPublishedPoetry(locale: Locale) {
  return allPoetries
    .filter((item) => item.published && item.locale === locale)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getPoemBySlug(locale: Locale, slug: string) {
  return allPoetries.find(
    (item) => item.slug === slug && item.locale === locale,
  );
}

export function getPublishedGalleries(locale: Locale) {
  return allGalleries
    .filter((item) => item.published && item.locale === locale)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getGalleryBySlug(locale: Locale, slug: string) {
  return allGalleries.find(
    (item) => item.slug === slug && item.locale === locale,
  );
}

export function getPublishedPapers(locale: Locale) {
  return allPapers
    .filter((item) => item.published && item.locale === locale)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getPaperBySlug(locale: Locale, slug: string) {
  return allPapers.find(
    (item) => item.slug === slug && item.locale === locale,
  );
}
