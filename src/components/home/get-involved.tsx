import Link from "next/link";
import { ArrowRightIcon, HandHeartIcon, UsersIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const options = [
  {
    Icon: HandHeartIcon,
    title: "Donate",
    body: "Every donation goes towards a named project and we send you a receipt. Bank transfer details are on the donate page.",
    href: "/donate",
    cta: "See donation details",
    variant: "default" as const,
  },
  {
    Icon: UsersIcon,
    title: "Volunteer",
    body: "We need doctors, teachers and drivers, and people who can spare a weekend for a packing drive. Tell us what you can offer.",
    href: "/volunteer",
    cta: "Join as a volunteer",
    variant: "outline" as const,
  },
];

export function GetInvolved() {
  return (
    <section className="container-page pb-24 lg:pb-28">
      <div className="relative isolate overflow-hidden rounded-[2rem] px-6 py-16 shadow-soft ring-1 ring-primary/10 sm:px-14 sm:py-20">
        <div aria-hidden className="surface-tint absolute inset-0 -z-10" />

        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Get involved</p>
          <h2 className="mt-4 text-[clamp(1.85rem,3.6vw,2.75rem)] font-semibold leading-[1.12]">
            There are two ways to help
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Volunteers keep our running costs low, which means more of every
            donation reaches a student or a family.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
          {options.map(({ Icon, title, body, href, cta, variant }) => (
            <div key={title} className="card-surface flex flex-col p-8">
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary ring-1 ring-primary/10">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
              <Link
                href={href}
                className={cn(
                  buttonVariants({ variant }),
                  "group mt-7 h-12 w-full text-base font-semibold",
                  variant === "outline" && "border-border-strong",
                )}
              >
                {cta}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
