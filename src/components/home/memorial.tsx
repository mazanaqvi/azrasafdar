import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { memorial, site } from "@/lib/site";

export function Memorial() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-deep text-primary-foreground">
      <div
        aria-hidden
        className="brand-arc absolute -left-32 -top-48 -z-10 size-[34rem] [--arc-r:16rem] opacity-40"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-lime/60 to-transparent"
      />

      <div className="container-page py-16 sm:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="lg:w-72 lg:shrink-0">
            <h2 className="eyebrow text-lime">In their memory</h2>
            <p className="mt-3 text-lg leading-snug text-primary-foreground/80">
              {site.name} is also known as {memorial.initialism} — three
              initials, for the three people it was founded to remember.
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-lime hover:underline"
            >
              Read our history
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="grid flex-1 gap-x-8 gap-y-8 sm:grid-cols-3 lg:divide-x lg:divide-white/12">
            {memorial.remembered.map(({ initial, name }, index) => (
              <li key={name} className={index > 0 ? "lg:pl-8" : undefined}>
                {/* Decorative: the name that follows already reads it out. */}
                <span
                  aria-hidden
                  className="block font-display text-[clamp(2.25rem,4vw,3rem)] font-semibold leading-none tracking-tight text-lime"
                >
                  {initial}
                </span>
                <span className="mt-3 block leading-snug text-primary-foreground/85">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
