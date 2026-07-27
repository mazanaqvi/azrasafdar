import { ClipboardCheckIcon, MessagesSquareIcon, ReceiptTextIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  {
    Icon: MessagesSquareIcon,
    title: "We ask first",
    body: "Every project begins with conversations in the community. We fund what people tell us they need, not what looks good in a brochure.",
  },
  {
    Icon: ClipboardCheckIcon,
    title: "We verify",
    body: "Each request is confirmed with a home visit before it enters our intake list, so support reaches the households that need it most.",
  },
  {
    Icon: ReceiptTextIcon,
    title: "We report back",
    body: "Spending is tracked against outcomes and published, including the things that did not work as planned.",
  },
];

export function HowWeWork() {
  return (
    <section className="container-page section-y">
      <SectionHeading
        eyebrow="How we work"
        title="Accountability is the whole point"
        description="Three commitments that govern every rupee the foundation spends."
        align="center"
      />

      <ol className="mt-14 grid gap-8 md:grid-cols-3">
        {steps.map(({ Icon, title, body }, index) => (
          <li key={title} className="relative">
            {/* Connector line between steps on wide screens. */}
            {index < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute left-16 top-7 hidden h-px w-[calc(100%-3rem)] bg-linear-to-r from-border via-border to-transparent md:block"
              />
            )}

            <div className="relative flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft ring-4 ring-background">
                <Icon className="size-6" />
              </span>
              <span className="relative z-10 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Step {index + 1}
              </span>
            </div>

            <h3 className="mt-7 text-2xl font-semibold">{title}</h3>
            <p className="mt-3.5 text-[0.975rem] leading-relaxed text-muted-foreground">
              {body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
