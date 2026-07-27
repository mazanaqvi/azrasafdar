import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { NewsCard } from "@/components/news-card";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { getNewsSummaries } from "@/lib/news";
import { cn } from "@/lib/utils";

export async function NewsPreview() {
  const posts = await getNewsSummaries(3);

  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="border-y border-border bg-secondary/35">
      <div className="container-page section-y">
        <SectionHeading
          eyebrow="Latest updates"
          title="News from the field"
          description="Reports on what we did, what it cost, and what we would do differently."
          action={
            <Link
              href="/news"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 bg-background px-5 font-semibold",
              )}
            >
              All news
              <ArrowRightIcon className="size-4" />
            </Link>
          }
        />

        <div className="mt-14 space-y-6">
          <NewsCard post={featured} featured />

          {rest.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {rest.map((post) => (
                <NewsCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
