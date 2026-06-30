import { getTranslations } from "next-intl/server";

type TechStackBadgesProps = {
  items: string[];
};

export async function TechStackBadges({ items }: TechStackBadgesProps) {
  if (items.length === 0) return null;

  const t = await getTranslations("common");

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">
        {t("techStack")}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:text-neutral-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
