"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/locales";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  label: string;
};

export function LanguageSwitcher({ label }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-xs text-neutral-500 lg:inline">{label}</span>
      <div className="flex rounded-full border border-neutral-200 p-0.5 dark:border-neutral-800">
        {locales.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => router.replace(pathname, { locale: item })}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
              item === locale
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
            )}
            aria-current={item === locale ? "true" : undefined}
          >
            {localeLabels[item]}
          </button>
        ))}
      </div>
    </div>
  );
}
