import type { Metadata } from "next";
import Link from "next/link";
import { ClockIcon, MailIcon, MapPinIcon, MessageCircleIcon, PhoneIcon } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mailHref, site, telHref, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name}. Speak to ${site.contactPerson.name} on ${site.phone}, message us on WhatsApp, or send an enquiry through the form.`,
};

const faqs = [
  {
    question: "How do I donate?",
    answer:
      "Donations are made by bank transfer. Our account details are on the donate page. Send us your transfer receipt on WhatsApp or by email and we will send a formal acknowledgement.",
  },
  {
    question: "Do you accept card or mobile wallet payments?",
    answer:
      "Not yet. We are working on adding JazzCash, Easypaisa and card payments. Until then, bank transfer is the only option.",
  },
  {
    question: "How do I request assistance for a family?",
    answer:
      "Call or message us with the family's location and situation. We verify every request with a home visit before it enters our intake list, so please allow a little time.",
  },
  {
    question: "How do I apply for a scholarship or free tuition?",
    answer:
      "Contact us with the student's name, school, current class and the family's situation. Intake for the academic year usually opens before the new session begins.",
  },
  {
    question: "Can I volunteer from another city?",
    answer:
      "Yes. Field work needs people on the ground, but online tutoring, fundraising, design, translation and administrative help can all be done remotely.",
  },
  {
    question: "Are donations tax deductible?",
    answer:
      "We issue a receipt for every donation. Please consult your tax advisor on deductibility, as it depends on your circumstances and jurisdiction.",
  },
];

const channels = [
  {
    Icon: PhoneIcon,
    label: "Phone",
    value: site.phone,
    href: telHref,
    note: `Ask for ${site.contactPerson.name}`,
  },
  {
    Icon: MessageCircleIcon,
    label: "WhatsApp",
    value: site.phone,
    href: whatsappHref,
    note: "Usually the fastest way to reach us",
    external: true,
  },
  {
    Icon: MailIcon,
    label: "Email",
    value: site.email,
    href: mailHref,
  },
  {
    Icon: MapPinIcon,
    label: "Based in",
    value: site.location,
  },
  {
    Icon: ClockIcon,
    label: "Office hours",
    value: site.officeHours,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Questions about our work, a partnership proposal, or a family who needs help. We read everything that comes in."
      />

      <div className="container-page grid gap-12 py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <h2 className="text-2xl font-semibold">How to reach us</h2>

          {/* Named contact first: people trust a person more than an inbox. */}
          <div className="mt-8 rounded-2xl bg-secondary/60 p-7 ring-1 ring-primary/15">
            <p className="eyebrow">Speak to</p>
            <p className="mt-3 font-display text-2xl font-semibold">
              {site.contactPerson.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {site.contactPerson.role} · {site.location}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={telHref}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
              >
                <PhoneIcon className="size-4" />
                {site.phone}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-border-strong bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted"
              >
                <MessageCircleIcon className="size-4" />
                WhatsApp
              </a>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {channels.map(({ Icon, label, value, href, note, external }) => (
              <li
                key={label}
                className="flex gap-4 rounded-xl bg-card p-5 ring-1 ring-border"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                      className="mt-1 block font-medium break-words transition-colors hover:text-primary"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 font-medium">{value}</p>
                  )}
                  {note && (
                    <p className="mt-1 text-sm text-muted-foreground">{note}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl bg-secondary/50 p-6 ring-1 ring-border">
            <h3 className="font-semibold">Looking to volunteer?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The volunteer form captures everything we need to match you to the
              right project.
            </p>
            <Link
              href="/volunteer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-5 h-11 bg-background px-5 font-semibold",
              )}
            >
              Go to volunteer form
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Send us a message</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Fill this in and we will open your email app with the details ready
            to send. We reply to every enquiry, usually within two working days.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>

      <section className="border-t border-border bg-secondary/35">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked"
            description="If your question is not here, send it through the form above."
            align="center"
          />

          <Accordion className="mx-auto mt-12 max-w-3xl">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="py-5 text-left text-base font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
