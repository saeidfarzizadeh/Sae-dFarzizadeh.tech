import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/locales";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          {t("label")}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-50">
          {t("title")}
        </h1>
      </header>

      <div className="space-y-6 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p>
          {t("p3Part1")}{" "}
          <Link
            href="/blog"
            className="font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
          >
            {t("insightsLink")}
          </Link>{" "}
          {t("p3Part2")}{" "}
          <Link
            href="/inventions"
            className="font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
          >
            {t("caseStudiesLink")}
          </Link>
          {locale === "en" ? " " : ""}
          {t("p3Part3")}
        </p>
      </div>
    </div>
  );
}
