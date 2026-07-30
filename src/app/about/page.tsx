import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { memorial, rememberedNames, site } from "@/lib/site";
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
        title="About the foundation"
        description={`${site.name} was set up in ${site.founded} to help families in Pakistan keep their children in school.`}
      />

      <section className="container-page py-20">
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            We are an education-led non-profit working in Pakistan. Our main
            work is paying school costs for students whose families cannot
            afford them, and running free tuition so that being enrolled turns
            into actually learning.
          </p>
          <p>
            Alongside that we support widowed mothers, deliver ration packs
            before Ramzan and run free medical camps. These are the pressures
            that most often take a child out of class, so dealing with them is
            part of the same job.
          </p>
          <p>
            We started by asking families what would help rather than deciding
            for them, and that is still how projects begin. Fees are paid
            straight to the school, every request is checked in person, and we
            would rather run a few projects properly than many of them badly.
          </p>
          <p>
            The foundation is run by a small permanent team with a roster of
            volunteer teachers, doctors and drivers who give their evenings and
            weekends.
          </p>
          <p>
            The foundation is also known as {memorial.initialism}. It was set up
            as a memorial, and the three initials stand for {rememberedNames}.
            The work is carried out in their memory.
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
