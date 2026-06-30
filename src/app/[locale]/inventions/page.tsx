import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PostCard } from "@/components/blog/PostCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <SectionHeader
        label={t("label")}
        title={t("title")}
        description={t("description")}
      />

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
