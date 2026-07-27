import Link from "next/link";
import { MailIcon, PhoneIcon } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiWhatsapp,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const socials = [
  { href: site.socials.facebook, label: "Facebook", Icon: SiFacebook },
  { href: site.socials.instagram, label: "Instagram", Icon: SiInstagram },
  { href: site.socials.youtube, label: "YouTube", Icon: SiYoutube },
  { href: site.socials.whatsapp, label: "WhatsApp", Icon: SiWhatsapp },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40">
      {/* Utility bar: contact details up front, the way institutions expect. */}
      <div className="hidden bg-brand-deeper text-primary-foreground lg:block">
        <div className="container-page flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-primary-foreground/75 transition-colors hover:text-lime"
            >
              <PhoneIcon className="size-3.5" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-primary-foreground/75 transition-colors hover:text-lime"
            >
              <MailIcon className="size-3.5" />
              {site.email}
            </a>
          </div>

          <div className="flex items-center gap-1">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="grid size-7 place-items-center rounded-md text-primary-foreground/65 transition-colors hover:bg-white/10 hover:text-lime"
              >
                <Icon className="size-3.5" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-border/70 bg-background/90 shadow-xs backdrop-blur-md">
        <div className="container-page flex h-18 items-center justify-between gap-6 sm:h-20">
          <Logo />

          <NavLinks />

          <div className="flex items-center gap-2.5">
            <Link
              href="/volunteer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "hidden h-10 px-4 font-semibold md:inline-flex",
              )}
            >
              Volunteer
            </Link>
            <Link
              href="/donate"
              className={cn(buttonVariants(), "h-10 px-5 font-semibold shadow-soft")}
            >
              Donate
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
