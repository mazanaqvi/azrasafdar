import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, getNewsPost, getNewsSlugs } from "@/lib/news";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);

  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      url: `${site.url}/news/${post.slug}`,
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsPost(slug);

  if (!post) notFound();

  return (
    <article className="container-page max-w-3xl py-14 sm:py-20">
      <Link
        href="/news"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeftIcon className="size-4" />
        All news
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="secondary">{post.category}</Badge>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>&middot;</span>
          <span>{post.readingMinutes} min read</span>
        </div>

        <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
          {post.title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
      </header>

      {post.image && (
        <div className="relative mt-10 aspect-16/9 overflow-hidden rounded-2xl border border-border">
          <Image
            src={post.image}
            alt={post.imageAlt ?? ""}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div
        className="prose prose-neutral mt-12 max-w-none prose-headings:font-heading prose-headings:scroll-offset prose-a:text-primary prose-th:text-left"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {post.author && (
        <footer className="mt-14 border-t border-border pt-6 text-sm text-muted-foreground">
          Written by {post.author}
        </footer>
      )}
    </article>
  );
}
