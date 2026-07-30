import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, CheckIcon, MessageCircleIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getProject, projects } from "@/lib/projects";
import { site, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const {
    title,
    summary,
    body,
    icon: Icon,
    focus,
    highlights,
    costs,
    needs,
    pillar,
    seasonal,
  } = project;

  const others = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-br from-brand-tint via-background to-secondary/60"
        />
        <div
          aria-hidden
          className="brand-arc absolute -right-40 -top-56 -z-10 size-[40rem] [--arc-r:18rem] opacity-60"
        />

        <div className="container-page py-16 lg:py-20">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="transition-colors hover:text-primary">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link
                    href="/projects"
                    className="transition-colors hover:text-primary"
                  >
                    Our Projects
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-primary">{title}</li>
              </ol>
            </nav>

            <div className="mt-6 flex items-center gap-3">
              <span className="grid size-13 place-items-center rounded-xl bg-secondary text-primary ring-1 ring-primary/10">
                <Icon className="size-6" />
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {pillar === "education" ? "Education" : "Welfare"}
              </span>
              {seasonal && (
                <span className="rounded-full bg-lime px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-lime-foreground">
                  Seasonal
                </span>
              )}
            </div>

            <h1 className="mt-6 text-[clamp(2.25rem,4.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.025em]">
              {title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {summary}
            </p>

            <p className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-background/80 px-5 py-2.5 text-sm font-medium text-primary shadow-xs ring-1 ring-border backdrop-blur">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-lime" />
              {focus}
            </p>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-14 py-20 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
        <div>
          <div className="prose prose-lg max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground">
            {body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-semibold">What this includes</h2>
          <ul className="mt-6 space-y-3.5">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-secondary">
                  <CheckIcon className="size-3 text-primary" />
                </span>
                <span className="text-muted-foreground">{highlight}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-14 text-2xl font-semibold">What your donation covers</h2>
          <p className="mt-3 text-muted-foreground">
            Indicative costs based on what this project actually spends.
          </p>
          <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl bg-card ring-1 ring-border">
            {costs.map(({ amount, covers }) => (
              <li
                key={amount}
                className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:gap-6"
              >
                <span className="font-display text-lg font-semibold text-primary sm:w-36 sm:shrink-0">
                  {amount}
                </span>
                <span className="text-sm text-muted-foreground">{covers}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-2xl bg-secondary/50 p-7 ring-1 ring-border">
            <h2 className="text-xl font-semibold">How you can help</h2>
            <ul className="mt-5 space-y-3">
              {needs.map((need) => (
                <li key={need} className="flex gap-3 text-sm text-muted-foreground">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-lime"
                  />
                  {need}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3">
              <Link
                href="/donate"
                className={cn(
                  buttonVariants(),
                  "h-12 w-full text-base font-semibold shadow-soft",
                )}
              >
                Donate to this project
              </Link>
              <Link
                href="/volunteer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 w-full bg-background text-base font-semibold",
                )}
              >
                Volunteer
              </Link>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-card p-7 ring-1 ring-border">
            <h2 className="text-base font-semibold">Questions about this project?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Speak to {site.contactPerson.name} directly.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-lime px-4 text-sm font-semibold text-lime-foreground transition-colors hover:bg-lime/85"
            >
              <MessageCircleIcon className="size-4" />
              Message on WhatsApp
            </a>
            <a
              href={`tel:+${site.phoneDigits}`}
              className="mt-3 block text-center text-sm font-medium text-primary hover:underline"
            >
              {site.phone}
            </a>
          </div>
        </aside>
      </div>

      <section className="border-t border-border bg-secondary/35">
        <div className="container-page py-20">
          <h2 className="text-2xl font-semibold">Other projects</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/projects/${other.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-card p-6 ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-primary/25"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                    <other.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold transition-colors group-hover:text-primary">
                    {other.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {other.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read more
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
