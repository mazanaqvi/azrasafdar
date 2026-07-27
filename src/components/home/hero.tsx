import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ShieldCheckIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const credibility = [
  `Established ${site.founded}`,
  "Registered non-profit",
  "Publicly reported accounts",
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      {/* Layered brand wash: a soft green field with the logo's arc echoed
          behind the imagery. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-br from-brand-tint via-background to-secondary/70"
      />
      <div
        aria-hidden
        className="brand-arc absolute -right-40 -top-32 -z-10 size-[46rem] [--arc-r:21rem] [--arc-x:50%] [--arc-y:50%] opacity-70"
      />
      <div
        aria-hidden
        className="absolute -bottom-56 -left-40 -z-10 size-[38rem] rounded-full bg-lime/8 blur-3xl"
      />

      <div className="container-page grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 py-1.5 pl-1.5 pr-4 text-xs font-semibold text-primary shadow-xs backdrop-blur">
            <span className="rounded-full bg-primary px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-primary-foreground">
              Since {site.founded}
            </span>
            Serving communities across Pakistan
          </p>

          <h1 className="mt-7 text-[clamp(2.5rem,5.2vw,4rem)] font-semibold leading-[1.12] tracking-[-0.025em]">
            Every child deserves a{" "}
            <span className="relative whitespace-nowrap text-primary">
              future
              <svg
                aria-hidden
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                className="absolute -bottom-0.5 left-0 h-[0.3em] w-full text-lime/80"
              >
                <path
                  d="M3 7C40 3 90 2.5 197 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            worth working for
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Azra Safdar Foundation keeps students in school through scholarships,
            tutoring and mentorship — and supports their families with healthcare
            and relief when crisis would otherwise end their schooling.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
                "group h-13 border-primary/25 bg-background/70 px-8 text-base font-semibold backdrop-blur hover:bg-background",
              )}
            >
              See our projects
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/80 pt-7">
            {credibility.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                <ShieldCheckIcon className="size-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          {/* Offset accent panel gives the image depth without a border. */}
          <div
            aria-hidden
            className="absolute -bottom-5 -right-5 hidden h-full w-full rounded-[1.75rem] bg-primary/8 ring-1 ring-primary/10 sm:block"
          />

          <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] shadow-lift sm:aspect-4/3 lg:aspect-4/5">
            <Image
              src="/images/hero.jpg"
              alt="Foundation volunteers working alongside families in the community"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-brand-deeper/60 via-transparent to-transparent"
            />
          </div>

          <div className="absolute -bottom-6 left-4 rounded-2xl bg-background/95 p-5 shadow-lift ring-1 ring-border backdrop-blur sm:-left-8 sm:p-6">
            <p className="font-display text-4xl font-semibold leading-none text-primary">
              2,400<span className="text-lime">+</span>
            </p>
            <p className="mt-2 max-w-[9rem] text-sm leading-snug text-muted-foreground">
              children supported in school
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
