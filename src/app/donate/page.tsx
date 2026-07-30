import type { Metadata } from "next";
import Link from "next/link";
import { InfoIcon } from "lucide-react";
import { CopyField } from "@/components/copy-field";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { bankDetails, mailHref, site, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support students education, free tutorship, Ramzan ration packs, widows support and health camps at Azra Safdar Foundation by bank transfer.",
};

const allocations = [
  { amount: "PKR 2,500", covers: "One month of free tuition for one student" },
  { amount: "PKR 8,000", covers: "A full year of books, uniform and stationery" },
  { amount: "PKR 10,000", covers: "A month of support for a widow-headed household" },
  { amount: "PKR 15,000", covers: "One Ramzan ration pack for a household" },
  { amount: "PKR 35,000", covers: "A full academic year for one student" },
  { amount: "PKR 50,000", covers: "Medicines for one free medical camp" },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Donate"
        title="Support the work directly"
        description="We do not yet accept card payments online. Donations are made by bank transfer, and every rupee is tracked against the project it funds."
      />

      <div className="container-page grid gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <h2 className="text-2xl font-bold">Bank transfer details</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Transfers can be made from any Pakistani bank account, or
            internationally using the IBAN and SWIFT code below.
          </p>

          <div className="mt-8 space-y-3">
            <CopyField label="Account title" value={bankDetails.accountTitle} />
            <CopyField label="Bank" value={bankDetails.bankName} />
            <CopyField label="Account number" value={bankDetails.accountNumber} />
            <CopyField label="IBAN" value={bankDetails.iban} />
            <CopyField label="Branch code" value={bankDetails.branchCode} />
            <CopyField label="SWIFT / BIC" value={bankDetails.swift} />
          </div>

          <div className="mt-8 flex gap-3 rounded-2xl bg-secondary/50 p-5 ring-1 ring-primary/15">
            <InfoIcon className="mt-0.5 size-5 shrink-0 text-primary" />
            <div className="text-sm leading-relaxed text-muted-foreground">
              <p className="font-medium text-foreground">
                Please send us your transfer receipt
              </p>
              <p className="mt-1.5">
                Send it on{" "}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-primary hover:underline"
                >
                  WhatsApp ({site.phone})
                </a>{" "}
                or email it to{" "}
                <a href={mailHref} className="font-medium text-primary hover:underline">
                  {site.email}
                </a>{" "}
                so we can acknowledge your donation and send you a receipt.
              </p>
              <p className="mt-2">
                If your donation is for a specific project, mention it and we
                will allocate it there.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold">What your donation covers</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Indicative costs, based on what we spend.
          </p>

          <dl className="card-surface mt-8 divide-y divide-border overflow-hidden">
            {allocations.map(({ amount, covers }) => (
              <div
                key={amount}
                className="flex flex-col gap-1 p-5 transition-colors hover:bg-secondary/40 sm:flex-row sm:items-center sm:gap-6"
              >
                <dt className="font-heading text-lg font-semibold text-primary tabular sm:w-36 sm:shrink-0">
                  {amount}
                </dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  {covers}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 rounded-2xl bg-secondary/60 p-7 ring-1 ring-primary/15">
            <h3 className="font-heading text-lg font-semibold">
              Can&apos;t donate right now?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Volunteering keeps our costs down, which stretches every donation
              further.
            </p>
            <Link
              href="/volunteer"
              className={cn(buttonVariants(), "mt-5 h-11 px-6 text-base")}
            >
              Volunteer instead
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
