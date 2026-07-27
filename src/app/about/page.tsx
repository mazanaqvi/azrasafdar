import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";
import { values } from "@/lib/projects";

export const metadata: Metadata = {
  title: "About us",
  description: `How ${site.name} started, what we believe, and how we decide where to work.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A foundation built on listening first"
        description={`${site.name} was established in ${site.founded} to serve families that formal aid consistently misses.`}
      />

      <section className="container-page py-20">
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            The foundation began with a single question asked in a neighbourhood
            in Faisalabad: what would actually help? The answer was not what we
            had assumed. Families did not want food parcels as much as they
            wanted their children to stay in school, and they wanted a doctor
            who would return next month rather than one who came once.
          </p>
          <p>
            That principle still governs how we work. Every project starts with
            conversations in the community and ends with a public account of what
            was spent and what changed. We would rather run five projects
            properly than fifteen for the sake of a brochure.
          </p>
          <p>
            Today the foundation works out of Faisalabad through a small
            permanent team and a volunteer roster of teachers, doctors and
            drivers who give their evenings and weekends.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="container-page py-20">
          <h2 className="text-3xl font-bold sm:text-4xl">What we stand for</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="font-heading text-xl font-semibold">
                  {value.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
