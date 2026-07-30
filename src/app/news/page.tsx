import type { Metadata } from "next";
import { NewsCard } from "@/components/news-card";
import { PageHeader } from "@/components/page-header";
import { getNewsSummaries } from "@/lib/news";

export const metadata: Metadata = {
  title: "News and updates",
  description:
    "Updates from Azra Safdar Foundation on our projects and the families we work with.",
};

export default async function NewsPage() {
  const posts = await getNewsSummaries();

  return (
    <>
      <PageHeader
        eyebrow="News"
        title="News and updates"
        description="Short updates on our projects and the people they support."
      />

      <div className="container-page py-20">
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
