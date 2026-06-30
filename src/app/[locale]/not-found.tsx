import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
        {t("code")}
      </p>
      <h1 className="font-display text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        {t("description")}
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
