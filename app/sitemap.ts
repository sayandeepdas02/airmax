import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = posts.map((p) => p.dateModified).sort().at(-1)!;
  return [
    { url: site.url, lastModified: latest, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/privacy-policy`, lastModified: "2026-10-02", changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms-of-service`, lastModified: "2026-10-02", changeFrequency: "yearly", priority: 0.2 },
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.dateModified, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
