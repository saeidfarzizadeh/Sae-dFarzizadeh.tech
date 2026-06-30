import { MDXContent } from "@content-collections/mdx/react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import type { Locale } from "@/i18n/locales";
import { locales } from "@/i18n/locales";
import { getPoemBySlug, getPublishedPoetry } from "@/lib/content";
import { getContentNotFoundMetadata } from "@/lib/metadata-helpers";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPublishedPoetry(locale).map((poem) => ({
      locale,
      slug: poem.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const poem = getPoemBySlug(locale, slug);

  if (!poem || !poem.published) {
    return getContentNotFoundMetadata(locale, "poem");
  }

  return {
    title: poem.title,
  };
}

export default async function PoemPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const poem = getPoemBySlug(locale, slug);

  if (!poem || !poem.published) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <header className="mb-12 text-center">
        <p className="mb-4 text-sm text-neutral-500">
          {formatDate(poem.date, locale)}
          {poem.mood ? ` · ${poem.mood}` : ""}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-50">
          {poem.title}
        </h1>
      </header>
      <div className="font-display text-lg leading-loose text-neutral-800 dark:text-neutral-200">
        <MDXContent code={poem.body} components={mdxComponents} />
      </div>
    </article>
  );
}
