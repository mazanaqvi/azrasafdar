import type { Metadata } from "next";
import Image from "next/image";
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
  const { slug, title, summary, image, icon: Icon, stat, seasonal } = project;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-primary/25">
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-brand-deeper/70 via-transparent to-transparent"
        />
        <span className="absolute left-5 top-5 grid size-12 place-items-center rounded-xl bg-background/95 text-primary shadow-xs backdrop-blur">
          <Icon className="size-6" />
        </span>
        {seasonal && (
          <span className="absolute right-5 top-5 rounded-full bg-lime px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-lime-foreground">
            Seasonal
          </span>
        )}
        <div className="absolute bottom-4 left-5">
          <p className="font-display text-2xl font-semibold leading-none text-white">
            {stat.value}
          </p>
          <p className="mt-1 text-xs text-white/75">{stat.label}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-2xl font-semibold">
          <Link
            href={`/projects/${slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-primary"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
          {summary}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          About this project
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
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
