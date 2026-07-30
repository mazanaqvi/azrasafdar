import { ClipboardCheckIcon, MessagesSquareIcon, ReceiptTextIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  {
    Icon: MessagesSquareIcon,
    title: "We ask first",
    body: "Every project starts with conversations in the community, so we fund what families tell us they need.",
  },
  {
    Icon: ClipboardCheckIcon,
    title: "We check",
    body: "Every request is confirmed with a home visit before it joins our list, so help reaches the households that need it most.",
  },
  {
    Icon: ReceiptTextIcon,
    title: "We report back",
    body: "We keep a record of what each project spends and share it with the people who funded it.",
  },
];

export function HowWeWork() {
  return (
    <section className="container-page section-y">
      <SectionHeading
        eyebrow="How we work"
        title="How we decide where to help"
        description="Three commitments we hold to on every project."
        align="center"
      />

      <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
        {/* One continuous rule joining the step markers, rather than a segment
            per step. The markers' background ring masks it where they sit. */}
        <span
          aria-hidden
          className="absolute left-7 right-7 top-7 hidden h-px bg-border md:block"
        />

        {steps.map(({ Icon, title, body }, index) => (
          <li key={title} className="relative">
            <span className="relative grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft ring-4 ring-background">
              <Icon className="size-6" />
            </span>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
              Step {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2.5 text-xl font-semibold sm:text-2xl">{title}</h3>
            <p className="mt-3.5 text-[0.975rem] leading-relaxed text-muted-foreground">
              {body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
