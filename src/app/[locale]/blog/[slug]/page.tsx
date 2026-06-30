import { MDXContent } from "@content-collections/mdx/react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PostHeader } from "@/components/blog/PostHeader";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import type { Locale } from "@/i18n/locales";
import { locales } from "@/i18n/locales";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/content";
import { getContentNotFoundMetadata } from "@/lib/metadata-helpers";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPublishedBlogs(locale).map((post) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogBySlug(locale, slug);

  if (!post || !post.published) {
    return getContentNotFoundMetadata(locale, "post");
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogBySlug(locale, slug);
  const tCommon = await getTranslations("common");
  const tCategory = await getTranslations("category");

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostHeader
        title={post.title}
        description={post.description}
        date={post.date}
        locale={locale}
        coverImage={post.coverImage}
        meta={[
          tCommon("minRead", { minutes: post.readingTime }),
          tCategory(post.category),
          ...post.tags,
        ]}
      />
      <div className="prose-neutral">
        <MDXContent code={post.body} components={mdxComponents} />
      </div>
    </article>
  );
}
