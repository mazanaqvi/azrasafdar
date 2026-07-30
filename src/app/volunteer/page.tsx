import type { Metadata } from "next";
import { ClockIcon, HeartHandshakeIcon, MapPinIcon } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { VolunteerForm } from "@/components/volunteer-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Volunteer with us",
  description:
    "Doctors, teachers, drivers and organisers keep Azra Safdar Foundation running. Tell us how you can help.",
};

const expectations = [
  {
    Icon: ClockIcon,
    title: "As much or as little time as you have",
    body: "Some volunteers give one weekend a year for a Ramzan packing drive. Others tutor every week. Both matter.",
  },
  {
    Icon: MapPinIcon,
    title: "On the ground or online",
    body: "Field work happens in Pakistan. Online tutoring, fundraising and admin help are welcome from anywhere.",
  },
  {
    Icon: HeartHandshakeIcon,
    title: "We'll get back to you",
    body: "Every application gets a reply, usually within a week, even if we don't have a role open right away.",
  },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Volunteer"
        title="Give whatever time you can"
        description="We need doctors and teachers, but we also need drivers, packers, photographers and people who are good at organising other people."
      />

      <div className="container-page grid gap-12 py-20 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="space-y-8">
          {expectations.map(({ Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <h2 className="font-heading text-base font-semibold">{title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-border bg-secondary/40 p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Rather write it yourself? Email us at{" "}
              <a
                href={`mailto:${site.volunteerEmail}`}
                className="font-medium text-primary hover:underline"
              >
                {site.volunteerEmail}
              </a>
              .
            </p>
          </div>
        </div>

        <VolunteerForm />
      </div>
    </>
  );
}
