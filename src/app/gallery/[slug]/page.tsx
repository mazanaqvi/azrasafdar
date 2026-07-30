import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getAdjacentPhotos, getPhoto, photos } from "@/lib/gallery";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return photos.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const photo = getPhoto(slug);

  if (!photo) return { title: "Photo not found" };

  return {
    title: photo.title,
    description: photo.summary,
    openGraph: {
      title: photo.title,
      description: photo.summary,
      url: `${site.url}/gallery/${photo.slug}`,
      images: [{ url: photo.image.src }],
    },
  };
}

export default async function GalleryPhotoPage({ params }: Props) {
  const { slug } = await params;
  const photo = getPhoto(slug);

  if (!photo) notFound();

  const { previous, next } = getAdjacentPhotos(photo.slug);
  const project = photo.projectSlug
    ? projects.find(({ slug }) => slug === photo.projectSlug)
    : undefined;

  return (
    <article className="container-page py-14 sm:py-20">
      <Link
        href="/gallery"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeftIcon className="size-4" />
        All photos
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Image
            src={photo.image}
            alt={photo.alt}
            placeholder="blur"
            priority
            sizes="(min-width: 1024px) 55vw, 92vw"
            className="w-full rounded-2xl bg-secondary shadow-soft ring-1 ring-border"
          />
        </div>

        <div className="lg:py-2">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <span aria-hidden className="size-1.5 rounded-full bg-lime" />
            {photo.project}
            {photo.year && (
              <span className="font-medium normal-case tracking-normal text-muted-foreground">
                {photo.year}
              </span>
            )}
          </p>

          <h1 className="mt-4 text-[clamp(1.875rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
            {photo.title}
          </h1>

          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            {photo.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {project && (
            <div className="mt-9 rounded-2xl bg-secondary/60 p-6 ring-1 ring-primary/15">
              <h2 className="font-display text-base font-semibold">
                {project.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
              <Link
                href={`/projects/${project.slug}`}
                className="group mt-4 inline-flex items-center gap-1.5 border-b border-primary/30 pb-0.5 text-sm font-semibold text-primary transition-colors hover:border-primary"
              >
                Read about this project
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/donate"
              className={cn(
                buttonVariants(),
                "h-11 px-6 font-semibold shadow-soft",
              )}
            >
              Support this work
            </Link>
            <Link
              href="/volunteer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 border-border-strong px-6 font-semibold",
              )}
            >
              Volunteer with us
            </Link>
          </div>
        </div>
      </div>

      {photos.length > 1 && previous && next && (
        <nav
          aria-label="More photos"
          className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
        >
          <Link
            href={`/gallery/${previous.slug}`}
            className="group flex items-center gap-4 rounded-xl bg-card p-4 shadow-xs ring-1 ring-border transition-colors hover:ring-primary/30"
          >
            <ArrowLeftIcon className="size-4 shrink-0 text-primary transition-transform group-hover:-translate-x-0.5" />
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Previous
              </span>
              <span className="mt-1 block truncate font-medium">
                {previous.title}
              </span>
            </span>
          </Link>

          <Link
            href={`/gallery/${next.slug}`}
            className="group flex items-center justify-end gap-4 rounded-xl bg-card p-4 text-right shadow-xs ring-1 ring-border transition-colors hover:ring-primary/30"
          >
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Next
              </span>
              <span className="mt-1 block truncate font-medium">
                {next.title}
              </span>
            </span>
            <ArrowRightIcon className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
          </Link>
        </nav>
      )}
    </article>
  );
}
