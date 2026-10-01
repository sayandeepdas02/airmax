// Builds the blog cover images (public/blog/<slug>-cover.webp) from scripts/assets/cover-source.webp
// with a legibility scrim and a small title overlay.  Run: node scripts/generate-blog-covers.mjs
import sharp from "sharp";

const SRC = "scripts/assets/cover-source.webp";
const W = 1200;
const H = 630;
const FONT = "Helvetica, Arial, sans-serif";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// Each post gets a different crop of the same photo so the covers feel like a set, not copies.
const covers = [
  { slug: "aeo-vs-seo", category: "AEO Fundamentals", lines: ["AEO vs SEO: the real differences,", "and how startups win both"], zoom: 1, fx: 0.5, fy: 0.5 },
  { slug: "seo-best-practices", category: "SEO Strategy", lines: ["10 SEO best practices for", "Google and AI search"], zoom: 1.5, fx: 0.12, fy: 0.55 },
  { slug: "what-is-answer-engine-optimization", category: "AEO Fundamentals", lines: ["What is Answer Engine", "Optimization (AEO)?"], zoom: 1.5, fx: 0.5, fy: 0.3 },
  { slug: "what-is-generative-engine-optimization", category: "GEO", lines: ["What is Generative Engine", "Optimization (GEO)?"], zoom: 1.5, fx: 0.92, fy: 0.5 },
  { slug: "aeo-strategies-for-startups", category: "AEO for Startups", lines: ["7 AEO strategies for startups", "to get cited in AI answers"], zoom: 1.6, fx: 0.15, fy: 1 },
];

const meta = await sharp(SRC).metadata();
const baseH = Math.round((meta.width * H) / W);

for (const c of covers) {
  const cw = Math.round(meta.width / c.zoom);
  const ch = Math.round(baseH / c.zoom);
  const left = Math.round(c.fx * (meta.width - cw));
  const top = Math.round(c.fy * (meta.height - ch));
  const bg = await sharp(SRC).extract({ left, top, width: cw, height: ch }).resize(W, H).toBuffer();

  const pillW = c.category.length * 8.6 + 28;
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<defs>
<linearGradient id="s" x1="0" y1="1" x2="0.4" y2="0.25"><stop offset="0" stop-color="#060e0e" stop-opacity=".94"/><stop offset=".6" stop-color="#060e0e" stop-opacity=".7"/><stop offset="1" stop-color="#060e0e" stop-opacity="0"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#s)"/>
<rect x="48" y="${H - 168}" width="${pillW}" height="28" rx="14" fill="#0c3126" fill-opacity=".92" stroke="#10b261"/>
<text x="${48 + pillW / 2}" y="${H - 149}" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="700" letter-spacing="1" fill="#00f57b">${esc(c.category.toUpperCase())}</text>
${c.lines.map((l, i) => `<text x="48" y="${H - 110 + i * 40}" font-family="${FONT}" font-size="32" font-weight="700" fill="#f6f9f7">${esc(l)}</text>`).join("\n")}
<text x="48" y="${H - 28}" font-family="${FONT}" font-size="16" font-weight="700" fill="#f6f9f7">AirMax <tspan font-weight="400" fill="#cfe3dc">· AEO agency for startups</tspan></text>
</svg>`;

  await sharp(bg).composite([{ input: Buffer.from(overlay) }]).webp({ quality: 82 }).toFile(`public/blog/${c.slug}-cover.webp`);
}
console.log("covers generated");
