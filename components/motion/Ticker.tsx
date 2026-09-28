"use client";

import { animate, motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Infinite marquee driven by motion's frame loop. The content is rendered twice and the
 * track wraps at half its width. Hovering eases the speed down instead of stopping dead.
 */
export function Ticker({
  children,
  speed = 42,
  className,
  trackClassName,
}: {
  children: ReactNode;
  /** Pixels per second. */
  speed?: number;
  className?: string;
  trackClassName?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const factor = useMotionValue(1);
  const inView = useInView(wrap);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (!inView || reduce || !track.current) return;
    const half = track.current.scrollWidth / 2;
    if (!half) return;
    let next = x.get() - (speed * factor.get() * delta) / 1000;
    if (next <= -half) next += half;
    x.set(next);
  });

  const ease = (to: number) => animate(factor, to, { duration: 0.6, ease: "easeOut" });

  return (
    <div ref={wrap} className={className} onPointerEnter={() => ease(0.2)} onPointerLeave={() => ease(1)}>
      <motion.div ref={track} className={trackClassName} style={{ x }}>
        {children}
        <div aria-hidden="true" style={{ display: "flex" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
