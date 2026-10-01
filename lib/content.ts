// All page copy lives here so it can be edited without touching layout code.
// Numbers and contact details marked TODO are placeholders to confirm before launch.

export const site = {
  name: "AirMax",
  url: "https://airmax.agency", // TODO: confirm production domain
  email: "sayan@airmax.agency",
  bookingUrl: "https://calendly.com/reachsayandeep/30mins-with-sayandeep",
  auditLabel: "Book a Free AEO Audit",
  tagline: "The AEO agency that helps startups maximise their visibility in AI answers.",
  description:
    "AirMax is the answer engine optimization (AEO) agency for startups. We maximise your visibility in ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews, on top of SEO foundations that compound.",
};

export const nav = {
  links: [
    {
      label: "Services",
      href: "/#services",
      children: [
        { label: "AEO / AI search", href: "/#services", note: "Get cited by AI" },
        { label: "SEO foundations", href: "/#services", note: "Rank on Google" },
        { label: "Technical SEO & schema", href: "/#capabilities", note: "Speed, crawl, entities" },
        { label: "Content & digital PR", href: "/#capabilities", note: "Earn mentions" },
      ],
    },
    { label: "Capabilities", href: "/#capabilities" },
    { label: "Process", href: "/#process" },
    { label: "Why AirMax", href: "/#why-airmax" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
  ],
  cta: { label: site.auditLabel, href: site.bookingUrl },
};

export const hero = {
  pill: { strong: "40+ startups", rest: "growing with AirMax" }, // TODO: confirm client count
  titleBefore: "Make your startup the",
  titleAccent: "answer",
  titleAfter: "AI recommends",
  body: "AirMax is the AEO agency for startups. We maximise your visibility in ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews, so you are the brand buyers hear about first.",
  cta: { label: site.auditLabel, href: site.bookingUrl },
  features: ["AEO-first, built for startups", "Cited in answers, not just ranked", "Weekly AI visibility reports"],
};

export const engines = {
  title: "Get cited in the AI engines your buyers already ask",
  // Order alternates so the two Google marks (Gemini, AI Overviews) never sit side by side.
  items: [
    { name: "ChatGPT", logo: "openai" },
    { name: "Gemini", logo: "gemini" },
    { name: "Claude", logo: "claude" },
    { name: "Google AI Overviews", logo: "gemini" },
    { name: "Perplexity", logo: "perplexity" },
    { name: "Microsoft Copilot", logo: "copilot" },
    { name: "Google Search", logo: "google" },
    { name: "Bing", logo: "bing" },
  ],
} as const;

export const services = {
  pill: "Services",
  title: "Maximise your visibility where buyers now ask",
  body: "Your next customer may never open a results page. They ask an AI and trust the answer. We make sure that answer is you.",
  cards: [
    {
      icon: "chat",
      title: "AEO for AI answers",
      body: "We restructure your content, entities and brand mentions so ChatGPT, Claude, Perplexity and Gemini cite you when buyers ask for a recommendation.",
      features: ["LLM citation optimization", "Entity & schema markup", "Google AI Overviews"],
    },
    {
      icon: "search",
      title: "SEO foundations that feed AI",
      body: "Answer engines lean on the same signals Google trusts: crawlable pages, topical depth and authority. We build them once and win in both places.",
      features: ["Technical SEO audits", "Topic clusters & content", "Digital PR & link building"],
    },
    {
      icon: "chart",
      title: "AI visibility tracking",
      body: "See exactly where you appear: citations, share of answer, rankings and signups, in one live dashboard that shows what is working.",
      features: ["Prompt-level citation tracking", "Share-of-answer benchmarks", "Monthly growth reviews"],
    },
  ],
} as const;

export const capabilities = {
  pill: "Capabilities",
  title: "Everything AI search needs to trust you",
  body: "Answer engines reward brands that are fast, structured, well-written and widely mentioned. We build all four.",
  tiles: {
    answer: {
      title: "Answer engine optimization",
      body: "We shape how ChatGPT, Perplexity and Gemini describe you, then track every prompt where you get cited.",
      prompt: "What's the best payroll API for a seed-stage startup?",
      engines: [
        {
          name: "ChatGPT",
          answer:
            "For seed-stage teams, Northwind is a popular pick: it takes about a day to integrate and pricing scales with headcount.",
        },
        {
          name: "Perplexity",
          answer:
            "Northwind is frequently recommended for early-stage startups thanks to its developer-first API and transparent pricing.",
        },
        {
          name: "Gemini",
          answer:
            "Startups often choose Northwind because its API is quick to set up and built for small, fast-moving teams.",
        },
      ],
      sources: ["northwind.com", "northwind.com/pricing", "+3 sources"],
    },
    technical: {
      title: "Technical SEO",
      body: "Core Web Vitals, crawlability and indexation, fixed at the source.",
      vitals: [
        { label: "LCP", value: 1.8, unit: "s", pct: 0.82 },
        { label: "INP", value: 120, unit: "ms", pct: 0.9 },
        { label: "CLS", value: 0.02, unit: "", pct: 0.95 },
      ],
    },
    schema: {
      title: "Schema & entities",
      body: "Structured data that tells machines exactly who you are.",
    },
    content: {
      title: "Content that ranks",
      body: "Pages built around real buyer questions, then climbed up the results.",
    },
    pr: {
      title: "Digital PR & mentions",
      body: "Earned mentions on the sites AI models learn from and cite.",
    },
  },
} as const;

export const process = {
  pill: "Process",
  title: "From audit to answers in 90 days",
  body: "A clear, sprint-based plan with visible wins early and compounding results after.",
  steps: [
    {
      icon: "audit",
      when: "Week 1",
      title: "Audit",
      body: "A full technical SEO and AI visibility audit across Google and six AI engines, benchmarked against competitors.",
    },
    {
      icon: "map",
      when: "Weeks 2–3",
      title: "Strategy",
      body: "Prompt and keyword research turned into a 90-day roadmap, prioritized by pipeline impact.",
    },
    {
      icon: "rocket",
      when: "Months 1–3",
      title: "Execute",
      body: "Technical fixes, content, schema and digital PR shipped in weekly sprints alongside your team.",
    },
    {
      icon: "loop",
      when: "Ongoing",
      title: "Compound",
      body: "We track citations, rankings and signups, then double down on whatever moves revenue.",
    },
  ],
} as const;

export const compare = {
  pill: "The difference",
  title: "Built for answer engines, not just search engines",
  body: "Traditional SEO stops at the results page. AirMax starts there and goes on to win the answer.",
  columns: ["Traditional SEO agency", "AirMax"],
  rows: [
    { label: "Google rankings & organic traffic", them: "yes", us: "yes" },
    { label: "Citations in ChatGPT, Perplexity & Gemini", them: "no", us: "yes" },
    { label: "Entity & schema strategy for LLMs", them: "partial", us: "yes" },
    { label: "Share-of-AI-answer reporting", them: "no", us: "yes" },
    { label: "Content written to be quoted, not just ranked", them: "partial", us: "yes" },
    { label: "Quick wins shipped in the first 30 days", them: "no", us: "yes" },
  ],
} as const;

export const benefits = {
  pill: "Why AirMax",
  title: "Why startups choose AirMax",
  body: "Most agencies still optimize for ten blue links. We build visibility for how people search now, across Google and every major AI engine.",
  items: [
    {
      icon: "sparkle",
      title: "Cited, not just ranked",
      body: "We optimize for the answer box and the chatbot, so your brand is named when buyers ask AI for a recommendation.",
    },
    {
      icon: "bolt",
      title: "Built for startup speed",
      body: "Lean sprints, clear priorities and quick wins in the first 30 days. No six-month discovery phase before anything ships.",
    },
    {
      icon: "pie",
      title: "Lower acquisition costs",
      body: "Organic and AI-referred traffic compounds over time, cutting your reliance on paid ads as you scale.",
    },
    {
      icon: "report",
      title: "Reporting you can trust",
      body: "Live dashboards track rankings, AI citations and signups, so you always know what is working and why.",
    },
  ],
} as const;

export const faq = {
  pill: "FAQ",
  title: "We've got the answers",
  body: "Everything founders ask us before they start, from AEO basics to timelines and what we can (and can't) promise.",
  aside: {
    title: "Still have questions?",
    body: "Book a free AEO audit call and we'll walk through your current AI and Google visibility, live.",
    cta: site.auditLabel,
  },
  items: [
    {
      q: "What is AEO, and how is it different from SEO?",
      a: "SEO helps you rank in search results. AEO (answer engine optimization) helps AI tools like ChatGPT, Perplexity and Google AI Overviews pick your brand as the answer. We run both, because they share the same foundations.",
    },
    {
      q: "How quickly will we see results?",
      a: "Technical fixes and quick wins usually show within 3 to 6 weeks. Meaningful ranking and AI citation growth typically builds over 3 to 6 months, depending on your market and starting point.",
    },
    {
      q: "Which AI search engines do you optimize for?",
      a: "ChatGPT, Claude, Perplexity, Gemini, Microsoft Copilot and Google AI Overviews. We track your presence in each one and prioritize the engines your buyers actually use.",
    },
    {
      q: "Can you guarantee we'll be cited by ChatGPT?",
      a: "No one can honestly guarantee placement in AI answers or rankings. What we guarantee is the work: a clear plan, consistent execution and transparent tracking of every citation and ranking we earn.",
    },
    {
      q: "Do you work with early-stage startups?",
      a: "Yes. We tailor scope to your stage, whether you need an organic foundation from scratch or want to scale a channel that is already working.",
    },
    {
      q: "Will you work with our existing tools and team?",
      a: "Absolutely. We plug into your CMS, analytics and Search Console, and collaborate with your marketing, content and engineering teams without slowing them down.",
    },
    {
      q: "How is AirMax different from other SEO agencies?",
      a: "We are an AEO agency first. Our job is to maximise how often and how well your startup is cited in AI answers, and we back it with the SEO foundations that make those citations stick. We report on AI citations and share of answer alongside rankings and traffic.",
    },
    {
      q: "What happens in the free AEO audit?",
      a: "On a 30-minute call we check how ChatGPT, Perplexity, Gemini and Google AI Overviews currently describe your brand, which prompts your competitors win, and the three fixes most likely to move your citations. There is no obligation to hire us.",
    },
  ],
};

export const cta = {
  title: "Turn AI search into your next growth channel",
  body: "Book a free AEO audit: see how often ChatGPT, Perplexity and Gemini mention you today, and the quickest way to get cited more.",
  button: { label: site.auditLabel, href: site.bookingUrl },
};

export const footer = {
  blurb: "AEO visibility for ambitious startups.",
  columns: [
    {
      title: "Company",
      links: [
        { label: "Capabilities", href: "/#capabilities" },
        { label: "Process", href: "/#process" },
        { label: "Why AirMax", href: "/#why-airmax" },
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "AEO / AI search", href: "/#services" },
        { label: "SEO foundations", href: "/#services" },
        { label: "Technical SEO & schema", href: "/#capabilities" },
        { label: "Content & PR", href: "/#capabilities" },
      ],
    },
  ],
  contact: {
    title: "Contact",
    email: site.email,
    call: { label: site.auditLabel, href: site.bookingUrl },
  },
  social: [
    { label: "X", href: "https://x.com/", icon: "x" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
  ], // TODO: point to AirMax profiles
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
} as const;
