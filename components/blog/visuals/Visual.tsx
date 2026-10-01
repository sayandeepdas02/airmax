"use client";

import { animate, motion, useInView, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CountUp } from "@/components/motion/Motion";
import { EngineLogo } from "@/components/ui/engine-logos";
import s from "./visuals.module.css";

export type VisualName = "serp-vs-answer" | "layers" | "question-to-answer" | "pipeline" | "audit-dashboard";

const ease = [0.22, 1, 0.36, 1] as const;
const kids = (stagger = 0.1, delay = 0.1): Variants => ({ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } });
const rise: Variants = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };
const slide: Variants = { hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.55, ease } } };
const pop: Variants = { hidden: { opacity: 0, scale: 0.7 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 380, damping: 22 } } };
const growX: Variants = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease } } };
const growY: Variants = { hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.9, ease } } };

/** One whileInView on the stage orchestrates every child's "hidden"/"show" variants. */
function Frame({ alt, caption, pos, children }: { alt: string; caption: string; pos: string; children: ReactNode }) {
  return (
    <figure className={s.figure}>
      <motion.div
        className={s.stage}
        style={{ ["--pos" as string]: pos }}
        role="img"
        aria-label={alt}
        variants={kids(0.12, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <span className={s.bg} aria-hidden="true" />
        <span className={s.scrim} aria-hidden="true" />
        <div aria-hidden="true">{children}</div>
      </motion.div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

const Tick = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path d="M2.5 6.3 5 8.8l4.5-5.3" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.4, ease } } }} />
  </svg>
);
const Spark = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10C7.4 11.4 11.4 7.4 12 2Z" />
  </svg>
);
const Bar = ({ children }: { children: ReactNode }) => (
  <div className={s.bar}>
    <i />
    <i />
    <i />
    <span>{children}</span>
  </div>
);

