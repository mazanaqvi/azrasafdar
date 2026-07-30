import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40">
      {/* Utility bar: the tagline alone, centred. Contact details and social
          links live in the footer. */}
      <div className="hidden border-b border-border bg-secondary/70 lg:block">
        <div className="container-page flex h-10 items-center justify-center gap-2.5 text-xs">
          <span aria-hidden className="size-1.5 rounded-full bg-lime" />
          <p className="font-medium text-primary/85">{site.tagline}</p>
        </div>
      </div>

      <div className="border-b border-border bg-background/85 shadow-header backdrop-blur-xl">
        <div className="container-page flex h-18 items-center justify-between gap-6 sm:h-20">
          <Logo />

          <NavLinks />

          <div className="flex items-center gap-2">
            <Link
              href="/volunteer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "hidden h-10 border-border-strong px-4 font-semibold md:inline-flex",
              )}
            >
              Volunteer
            </Link>
            <Link
              href="/donate"
              className={cn(
                buttonVariants(),
                "h-10 px-5 font-semibold shadow-soft",
              )}
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
