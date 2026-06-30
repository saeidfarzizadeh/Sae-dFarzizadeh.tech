import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { PaperCard } from "@/components/papers/PaperCard";
import type { Locale } from "@/i18n/locales";
import {
  getPublishedBlogs,
  getPublishedGalleries,
  getPublishedInventions,
  getPublishedPapers,
} from "@/lib/content";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("siteTitle"),
    description: t("siteDescription"),
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tStatus = await getTranslations("status");
  const latestPosts = getPublishedBlogs(locale).slice(0, 2);
  const latestInventions = getPublishedInventions(locale).slice(0, 2);
  const latestGallery = getPublishedGalleries(locale).slice(0, 1);
  const latestPaper = getPublishedPapers(locale).slice(0, 1);

  return (
    <div>
      <section className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            {t("tagline")}
          </p>
          <h1 className="font-display max-w-4xl text-5xl font-semibold tracking-tight text-neutral-900 md:text-6xl dark:text-neutral-50">
            {t("headline")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
            >
              {t("readInsights")}
            </Link>
            <Link
              href="/inventions"
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              {t("exploreInventions")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
              {t("latestInsights")}
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              {t("latestInsightsDesc")}
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
          >
            {tCommon("viewAll")}
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {latestPosts.map((post) => (
            <PostCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              title={post.title}
              description={post.description}
              date={post.date}
              locale={locale}
              coverImage={post.coverImage}
              meta={tCommon("minRead", { minutes: post.readingTime })}
              tags={post.tags}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
                {t("featuredInventions")}
              </h2>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                {t("featuredInventionsDesc")}
              </p>
            </div>
            <Link
              href="/inventions"
              className="text-sm font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
            >
              {tCommon("viewAll")}
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {latestInventions.map((item) => (
              <PostCard
                key={item.slug}
                href={`/inventions/${item.slug}`}
                title={item.title}
                description={item.description}
                date={item.date}
                locale={locale}
                coverImage={item.coverImage}
                meta={tStatus(item.status)}
                tags={item.techStack}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-10 dark:border-neutral-800 dark:bg-neutral-950">
            <h2 className="font-display text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
              {t("galleryTitle")}
            </h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-400">
              {t("galleryDesc")}
            </p>
            {latestGallery[0] ? (
              <PostCard
                href={`/gallery/${latestGallery[0].slug}`}
                title={latestGallery[0].title}
                description={latestGallery[0].description}
                date={latestGallery[0].date}
                locale={locale}
                coverImage={latestGallery[0].coverImage}
                meta={latestGallery[0].location}
              />
            ) : null}
            <Link
              href="/gallery"
              className="mt-6 inline-block text-sm font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
            >
              {t("viewGallery")}
            </Link>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-10 dark:border-neutral-800 dark:bg-neutral-950">
            <h2 className="font-display text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
              {t("papersTitle")}
            </h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-400">
              {t("papersDesc")}
            </p>
            {latestPaper[0] ? (
              <div className="mt-6">
                <PaperCard
                  href={`/papers/${latestPaper[0].slug}`}
                  title={latestPaper[0].title}
                  description={latestPaper[0].description}
                  date={latestPaper[0].date}
                  locale={locale}
                  authors={latestPaper[0].authors}
                  journal={latestPaper[0].journal}
                  tags={latestPaper[0].tags}
                />
              </div>
            ) : null}
            <Link
              href="/papers"
              className="mt-6 inline-block text-sm font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
            >
              {t("viewPapers")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
            {t("poetryTitle")}
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400">
            {t("poetryDesc")}
          </p>
          <Link
            href="/poetry"
            className="mt-6 inline-block text-sm font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
          >
            {t("readPoetry")}
          </Link>
        </div>
      </section>
    </div>
  );
}