/** Types `text` out once the element scrolls into view; `hl` is highlighted wherever it appears. */
function Typed({ text, hl, delay = 1 }: { text: string; hl: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const c = animate(0, text.length, { duration: text.length * 0.018, delay, ease: "linear", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [seen, text]);
  const a = text.indexOf(hl);
  const shown = text.slice(0, n);
  return (
    <span ref={ref}>
      {a >= 0 && n > a ? (
        <>
          {shown.slice(0, a)}
          <span className={s.hl}>{shown.slice(a, a + hl.length)}</span>
          {shown.slice(a + hl.length)}
        </>
      ) : (
        shown
      )}
      {n < text.length && (
        <motion.span className={s.cursor} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
      )}
    </span>
  );
}

/* 1 ─ SEO result list next to an AI answer ─────────────────────────────── */
function SerpVsAnswer() {
  const results = [
    ["Northwind: payroll API for startups", "northwind.com"],
    ["Best payroll APIs compared (2026)", "techreview.example"],
    ["Payroll API pricing guide", "stackpicks.example"],
    ["Seed-stage payroll: what to choose", "founderhub.example"],
  ];
  return (
    <div className={s.two}>
      <motion.div variants={kids(0.1, 0.1)} className={s.col}>
        <motion.span variants={rise} className={s.tag}>SEO · win the click</motion.span>
        <motion.div variants={rise} className={s.card}>
          <Bar>Search</Bar>
          <div className={s.body}>
            <div className={s.search}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
              best payroll API for startups
            </div>
            <span className={s.muted} style={{ fontSize: 11 }}>About 4,120,000 results</span>
            {results.map(([t, u], i) => (
              <motion.div key={t} variants={slide} className={`${s.res} ${i === 0 ? s.top : ""}`}>
                <span className={s.site}><span className={s.fav} /> {u}</span>
                <span className={s.title}>{t}</span>
                <span className={s.line} style={{ width: `${88 - i * 9}%` }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={kids(0.12, 0.5)} className={s.col}>
        <motion.span variants={rise} className={s.tag}>AEO · win the answer</motion.span>
        <motion.div variants={rise} className={s.card}>
          <Bar>AI assistant</Bar>
          <div className={s.body}>
            <motion.div variants={rise} className={s.user}>What&apos;s the best payroll API for a seed-stage startup?</motion.div>
            <div className={s.answer} style={{ minHeight: 88 }}>
              <Typed hl="Northwind" delay={1.2} text="For seed-stage teams, Northwind is a popular pick: it takes about a day to integrate and pricing scales with headcount." />
            </div>
            <motion.div variants={kids(0.12, 2.8)} className={s.sources}>
              {["northwind.com", "techreview.example", "founderhub.example"].map((d, i) => (
                <motion.span key={d} variants={pop} className={s.chip}>
                  <span className={s.num}>{i + 1}</span>
                  {d}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* 2 ─ Three layers, each ticking through its checklist ──────────────────── */
function Layers() {
  const layers = [
    ["Adaptation", "Stay ahead of the shift", ["Agent-ready data", "AI crawler access", "Cross-channel tracking"]],
    ["Authority", "Earn trust signals", ["Real expertise", "Original evidence", "Third-party mentions"]],
    ["Foundation", "Be easy to find and read", ["Intent match", "Fast, crawlable pages", "Extractable structure"]],
  ] as const;
  return (
    <div className={s.layers}>
      {layers.map(([name, sub, items], i) => (
        <motion.div key={name} className={`${s.card} ${s.layer}`} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: (2 - i) * 0.5 } } }} style={{ marginLeft: i * 0, width: `${100 - (2 - i) * 6}%`, alignSelf: "center" }}>
          <div className={s.name}>
            <b>{name}</b>
            <span>{sub}</span>
          </div>
          <motion.div className={s.checks} variants={kids(0.18, (2 - i) * 0.5 + 0.3)}>
            {items.map((t) => (
              <motion.span key={t} className={s.check} variants={rise}>
                <span className={s.tick}><Tick /></span>
                {t}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* 3 ─ Question → engine → sources → cited answer ────────────────────────── */
function QuestionToAnswer() {
  const Arrow = ({ d }: { d: number }) => <motion.span className={s.arrow} variants={{ hidden: { scaleX: 0, scaleY: 0 }, show: { scaleX: 1, scaleY: 1, transition: { duration: 0.6, ease, delay: d } } }} />;
  return (
    <div className={s.flow}>
      <motion.div variants={rise} className={s.step}>
        <span className={s.stepLabel}>1 · Buyer asks</span>
        <div className={`${s.card} ${s.input}`}>
          <Typed hl="" delay={0.5} text="Best tool for a seed-stage team?" />
        </div>
      </motion.div>
      <Arrow d={0.5} />
      <motion.div variants={rise} className={s.step}>
        <span className={s.stepLabel}>2 · Engine reads</span>
        <div className={s.engine}>
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} style={{ position: "absolute", width: 118, height: 118, borderRadius: "50%", border: "1.5px dashed rgba(0,245,123,.55)" }} />
          <Spark size={34} />
        </div>
      </motion.div>
      <Arrow d={1} />
      <motion.div variants={kids(0.15, 1.1)} className={s.step}>
        <span className={s.stepLabel}>3 · Sources weighed</span>
        {[
          ["Your guide", "Clear, structured, cited", true],
          ["Review site", "Third-party mention", false],
          ["Directory", "Consistent brand facts", false],
        ].map(([t, sub, you]) => (
          <motion.div key={t as string} variants={slide} className={`${s.card} ${s.src} ${you ? s.you : ""}`}>
            <span className={s.tick} style={{ background: you ? "var(--green)" : "#c9d6cf" }}><Tick /></span>
            <span>{t}<small>{sub}</small></span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* 4 ─ Retrieval → synthesis → citation, with a signal travelling along ──── */
function Pipeline() {
  return (
    <div className={s.pipe}>
      <span className={s.rail} aria-hidden="true" />
      <motion.span className={s.dot} initial={{ left: "6%", opacity: 0 }} animate={{ left: ["6%", "94%"], opacity: [0, 1, 1, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }} />

      <motion.div variants={rise} className={s.stage3}>
        <div className={s.stageHead}><span className={s.n}>1</span>Retrieval</div>
        <div className={s.mini}>
          <motion.span className={s.scan} initial={{ top: -26 }} animate={{ top: [-26, 110] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
          {["northwind.com/pricing", "review-site.example", "founderhub.example", "docs.northwind.com"].map((u) => (
            <div key={u} className={s.urlrow}><span className={s.fav} />{u}</div>
          ))}
        </div>
        <div className={s.lever}><b>Your lever</b>Be crawlable, indexable and relevant</div>
      </motion.div>

      <motion.div variants={rise} className={s.stage3}>
        <div className={s.stageHead}><span className={s.n}>2</span>Synthesis</div>
        <div className={s.mini}>
          {[92, 78, 86, 54].map((w, i) => (
            <motion.span key={i} className={`${s.line} ${i === 1 ? s.g : ""}`} style={{ width: `${w}%` }} animate={{ scaleX: [0.55, 1, 0.55] }} transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }} />
          ))}
        </div>
        <div className={s.lever}><b>Your lever</b>Write clear, self-contained passages</div>
      </motion.div>

      <motion.div variants={rise} className={s.stage3}>
        <div className={s.stageHead}><span className={s.n}>3</span>Citation</div>
        <div className={s.mini}>
          <span className={s.answer} style={{ fontSize: 12 }}>
            <span className={s.hl}>Northwind</span> is a popular pick for seed-stage teams.
          </span>
          <motion.div variants={kids(0.2, 0.6)} className={s.sources}>
            {[1, 2].map((n) => (
              <motion.span key={n} variants={pop} className={s.chip}><span className={s.num}>{n}</span>{n === 1 ? "northwind.com" : "review-site"}</motion.span>
            ))}
          </motion.div>
        </div>
        <div className={s.lever}><b>Your lever</b>Be the specific, authoritative source</div>
      </motion.div>
    </div>
  );
}

/* 5 ─ Weekly AI visibility dashboard ────────────────────────────────────── */
function AuditDashboard() {
  const rows: [string, ("cited" | "mention" | "none")[]][] = [
    ["Best payroll API for startups", ["cited", "mention", "cited"]],
    ["Northwind vs Gusto", ["cited", "cited", "mention"]],
    ["How to run payroll via API", ["none", "mention", "none"]],
    ["Payroll API for seed stage", ["mention", "none", "none"]],
  ];
  const label = { cited: "Cited", mention: "Named", none: "Absent" } as const;
  const weeks = [14, 18, 22, 27, 31, 38];
  return (
    <motion.div variants={rise} className={s.card}>
      <Bar>Weekly AI visibility audit</Bar>
      <div className={s.dash}>
        <motion.div className={s.tbl} variants={kids(0.12, 0.3)}>
          <div className={`${s.tr} ${s.head}`}>
            <span>Prompt</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><EngineLogo name="openai" size={11} />ChatGPT</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><EngineLogo name="perplexity" size={11} />Perplexity</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><EngineLogo name="gemini" size={11} />Gemini</span>
          </div>
          {rows.map(([q, st]) => (
            <motion.div key={q} className={s.tr} variants={slide}>
              <span className={s.q}>{q}</span>
              {st.map((v, i) => (
                <motion.span key={i} className={`${s.pill} ${s[v]}`} variants={pop}>{label[v]}</motion.span>
              ))}
            </motion.div>
          ))}
        </motion.div>
        <div className={s.side}>
          <span className={s.muted} style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase" }}>Share of answer</span>
          <span className={s.big}><CountUp to={38} suffix="%" delay={0.6} /></span>
          <span className={s.delta}>▲ 24 pts in 6 weeks</span>
          <motion.div className={s.bars} variants={kids(0.1, 0.5)}>
            {weeks.map((h, i) => (
              <motion.span key={i} variants={growY} style={{ height: `${(h / 38) * 100}%`, opacity: 0.5 + i * 0.1 }} />
            ))}
          </motion.div>
          <div className={s.weeks}>{["W1", "W2", "W3", "W4", "W5", "W6"].map((w) => <span key={w}>{w}</span>)}</div>
        </div>
      </div>
    </motion.div>
  );
}

const POS: Record<VisualName, string> = {
  "serp-vs-answer": "50% 55%",
  layers: "10% 45%",
  "question-to-answer": "55% 25%",
  pipeline: "95% 45%",
  "audit-dashboard": "15% 95%",
};

export function Visual({ name, alt, caption }: { name: VisualName; alt: string; caption: string }) {
  const body = { "serp-vs-answer": <SerpVsAnswer />, layers: <Layers />, "question-to-answer": <QuestionToAnswer />, pipeline: <Pipeline />, "audit-dashboard": <AuditDashboard /> }[name];
  return (
    <Frame alt={alt} caption={caption} pos={POS[name]}>
      {body}
    </Frame>
  );
}
