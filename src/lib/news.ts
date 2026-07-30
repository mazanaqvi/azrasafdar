import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { z } from "zod";

const NEWS_DIR = path.join(process.cwd(), "src", "content", "news");

const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  excerpt: z.string().min(1),
  category: z.enum(["Education", "Healthcare", "Welfare", "Ramzan", "Foundation"]),
  author: z.string().optional(),
});

export type NewsPost = z.infer<typeof frontmatterSchema> & {
  slug: string;
  html: string;
  readingMinutes: number;
};

export type NewsSummary = Omit<NewsPost, "html">;

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeStringify);

async function readPost(fileName: string): Promise<NewsPost> {
  const slug = fileName.replace(/\.md$/, "");
  const raw = await readFile(path.join(NEWS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in src/content/news/${fileName}: ${parsed.error.issues
        .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
        .join("; ")}`,
    );
  }

  const html = String(await processor.process(content));
  const words = content.trim().split(/\s+/).length;

  return {
    ...parsed.data,
    slug,
    html,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

async function loadAll(): Promise<NewsPost[]> {
  const files = (await readdir(NEWS_DIR)).filter((file) => file.endsWith(".md"));
  const posts = await Promise.all(files.map(readPost));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNewsSummaries(limit?: number): Promise<NewsSummary[]> {
  const posts = await loadAll();
  const summaries = posts.map(({ html: _html, ...rest }) => rest);
  return typeof limit === "number" ? summaries.slice(0, limit) : summaries;
}

export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  const posts = await loadAll();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getNewsSlugs(): Promise<string[]> {
  const files = await readdir(NEWS_DIR);
  return files.filter((file) => file.endsWith(".md")).map((file) => file.replace(/\.md$/, ""));
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
