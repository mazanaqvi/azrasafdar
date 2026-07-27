"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const mobileLinks = [...navigation, { href: "/volunteer", label: "Volunteer" }];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="size-10 lg:hidden" />
        }
      >
        <MenuIcon className="size-5" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>

      <SheetContent side="right" className="w-[85vw] max-w-sm">
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>{site.name}</SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex flex-col gap-1 p-3">
          {mobileLinks.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border p-5">
          <Link
            href="/donate"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants(), "h-11 w-full text-base")}
          >
            Donate
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
