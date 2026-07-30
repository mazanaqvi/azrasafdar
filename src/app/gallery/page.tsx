import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { SiFacebook } from "@icons-pack/react-simple-icons";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { photos } from "@/lib/gallery";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from the work of Azra Safdar Foundation: ration distributions, visits and the people we support.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Photos from our work"
        description="A small set for now. We would rather show a few real pictures than fill the page with stock photography."
      />

      <div className="container-page py-20">
        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map(({ slug, image, alt, title, summary, project, year }) => (
            <li key={slug}>
              <Link
                href={`/gallery/${slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-lift hover:ring-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {/* Thumbnails are cropped to one shape so the grid stays even;
                    each photo is shown whole on its own page. */}
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    <span aria-hidden className="size-1.5 rounded-full bg-lime" />
                    {project}
                    {year && (
                      <span className="font-medium normal-case tracking-normal text-muted-foreground">
                        {year}
                      </span>
                    )}
                  </p>

                  <h2 className="mt-3 font-display text-lg font-semibold leading-snug">
                    {title}
                  </h2>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {summary}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    View photo
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-start gap-6 rounded-2xl bg-secondary/60 p-8 ring-1 ring-primary/15 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-xl font-semibold">More on Facebook</h2>
            <p className="mt-2 max-w-lg leading-relaxed text-muted-foreground">
              We post from distributions and visits as they happen. Facebook is
              the only page we run, so that is where the newest photos are.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:shrink-0 sm:flex-row">
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                buttonVariants(),
                "h-11 px-6 font-semibold shadow-soft",
              )}
            >
              <SiFacebook className="size-4" />
              Visit our page
            </a>
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group h-11 border-border-strong bg-background/70 px-6 font-semibold",
              )}
            >
              See our projects
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
