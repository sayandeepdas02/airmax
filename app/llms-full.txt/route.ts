import { posts } from "@/lib/blog";
import { postToMarkdown } from "@/lib/blog/markdown";
import { faq, site } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const home = [
    `# ${site.name}: full content`,
    "",
    `> ${site.description}`,
    "",
    `Website: ${site.url} | Book a free AEO audit: ${site.bookingUrl} | Email: ${site.email}`,
    "",
    "## Frequently asked questions",
    "",
    ...faq.items.flatMap((i) => [`### ${i.q}`, "", i.a, ""]),
  ].join("\n");
  const body = [home, ...posts.map(postToMarkdown)].join("\n\n---\n\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
