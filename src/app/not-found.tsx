import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The link may be out of date, or the page may have moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className={cn(buttonVariants(), "h-11 px-6 text-base")}
        >
          Back to home
        </Link>
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-11 px-6 text-base",
          )}
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
