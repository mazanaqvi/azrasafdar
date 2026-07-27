import Image from "next/image";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiWhatsapp,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { navigation, site } from "@/lib/site";

const socialLinks = [
  { href: site.socials.facebook, label: "Facebook", Icon: SiFacebook },
  { href: site.socials.instagram, label: "Instagram", Icon: SiInstagram },
  { href: site.socials.youtube, label: "YouTube", Icon: SiYoutube },
  { href: site.socials.whatsapp, label: "WhatsApp", Icon: SiWhatsapp },
];

const exploreLinks = [
  ...navigation,
  { href: "/volunteer", label: "Volunteer" },
  { href: "/donate", label: "Donate" },
];

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-brand-deeper text-primary-foreground">
      <div
        aria-hidden
        className="brand-arc absolute -left-40 -top-56 -z-10 size-[42rem] [--arc-r:20rem] opacity-40"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-lime/50 to-transparent"
      />

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1.3fr] lg:gap-16 lg:py-20">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
          >
            <span className="grid size-14 place-items-center rounded-xl bg-white p-1.5">
              <Image
                src="/logo-mark.png"
                alt=""
                width={512}
                height={512}
                className="size-full object-contain"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold">
                Azra Safdar
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground/60">
                Foundation
              </span>
            </span>
            <span className="sr-only">{site.name} — home</span>
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/65">
            {site.description}
          </p>

          <div className="mt-7 flex gap-2">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="grid size-10 place-items-center rounded-lg bg-white/8 text-primary-foreground/70 ring-1 ring-white/12 transition-colors hover:bg-lime hover:text-lime-foreground hover:ring-lime"
              >
                <Icon className="size-4" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            Explore
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-primary-foreground/65 transition-colors hover:text-lime"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            Get in touch
          </h2>
          <ul className="mt-5 space-y-4 text-sm text-primary-foreground/65">
            <li className="flex gap-3">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-lime" />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}, {site.address.country}
              </span>
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 size-4 shrink-0 text-lime" />
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-lime">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 size-4 shrink-0 text-lime" />
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-lime"
              >
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>A registered non-profit organisation in Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}
