import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PaperCard } from "@/components/papers/PaperCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Locale } from "@/i18n/locales";
import { getPublishedPapers } from "@/lib/content";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "papers" });

  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function PapersPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("papers");
  const papers = getPublishedPapers(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <SectionHeader
        label={t("label")}
        title={t("title")}
        description={t("description")}
      />

      <div className="grid gap-8 md:grid-cols-2">
        {papers.map((paper) => (
          <PaperCard
            key={paper.slug}
            href={`/papers/${paper.slug}`}
            title={paper.title}
            description={paper.description}
            date={paper.date}
            locale={locale}
            authors={paper.authors}
            journal={paper.journal}
            tags={paper.tags}
          />
        ))}
      </div>
    </div>
  );
}
