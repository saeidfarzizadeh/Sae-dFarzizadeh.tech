import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { PaperCard } from "@/components/papers/PaperCard";
import { FeaturePanel } from "@/components/ui/FeaturePanel";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
  const tBlog = await getTranslations("blog");
  const tInventions = await getTranslations("inventions");
  const tCommon = await getTranslations("common");
  const tStatus = await getTranslations("status");
  const latestPosts = getPublishedBlogs(locale).slice(0, 2);
  const latestInventions = getPublishedInventions(locale).slice(0, 2);
  const latestGallery = getPublishedGalleries(locale).slice(0, 1);
  const latestPaper = getPublishedPapers(locale).slice(0, 1);

  return (
    <div>
      <section className="hero-mesh">
        <div className="hero-grid" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="section-label mb-6">{t("tagline")}</p>
          <h1 className="font-display max-w-4xl text-5xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {t("headline")}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-11 flex flex-wrap gap-4">
            <Link href="/blog" className="btn-primary">
              {t("readInsights")}
            </Link>
            <Link href="/inventions" className="btn-secondary">
              {t("exploreInventions")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <SectionHeader
          label={tBlog("label")}
          title={t("latestInsights")}
          description={t("latestInsightsDesc")}
          viewAllHref="/blog"
          viewAllLabel={tCommon("viewAll")}
        />
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

      <section className="section-band">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <SectionHeader
            label={tInventions("label")}
            title={t("featuredInventions")}
            description={t("featuredInventionsDesc")}
            viewAllHref="/inventions"
            viewAllLabel={tCommon("viewAll")}
          />
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

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          <FeaturePanel accent>
            <h2 className="font-display text-3xl font-semibold text-foreground">
              {t("galleryTitle")}
            </h2>
            <p className="mt-3 text-muted">{t("galleryDesc")}</p>
            {latestGallery[0] ? (
              <div className="mt-6">
                <PostCard
                  href={`/gallery/${latestGallery[0].slug}`}
                  title={latestGallery[0].title}
                  description={latestGallery[0].description}
                  date={latestGallery[0].date}
                  locale={locale}
                  coverImage={latestGallery[0].coverImage}
                  meta={latestGallery[0].location}
                  compact
                />
              </div>
            ) : null}
            <Link href="/gallery" className="link-fade mt-6 inline-block">
              {t("viewGallery")}
            </Link>
          </FeaturePanel>

          <FeaturePanel>
            <h2 className="font-display text-3xl font-semibold text-foreground">
              {t("papersTitle")}
            </h2>
            <p className="mt-3 text-muted">{t("papersDesc")}</p>
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
            <Link href="/papers" className="link-fade mt-6 inline-block">
              {t("viewPapers")}
            </Link>
          </FeaturePanel>
        </div>
      </section>

      <section className="section-band">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <FeaturePanel className="text-center">
            <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
              {t("poetryTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              {t("poetryDesc")}
            </p>
            <Link href="/poetry" className="btn-secondary mt-8">
              {t("readPoetry")}
            </Link>
          </FeaturePanel>
        </div>
      </section>
    </div>
  );
}
