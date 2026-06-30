import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { formatDate } from "@/lib/utils";

type PaperLayoutProps = {
  title: string;
  description: string;
  date: Date;
  locale: Locale;
  authors: string[];
  journal?: string;
  doi?: string;
  pdf?: string;
  children: React.ReactNode;
};

export async function PaperLayout({
  title,
  description,
  date,
  locale,
  authors,
  journal,
  doi,
  pdf,
  children,
}: PaperLayoutProps) {
  const t = await getTranslations("papers");
  const tCommon = await getTranslations("common");

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12 border-b border-neutral-200 pb-10 dark:border-neutral-800">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          {t("label")}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-50">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
        <dl className="mt-8 grid gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <div>
            <dt className="font-medium text-neutral-900 dark:text-neutral-200">
              {t("authors")}
            </dt>
            <dd>{authors.join(", ")}</dd>
          </div>
          {journal ? (
            <div>
              <dt className="font-medium text-neutral-900 dark:text-neutral-200">
                {t("journal")}
              </dt>
              <dd>{journal}</dd>
            </div>
          ) : null}
          <div>
            <dt className="font-medium text-neutral-900 dark:text-neutral-200">
              {t("publishedOn")}
            </dt>
            <dd>
              <time dateTime={date.toISOString()}>
                {formatDate(date, locale)}
              </time>
            </dd>
          </div>
          {doi ? (
            <div>
              <dt className="font-medium text-neutral-900 dark:text-neutral-200">
                {tCommon("doi")}
              </dt>
              <dd>
                <a
                  href={`https://doi.org/${doi}`}
                  className="underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  {doi}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
        {pdf ? (
          <a
            href={pdf}
            className="mt-6 inline-flex rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
            target="_blank"
            rel="noreferrer"
          >
            {t("downloadPdf")}
          </a>
        ) : null}
      </header>
      <div className="prose-neutral">{children}</div>
    </article>
  );
}
