import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "start",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "start" | "center";
  tone?: "light" | "dark";
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
              tone === "dark" && "text-lime",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "h-px w-6",
                tone === "dark" ? "bg-lime/50" : "bg-primary/40",
              )}
            />
            {eyebrow}
          </p>
        )}

        <h2
          className={cn(
            "mt-4 text-[clamp(1.85rem,3.4vw,2.75rem)] font-semibold leading-[1.12]",
            tone === "dark" && "text-primary-foreground",
          )}
        >
          {title}
        </h2>

        {description && (
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed",
              tone === "dark"
                ? "text-primary-foreground/70"
                : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
