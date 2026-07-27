import type { Metadata } from "next";
import { NewsCard } from "@/components/news-card";
import { PageHeader } from "@/components/page-header";
import { getNewsSummaries } from "@/lib/news";

export const metadata: Metadata = {
  title: "News and updates",
  description:
    "Field reports from Azra Safdar Foundation — what we did, what it cost, and what we learned.",
};

export default async function NewsPage() {
  const posts = await getNewsSummaries();

  return (
    <>
      <PageHeader
        eyebrow="News"
        title="Updates from the field"
        description="Reports on what we did, what it cost, and what we would do differently next time."
      />

      <div className="container-page py-16">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">
            There are no posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
