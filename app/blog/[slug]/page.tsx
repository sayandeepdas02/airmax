import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, plain, posts } from "@/lib/blog";
import { site } from "@/lib/content";
import { JsonLd, Shell, fmtDate } from "@/components/blog/Shell";
import { PostBody } from "@/components/blog/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { slugify } from "@/components/blog/Inline";
import styles from "@/components/blog/blog.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: "The AirMax Team", url: site.url }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: site.name,
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: ["The AirMax Team"],
      section: post.category,
      tags: post.keywords,
    },
    twitter: { card: "summary_large_image", title: post.metaTitle, description: post.metaDescription },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;
  const headings = post.blocks.filter((b) => b.t === "h2").map((b) => (b as { text: string }).text);
  const words = post.blocks.reduce((n, b) => {
    const t = "text" in b ? b.text : "items" in b ? b.items.join(" ") : "";
    return n + plain(t).split(/\s+/).filter(Boolean).length;
  }, 0);
  const related = post.related.map((s) => getPost(s)).filter((p): p is NonNullable<typeof p> => !!p);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.metaDescription,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: { "@type": "ImageObject", url: `${site.url}${post.cover.src}`, width: 1200, height: 630, caption: post.cover.alt },
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        author: { "@type": "Organization", name: "The AirMax Team", url: site.url },
        publisher: { "@id": `${site.url}/#organization` },
        isPartOf: { "@id": `${site.url}/blog#blog` },
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        wordCount: words,
        inLanguage: "en",
        about: post.keywords.slice(0, 3).map((k) => ({ "@type": "Thing", name: k })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
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
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li aria-current="page">{post.category}</li>
        </ol>
      </nav>

      <article>
        <header className={styles.postHead}>
          <div className={styles.meta}>
            <span className={styles.cat}>{post.category}</span>
            <span>By The AirMax Team</span>
            <time dateTime={post.datePublished}>{fmtDate(post.datePublished)}</time>
            <span>{post.readMinutes} min read</span>
          </div>
          <h1>{post.title}</h1>
          <p className={styles.lede}>{post.excerpt}</p>
        </header>

        <img className={styles.coverImg} src={post.cover.src} alt={post.cover.alt} width={1200} height={630} fetchPriority="high" decoding="async" />

        <div className={styles.layout}>
          <div>
            <section className={styles.takeaways} aria-labelledby="takeaways">
              <h2 id="takeaways">Key takeaways</h2>
              <ul>
                {post.takeaways.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>

            <PostBody blocks={post.blocks} />

            <section className={styles.faq} aria-labelledby="faq-heading">
              <h2 id="faq-heading">Frequently asked questions</h2>
              {post.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>
          </div>

          <aside className={styles.toc} aria-label="Table of contents">
            <p>On this page</p>
            <ol>
              {headings.map((h) => (
                <li key={h}>
                  <a href={`#${slugify(h)}`}>{h}</a>
                </li>
              ))}
              <li>
                <a href="#faq-heading">Frequently asked questions</a>
              </li>
            </ol>
          </aside>
        </div>
      </article>

      <section className={styles.related} aria-labelledby="related-heading">
        <h2 id="related-heading">Keep reading</h2>
        <div className={styles.grid}>
          {related.map((p) => (
            <PostCard key={p.slug} post={p} compact />
          ))}
        </div>
      </section>
    </Shell>
  );
}
