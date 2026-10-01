export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "table"; caption: string; head: string[]; rows: string[][] }
  | { t: "callout"; title: string; text: string }
  | { t: "figure"; src: string; alt: string; caption: string; visual?: "serp-vs-answer" | "layers" | "question-to-answer" | "pipeline" | "audit-dashboard" }
  | { t: "cta" };

export type Post = {
  slug: string;
  title: string; // H1
  metaTitle: string; // <title>, ≤ 60 chars where possible
  metaDescription: string; // ≤ 160 chars
  excerpt: string;
  category: string;
  keywords: string[];
  datePublished: string; // ISO
  dateModified: string; // ISO
  readMinutes: number;
  cover: { src: string; alt: string };
  takeaways: string[];
  blocks: Block[];
  faqs: { q: string; a: string }[];
  related: string[]; // slugs
};
