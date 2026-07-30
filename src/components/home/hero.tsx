import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ReceiptTextIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const credibility = [
  { Icon: CalendarDaysIcon, label: `Established ${site.founded}` },
  { Icon: ShieldCheckIcon, label: "Registered non-profit" },
  { Icon: ReceiptTextIcon, label: "Publicly reported accounts" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div aria-hidden className="surface-wash absolute inset-0 -z-20" />
      <div aria-hidden className="surface-grid absolute inset-0 -z-10" />

      <div className="container-page flex flex-col items-center py-20 text-center lg:py-28">
        <p className="inline-flex items-center gap-2.5 rounded-full bg-background/80 py-1.5 pl-1.5 pr-4 text-xs font-semibold text-primary shadow-soft ring-1 ring-primary/15 backdrop-blur">
          <span className="rounded-full bg-primary px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-primary-foreground">
            Since {site.founded}
          </span>
          Serving communities across Pakistan
        </p>

        <h1 className="mt-8 max-w-4xl text-[clamp(2.5rem,5.6vw,4.25rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
          Every child deserves a{" "}
          <span className="relative whitespace-nowrap text-primary">
            future
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[0.16em] w-full rounded-full bg-lime/70"
            />
          </span>{" "}
          worth working for
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Azra Safdar Foundation keeps students in school with scholarships and
          free tuition, and supports their families with healthcare and relief
          so that a crisis at home does not end a child&apos;s education.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/donate"
            className={cn(
              buttonVariants(),
              "h-13 px-8 text-base font-semibold shadow-soft",
            )}
          >
            Support our work
          </Link>
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "group h-13 border-border-strong bg-background/70 px-8 text-base font-semibold backdrop-blur hover:bg-background",
            )}
          >
            See our projects
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="mt-16 grid w-full max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background/60 shadow-soft backdrop-blur sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {credibility.map(({ Icon, label }) => (
            <li
              key={label}
              className="flex items-center justify-center gap-2.5 px-5 py-4 text-sm font-medium text-muted-foreground"
            >
              <Icon className="size-4 shrink-0 text-primary" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
