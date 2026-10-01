// Generates the on-brand SVG diagrams in public/blog (covers: generate-blog-covers.mjs).  Run: node scripts/generate-blog-images.mjs
import { writeFileSync, mkdirSync } from "node:fs";

const C = { bg: "#060e0e", line: "#1f3638", green: "#10b261", neon: "#00f57b", text: "#f6f9f7", mute: "#8fa5a0", card: "#0b1919", cyan: "#11474a", jungle: "#0c3126" };
const FONT = "Instrument Sans, Inter, Helvetica, Arial, sans-serif";
mkdirSync("public/blog", { recursive: true });

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const text = (x, y, s, { size = 28, weight = 500, fill = C.text, anchor = "start", opacity = 1 } = {}) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" opacity="${opacity}">${esc(s)}</text>`;
const rect = (x, y, w, h, { r = 14, fill = C.card, stroke = C.cyan, sw = 1.5 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;

function frame(w, h, title, desc, body) {
  let grid = "";
  for (let x = 0; x <= w; x += 64) grid += `<path d="M${x} 0V${h}" />`;
  for (let y = 0; y <= h; y += 64) grid += `<path d="M0 ${y}H${w}" />`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t d">
<title id="t">${esc(title)}</title><desc id="d">${esc(desc)}</desc>
<defs>
<radialGradient id="glow" cx="75%" cy="45%" r="60%"><stop offset="0" stop-color="#10b261" stop-opacity=".28"/><stop offset="1" stop-color="#10b261" stop-opacity="0"/></radialGradient>
<linearGradient id="grn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.neon}"/><stop offset="1" stop-color="${C.green}"/></linearGradient>
<marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.green}"/></marker>
</defs>
<rect width="${w}" height="${h}" fill="${C.bg}"/>
<g stroke="${C.line}" stroke-width="1" opacity=".55">${grid}</g>
<rect width="${w}" height="${h}" fill="url(#glow)"/>
${body}
</svg>
`;
}

/* ---------- Figures (1200x560) ---------- */
function figure(slug, title, alt, body) {
  writeFileSync(`public/blog/${slug}-figure.svg`, frame(1200, 560, title, alt, body));
}

// 1. SEO vs AEO
figure("aeo-vs-seo", "SEO returns a list of links, AEO returns one cited answer", "Diagram comparing SEO, which returns ten blue links to a user, with AEO, which returns one synthesized answer citing three sources",
`${rect(60, 60, 500, 440, { r: 20 })}${text(310, 120, "SEO", { size: 40, weight: 700, anchor: "middle" })}${text(310, 154, "Rank and win the click", { size: 20, anchor: "middle", fill: C.mute })}
${Array.from({ length: 6 }, (_, i) => `<rect x="100" y="${185 + i * 46}" width="${i === 0 ? 420 : 380 - (i % 3) * 30}" height="14" rx="7" fill="${i === 0 ? C.green : C.mute}" opacity="${i === 0 ? 1 : 0.4}"/><rect x="100" y="${205 + i * 46}" width="${i === 0 ? 300 : 260}" height="8" rx="4" fill="${C.mute}" opacity=".25"/>`).join("")}
${rect(640, 60, 500, 440, { r: 20, fill: C.jungle, stroke: C.green, sw: 2.5 })}${text(890, 120, "AEO", { size: 40, weight: 700, anchor: "middle" })}${text(890, 154, "Be the answer that is cited", { size: 20, anchor: "middle", fill: C.mute })}
${rect(680, 185, 420, 160, { fill: C.card })}<rect x="708" y="213" width="300" height="14" rx="7" fill="url(#grn)"/><rect x="708" y="245" width="360" height="10" rx="5" fill="${C.mute}" opacity=".5"/><rect x="708" y="267" width="330" height="10" rx="5" fill="${C.mute}" opacity=".5"/><rect x="708" y="289" width="250" height="10" rx="5" fill="${C.mute}" opacity=".5"/>
${["Source 1", "Source 2", "Your brand"].map((s, i) => rect(680 + i * 142, 372, 130, 40, { r: 20, fill: i === 2 ? C.jungle : C.card, stroke: i === 2 ? C.neon : C.cyan }) + text(745 + i * 142, 398, s, { size: 17, anchor: "middle", fill: i === 2 ? C.neon : C.text })).join("")}
${text(890, 455, "One synthesized reply", { size: 20, anchor: "middle", fill: C.mute })}`);

// 2. Pyramid
figure("seo-best-practices", "Three layers of SEO best practices", "Pyramid diagram with a foundation layer for intent, structure and technical access, a middle layer for expertise, evidence and authority, and a top layer for agentic readiness and measurement",
[["Adaptation", "Agentic readiness · Measurement", 0, 440, C.neon], ["Authority", "E-E-A-T · Original evidence · Off-site presence", 1, 640, C.green], ["Foundation", "Intent · Topical authority · Structure · Technical · Images", 2, 840, C.cyan]]
  .map(([a, b, i, w, st]) => rect(600 - w / 2, 50 + i * 160, w, 140, { r: 18, fill: i === 0 ? C.jungle : C.card, stroke: st, sw: 2.5 }) + text(600, 112 + i * 160, a, { size: 38, weight: 700, anchor: "middle" }) + text(600, 152 + i * 160, b, { size: 21, anchor: "middle", fill: C.mute })).join(""));

// 3. AEO flow
figure("what-is-answer-engine-optimization", "How an answer engine turns a question into a cited answer", "Flow diagram showing a buyer question going to an answer engine, which retrieves sources and returns a synthesized answer that cites a brand",
[["Buyer asks", "“Best tool for a seed-stage team?”"], ["Answer engine", "Reads and ranks sources"], ["Sources", "Pages, reviews, mentions"], ["Cited answer", "Your brand is named"]]
  .map(([a, b], i) => rect(40 + i * 290, 190, 250, 180, { fill: i === 3 ? C.jungle : C.card, stroke: i === 3 ? C.neon : C.cyan, sw: i === 3 ? 3 : 1.5 }) + text(165 + i * 290, 255, a, { size: 28, weight: 700, anchor: "middle" }) + text(165 + i * 290, 300, b.length > 24 ? b.slice(0, 24) : b, { size: 18, anchor: "middle", fill: C.mute }) + (b.length > 24 ? text(165 + i * 290, 326, b.slice(24).trim(), { size: 18, anchor: "middle", fill: C.mute }) : "") + (i < 3 ? `<path d="M${292 + i * 290} 280H${326 + i * 290}" stroke="${C.green}" stroke-width="3.5" marker-end="url(#arr)"/>` : "")).join(""));

// 4. GEO pipeline w/ levers
figure("what-is-generative-engine-optimization", "Three stages of a generative answer and the lever at each", "Pipeline diagram showing three stages of a generative engine: retrieval of sources, synthesis of an answer, and citation of selected sources",
[["1. Retrieval", "Be crawlable, indexable and relevant"], ["2. Synthesis", "Write clear, self-contained passages"], ["3. Citation", "Be the specific, authoritative source"]]
  .map(([a, b], i) => rect(50 + i * 380, 90, 320, 130, { fill: i === 2 ? C.jungle : C.card, stroke: i === 2 ? C.neon : C.green, sw: 2.5 }) + text(210 + i * 380, 165, a, { size: 34, weight: 700, anchor: "middle" }) + (i < 2 ? `<path d="M${374 + i * 380} 155H${424 + i * 380}" stroke="${C.green}" stroke-width="3.5" marker-end="url(#arr)"/>` : "") + `<path d="M${210 + i * 380} 222V290" stroke="${C.cyan}" stroke-width="2" stroke-dasharray="6 6"/>` + rect(50 + i * 380, 290, 320, 130, { r: 16 }) + text(210 + i * 380, 335, "Your lever", { size: 17, anchor: "middle", fill: C.neon, weight: 600 }) + text(210 + i * 380, 372, b.length > 30 ? b.slice(0, b.lastIndexOf(" ", 30)) : b, { size: 20, anchor: "middle" }) + (b.length > 30 ? text(210 + i * 380, 398, b.slice(b.lastIndexOf(" ", 30) + 1), { size: 20, anchor: "middle" }) : "")).join(""));

// 5. Ladder
const ladder = ["Answer-first content", "Schema markup", "Content clusters", "Question targeting", "Credibility signals", "AI audits", "Fresh updates"];
figure("aeo-strategies-for-startups", "Seven AEO strategies for startups", "Seven-step ladder listing answer-first content, schema, content clusters, question targeting, credibility signals, AI audits and freshness, ordered from quick wins to compounding habits",
ladder.map((s, i) => rect(60 + i * 20, 40 + i * 68, 560 + i * 40 - 0, 56, { r: 12, fill: i === 6 ? C.jungle : C.card, stroke: i === 6 ? C.neon : C.cyan, sw: i === 6 ? 2.5 : 1.5 }) + text(94 + i * 20, 77 + i * 68, `${i + 1}`, { size: 26, weight: 700, fill: C.neon }) + text(140 + i * 20, 77 + i * 68, s, { size: 26, weight: 600 })).join("") + text(1120, 70, "Quick wins", { size: 22, anchor: "end", fill: C.mute }) + text(1120, 510, "Compounding habits", { size: 22, anchor: "end", fill: C.mute }));
console.log("generated");
