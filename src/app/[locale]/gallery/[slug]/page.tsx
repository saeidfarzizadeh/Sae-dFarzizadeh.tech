import { MDXContent } from "@content-collections/mdx/react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { GalleryAlbumLayout } from "@/components/gallery/GalleryAlbumLayout";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import type { Locale } from "@/i18n/locales";
import { locales } from "@/i18n/locales";
import { getGalleryBySlug, getPublishedGalleries } from "@/lib/content";
import { getContentNotFoundMetadata } from "@/lib/metadata-helpers";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPublishedGalleries(locale).map((album) => ({
      locale,
      slug: album.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const album = getGalleryBySlug(locale, slug);

  if (!album || !album.published) {
    return getContentNotFoundMetadata(locale, "album");
  }

  return {
    title: album.title,
    description: album.description,
  };
}

export default async function GalleryAlbumPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const album = getGalleryBySlug(locale, slug);

  if (!album || !album.published) {
    notFound();
  }

  return (
    <GalleryAlbumLayout
      title={album.title}
      description={album.description}
      date={album.date}
      locale={locale}
      location={album.location}
      coverImage={album.coverImage}
      photos={album.photos}
    >
      <MDXContent code={album.body} components={mdxComponents} />
    </GalleryAlbumLayout>
  );
}
