"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
      {navigation.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              active
                ? "bg-secondary text-primary"
                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
            )}
          >
            {item.label}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-3.5 bottom-1 h-0.5 origin-left rounded-full bg-lime transition-transform duration-200",
                active ? "scale-x-100" : "scale-x-0",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
