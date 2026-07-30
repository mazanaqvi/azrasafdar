import type { MetadataRoute } from "next";
import { photos } from "@/lib/gallery";
import { getNewsSummaries } from "@/lib/news";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/projects", priority: 0.9 },
    { path: "/gallery", priority: 0.6 },
    { path: "/news", priority: 0.7 },
    { path: "/volunteer", priority: 0.9 },
    { path: "/donate", priority: 0.9 },
    { path: "/contact", priority: 0.8 },
  ].map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    priority,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const photoRoutes = photos.map((photo) => ({
    url: `${site.url}/gallery/${photo.slug}`,
    lastModified: new Date(),
    priority: 0.4,
  }));

  const posts = await getNewsSummaries();
  const postRoutes = posts.map((post) => ({
    url: `${site.url}/news/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...photoRoutes, ...postRoutes];
}
