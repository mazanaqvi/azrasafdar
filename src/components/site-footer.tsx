import Image from "next/image";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { SiFacebook } from "@icons-pack/react-simple-icons";
import { memorial, navigation, rememberedNames, site } from "@/lib/site";

const exploreLinks = [
  ...navigation,
  { href: "/volunteer", label: "Volunteer" },
  { href: "/donate", label: "Donate" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/55">

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1.3fr] lg:gap-16 lg:py-20">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <span className="grid size-14 place-items-center rounded-xl bg-card p-1.5 shadow-soft ring-1 ring-border">
              <Image
                src="/logo-mark.png"
                alt=""
                width={512}
                height={512}
                className="size-full object-contain"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold text-primary">
                Azra Safdar
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Foundation
              </span>
            </span>
            <span className="sr-only">{site.name} home</span>
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.description}
          </p>

          {/* Facebook is the only profile we run, so it reads better as a
              labelled link than as a lone icon. */}
          <a
            href={site.socials.facebook}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-7 inline-flex items-center gap-2.5 rounded-lg bg-card py-2.5 pl-3 pr-4 text-sm font-semibold text-muted-foreground shadow-xs ring-1 ring-border transition-colors hover:bg-primary hover:text-primary-foreground hover:ring-primary"
          >
            <SiFacebook className="size-4" />
            Follow us on Facebook
          </a>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Get in touch</h2>
          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{site.location}</span>
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-primary"
              >
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-primary"
              >
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page py-7">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">In memory of</span>{" "}
            {rememberedNames}.
          </p>

          <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {site.name} (
              {memorial.initialism}). All rights reserved.
            </p>
            <p>A registered non-profit organisation in Pakistan.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
