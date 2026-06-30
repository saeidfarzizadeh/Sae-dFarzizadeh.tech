import Image from "next/image";
import type { Locale } from "@/i18n/locales";
import { formatDate } from "@/lib/utils";

type PostHeaderProps = {
  title: string;
  description?: string;
  date: Date;
  locale: Locale;
  coverImage?: string;
  meta?: string[];
};

export function PostHeader({
  title,
  description,
  date,
  locale,
  coverImage,
  meta = [],
}: PostHeaderProps) {
  return (
    <header className="mb-12">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
        <time dateTime={date.toISOString()}>{formatDate(date, locale)}</time>
        {meta.map((item) => (
          <span key={item}>· {item}</span>
        ))}
      </div>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-50">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      ) : null}
      {coverImage ? (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <Image
            src={coverImage}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      ) : null}
    </header>
  );
}
