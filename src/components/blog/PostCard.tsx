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
  compact?: boolean;
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
  compact = false,
}: PostCardProps) {
  const t = await getTranslations("common");

  return (
    <article className="card-elevated group overflow-hidden">
      <Link href={href} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-surface-muted">
          {coverImage ? (
            <>
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
            </>
          ) : (
            <div
              className="flex h-full items-center justify-center text-sm text-muted"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-soft), var(--surface-muted))",
              }}
            >
              {t("noCoverImage")}
            </div>
          )}
        </div>
        <div className={compact ? "p-5" : "p-6"}>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
            <time dateTime={date.toISOString()}>{formatDate(date, locale)}</time>
            {meta ? (
              <>
                <span className="text-border-subtle">·</span>
                <span className="text-accent">{meta}</span>
              </>
            ) : null}
          </div>
          <h2 className="font-display text-2xl font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
            {title}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
            {description}
          </p>
          {tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border-subtle bg-accent-soft px-2.5 py-1 text-xs font-medium text-foreground"
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
