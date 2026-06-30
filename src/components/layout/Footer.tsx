import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="relative mt-auto border-t border-border-subtle">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent), transparent)",
        }}
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p className="font-display text-base text-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="text-muted">{t("copyright")}</span>
        </p>
        <p className="max-w-md text-end leading-relaxed md:text-start">
          {t("builtWith")}
        </p>
      </div>
    </footer>
  );
}
