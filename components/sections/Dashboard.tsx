"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/ui/primitives";
import { EngineLogo, type EngineLogoName } from "@/components/ui/engine-logos";
import { CountUp, EASE_OUT } from "@/components/motion/Motion";
import styles from "./Dashboard.module.css";

/**
 * Product-style mockup shown inside the hero frame. Authored at 980×602 and scaled by
 * <HeroVisual>. "Northwind" is a sample workspace; all figures are illustrative.
 * When it scrolls into view: numbers count up, chart lines draw, bars grow and the
 * citation feed starts cycling.
 */

const KPIS = [
  { label: "Share of AI answers", to: 34.8, decimals: 1, suffix: "%", delta: "+12.4 pts" },
  { label: "AI citations", to: 1284, decimals: 0, suffix: "", delta: "+318%" },
  { label: "Organic clicks", to: 48.2, decimals: 1, suffix: "k", delta: "+86%" },
  { label: "Avg. Google position", to: 4.3, decimals: 1, suffix: "", delta: "+6.1 spots" },
];

const SERIES = [
  { name: "ChatGPT", color: "#10B261", data: [18, 21, 24, 29, 33, 41, 46, 55, 62, 73, 86, 98] },
  { name: "Perplexity", color: "#0A281F", data: [9, 12, 14, 15, 19, 22, 27, 30, 35, 41, 46, 53] },
  { name: "Gemini", color: "#8BD9B0", data: [4, 5, 7, 9, 10, 12, 15, 17, 20, 23, 26, 31] },
];

const SHARE: { name: string; glyph: EngineLogoName; pct: number }[] = [
  { name: "ChatGPT", glyph: "openai", pct: 41 },
  { name: "Perplexity", glyph: "perplexity", pct: 27 },
  { name: "AI Overviews", glyph: "gemini", pct: 18 },
  { name: "Gemini", glyph: "gemini", pct: 9 },
  { name: "Claude", glyph: "claude", pct: 5 },
];

const FEED: { engine: string; glyph: EngineLogoName; prompt: string; quote: [string, string]; rank: string }[] = [
  {
    engine: "Perplexity",
    glyph: "perplexity",
    prompt: "best payroll API for startups",
    quote: ["“For early-stage teams, ", " is frequently recommended because its API is quick to integrate and priced for startups…”"],
    rank: "#1",
  },
  {
    engine: "ChatGPT",
    glyph: "openai",
    prompt: "gusto alternatives for developers",
    quote: ["“Developer-led teams often shortlist ", " for its clean API, sandbox and transparent per-seat pricing…”"],
    rank: "#2",
  },
  {
    engine: "AI Overviews",
    glyph: "gemini",
    prompt: "how to run payroll via API",
    quote: ["“Platforms such as ", " let you create pay runs with a single API call and handle tax filings automatically…”"],
    rank: "#1",
  },
];

const NAV = ["Overview", "AI citations", "Rankings", "Prompts", "Competitors", "Reports"];

/* ---------- chart geometry ---------- */

const W = 396;
const H = 172;
const PAD_T = 8;
const MAX = 110;

const pt = (i: number, v: number): [number, number] => [(i / 11) * W, PAD_T + (1 - v / MAX) * (H - PAD_T)];

/** Catmull-Rom → cubic Bézier for a smooth line through the points. */
function smooth(data: readonly number[]) {
  const pts = data.map((v, i) => pt(i, v));
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

const [tipX, tipY] = pt(10, SERIES[0].data[10]);

function NavIcon({ i }: { i: number }) {
  const paths = [
    "M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z",
    "M12 3.5l2 5.4 5.5 2.1-5.5 2.1-2 5.4-2-5.4-5.5-2.1 5.5-2.1Z",
    "M3.5 17.5l5.5-5.5 4 4 7.5-7.5M15 8.5h5.5V14",
    "M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4 4v-4h0a2 2 0 0 1-2-2Z",
    "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20a6.5 6.5 0 0 1 13 0M16 4.3a3.5 3.5 0 0 1 0 6.4M18.5 14.5a6.5 6.5 0 0 1 3 5.5",
    "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  ];
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[i]} />
    </svg>
  );
}

