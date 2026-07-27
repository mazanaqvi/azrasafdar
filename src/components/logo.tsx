import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className,
      )}
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={512}
        height={512}
        priority
        className="size-11 shrink-0 transition-transform group-hover:scale-105 sm:size-12"
      />
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span className="font-heading text-base font-bold tracking-tight text-primary sm:text-lg">
            Azra Safdar
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-xs">
            Foundation
          </span>
        </span>
      )}
      <span className="sr-only">{site.name} — home</span>
    </Link>
  );
}
