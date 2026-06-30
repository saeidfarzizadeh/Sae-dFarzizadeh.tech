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
      <span className="hidden text-xs font-medium text-muted lg:inline">
        {label}
      </span>
      <div className="flex rounded-full border border-border-subtle bg-surface p-0.5 shadow-[var(--shadow-soft)]">
        {locales.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => router.replace(pathname, { locale: item })}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200",
              item === locale
                ? "text-white shadow-sm"
                : "text-muted hover:text-foreground",
            )}
            style={
              item === locale
                ? {
                    background:
                      "linear-gradient(135deg, var(--accent), #7c3aed)",
                  }
                : undefined
            }
            aria-current={item === locale ? "true" : undefined}
          >
            {localeLabels[item]}
          </button>
        ))}
      </div>
    </div>
  );
}
