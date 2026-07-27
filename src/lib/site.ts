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
    "Azra Safdar Foundation is an education-led non-profit based in Faisalabad, Pakistan. We keep students in school through free education and tutorship, and support widows and families with healthcare and Ramzan ration packs.",
  url: "https://azrasafdar.org",
  locale: "en_PK",
  founded: 2019, // TODO: confirm the year the foundation started
  // TODO: temporary. Replace both with a mailbox on azrasafdar.org once it
  // exists — these are shown publicly in the footer and on the contact page,
  // and they are where form submissions are delivered.
  email: "alihumza.dev@gmail.com",
  volunteerEmail: "alihumza.dev@gmail.com",
  phone: "+92 307 6699514",
  // Digits only, including country code, for tel: and wa.me links.
  phoneDigits: "923076699514",
  contactPerson: {
    name: "Syed Zesshan Safdar",
    role: "Foundation Lead",
  },
  address: {
    line1: "Faisalabad",
    line2: "Punjab",
    country: "Pakistan",
  },
  officeHours: "Monday to Saturday, 10am – 7pm PKT",
  socials: {
    facebook: "https://facebook.com/", // TODO: confirm
    instagram: "https://instagram.com/", // TODO: confirm
    youtube: "https://youtube.com/", // TODO: confirm
    whatsapp: "https://wa.me/923076699514",
  },
} as const;

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
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;
