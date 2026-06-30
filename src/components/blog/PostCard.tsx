import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/locales";
import { formatDate } from "@/lib/utils";

type PostCardProps = {
  href: string;
  title: string;
  description: string;
  date: Date;
  locale: Locale;
  coverImage?: string;
  meta?: string;
  tags?: string[];
};

export async function PostCard({
  href,
  title,
  description,
  date,
  locale,
  coverImage,
  meta,
  tags = [],
}: PostCardProps) {
  const t = await getTranslations("common");

  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
      <Link href={href} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 text-sm text-neutral-500 dark:from-neutral-900 dark:to-neutral-800 dark:text-neutral-400">
              {t("noCoverImage")}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-neutral-500">
            <span>{formatDate(date, locale)}</span>
            {meta ? <span>· {meta}</span> : null}
          </div>
          <h2 className="font-display text-2xl font-semibold text-neutral-900 group-hover:underline dark:text-neutral-50">
            {title}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
          {tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
