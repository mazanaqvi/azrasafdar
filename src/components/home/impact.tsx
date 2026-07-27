import { impactStats } from "@/lib/projects";

export function Impact() {
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
          <div className="lg:w-64 lg:shrink-0">
            <h2 className="eyebrow text-lime">Our impact so far</h2>
            <p className="mt-3 text-lg leading-snug text-primary-foreground/80">
              Figures from the last three years of scholarship work.
            </p>
          </div>

          <dl className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-white/12">
            {impactStats.map((stat, index) => (
              <div key={stat.label} className={index > 0 ? "lg:pl-8" : undefined}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-[clamp(2.25rem,4vw,3rem)] font-semibold leading-none tracking-tight">
                    {stat.value}
                  </span>
                  <span className="mt-3 block text-sm leading-snug text-primary-foreground/70">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
