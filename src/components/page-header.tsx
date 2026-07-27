import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-br from-brand-tint via-background to-secondary/60"
      />
      <div
        aria-hidden
        className="brand-arc absolute -right-40 -top-56 -z-10 size-[40rem] [--arc-r:18rem] opacity-60"
      />

      <div className="container-page py-16 sm:py-20 lg:py-24">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRightIcon className="size-3.5" />
            </li>
            <li className="font-medium text-primary">{eyebrow}</li>
          </ol>
        </nav>

        <h1 className="mt-6 max-w-3xl text-[clamp(2.25rem,4.6vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.025em]">
          {title}
        </h1>

        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
