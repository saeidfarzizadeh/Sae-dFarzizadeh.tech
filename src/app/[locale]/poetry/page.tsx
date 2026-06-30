import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/locales";
import { getPublishedPoetry } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "poetry" });

  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function PoetryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("poetry");
  const poems = getPublishedPoetry(locale);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12">
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

      <div className="space-y-8">
        {poems.map((poem) => (
          <article
            key={poem.slug}
            className="rounded-2xl border border-neutral-200 p-8 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900/40"
          >
            <div className="mb-3 flex items-center gap-3 text-sm text-neutral-500">
              <time dateTime={poem.date.toISOString()}>
                {formatDate(poem.date, locale)}
              </time>
              {poem.mood ? <span>· {poem.mood}</span> : null}
            </div>
            <h2 className="font-display text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
              <Link
                href={`/poetry/${poem.slug}`}
                className="underline-offset-4 hover:underline"
              >
                {poem.title}
              </Link>
            </h2>
          </article>
        ))}
      </div>
    </div>
  );
}
