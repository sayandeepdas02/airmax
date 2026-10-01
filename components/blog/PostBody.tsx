import type { Block } from "@/lib/blog";
import { site } from "@/lib/content";
import { Button } from "@/components/ui/Interactive";
import { Inline, slugify } from "./Inline";
import { Visual } from "./visuals/Visual";
import styles from "./blog.module.css";

export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className={styles.prose}>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={slugify(b.text)}>
                {b.text}
              </h2>
            );
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it) => (
                  <li key={it}>
                    <Inline text={it} />
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className={styles.tableWrap}>
                <table>
                  <caption>{b.caption}</caption>
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) =>
                          k === 0 ? (
                            <th key={k} scope="row">
                              {c}
                            </th>
                          ) : (
                            <td key={k}>{c}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return (
              <aside key={i} className={styles.callout}>
                <strong>{b.title}</strong>
                <p>
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          case "figure":
            if (b.visual) return <Visual key={i} name={b.visual} alt={b.alt} caption={b.caption} />;
            return (
              <figure key={i} className={styles.figure}>
                <img src={b.src} alt={b.alt} width={1200} height={560} loading="lazy" decoding="async" />
                <figcaption>{b.caption}</figcaption>
              </figure>
            );
          case "cta":
            return (
              <div key={i} className={styles.cta}>
                <h2 className={styles.ctaTitle}>Want to be the answer AI recommends?</h2>
                <p>
                  Book a free AEO audit. In 30 minutes we will show you how ChatGPT, Perplexity, Gemini and Google AI
                  Overviews describe your startup today, and the fastest fixes to get you cited.
                </p>
                <Button href={site.bookingUrl}>{site.auditLabel}</Button>
              </div>
            );
        }
      })}
    </div>
  );
}
