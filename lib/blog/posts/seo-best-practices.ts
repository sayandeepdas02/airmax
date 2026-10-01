import type { Post } from "../types";

export const seoBestPractices: Post = {
  slug: "seo-best-practices",
  title: "10 SEO Best Practices for Google and AI Search (2026 Startup Guide)",
  metaTitle: "10 SEO Best Practices for Google & AI Search (2026)",
  metaDescription:
    "The 10 SEO best practices that still work in 2026, updated for AI search: intent, topical authority, extractable content, technical SEO, E-E-A-T, images, schema and measurement.",
  excerpt:
    "The fundamentals have not changed, but where they are judged has. Ten practices that earn rankings in Google and citations in AI answers.",
  category: "SEO Strategy",
  keywords: ["SEO best practices", "SEO best practices 2026", "AI search SEO", "technical SEO", "topical authority", "E-E-A-T", "schema markup"],
  datePublished: "2026-10-02",
  dateModified: "2026-10-02",
  readMinutes: 11,
  cover: {
    src: "/blog/seo-best-practices-cover.webp",
    alt: "Rolling green hills and a stone village beside a large oak tree, under the title 10 SEO best practices for Google and AI search",
  },
  takeaways: [
    "SEO best practices still start with search intent, useful content, technical access and trust. What changed is that those signals are now judged by Google and by AI engines at once.",
    "Write extractable content: direct answers, descriptive headings and self-contained passages that an AI can quote.",
    "Do not block AI crawlers by accident. Review robots.txt, rendering and server rules.",
    "Original data, real expertise and third-party mentions are the hardest signals to copy, which is why they win.",
    "Measure rankings and AI citations together so you know which constraint to fix.",
  ],
  blocks: [
    {
      t: "p",
      text: "An SEO best practice is a repeatable action that makes your site easier to find, understand and trust, for both people and the systems that serve them. In 2026 those systems include Google's results, AI Overviews, ChatGPT search, Perplexity and Gemini. The good news is that the fundamentals you already know still apply. The change is that they are now tested in more places, and a few extra signals separate the pages that get cited from the pages that merely rank.",
    },
    {
      t: "p",
      text: "Below are the ten practices we apply first for startups, grouped into three layers: **foundation** (intent, structure, technical access), **authority** (expertise, evidence, off-site presence) and **adaptation** (new formats and measurement).",
    },
    {
      t: "figure",
      src: "/blog/seo-best-practices-figure.svg",
      alt: "Pyramid diagram with a foundation layer for intent, structure and technical access, a middle layer for expertise, evidence and authority, and a top layer for agentic readiness and measurement",
      caption: "Work from the bottom up: foundation, then authority, then adaptation.",
    },
    {
      t: "table",
      caption: "The 10 practices and when to prioritize them",
      head: ["Practice", "Layer", "Quickest starting action"],
      rows: [
        ["1. Match search intent", "Foundation", "Compare top Google results and AI answers for each target query"],
        ["2. Build topical authority", "Foundation", "Map one pillar page and five to ten supporting pages"],
        ["3. Structure for extraction", "Foundation", "Rewrite each section to open with a direct answer"],
        ["4. Technical SEO and AI crawler access", "Foundation", "Audit robots.txt, indexation and rendering"],
        ["5. Optimize images", "Foundation", "Add descriptive alt text and compress hero images"],
        ["6. Show E-E-A-T", "Authority", "Add bylines, credentials and first-hand examples"],
        ["7. Publish original evidence", "Authority", "Share one small study, benchmark or case result"],
        ["8. Build off-site presence", "Authority", "Pitch three relevant publications or communities"],
        ["9. Prepare for agentic search", "Adaptation", "Keep product, pricing and availability data accurate and marked up"],
        ["10. Measure across channels", "Adaptation", "Track rankings and AI mentions for the same prompts"],
      ],
    },
    { t: "h2", text: "1. Understand what your audience wants" },
    {
      t: "p",
      text: "Search intent is the task behind the query. Someone typing “payroll API” may want a definition, a vendor list or a pricing comparison, and Google and AI tools already hint at which. Before you write, search your target query and read the top results and the AI answer. Note the format (guide, list, tool), the depth, and the questions that appear repeatedly. Then build the page to satisfy that task better than the pages that are currently winning.",
    },
    {
      t: "p",
      text: "For AI search, add one more habit: write for how people ask. Conversational prompts often include context, such as team size, budget or stage. Mirror those details in your headings and examples.",
    },
    { t: "h2", text: "2. Focus on topical authority" },
    {
      t: "p",
      text: "Search and AI systems trust sites that cover a subject in depth. Instead of publishing disconnected posts, build a cluster: one comprehensive pillar page that defines the topic, and supporting pages that each answer a narrower question, all linked with descriptive anchor text. This signals depth to crawlers and gives AI engines several corroborating pages to draw on. Revisit the cluster regularly, because stale pages weaken the whole group.",
    },
    { t: "h2", text: "3. Structure content so search and AI systems can extract it" },
    {
      t: "p",
      text: "AI engines often surface a passage rather than a page, so every section has to stand alone. Use one H1, descriptive H2 and H3 headings, short paragraphs and lists where order or comparison matters. Open each section with the answer in a sentence or two. Name the subject explicitly instead of using pronouns. Add FAQ sections where real questions exist, and mark them up with schema only when the visible page matches.",
    },
    {
      t: "callout",
      title: "A quick test",
      text: "Copy any single section into a blank document. If a stranger can understand the claim and why it matters without reading the rest of the page, it is extractable. If not, rewrite it.",
    },
    { t: "h2", text: "4. Do technical SEO, including AI crawler access" },
    {
      t: "p",
      text: "Technical health is still the gate. Pages must be crawlable, indexable, fast, mobile-friendly and served over HTTPS. Pay special attention to Core Web Vitals, canonical tags, XML sitemaps and clean internal linking. Then add the new checks:",
    },
    {
      t: "ul",
      items: [
        "**Review AI crawler rules.** Confirm that robots.txt does not accidentally block the bots you want, such as OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot and Googlebot. Decide separately about training-only crawlers.",
        "**Check rendering.** Important content that only appears after heavy client-side JavaScript may not be seen by every crawler. Server-render key pages.",
        "**Avoid blanket bot blocking.** Firewall and CDN rules sometimes challenge legitimate crawlers. Test with the user agents you care about.",
        "**Consider llms.txt as a bonus.** It is an emerging convention that gives models a clean map of your best pages. Treat it as a helpful extra, not a substitute for good fundamentals.",
      ],
    },
    { t: "h2", text: "5. Optimize images for search" },
    {
      t: "p",
      text: "Images support relevance and give pages a richer appearance in results. Use descriptive file names (aeo-vs-seo-diagram.svg, not image-01.svg), write alt text that explains what the image shows and why it matters, compress files, set explicit width and height to prevent layout shift, and lazy-load below-the-fold images. Prefer original charts, screenshots and diagrams over generic stock photos, and add ImageObject schema to hero visuals where useful.",
    },
    { t: "h2", text: "6. Showcase E-E-A-T" },
    {
      t: "p",
      text: "E-E-A-T stands for experience, expertise, authoritativeness and trustworthiness. It is not a ranking switch but a way to describe what quality raters and, increasingly, AI systems look for. Show first-hand experience with real examples and workflows. Add bylines with credentials. Cite credible sources. Publish clear contact details, an About page and policies. A useful gut check: if a competitor could paste their logo over your page without losing anything, it is too generic.",
    },
    { t: "h2", text: "7. Publish original data and citable evidence" },
    {
      t: "p",
      text: "Generic advice is abundant, so engines favour content that adds something new. You do not need a giant study. A small experiment, a benchmark from your own customers, a before-and-after case or a transparent methodology is enough, as long as you explain what you did and what you found. Original numbers are quoted, linked and repeated, which feeds both rankings and citations.",
    },
    { t: "h2", text: "8. Build an off-site presence where search and AI systems look" },
    {
      t: "p",
      text: "What others say about you shapes what models say about you. Pursue relevant mentions and links through digital PR, expert commentary, partnerships, podcasts, newsletters and communities where your buyers research. Prioritize relevance over volume: a handful of respected industry mentions beat dozens of generic directories. Keep company facts (name, description, category, founding date, links) identical across profiles.",
    },
    { t: "h2", text: "9. Prepare for agentic search and commerce" },
    {
      t: "p",
      text: "AI agents increasingly compare options and even complete tasks for users. To be usable by them, keep product, pricing, plan and availability information accurate, use Product, Offer and Organization schema where it applies, and build with semantic HTML and good accessibility so that automated systems can read and navigate your pages. Pricing pages that hide everything behind a “contact us” form are harder to recommend.",
    },
    { t: "h2", text: "10. Monitor performance across Google and AI search" },
    {
      t: "p",
      text: "Track classic metrics (impressions, clicks, rankings, conversions in Search Console and analytics) alongside AI metrics: mentions, citations, share of answer and referral traffic. In GA4, look for sessions from AI assistants and compare their behavior to organic search. Then diagnose before acting. High impressions with low rankings point to authority or relevance. Strong traffic with weak conversion points to intent mismatch or page experience. Few AI mentions despite good rankings points to extractability or off-site corroboration.",
    },
    { t: "h2", text: "Turn best practices into measurable visibility" },
    {
      t: "p",
      text: "Lists are easy. Execution is where startups stall. Pick the two practices that unblock the most, ship them in a two-week sprint, then measure. If you would like a second pair of eyes, our free AEO audit shows exactly where you stand on Google and across the major AI engines. You can also read how [AEO and SEO differ](/blog/aeo-vs-seo) before you decide where to start.",
    },
    { t: "cta" },
  ],
  faqs: [
    {
      q: "What are SEO best practices?",
      a: "They are proven, repeatable actions that make your site easier to discover, understand and trust: matching search intent, publishing helpful and structured content, keeping the site technically healthy, demonstrating expertise, earning links and mentions, and measuring results.",
    },
    {
      q: "Which SEO best practice matters most?",
      a: "Matching search intent with genuinely useful content. Technical SEO, links and schema amplify good content but cannot rescue a page that does not answer what the searcher wanted.",
    },
    {
      q: "Do SEO best practices still help with AI search visibility?",
      a: "Yes. AI engines rely on crawlable, trusted, well-structured pages, and many retrieve from search indexes. Adding extractable formatting, original evidence and third-party mentions improves your odds of being cited on top of that.",
    },
    {
      q: "Should I block AI crawlers?",
      a: "It depends on your goals. If you want to be cited in AI answers, allow the search and retrieval bots. You can choose separately whether to allow training-only crawlers. Review the policy rather than leaving it to defaults or a firewall.",
    },
    {
      q: "Is llms.txt required?",
      a: "No. It is an optional, emerging convention that offers models a concise guide to your best content. It can help, but it is not a ranking factor and does not replace strong fundamentals.",
    },
  ],
  related: ["aeo-vs-seo", "aeo-strategies-for-startups", "what-is-generative-engine-optimization"],
};
