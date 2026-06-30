import { MDXContent } from "@content-collections/mdx/react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { PaperLayout } from "@/components/papers/PaperLayout";
import type { Locale } from "@/i18n/locales";
import { locales } from "@/i18n/locales";
import { getPaperBySlug, getPublishedPapers } from "@/lib/content";
import { getContentNotFoundMetadata } from "@/lib/metadata-helpers";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPublishedPapers(locale).map((paper) => ({
      locale,
      slug: paper.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const paper = getPaperBySlug(locale, slug);

  if (!paper || !paper.published) {
    return getContentNotFoundMetadata(locale, "paper");
  }

  return {
    title: paper.title,
    description: paper.description,
  };
}

export default async function PaperPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const paper = getPaperBySlug(locale, slug);

  if (!paper || !paper.published) {
    notFound();
  }

  return (
    <PaperLayout
      title={paper.title}
      description={paper.description}
      date={paper.date}
      locale={locale}
      authors={paper.authors}
      journal={paper.journal}
      doi={paper.doi}
      pdf={paper.pdf}
    >
      <MDXContent code={paper.body} components={mdxComponents} />
    </PaperLayout>
  );
}
