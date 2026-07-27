import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { PageHeader } from "@/components/page-header";
import { galleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from Azra Safdar Foundation's medical camps, school drives, relief distributions and skills workshops.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from our work"
        description="Photographs from medical camps, school drives, relief distributions and training workshops. Select any image to view it full size."
      />

      <div className="container-page py-16">
        <GalleryGrid images={galleryImages} />
      </div>
    </>
  );
}
