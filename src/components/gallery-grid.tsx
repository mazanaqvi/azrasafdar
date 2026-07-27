"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import type { GalleryImage } from "@/lib/gallery";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);

  const step = useCallback(
    (delta: number) =>
      setActiveIndex((current) =>
        current === null
          ? current
          : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    // Prevent the page behind the lightbox from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, step]);

  const active = activeIndex === null ? null : images[activeIndex];

  return (
    <>
      {/* CSS columns give true masonry, so portrait and landscape photos can
          sit together without leaving gaps in the grid. */}
      <ul className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {images.map((image, index) => (
          <li key={image.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block w-full overflow-hidden rounded-2xl ring-1 ring-border transition-all duration-300 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="w-full transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-brand-deeper/85 via-brand-deeper/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <span className="block text-sm font-semibold text-white">
                  {image.caption}
                </span>
                <span className="block text-xs text-white/70">
                  {image.location}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="fixed inset-0 z-50 flex flex-col bg-black/92 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={close}
              className="grid size-11 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              <XIcon className="size-6" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-0 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeftIcon className="size-6" />
              <span className="sr-only">Previous image</span>
            </button>

            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="90vw"
              className="max-h-full w-auto rounded-lg object-contain"
            />

            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-0 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronRightIcon className="size-6" />
              <span className="sr-only">Next image</span>
            </button>
          </div>

          <div className="pt-4 text-center">
            <p className="font-heading text-base font-semibold text-white">
              {active.caption}
            </p>
            <p className="mt-1 text-sm text-white/65">
              {active.location} &middot; {activeIndex! + 1} of {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
