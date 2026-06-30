import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <SectionHeader
        label={t("label")}
        title={t("title")}
        description={t("description")}
        centered
      />

      <div className="space-y-6">
        {poems.map((poem) => (
          <article
            key={poem.slug}
            className="card-elevated group p-8 md:p-10"
          >
            <div className="mb-4 flex flex-wrap items-center justify-center gap-3 text-sm text-muted">
              <time
                dateTime={poem.date.toISOString()}
                className="rounded-full border border-border-subtle bg-accent-soft px-3 py-1 text-xs font-semibold"
              >
                {formatDate(poem.date, locale)}
              </time>
              {poem.mood ? (
                <span className="text-accent">{poem.mood}</span>
              ) : null}
            </div>
            <h2 className="text-center font-display text-3xl font-semibold text-foreground md:text-4xl">
              <Link
                href={`/poetry/${poem.slug}`}
                className="transition-colors hover:text-accent"
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
