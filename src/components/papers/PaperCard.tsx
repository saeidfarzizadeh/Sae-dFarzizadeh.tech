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
    <article className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
      <Link href={href} className="block">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-neutral-500">
          <time dateTime={date.toISOString()}>{formatDate(date, locale)}</time>
          {journal ? <span>· {journal}</span> : null}
        </div>
        <h2 className="font-display text-2xl font-semibold text-neutral-900 group-hover:underline dark:text-neutral-50">
          {title}
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {t("authors")}: {authors.join(", ")}
        </p>
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
      </Link>
    </article>
  );
}
