import type { Post } from "@/lib/blog";
import { fmtDate } from "./Shell";
import styles from "./blog.module.css";

export function PostCard({ post, featured, compact }: { post: Post; featured?: boolean; compact?: boolean }) {
  const Heading = compact ? "h3" : "h2";
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <a href={`/blog/${post.slug}`} aria-label={post.title} style={{ display: "contents" }}>
        <img src={post.cover.src} alt={post.cover.alt} width={1200} height={630} loading={featured ? "eager" : "lazy"} decoding="async" />
        <div className={styles.cardBody}>
          <div className={styles.meta}>
            <span className={styles.cat}>{post.category}</span>
            <time dateTime={post.datePublished}>{fmtDate(post.datePublished)}</time>
            <span>{post.readMinutes} min read</span>
          </div>
          <Heading>{post.title}</Heading>
          {!compact && <p>{post.excerpt}</p>}
        </div>
      </a>
    </article>
  );
}
