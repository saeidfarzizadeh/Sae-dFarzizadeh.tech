import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import readingTime from "reading-time";
import { z } from "zod";
import { locales } from "./src/i18n/locales";

const localeSchema = z.enum(locales);

const baseFields = {
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  published: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
};

function parseLocalizedPath(metaPath: string) {
  const segments = metaPath.replace(/\\/g, "/").split("/");
  const locale = localeSchema.parse(segments[0]);
  const slug = segments[segments.length - 1];

  return { locale, slug };
}

const blog = defineCollection({
  name: "blog",
  directory: "content",
  include: "**/blog/**/*.mdx",
  schema: z.object({
    ...baseFields,
    category: z.enum(["research", "tutorial", "opinion"]).default("research"),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);
    const stats = readingTime(document.content);
    const { locale, slug } = parseLocalizedPath(document._meta.path);

    return {
      ...document,
      body,
      locale,
      slug,
      readingTime: Math.ceil(stats.minutes),
    };
  },
});

const inventions = defineCollection({
  name: "inventions",
  directory: "content",
  include: "**/inventions/**/*.mdx",
  schema: z.object({
    ...baseFields,
    status: z.enum(["concept", "prototype", "patented", "deployed"]),
    techStack: z.array(z.string()).default([]),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        }),
      )
      .default([]),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);
    const { locale, slug } = parseLocalizedPath(document._meta.path);

    return {
      ...document,
      body,
      locale,
      slug,
    };
  },
});

const poetry = defineCollection({
  name: "poetry",
  directory: "content",
  include: "**/poetry/**/*.mdx",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    mood: z.string().optional(),
    published: z.boolean().default(true),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);
    const { locale, slug } = parseLocalizedPath(document._meta.path);

    return {
      ...document,
      body,
      locale,
      slug,
    };
  },
});

const gallery = defineCollection({
  name: "gallery",
  directory: "content",
  include: "**/gallery/**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    published: z.boolean().default(true),
    location: z.string().optional(),
    coverImage: z.string().optional(),
    photos: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        }),
      )
      .default([]),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);
    const { locale, slug } = parseLocalizedPath(document._meta.path);

    return {
      ...document,
      body,
      locale,
      slug,
    };
  },
});

const papers = defineCollection({
  name: "papers",
  directory: "content",
  include: "**/papers/**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    published: z.boolean().default(true),
    authors: z.array(z.string()).default([]),
    journal: z.string().optional(),
    doi: z.string().optional(),
    pdf: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);
    const stats = readingTime(document.content);
    const { locale, slug } = parseLocalizedPath(document._meta.path);

    return {
      ...document,
      body,
      locale,
      slug,
      readingTime: Math.ceil(stats.minutes),
    };
  },
});

export default defineConfig({
  content: [blog, inventions, poetry, gallery, papers],
});
