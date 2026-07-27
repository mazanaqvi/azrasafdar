import Image from "next/image";
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
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-2xl bg-card ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-primary/25",
        featured ? "flex-col lg:flex-row" : "flex-col",
      )}
    >
      {post.image && (
        <div
          className={cn(
            "relative overflow-hidden",
            featured ? "aspect-16/10 lg:aspect-auto lg:w-[46%]" : "aspect-16/10",
          )}
        >
          <Image
            src={post.image}
            alt={post.imageAlt ?? ""}
            fill
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 46vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-primary shadow-xs backdrop-blur">
            {post.category}
          </span>
        </div>
      )}

      <div
        className={cn(
          "flex flex-1 flex-col p-7",
          featured && "lg:justify-center lg:p-10",
        )}
      >
        <div className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
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
