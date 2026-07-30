import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { memorial, site } from "@/lib/site";
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
        title="A foundation built in three names"
        description={`${site.name} was established in ${site.founded} as a memorial, to serve families that formal aid consistently misses.`}
      />

      <section className="container-page py-20">
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            {site.name} was founded in {site.founded} as a memorial, and the
            name it is also known by says why. {memorial.initialism} is
            assembled from the initials of three people: Syed Ali Naqi gives the
            first N, Syeda Ghazia Zameer the G, and Syed Naji Ullah the second
            N. The foundation exists in their memory.
          </p>
          <p>
            What started as a private act of remembrance became something the
            families around us could use. Every school place paid for, every
            tuition class taught and every household supported since is carried
            out in those three names — remembrance in a form that outlasts a
            gesture.
          </p>
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

        <div className="mt-14 max-w-3xl rounded-2xl bg-secondary/50 p-8 ring-1 ring-border sm:p-10">
          <h2 className="eyebrow text-primary">In memory of</h2>
          <ul className="mt-7 grid gap-7 sm:grid-cols-3">
            {memorial.remembered.map(({ initial, name }) => (
              <li key={name}>
                {/* Decorative: the name below already reads it out. */}
                <span
                  aria-hidden
                  className="font-display text-4xl font-semibold leading-none text-primary/25"
                >
                  {initial}
                </span>
                <p className="mt-3 font-heading text-lg font-semibold text-foreground">
                  {name}
                </p>
              </li>
            ))}
          </ul>
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
