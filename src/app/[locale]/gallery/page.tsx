import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PostCard } from "@/components/blog/PostCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Locale } from "@/i18n/locales";
import { getPublishedGalleries } from "@/lib/content";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });

  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("gallery");
  const albums = getPublishedGalleries(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <SectionHeader
        label={t("label")}
        title={t("title")}
        description={t("description")}
      />

      <div className="grid gap-8 md:grid-cols-2">
        {albums.map((album) => (
          <PostCard
            key={album.slug}
            href={`/gallery/${album.slug}`}
            title={album.title}
            description={album.description}
            date={album.date}
            locale={locale}
            coverImage={album.coverImage}
            meta={
              album.location
                ? `${album.location} · ${t("photoCount", { count: album.photos.length })}`
                : t("photoCount", { count: album.photos.length })
            }
          />
        ))}
      </div>
    </div>
  );
}
