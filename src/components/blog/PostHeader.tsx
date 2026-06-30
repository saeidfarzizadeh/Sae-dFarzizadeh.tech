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
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted">
        <time
          dateTime={date.toISOString()}
          className="rounded-full border border-border-subtle bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground"
        >
          {formatDate(date, locale)}
        </time>
        {meta.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border-subtle px-3 py-1 text-xs font-medium text-muted"
          >
            {item}
          </span>
        ))}
      </div>
      <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          {description}
        </p>
      ) : null}
      {coverImage ? (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-border-subtle shadow-[var(--shadow-card)]">
          <Image
            src={coverImage}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ) : null}
    </header>
  );
}
