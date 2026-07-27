import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { educationProjects, welfareProjects, type Project } from "@/lib/projects";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Students education, free education and tutorship, Ramzan ration packs, widows support and health support — the five projects run by Azra Safdar Foundation in Faisalabad.",
};

function ProjectCard({ project }: { project: Project }) {
  const { slug, title, summary, icon: Icon, stat, seasonal } = project;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-8 ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-primary/25">
      {/* Accent bar animates in on hover to signal interactivity. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-primary to-lime transition-transform duration-300 group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="grid size-13 place-items-center rounded-xl bg-secondary text-primary ring-1 ring-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-6" />
        </span>
        {seasonal && (
          <span className="rounded-full bg-lime px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-lime-foreground">
            Seasonal
          </span>
        )}
      </div>

      <h3 className="mt-7 text-2xl font-semibold">
        <Link
          href={`/projects/${slug}`}
          className="transition-colors after:absolute after:inset-0 group-hover:text-primary"
        >
          {title}
        </Link>
      </h3>

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
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Projects"
        title="Five projects, one purpose"
        description={`Education is the core of what ${site.name} does. The rest of our work exists to remove the things that pull a student out of the classroom.`}
      />

      <div className="container-page pt-20 pb-24">
        <SectionHeading
          eyebrow="Core work"
          title="Education projects"
          description="Getting students into school, and making sure they learn once they are there."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {educationProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      <div className="border-y border-border bg-secondary/35">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="Supporting work"
            title="Welfare projects"
            description="Hunger, bereavement and untreated illness all end a child's schooling. These projects address each of them."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {welfareProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </div>

      <div className="container-page py-24">
        <div className="rounded-2xl bg-card p-10 text-center shadow-soft ring-1 ring-border sm:p-14">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Want to help one of these projects run?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Volunteers keep the cost of every project down, which means more of
            each donation reaches the student or household it was meant for.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/volunteer"
              className={cn(
                buttonVariants(),
                "h-12 px-7 text-base font-semibold shadow-soft",
              )}
            >
              Volunteer with us
            </Link>
            <Link
              href="/donate"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 px-7 text-base font-semibold",
              )}
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
