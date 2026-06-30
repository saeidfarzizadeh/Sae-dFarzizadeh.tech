import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/locales";
import { formatDate } from "@/lib/utils";

type PaperCardProps = {
  href: string;
  title: string;
  description: string;
  date: Date;
  locale: Locale;
  authors: string[];
  journal?: string;
  tags?: string[];
};

export async function PaperCard({
  href,
  title,
  description,
  date,
  locale,
  authors,
  journal,
  tags = [],
}: PaperCardProps) {
  const t = await getTranslations("papers");

  return (
    <article className="card-elevated group p-6">
      <Link href={href} className="block">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
          <time dateTime={date.toISOString()}>{formatDate(date, locale)}</time>
          {journal ? (
            <>
              <span>·</span>
              <span className="text-accent">{journal}</span>
            </>
          ) : null}
        </div>
        <h2 className="font-display text-2xl font-semibold text-foreground transition-colors group-hover:text-accent">
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {t("authors")}:{" "}
          <span className="text-foreground">{authors.join(", ")}</span>
        </p>
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
      </Link>
    </article>
  );
}
