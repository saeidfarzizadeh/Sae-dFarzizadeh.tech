import { cn } from "@/lib/utils";

type FeaturePanelProps = {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
};

export function FeaturePanel({
  children,
  className,
  accent = false,
}: FeaturePanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border-subtle p-8 md:p-10",
        accent
          ? "bg-gradient-to-br from-accent-soft via-surface to-surface"
          : "bg-surface",
        "shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--accent-soft)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
