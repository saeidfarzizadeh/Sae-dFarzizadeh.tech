import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
  centered?: boolean;
};

export function SectionHeader({
  label,
  title,
  description,
  viewAllHref,
  viewAllLabel,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        centered && "text-center sm:flex-col sm:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {label ? <p className="section-label mb-3">{label}</p> : null}
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>
      {viewAllHref && viewAllLabel ? (
        <Link href={viewAllHref} className="link-fade shrink-0">
          {viewAllLabel} →
        </Link>
      ) : null}
    </header>
  );
}
