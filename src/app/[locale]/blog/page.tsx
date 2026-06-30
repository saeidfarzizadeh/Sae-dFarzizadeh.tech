import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PostCard } from "@/components/blog/PostCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Locale } from "@/i18n/locales";
import { getPublishedBlogs } from "@/lib/content";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const tCommon = await getTranslations("common");
  const tCategory = await getTranslations("category");
  const posts = getPublishedBlogs(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <SectionHeader
        label={t("label")}
        title={t("title")}
        description={t("description")}
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            href={`/blog/${post.slug}`}
            title={post.title}
            description={post.description}
            date={post.date}
            locale={locale}
            coverImage={post.coverImage}
            meta={`${tCommon("minRead", { minutes: post.readingTime })} · ${tCategory(post.category)}`}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
}
