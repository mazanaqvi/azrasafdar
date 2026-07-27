import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { formatDate, type NewsSummary } from "@/lib/news";
import { cn } from "@/lib/utils";

export function NewsCard({
  post,
  featured = false,
}: {
  post: NewsSummary;
  featured?: boolean;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-primary/25">
      {/* Accent bar animates in on hover to signal interactivity. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-primary to-lime transition-transform duration-300 group-hover:scale-x-100"
      />

      <div
        className={cn(
          "flex flex-1 flex-col p-7",
          featured && "lg:justify-center lg:p-10",
        )}
      >
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-muted-foreground">
          <span className="rounded-full bg-secondary px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-primary">
            {post.category}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden className="size-1 rounded-full bg-border" />
          <span>{post.readingMinutes} min read</span>
        </div>

        <h3
          className={cn(
            "mt-3 font-display font-semibold leading-snug tracking-[-0.01em]",
            featured ? "text-2xl lg:text-3xl" : "text-xl",
          )}
        >
          <Link
            href={`/news/${post.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>

        <p
          className={cn(
            "mt-3 flex-1 leading-relaxed text-muted-foreground",
            featured ? "text-base" : "line-clamp-3 text-sm",
          )}
        >
          {post.excerpt}
        </p>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Read the report
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
