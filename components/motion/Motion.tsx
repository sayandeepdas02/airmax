"use client";

/**
 * Motion primitives (motion.dev) shared across the page. Server components render
 * these as thin client wrappers, so copy stays in the server-rendered HTML.
 */

import {
  animate,
  motion,
  MotionConfig,
  useInView,
  type HTMLMotionProps,
  type TargetAndTransition,
  type Variants,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_ROLL = [0.65, 0, 0.25, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const TAGS = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  li: motion.li,
  ul: motion.ul,
  ol: motion.ol,
  article: motion.article,
  figure: motion.figure,
  nav: motion.nav,
};

type Tag = keyof typeof TAGS;

type RevealProps = Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport"> & {
  as?: Tag;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  blur?: boolean;
  amount?: number;
  duration?: number;
};

/** Fades/slides an element in the first time it enters the viewport. */
export function Reveal({
  as = "div",
  delay = 0,
  y = 24,
  x = 0,
  scale,
  blur = false,
  amount = 0.2,
  duration = 0.9,
  children,
  ...rest
}: RevealProps) {
  const Comp = TAGS[as] as typeof motion.div;
  const from: TargetAndTransition = { opacity: 0, y, x };
  const to: TargetAndTransition = { opacity: 1, y: 0, x: 0 };
  if (scale !== undefined) {
    from.scale = scale;
    to.scale = 1;
  }
  if (blur) {
    from.filter = "blur(10px)";
    to.filter = "blur(0px)";
  }
  return (
    <Comp
      initial={from}
      whileInView={to}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* ---------- Stagger group: children using <Item> animate one after another ---------- */

type StaggerProps = Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "variants"> & {
  as?: Tag;
  stagger?: number;
  delay?: number;
  amount?: number;
};

export function Stagger({ as = "div", stagger = 0.08, delay = 0, amount = 0.2, children, ...rest }: StaggerProps) {
  const Comp = TAGS[as] as typeof motion.div;
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  return (
    <Comp initial="hidden" whileInView="show" viewport={{ once: true, amount }} variants={variants} {...rest}>
      {children}
    </Comp>
  );
}

type ItemProps = Omit<HTMLMotionProps<"div">, "variants"> & { as?: Tag; y?: number; x?: number; scale?: number };

export function Item({ as = "div", y = 24, x = 0, scale, children, ...rest }: ItemProps) {
  const Comp = TAGS[as] as typeof motion.div;
  const variants: Variants = {
    hidden: { opacity: 0, y, x, ...(scale !== undefined ? { scale } : {}) },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      ...(scale !== undefined ? { scale: 1 } : {}),
      transition: { duration: 0.8, ease: EASE_OUT },
    },
  };
  return (
    <Comp variants={variants} {...rest}>
      {children}
    </Comp>
  );
}

/* ---------- Word-by-word heading reveal ---------- */

export function SplitWords({
  text,
  accent,
  delay = 0,
  stagger = 0.06,
  breakAfter,
  accentClass = "accent",
  onLoad = false,
}: {
  text: string;
  accent?: string;
  delay?: number;
  stagger?: number;
  breakAfter?: number;
  accentClass?: string;
  /** Animate on mount (above the fold) instead of on scroll. */
  onLoad?: boolean;
}) {
  const words = text.split(" ");
  const accentWords = new Set((accent ?? "").split(" ").filter(Boolean));
  const variants: Variants = {
    hidden: { opacity: 0, y: "0.32em", filter: "blur(10px)" },
    show: (i: number) => ({
      opacity: 1,
      y: "0em",
      filter: "blur(0px)",
      transition: { duration: 0.9, delay: delay + i * stagger, ease: EASE_OUT },
    }),
  };
  const trigger = onLoad ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.4 } };
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <motion.span
            style={{ display: "inline-block", willChange: "transform, filter" }}
            className={accentWords.has(w) ? accentClass : undefined}
            custom={i}
            variants={variants}
            initial="hidden"
            {...trigger}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
          {breakAfter === i && <br className="br-desktop" />}
        </span>
      ))}
    </>
  );
}

/* ---------- Count-up number ---------- */

export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  play,
  duration = 1.8,
  delay = 0,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** When omitted, the number starts counting as soon as it scrolls into view. */
  play?: boolean;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const go = play ?? seen;
  const fmt = (v: number) =>
    prefix + v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

  useEffect(() => {
    if (!go || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration,
      delay,
      ease: EASE_OUT,
      onUpdate: (v) => (node.textContent = fmt(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [go, to]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {fmt(0)}
    </span>
  );
}
