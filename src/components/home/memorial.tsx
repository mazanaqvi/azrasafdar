import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { memorial, site } from "@/lib/site";

export function Memorial() {
  return (
    <section className="relative isolate overflow-hidden border-y border-border">
      <div aria-hidden className="surface-tint absolute inset-0 -z-10" />

      <div className="container-page py-16 sm:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="lg:w-80 lg:shrink-0">
            <h2 className="eyebrow">In their memory</h2>
            <p className="mt-4 text-lg leading-snug text-foreground">
              {site.name} is also known as {memorial.initialism}. The three
              initials stand for the three people it was founded to remember.
            </p>
            <Link
              href="/about"
              className="group mt-7 inline-flex items-center gap-1.5 border-b border-primary/30 pb-0.5 text-sm font-semibold text-primary transition-colors hover:border-primary"
            >
              Read our history
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="grid flex-1 gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-primary/12">
            {memorial.remembered.map(({ initial, name }) => (
              <li key={name} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
                {/* Decorative: the name below already reads it out. */}
                <span
                  aria-hidden
                  className="block font-display text-[clamp(2.5rem,4.5vw,3.25rem)] font-semibold leading-none tracking-tight text-primary/55"
                >
                  {initial}
                </span>
                <span className="mt-4 block font-display text-lg leading-snug text-foreground">
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
