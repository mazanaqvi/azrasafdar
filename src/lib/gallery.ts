export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  location: string;
  /** Intrinsic dimensions, required so next/image can reserve layout space. */
  width: number;
  height: number;
};

/**
 * TODO: swap in real photography. Keep `width`/`height` accurate to the file,
 * and write `alt` as a plain description of what is in the frame.
 */
export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/01.jpg",
    alt: "Volunteers handing school bags to a group of children",
    caption: "School supplies drive",
    location: "Faisalabad, Punjab",
    width: 1400,
    height: 1050,
  },
  {
    src: "/images/gallery/02.jpg",
    alt: "A doctor examining a patient at an outdoor medical camp",
    caption: "Free medical camp",
    location: "Faisalabad, Punjab",
    width: 1050,
    height: 1400,
  },
  {
    src: "/images/gallery/03.jpg",
    alt: "Ramzan ration packs stacked and ready for delivery",
    caption: "Ramzan ration packing",
    location: "Faisalabad, Punjab",
    width: 1400,
    height: 1050,
  },
  {
    src: "/images/gallery/04.jpg",
    alt: "Women working at sewing machines in a training workshop",
    caption: "Stitching skills workshop",
    location: "Faisalabad, Punjab",
    width: 1400,
    height: 1050,
  },
  {
    src: "/images/gallery/05.jpg",
    alt: "Students working through exercises at an after-school tuition centre",
    caption: "Evening tuition centre",
    location: "Faisalabad, Punjab",
    width: 1050,
    height: 1400,
  },
  {
    src: "/images/gallery/06.jpg",
    alt: "A volunteer handing a ration pack to a woman at her door",
    caption: "Ration delivery to a widow-headed household",
    location: "Faisalabad, Punjab",
    width: 1400,
    height: 1050,
  },
  {
    src: "/images/gallery/07.jpg",
    alt: "Students receiving scholarship certificates on stage",
    caption: "Annual scholarship ceremony",
    location: "Faisalabad, Punjab",
    width: 1400,
    height: 1050,
  },
  {
    src: "/images/gallery/08.jpg",
    alt: "The volunteer team gathered together after a distribution day",
    caption: "Our volunteer team",
    location: "Faisalabad, Punjab",
    width: 1050,
    height: 1400,
  },
];
