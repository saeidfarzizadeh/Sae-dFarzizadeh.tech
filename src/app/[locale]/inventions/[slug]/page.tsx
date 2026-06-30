import { MDXContent } from "@content-collections/mdx/react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/inventions/CaseStudyLayout";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import type { Locale } from "@/i18n/locales";
import { locales } from "@/i18n/locales";
import { getInventionBySlug, getPublishedInventions } from "@/lib/content";
import { getContentNotFoundMetadata } from "@/lib/metadata-helpers";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPublishedInventions(locale).map((item) => ({
      locale,
      slug: item.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const invention = getInventionBySlug(locale, slug);

  if (!invention || !invention.published) {
    return getContentNotFoundMetadata(locale, "caseStudy");
  }

  return {
    title: invention.title,
    description: invention.description,
  };
}

export default async function InventionPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const invention = getInventionBySlug(locale, slug);

  if (!invention || !invention.published) {
    notFound();
  }

  return (
    <CaseStudyLayout
      title={invention.title}
      description={invention.description}
      status={invention.status}
      techStack={invention.techStack}
      gallery={invention.gallery}
      github={invention.github}
      demo={invention.demo}
      coverImage={invention.coverImage}
    >
      <MDXContent code={invention.body} components={mdxComponents} />
    </CaseStudyLayout>
  );
}
