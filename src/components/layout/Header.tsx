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
    <header className="glass-header sticky top-0 z-50">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-md"
            style={{
              background: "linear-gradient(135deg, var(--accent), #7c3aed)",
            }}
          >
            P
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
            {t("brand")}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-foreground"
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
          "flex h-9 cursor-pointer list-none items-center rounded-full border border-border-subtle bg-surface px-3.5 text-sm font-medium text-foreground",
          "[&::-webkit-details-marker]:hidden",
        )}
      >
        {menuLabel}
      </summary>
      <nav className="absolute end-0 z-50 mt-2 max-h-[70vh] w-56 overflow-y-auto rounded-2xl border border-border-subtle bg-surface p-2 shadow-[var(--shadow-card)]">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent-soft"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
