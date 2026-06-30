import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p
        className="mb-4 font-display text-7xl font-semibold"
        style={{
          background: "linear-gradient(135deg, var(--accent), #7c3aed)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {t("code")}
      </p>
      <h1 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-muted">{t("description")}</p>
      <Link href="/" className="btn-primary mt-10">
        {t("backHome")}
      </Link>
    </div>
  );
}
