import { getTranslations } from "next-intl/server";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { PostHeader } from "@/components/blog/PostHeader";
import type { Locale } from "@/i18n/locales";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type GalleryAlbumLayoutProps = {
  title: string;
  description: string;
  date: Date;
  locale: Locale;
  location?: string;
  coverImage?: string;
  photos: GalleryImage[];
  children: React.ReactNode;
};

export async function GalleryAlbumLayout({
  title,
  description,
  date,
  locale,
  location,
  coverImage,
  photos,
  children,
}: GalleryAlbumLayoutProps) {
  const t = await getTranslations("gallery");
  const meta = location ? [location, t("photoCount", { count: photos.length })] : [t("photoCount", { count: photos.length })];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <PostHeader
        title={title}
        description={description}
        date={date}
        locale={locale}
        coverImage={coverImage}
        meta={meta}
      />
      {children ? (
        <div className="prose-neutral mx-auto mb-12 max-w-3xl">{children}</div>
      ) : null}
      <PhotoGrid images={photos} columns={3} />
    </div>
  );
}
