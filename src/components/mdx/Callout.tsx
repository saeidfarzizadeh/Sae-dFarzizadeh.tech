import { cn } from "@/lib/utils";

type CalloutProps = {
  type?: "info" | "insight" | "warning";
  children: React.ReactNode;
};

const styles = {
  info: "border-blue-300/40 bg-blue-50/80 text-blue-950 dark:border-blue-500/30 dark:bg-blue-950/40 dark:text-blue-100",
  insight:
    "border-violet-300/50 bg-violet-50/90 text-violet-950 dark:border-violet-500/30 dark:bg-violet-950/40 dark:text-violet-100",
  warning:
    "border-amber-300/50 bg-amber-50/90 text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-100",
};

const accents = {
  info: "bg-blue-500",
  insight: "bg-violet-500",
  warning: "bg-amber-500",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <aside
      className={cn(
        "relative my-8 overflow-hidden rounded-2xl border ps-6 pe-5 py-5 text-sm leading-relaxed shadow-[var(--shadow-soft)]",
        styles[type],
      )}
    >
      <div
        className={cn(
          "absolute inset-y-3 start-0 w-1 rounded-full",
          accents[type],
        )}
      />
      {children}
    </aside>
  );
}
