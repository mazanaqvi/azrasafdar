import type { StaticImageData } from "next/image";
import ramzanPackContents from "../../public/images/asf_gallery/ramzan_rashion_contents.jpg";
import rationPacks from "../../public/images/asf_gallery/ration_packs.jpg";
import orphanageVisit from "../../public/images/asf_gallery/visit_to_orphanage.jpg";

export type Photo = {
  slug: string;
  /**
   * Imported rather than referenced by path so Next reads the real dimensions
   * and generates the blur placeholder at build time.
   */
  image: StaticImageData;
  /** For anyone who cannot see the picture. Describes it, does not caption it. */
  alt: string;
  title: string;
  /** One line, shown under the thumbnail. */
  summary: string;
  /** Shown beside the photo on its own page. */
  body: string[];
  /** Which part of our work this belongs to. */
  project: string;
  /** Set where the photo maps onto a project page. */
  projectSlug?: string;
  year?: number;
};

/**
 * Everything here is a real photograph from our own work. Add new ones to the
 * top: the gallery renders them in this order.
 */
export const photos: Photo[] = [
  {
    slug: "orphanage-visit",
    image: orphanageVisit,
    alt: "A man from the foundation surrounded by a crowd of smiling boys, leaning in together for a photograph in a hallway at an orphanage.",
    title: "A visit to the orphanage",
    summary:
      "The boys crowd in for a photograph during one of our visits.",
    body: [
      "We visit rather than send forms. Sitting with children and the people who look after them tells us more in an afternoon than a written application does in a month.",
      "We come away with a list, and it is usually specific: fees due at the start of next term, a pair of school shoes that no longer fits, a child who stopped attending weeks ago and nobody has asked why.",
      "That list is what our education work runs on. Most of the students we support were first mentioned to us on a visit like this one.",
    ],
    project: "Community visits",
  },
  {
    slug: "ration-packs",
    image: rationPacks,
    alt: "Cardboard boxes marked for Ramzan, taped shut and stacked five rows high against a wall, ready to be handed out.",
    title: "Ration packs ready to go out",
    summary: "Boxed, sealed and stacked before the first day of Ramzan.",
    body: [
      "Every pack is made up before Ramzan begins. Buying the staples in bulk stretches the money further, and boxing them in advance means a family takes home one complete pack instead of coming back for the rest.",
      "The packs are identical on purpose. Nobody has to explain their situation twice or accept a smaller box in front of their neighbours.",
      "Distribution is by list, drawn up from the households we already know through our education and widows work.",
    ],
    project: "Ramzan Ration Pack",
    projectSlug: "ramzan-ration-pack",
  },
  {
    slug: "ramzan-pack-contents",
    image: ramzanPackContents,
    alt: "The foundation's Ramadan 2023 appeal poster, in Urdu, showing the contents of a ration package: flour, ghee, sugar, dates, rice and pulses, priced at five thousand rupees.",
    title: "What goes inside a pack",
    summary:
      "Our 2023 appeal, listing exactly what Rs 5,000 puts in a box.",
    body: [
      "This is the appeal we ran for Ramadan 2023. One pack cost Rs 5,000 and held flour, ghee, sugar, rice, pulses and dates.",
      "We publish the contents every year so supporters can see precisely what their money buys, and so families know what to expect before they collect.",
      "The poster is in Urdu because that is how most of our supporters hear from us, through WhatsApp and word of mouth rather than advertising.",
    ],
    project: "Ramzan Ration Pack",
    projectSlug: "ramzan-ration-pack",
    year: 2023,
  },
];

export function getPhoto(slug: string): Photo | undefined {
  return photos.find((photo) => photo.slug === slug);
}

/** Wraps around, so every photo has somewhere to go next. */
export function getAdjacentPhotos(slug: string) {
  const index = photos.findIndex((photo) => photo.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: photos.at(index - 1),
    next: photos[(index + 1) % photos.length],
  };
}
