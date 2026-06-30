import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { StatusBadge } from "./StatusBadge";
import { TechStackBadges } from "./TechStackBadges";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type CaseStudyLayoutProps = {
  title: string;
  description: string;
  status: "concept" | "prototype" | "patented" | "deployed";
  techStack: string[];
  gallery: GalleryImage[];
  github?: string;
  demo?: string;
  coverImage?: string;
  children: React.ReactNode;
};

export async function CaseStudyLayout({
  title,
  description,
  status,
  techStack,
  gallery,
  github,
  demo,
  coverImage,
  children,
}: CaseStudyLayoutProps) {
  const t = await getTranslations("common");

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-12 max-w-3xl">
        <div className="mb-4">
          <StatusBadge status={status} />
        </div>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-50">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {github ? (
            <a
              href={github}
              className="font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
              target="_blank"
              rel="noreferrer"
            >
              {t("viewOnGithub")}
            </a>
          ) : null}
          {demo ? (
            <a
              href={demo}
              className="font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
              target="_blank"
              rel="noreferrer"
            >
              {t("liveDemo")}
            </a>
          ) : null}
        </div>
      </header>

      {coverImage ? (
        <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <Image
            src={coverImage}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1152px"
          />
        </div>
      ) : null}

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">{children}</div>
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <TechStackBadges items={techStack} />
          {gallery.length > 0 ? (
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
                {t("gallery")}
              </h3>
              <PhotoGrid images={gallery} columns={1} />
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
