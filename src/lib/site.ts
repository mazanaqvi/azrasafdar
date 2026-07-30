/**
 * Single source of truth for foundation details shown across the site.
 * Values still marked TODO must be confirmed before launch.
 */

export const site = {
  name: "Azra Safdar Foundation",
  shortName: "ASF",
  // The foundation's own tagline, taken from the logo lockup. Used in page
  // titles and social previews.
  tagline: "Empowering students, enriching futures",
  description:
    "Azra Safdar Foundation is an education-led non-profit in Pakistan. We keep students in school through free education and tutorship, and support widows and families with healthcare and Ramzan ration packs.",
  url: "https://azrasafdar.org",
  locale: "en_PK",
  founded: 2017,
  email: "info@azrasafdar.org",
  volunteerEmail: "info@azrasafdar.org",
  phone: "+92 307 6699514",
  // Digits only, including country code, for tel: and wa.me links.
  phoneDigits: "923076699514",
  contactPerson: {
    name: "Syed Zesshan Safdar",
    role: "Foundation Lead",
  },
  location: "Pakistan",
  officeHours: "Monday to Saturday, 10am to 7pm PKT",
  // Facebook is the only profile the foundation runs. Add others here, and to
  // the list in site-footer.tsx, if that changes.
  socials: {
    facebook: "https://www.facebook.com/ngnfoundation/",
  },
} as const;

/**
 * The foundation is a memorial one. NGN is built from the initials of the three
 * people it was founded to remember, in the order they appear in the name.
 */
export const memorial = {
  initialism: "NGN",
  remembered: [
    { initial: "N", name: "Syed Ali Naqi" },
    { initial: "G", name: "Syeda Ghazia Zameer" },
    { initial: "N", name: "Syed Naji Ullah" },
  ],
} as const;

/** "A, B and C", for running the three names inside a sentence. */
export const rememberedNames = new Intl.ListFormat("en-GB", {
  style: "long",
  type: "conjunction",
}).format(memorial.remembered.map(({ name }) => name));

export const telHref = `tel:+${site.phoneDigits}`;
export const mailHref = `mailto:${site.email}`;

/** Pre-filled WhatsApp message so enquiries arrive with context. */
export const whatsappHref = `https://wa.me/${site.phoneDigits}?text=${encodeURIComponent(
  "Assalam o Alaikum, I found the Azra Safdar Foundation website and would like to know more.",
)}`;

/**
 * Shown on the donate page. No online payment gateway is wired up yet, so
 * these details are the only way supporters can contribute.
 */
export const bankDetails = {
  accountTitle: "Azra Safdar Foundation", // TODO: confirm
  bankName: "Bank Name", // TODO: confirm
  accountNumber: "0000 0000 0000 0000", // TODO: confirm
  iban: "PK00 XXXX 0000 0000 0000 0000", // TODO: confirm
  branchCode: "0000", // TODO: confirm
  swift: "XXXXPKKA", // TODO: confirm
} as const;

export const navigation = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Our Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;
