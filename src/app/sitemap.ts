import type { MetadataRoute } from "next";
import { locales } from "@/i18n/locales";
import {
  getPublishedBlogs,
  getPublishedGalleries,
  getPublishedInventions,
  getPublishedPapers,
  getPublishedPoetry,
} from "@/lib/content";

const staticPaths = ["", "/about", "/blog", "/inventions", "/poetry", "/gallery", "/papers"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
      });
    }

    for (const post of getPublishedBlogs(locale)) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.date,
      });
    }

    for (const item of getPublishedInventions(locale)) {
      entries.push({
        url: `${baseUrl}/${locale}/inventions/${item.slug}`,
        lastModified: item.date,
      });
    }

    for (const poem of getPublishedPoetry(locale)) {
      entries.push({
        url: `${baseUrl}/${locale}/poetry/${poem.slug}`,
        lastModified: poem.date,
      });
    }

    for (const album of getPublishedGalleries(locale)) {
      entries.push({
        url: `${baseUrl}/${locale}/gallery/${album.slug}`,
        lastModified: album.date,
      });
    }

    for (const paper of getPublishedPapers(locale)) {
      entries.push({
        url: `${baseUrl}/${locale}/papers/${paper.slug}`,
        lastModified: paper.date,
      });
    }
  }

  return entries;
}
