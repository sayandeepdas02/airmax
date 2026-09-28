"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { EASE_OUT } from "@/components/motion/Motion";
import styles from "./HeroVisual.module.css";

const DESIGN_WIDTH = 980; // dashboard is authored at this width and scaled to fit

/**
 * Framed product visual under the hero. It rises in on load, starts tilted back in
 * 3D and settles flat as you scroll, while the inner UI zooms out slightly.
 */
export function HeroVisual({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const smooth = useSpring(scrollY, { stiffness: 120, damping: 28, mass: 0.4 });
  const rotateX = useTransform(smooth, [0, 520], [14, 0], { clamp: true });
  const scale = useTransform(smooth, [0, 520], [0.94, 1], { clamp: true });
  const zoom = useTransform(smooth, [0, 420], [1.05, 1], { clamp: true });
  const glow = useTransform(smooth, [0, 520], [0.35, 1], { clamp: true });

  useEffect(() => {
    const frame = frameRef.current;
    const vp = viewportRef.current;
    if (!frame || !vp) return;
    const ro = new ResizeObserver(([entry]) => {
      frame.style.setProperty("--fit", String(entry.contentRect.width / DESIGN_WIDTH));
    });
    ro.observe(vp);
    return () => ro.disconnect();
  }, []);

  return (
    <div className={styles.stage}>
      <motion.div className={styles.halo} style={{ opacity: glow }} aria-hidden="true" />
      <motion.div
        ref={frameRef}
        className={styles.frame}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.55, ease: EASE_OUT }}
        style={{ rotateX, scale, transformPerspective: 1600 }}
      >
        <div ref={viewportRef} className={styles.viewport}>
          <motion.div className={styles.zoom} style={{ scale: zoom }}>
            <div className={styles.fit}>{children}</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
