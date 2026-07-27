import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { educationProjects, welfareProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectsPreview() {
  return (
    <section className="container-page section-y">
      <SectionHeading
        eyebrow="Our projects"
        title="Keeping students in school, and learning"
        description="Education is our core work. Everything else we do exists to remove the obstacles that pull a child out of the classroom."
        action={
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 px-5 font-semibold",
            )}
          >
            All projects
            <ArrowRightIcon className="size-4" />
          </Link>
        }
      />

      <ul className="mt-14 grid gap-6 md:grid-cols-2">
        {educationProjects.map(({ slug, title, summary, icon: Icon, stat }, index) => (
          <li key={slug}>
            <Link
              href={`/projects/${slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-8 ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-primary/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {/* Accent bar animates in on hover to signal interactivity. */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-primary to-lime transition-transform duration-300 group-hover:scale-x-100"
              />

              <div className="flex items-start justify-between gap-4">
                <span className="grid size-13 place-items-center rounded-xl bg-secondary text-primary ring-1 ring-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <span
                  aria-hidden
                  className="font-display text-4xl font-semibold text-primary/15 transition-colors group-hover:text-lime"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-semibold">{title}</h3>

              <p className="mt-3.5 flex-1 text-[0.975rem] leading-relaxed text-muted-foreground">
                {summary}
              </p>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                <span className="text-sm text-muted-foreground">
                  <span className="font-display text-lg font-semibold text-primary">
                    {stat.value}
                  </span>{" "}
                  {stat.label}
                </span>
                <ArrowRightIcon className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Welfare work, deliberately given less visual weight than education. */}
      <div className="mt-8 rounded-2xl bg-secondary/50 p-8 ring-1 ring-border sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="lg:w-64 lg:shrink-0">
            <p className="eyebrow">Beyond the classroom</p>
            <p className="mt-3 text-lg leading-snug text-foreground">
              Families often need support before schooling is even possible.
            </p>
          </div>

          <ul className="grid flex-1 gap-6 sm:grid-cols-3">
            {welfareProjects.map(({ slug, shortTitle, summary, icon: Icon }) => (
              <li key={slug}>
                <Link
                  href={`/projects/${slug}`}
                  className="group flex h-full flex-col rounded-xl p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-background text-primary ring-1 ring-border transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold transition-colors group-hover:text-primary">
                    {shortTitle}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
