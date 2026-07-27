import Link from "next/link";
import { ArrowRightIcon, HandHeartIcon, UsersIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const options = [
  {
    Icon: HandHeartIcon,
    title: "Donate",
    body: "Every contribution is tracked against a specific project and reported back. Bank transfer details are on the donate page.",
    href: "/donate",
    cta: "See donation details",
    buttonClass: "bg-lime text-lime-foreground hover:bg-lime/85",
  },
  {
    Icon: UsersIcon,
    title: "Volunteer",
    body: "We need doctors, teachers, drivers and people willing to spend a weekend packing rations. Tell us what you can offer.",
    href: "/volunteer",
    cta: "Join as a volunteer",
    buttonClass:
      "border border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white",
  },
];

export function GetInvolved() {
  return (
    <section className="container-page pb-24 lg:pb-28">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-deeper px-6 py-16 text-primary-foreground sm:px-14 sm:py-20">
        <div
          aria-hidden
          className="brand-arc absolute -right-32 -top-40 -z-10 size-[40rem] [--arc-r:19rem] opacity-50"
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -left-24 -z-10 size-[28rem] rounded-full bg-lime/10 blur-3xl"
        />

        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center text-lime">Get involved</p>
          <h2 className="mt-4 text-[clamp(1.85rem,3.6vw,2.75rem)] font-semibold leading-[1.12]">
            The foundation runs on people, not paperwork
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-primary-foreground/75">
            Time and money both make a measurable difference. Volunteers keep our
            costs down, which stretches every donation further.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
          {options.map(({ Icon, title, body, href, cta, buttonClass }) => (
            <div
              key={title}
              className="flex flex-col rounded-2xl bg-white/6 p-8 ring-1 ring-white/12 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-lime/15 text-lime">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-primary-foreground/70">
                {body}
              </p>
              <Link
                href={href}
                className={cn(
                  buttonVariants(),
                  "group mt-7 h-12 w-full text-base font-semibold",
                  buttonClass,
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
