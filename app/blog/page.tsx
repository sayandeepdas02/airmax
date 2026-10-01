import type { Metadata } from "next";
import { posts } from "@/lib/blog";
import { site } from "@/lib/content";
import { JsonLd, Shell } from "@/components/blog/Shell";
import { PostCard } from "@/components/blog/PostCard";
import styles from "@/components/blog/blog.module.css";

const title = "AEO & SEO Blog for Startups | AirMax";
const description =
  "Practical guides on answer engine optimization (AEO), generative engine optimization (GEO) and SEO for startups, from the team that helps brands get cited by ChatGPT, Perplexity, Gemini and Google AI Overviews.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", url: "/blog", siteName: site.name, title, description, images: [{ url: posts[0].cover.src, alt: posts[0].cover.alt }] },
  twitter: { card: "summary_large_image", title, description },
};

export default function BlogIndex() {
  const [featured, ...rest] = posts;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${site.url}/blog#page`,
        url: `${site.url}/blog`,
        name: title,
        description,
        isPartOf: { "@id": `${site.url}/#website` },
      },
      {
        "@type": "Blog",
        "@id": `${site.url}/blog#blog`,
        url: `${site.url}/blog`,
        name: "The AirMax AEO & SEO Blog",
        publisher: { "@id": `${site.url}/#organization` },
        blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}/blog/${p.slug}`, datePublished: p.datePublished })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
        ],
      },
    ],
  };

  return (
    <Shell>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb">
        <ol className={styles.crumbs}>
          <li>
            <a href="/">Home</a>
          </li>
          <li aria-current="page">Blog</li>
        </ol>
      </nav>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>The AirMax Blog</span>
        <h1 className="t-h2">Answer engine optimization for startups</h1>
        <p className="t-body-18 muted">
          Plain-English guides on AEO, GEO and SEO: how AI answers are built, and how a startup gets cited in them.
        </p>
      </header>
      <section className={styles.grid} aria-label="All articles">
        <PostCard post={featured} featured />
        {rest.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </section>
    </Shell>
  );
}
