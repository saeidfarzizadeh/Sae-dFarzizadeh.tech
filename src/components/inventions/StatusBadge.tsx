import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

const statusStyles = {
  concept: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
  prototype:
    "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  patented:
    "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
  deployed:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
};

type StatusBadgeProps = {
  status: keyof typeof statusStyles;
};

export async function StatusBadge({ status }: StatusBadgeProps) {
  const t = await getTranslations("status");

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-medium",
        statusStyles[status],
      )}
    >
      {t(status)}
    </span>
  );
}
