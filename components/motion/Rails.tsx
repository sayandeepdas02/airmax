"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Full-height dashed rails framing the page. A green glow travels down both
 * rails in step with scroll progress, so the frame "follows" the reader.
 */
export function Rails() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const top = useTransform(progress, (v) => `calc(${(v * 100).toFixed(3)}% - ${(v * 72).toFixed(1)}px + ${((1 - v) * 86).toFixed(1)}px)`);

  return (
    <div className="rails" aria-hidden="true">
      <span className="rail rail--left">
        <motion.span className="rail__glow" style={{ top }} />
      </span>
      <span className="rail rail--right">
        <motion.span className="rail__glow" style={{ top }} />
      </span>
      <span className="rail-top" />
    </div>
  );
}
