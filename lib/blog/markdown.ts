import type { Post } from "./types";
import { site } from "../content";

/** Plain-markdown rendering of a post, used by /llms-full.txt. */
export function postToMarkdown(p: Post): string {
  const out: string[] = [
    `# ${p.title}`,
    "",
    `URL: ${site.url}/blog/${p.slug}`,
    `Category: ${p.category} | Published: ${p.datePublished} | Updated: ${p.dateModified}`,
    "",
    "## Key takeaways",
    ...p.takeaways.map((t) => `- ${t}`),
    "",
  ];
  for (const b of p.blocks) {
    switch (b.t) {
      case "p":
        out.push(b.text, "");
        break;
      case "h2":
        out.push(`## ${b.text}`, "");
        break;
      case "h3":
        out.push(`### ${b.text}`, "");
        break;
      case "ul":
        out.push(...b.items.map((i) => `- ${i}`), "");
        break;
      case "ol":
        out.push(...b.items.map((i, n) => `${n + 1}. ${i}`), "");
        break;
      case "table":
        out.push(`**${b.caption}**`, "", `| ${b.head.join(" | ")} |`, `| ${b.head.map(() => "---").join(" | ")} |`, ...b.rows.map((r) => `| ${r.join(" | ")} |`), "");
        break;
      case "callout":
        out.push(`> **${b.title}** ${b.text}`, "");
        break;
      case "figure":
        out.push(`![${b.alt}](${site.url}${b.src})`, `*${b.caption}*`, "");
        break;
      case "cta":
        out.push(`Book a free AEO audit: ${site.bookingUrl}`, "");
        break;
    }
  }
  out.push("## Frequently asked questions", "");
  for (const f of p.faqs) out.push(`### ${f.q}`, "", f.a, "");
  return out.join("\n");
}
