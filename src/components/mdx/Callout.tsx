import Image from "next/image";
import { cn } from "@/lib/utils";

type CalloutProps = {
  type?: "info" | "insight" | "warning";
  children: React.ReactNode;
};

const styles = {
  info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-100",
  insight:
    "border-violet-200 bg-violet-50 text-violet-900 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-100",
  warning:
    "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-100",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <aside
      className={cn(
        "my-8 rounded-xl border px-5 py-4 text-sm leading-relaxed",
        styles[type],
      )}
    >
      {children}
    </aside>
  );
}
