import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PostCard } from "@/components/blog/PostCard";
import type { Locale } from "@/i18n/locales";
import { getPublishedInventions } from "@/lib/content";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "inventions" });

  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function InventionsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("inventions");
  const tStatus = await getTranslations("status");
  const inventions = getPublishedInventions(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          {t("label")}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-50">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          {t("description")}
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {inventions.map((item) => (
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
  );
}
