"use client";

import { AnimatePresence, animate, motion, useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { capabilities } from "@/lib/content";
import { CountUp, EASE_OUT } from "@/components/motion/Motion";
import { EngineLogo, type EngineLogoName } from "@/components/ui/engine-logos";
import styles from "./Capabilities.module.css";

const spring = { type: "spring", stiffness: 320, damping: 24 } as const;

/* ==========================================================================
   1. Answer engine demo: tabs between engines, the answer types itself out,
      then the cited sources pop in.
   ========================================================================== */

const LOGOS: Record<string, EngineLogoName> = { ChatGPT: "openai", Perplexity: "perplexity", Gemini: "gemini" };

function Typed({ text, highlight, run, onDone }: { text: string; highlight: string; run: boolean; onDone: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    setN(0);
    const c = animate(0, text.length, {
      duration: text.length * 0.022,
      ease: "linear",
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: onDone,
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, run]);

  const start = text.indexOf(highlight);
  const end = start + highlight.length;
  const shown = text.slice(0, n);
  const typing = n < text.length;
  return (
    <p className={styles.answerText}>
      {start >= 0 && n > start ? (
        <>
          {shown.slice(0, start)}
          <mark>{shown.slice(start, Math.min(n, end))}</mark>
          {n > end && shown.slice(end)}
        </>
      ) : (
        shown
      )}
      {typing && <motion.span className={styles.caret} animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />}
    </p>
  );
}

export function AnswerDemo() {
  const { prompt, engines, sources } = capabilities.tiles.answer;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);

  // Auto-advance to the next engine a few seconds after each answer finishes.
  useEffect(() => {
    if (!done || !inView || paused) return;
    const id = window.setTimeout(() => {
      setDone(false);
      setActive((a) => (a + 1) % engines.length);
    }, 3200);
    return () => window.clearTimeout(id);
  }, [done, inView, paused, engines.length]);

  const engine = engines[active];

  return (
    <div ref={ref} className={styles.chat} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className={styles.chatBar}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <div className={styles.tabs} role="tablist" aria-label="AI engine">
          {engines.map((e, i) => (
            <button
              key={e.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={styles.tab}
              onClick={() => {
                setDone(false);
                setActive(i);
              }}
            >
              {i === active && <motion.span layoutId="engine-pill" className={styles.tabPill} transition={spring} />}
              <EngineLogo name={LOGOS[e.name]} size={13} />
              <span>{e.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chatBody}>
        <motion.div
          className={styles.userMsg}
          initial={{ opacity: 0, y: 10 }}
          animate={seen ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {prompt}
        </motion.div>

        <div className={styles.aiMsg}>
          <span className={styles.aiIcon}>
            <EngineLogo name={LOGOS[engine.name]} size={15} />
          </span>
          <div className={styles.aiContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={engine.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                <Typed text={engine.answer} highlight="Northwind" run={seen} onDone={() => setDone(true)} />
                <motion.ul className={styles.sources} initial="hidden" animate={done ? "show" : "hidden"} variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
                  {sources.map((s, i) => (
                    <motion.li
                      key={s}
                      className={i === 0 ? styles.sourceOn : undefined}
                      variants={{ hidden: { opacity: 0, scale: 0.8, y: 6 }, show: { opacity: 1, scale: 1, y: 0, transition: spring } }}
                    >
                      {i < 2 && <span className={styles.sourceNum}>{i + 1}</span>}
                      {s}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. Core Web Vitals rings
   ========================================================================== */

export function VitalsDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const R = 30;
  return (
    <div ref={ref} className={styles.vitals}>
      <div className={styles.score}>
        <span className={styles.scoreNum}>
          <CountUp to={98} play={inView} duration={1.6} />
        </span>
        <span className={styles.scoreLabel}>Performance score</span>
      </div>
      <div className={styles.rings}>
        {capabilities.tiles.technical.vitals.map((v, i) => (
          <div key={v.label} className={styles.ring}>
            <svg width="76" height="76" viewBox="0 0 76 76" aria-hidden="true">
              <circle cx="38" cy="38" r={R} fill="none" stroke="rgba(246,249,247,0.08)" strokeWidth="5" />
              <motion.circle
                cx="38"
                cy="38"
                r={R}
                fill="none"
                stroke="#10B261"
                strokeWidth="5"
                strokeLinecap="round"
                transform="rotate(-90 38 38)"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: v.pct } : undefined}
                transition={{ duration: 1.4, delay: 0.2 + i * 0.15, ease: EASE_OUT }}
              />
            </svg>
            <span className={styles.ringValue}>
              <CountUp to={v.value} decimals={v.value < 1 ? 2 : v.value < 10 ? 1 : 0} suffix={v.unit} play={inView} delay={0.2 + i * 0.15} duration={1.4} />
            </span>
            <span className={styles.ringLabel}>
              {v.label} <em>Good</em>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   3. Schema markup, written line by line
   ========================================================================== */

const CODE: { indent: number; parts: [string, string][] }[] = [
  { indent: 0, parts: [["p", "{"]] },
  { indent: 1, parts: [["k", '"@type"'], ["p", ": "], ["s", '"Organization"'], ["p", ","]] },
  { indent: 1, parts: [["k", '"name"'], ["p", ": "], ["s", '"Northwind"'], ["p", ","]] },
  { indent: 1, parts: [["k", '"knowsAbout"'], ["p", ": ["], ["s", '"Payroll API"'], ["p", "],"]] },
  { indent: 1, parts: [["k", '"sameAs"'], ["p", ": ["], ["s", '"linkedin.com/…"'], ["p", "]"]] },
  { indent: 0, parts: [["p", "}"]] },
];

export function SchemaDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className={styles.code}>
      <div className={styles.codeHead}>
        <span>organization.jsonld</span>
        <motion.span
          className={styles.valid}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{ ...spring, delay: 1.3 }}
        >
          ✓ Valid
        </motion.span>
      </div>
      <motion.pre initial="hidden" animate={inView ? "show" : "hidden"} variants={{ show: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } } }}>
        {CODE.map((line, i) => (
          <motion.span
            key={i}
            className={styles.codeLine}
            variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT } } }}
          >
            <span className={styles.ln}>{i + 1}</span>
            <span style={{ display: "inline-block", width: line.indent * 16 }} />
            {line.parts.map(([t, v], j) => (
              <span key={j} className={styles[`c_${t}`]}>
                {v}
              </span>
            ))}
          </motion.span>
        ))}
      </motion.pre>
    </div>
  );
}

/* ==========================================================================
   4. SERP climb: the client's result reorders up to #1 (layout animation)
   ========================================================================== */

const RESULTS = [
  { id: "a", domain: "competitor.com", w: 78 },
  { id: "b", domain: "review-site.com", w: 64 },
  { id: "c", domain: "forum-thread.com", w: 70 },
  { id: "you", domain: "northwind.com", w: 86 },
];

export function SerpDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [top, setTop] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setTop((t) => !t), top ? 3600 : 1800);
    return () => window.clearInterval(id);
  }, [inView, top]);

  const order = useMemo(() => (top ? [RESULTS[3], ...RESULTS.slice(0, 3)] : RESULTS), [top]);

  return (
    <div ref={ref} className={styles.serp}>
      <div className={styles.serpSearch}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m16.5 16.5 4 4" strokeLinecap="round" />
        </svg>
        payroll api for startups
      </div>
      <ul>
        {order.map((r, i) => (
          <motion.li key={r.id} layout transition={{ type: "spring", stiffness: 260, damping: 26 }} className={r.id === "you" ? styles.serpYou : undefined}>
            <span className={styles.serpRank}>{i + 1}</span>
            <span className={styles.serpMain}>
              <span className={styles.serpDomain}>{r.domain}</span>
              <span className={styles.serpLine} style={{ width: `${r.w}%` }} />
            </span>
            {r.id === "you" && (
              <AnimatePresence>
                {top && (
                  <motion.span className={styles.serpUp} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={spring}>
                    ▲ 3
                  </motion.span>
                )}
              </AnimatePresence>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   5. Brand mentions: sources orbit the brand, signals travel inward
   ========================================================================== */

const NODES = ["News", "Reviews", "Podcasts", "Forums", "Blogs", "Directories"];

export function MentionsDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const once = useInView(ref, { once: true, amount: 0.4 });
  const size = 220;
  const c = size / 2;
  const radius = 82;
  const pts = NODES.map((label, i) => {
    const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
    return { label, x: c + Math.cos(a) * radius, y: c + Math.sin(a) * radius };
  });

  return (
    <div ref={ref} className={styles.mentions}>
      <div className={styles.orbit} style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle cx={c} cy={c} r={radius} fill="none" stroke="rgba(246,249,247,0.08)" strokeDasharray="3 5" />
          {pts.map((p, i) => (
            <motion.line
              key={i}
              x1={p.x}
              y1={p.y}
              x2={c}
              y2={c}
              stroke="rgba(16,178,97,0.35)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={once ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: EASE_OUT }}
            />
          ))}
          {inView &&
            pts.map((p, i) => (
              <motion.circle
                key={`pulse-${i}`}
                r="2.6"
                fill="#00F57B"
                initial={{ cx: p.x, cy: p.y, opacity: 0 }}
                animate={{ cx: [p.x, c], cy: [p.y, c], opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, delay: i * 0.45, repeat: Infinity, repeatDelay: 1.4, ease: "easeIn" }}
              />
            ))}
        </svg>
        {pts.map((p, i) => (
          <motion.span
            key={p.label}
            className={styles.node}
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
            animate={once ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" } : undefined}
            transition={{ ...spring, delay: 0.3 + i * 0.08 }}
          >
            {p.label}
          </motion.span>
        ))}
        <motion.span
          className={styles.hub}
          animate={{ boxShadow: ["0 0 0 0 rgba(16,178,97,0.5)", "0 0 0 16px rgba(16,178,97,0)"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        >
          N
        </motion.span>
      </div>
      <div className={styles.mentionStat}>
        <strong>
          <CountUp to={214} prefix="+" play={once} delay={0.4} />
        </strong>
        <span>brand mentions this quarter</span>
      </div>
    </div>
  );
}
