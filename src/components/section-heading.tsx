import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "start",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "start" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        !centered && action && "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
        {eyebrow && (
          <p
            className={cn(
              "eyebrow flex items-center gap-2.5",
              centered && "justify-center",
            )}
          >
            <span aria-hidden className="h-px w-6 bg-primary/40" />
            {eyebrow}
          </p>
        )}

        <h2 className="mt-4 text-[clamp(1.85rem,3.4vw,2.75rem)] font-semibold leading-[1.12]">
          {title}
        </h2>

        {description && (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