export function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const play = useInView(ref, { once: true, amount: 0.25 });
  const visible = useInView(ref, { amount: 0.1 });
  const [feed, setFeed] = useState(0);

  // Cycle the live citation feed only while the dashboard is on screen.
  useEffect(() => {
    if (!play || !visible) return;
    const id = window.setInterval(() => setFeed((f) => (f + 1) % FEED.length), 4200);
    return () => window.clearInterval(id);
  }, [play, visible]);

  const on = play ? "show" : "hidden";
  const item = FEED[feed];

  return (
    <div ref={ref} className={styles.app} aria-hidden="true">
      {/* Sidebar */}
      <aside className={styles.side}>
        <div className={styles.brand}>
          <LogoMark size={18} />
          <span>AirMax</span>
        </div>
        <span className={styles.sideLabel}>Workspace</span>
        <motion.ul className={styles.nav} initial="hidden" animate={on} variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}>
          {NAV.map((label, i) => (
            <motion.li
              key={label}
              className={i === 0 ? styles.navActive : undefined}
              variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } } }}
            >
              <NavIcon i={i} />
              {label}
              {i === 1 && <em className={styles.navBadge}>12</em>}
            </motion.li>
          ))}
        </motion.ul>
        <div className={styles.workspace}>
          <span className={styles.wsAvatar}>N</span>
          <span>
            <strong>Northwind</strong>
            <small>Series A · SaaS</small>
          </span>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        <header className={styles.top}>
          <div>
            <div className={styles.h}>AI search visibility</div>
            <div className={styles.sub}>
              <motion.span
                className={styles.liveDot}
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.55, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              northwind.com · updated 2 min ago
            </div>
          </div>
          <div className={styles.actions}>
            <div className={styles.seg}>
              <span>7D</span>
              <span>30D</span>
              <span className={styles.segOn}>90D</span>
            </div>
            <span className={styles.export}>Export report</span>
          </div>
        </header>

        <motion.div className={styles.kpis} initial="hidden" animate={on} variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}>
          {KPIS.map((k, i) => (
            <motion.div
              key={k.label}
              className={styles.card}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } } }}
            >
              <span className={styles.kLabel}>{k.label}</span>
              <span className={styles.kValue}>
                <CountUp to={k.to} decimals={k.decimals} suffix={k.suffix} play={play} delay={0.2 + i * 0.08} />
              </span>
              <motion.span
                className={styles.delta}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={play ? { opacity: 1, scale: 1 } : undefined}
                transition={{ type: "spring", stiffness: 380, damping: 18, delay: 1.3 + i * 0.08 }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
                  <path d="M4 1 7 6H1Z" fill="currentColor" />
                </svg>
                {k.delta}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.row}>
          <div className={`${styles.card} ${styles.chartCard}`}>
            <div className={styles.cardHead}>
              <span className={styles.cardTitle}>Citations by AI engine</span>
              <span className={styles.legend}>
                {SERIES.map((s) => (
                  <span key={s.name}>
                    <i style={{ background: s.color }} />
                    {s.name}
                  </span>
                ))}
              </span>
            </div>
            <svg className={styles.chart} width={W} height={H + 28} viewBox={`0 -4 ${W} ${H + 28}`}>
              <defs>
                <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#10B261" stopOpacity="0.22" />
                  <stop offset="1" stopColor="#10B261" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((g) => (
                <line key={g} x1="0" x2={W} y1={PAD_T + (g * (H - PAD_T)) / 3} y2={PAD_T + (g * (H - PAD_T)) / 3} stroke="#E3EAE6" strokeDasharray="3 4" />
              ))}
              <motion.path
                d={`${smooth(SERIES[0].data)} L${W} ${H} L0 ${H} Z`}
                fill="url(#dash-area)"
                initial={{ opacity: 0 }}
                animate={play ? { opacity: 1 } : undefined}
                transition={{ duration: 1, delay: 1.2 }}
              />
              {SERIES.slice()
                .reverse()
                .map((s, i) => (
                  <motion.path
                    key={s.name}
                    d={smooth(s.data)}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={s.name === "ChatGPT" ? 2.4 : 1.8}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={play ? { pathLength: 1 } : undefined}
                    transition={{ duration: 1.6, delay: 0.3 + i * 0.2, ease: EASE_OUT }}
                  />
                ))}
              <motion.g initial={{ opacity: 0 }} animate={play ? { opacity: 1 } : undefined} transition={{ delay: 1.6, duration: 0.4 }}>
                <line x1={tipX} x2={tipX} y1={tipY} y2={H} stroke="#10B261" strokeDasharray="2 3" />
                <motion.circle
                  cx={tipX}
                  cy={tipY}
                  r="4.5"
                  fill="#fff"
                  stroke="#10B261"
                  strokeWidth="2.4"
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.g>
              {["W1", "W3", "W5", "W7", "W9", "W11"].map((l, i) => (
                <text key={l} x={(i * 2 * W) / 11} y={H + 16} className={styles.axis} textAnchor={i === 0 ? "start" : "middle"}>
                  {l}
                </text>
              ))}
            </svg>
            <motion.div
              className={styles.tip}
              style={{ left: 16 + tipX, top: 42 + tipY - 6 }}
              initial={{ opacity: 0, y: 8, scale: 0.9, x: "-50%" }}
              animate={play ? { opacity: 1, y: 0, scale: 1, x: "-50%" } : undefined}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1.8 }}
            >
              <strong>142</strong> citations · W11
            </motion.div>
          </div>

          <div className={`${styles.card} ${styles.shareCard}`}>
            <div className={styles.cardHead}>
              <span className={styles.cardTitle}>Where you&apos;re cited</span>
              <span className={styles.muted}>Share</span>
            </div>
            <ul className={styles.share}>
              {SHARE.map((s, i) => (
                <li key={s.name}>
                  <span className={styles.shareIcon}>
                    <EngineLogo name={s.glyph} size={13} />
                  </span>
                  <span className={styles.shareMain}>
                    <span className={styles.shareTop}>
                      <span>{s.name}</span>
                      <strong>
                        <CountUp to={s.pct} suffix="%" play={play} delay={0.6 + i * 0.1} duration={1.2} />
                      </strong>
                    </span>
                    <span className={styles.bar}>
                      <motion.span
                        style={{ width: `${(s.pct / 41) * 100}%`, originX: 0 }}
                        initial={{ scaleX: 0 }}
                        animate={play ? { scaleX: 1 } : undefined}
                        transition={{ duration: 1.2, delay: 0.6 + i * 0.1, ease: EASE_OUT }}
                      />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`${styles.card} ${styles.feed}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={feed}
              className={styles.feedInner}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <span className={styles.feedIcon}>
                <EngineLogo name={item.glyph} size={16} />
              </span>
              <div className={styles.feedBody}>
                <span className={styles.feedMeta}>
                  <span className={styles.newTag}>New citation</span> {item.engine} · prompt “{item.prompt}”
                </span>
                <div className={styles.quote}>
                  {item.quote[0]}
                  <mark>Northwind</mark>
                  {item.quote[1]}
                </div>
              </div>
              <span className={styles.rank}>
                <small>Position</small>
                {item.rank}
              </span>
            </motion.div>
          </AnimatePresence>
          <div className={styles.feedDots}>
            {FEED.map((_, i) => (
              <span key={i} className={i === feed ? styles.feedDotOn : undefined} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
