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
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <header className="mb-12">
        <p className="section-label mb-4">{t("label")}</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {t("title")}
        </h1>
      </header>

      <div className="space-y-6 text-lg leading-relaxed text-muted">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p>
          {t("p3Part1")}{" "}
          <Link
            href="/blog"
            className="font-medium text-accent underline underline-offset-4"
          >
            {t("insightsLink")}
          </Link>{" "}
          {t("p3Part2")}{" "}
          <Link
            href="/inventions"
            className="font-medium text-accent underline underline-offset-4"
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
