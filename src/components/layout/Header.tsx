import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navHrefs = [
  "/",
  "/blog",
  "/inventions",
  "/poetry",
  "/gallery",
  "/papers",
  "/about",
] as const;

type NavHref = (typeof navHrefs)[number];

const navKeys: Record<NavHref, string> = {
  "/": "home",
  "/blog": "insights",
  "/inventions": "inventions",
  "/poetry": "poetry",
  "/gallery": "gallery",
  "/papers": "papers",
  "/about": "about",
};

export async function Header() {
  const t = await getTranslations("nav");
  const tLang = await getTranslations("language");

  const navItems = navHrefs.map((href) => ({
    href,
    label: t(navKeys[href]),
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="font-display shrink-0 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
        >
          {t("brand")}
        </Link>

        <nav className="hidden items-center gap-4 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher label={tLang("label")} />
          <MobileNav items={navItems} menuLabel={t("menu")} />
        </div>
      </div>
    </header>
  );
}

type NavItem = { href: NavHref; label: string };

function MobileNav({
  items,
  menuLabel,
}: {
  items: readonly NavItem[];
  menuLabel: string;
}) {
  return (
    <details className="group relative xl:hidden">
      <summary
        className={cn(
          "cursor-pointer list-none text-sm font-medium text-neutral-700 dark:text-neutral-300",
          "[&::-webkit-details-marker]:hidden",
        )}
      >
        {menuLabel}
      </summary>
      <nav className="absolute end-0 z-50 mt-3 max-h-[70vh] w-52 overflow-y-auto rounded-xl border border-neutral-200 bg-white p-2 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
