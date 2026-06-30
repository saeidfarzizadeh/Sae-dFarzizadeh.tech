import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="mt-auto border-t border-neutral-200 py-10 dark:border-neutral-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-sm text-neutral-500 dark:text-neutral-400 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {t("copyright")}
        </p>
        <p>{t("builtWith")}</p>
      </div>
    </footer>
  );
}
