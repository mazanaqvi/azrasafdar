import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { galleryImages } from "@/lib/gallery";
import { cn } from "@/lib/utils";

/**
 * Mosaic spans. The anchor tile takes a 2x2 block and the remaining four
 * single tiles fill the other two columns exactly, leaving no gaps.
 */
const SPANS = [
  "col-span-2 row-span-2",
  "",
  "",
  "",
  "",
] as const;

export function GalleryPreview() {
  const preview = galleryImages.slice(0, SPANS.length);

  return (
    <section className="container-page section-y">
      <SectionHeading
        eyebrow="In pictures"
        title="Moments from our work"
        description="Medical camps, school drives, relief distributions and training workshops."
        action={
          <Link
            href="/gallery"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 px-5 font-semibold",
            )}
          >
            Full gallery
            <ArrowRightIcon className="size-4" />
          </Link>
        }
      />

      <ul className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-4 sm:auto-rows-[13rem] sm:grid-cols-4">
        {preview.map((image, index) => (
          <li
            key={image.src}
            className={cn("group relative overflow-hidden rounded-2xl", SPANS[index])}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={index === 0 ? "(max-width: 640px) 100vw, 50vw" : "25vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-brand-deeper/85 via-brand-deeper/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-sm font-semibold text-white">{image.caption}</p>
              <p className="text-xs text-white/70">{image.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
