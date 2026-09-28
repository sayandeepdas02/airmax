"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./GridBackdrop.module.css";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Full-bleed gradient + 64px grid (radially masked) with softly pulsing tiles.
 * With `spotlight`, a brighter copy of the grid is revealed under the cursor.
 * Tile positions are [column, row] offsets from the grid's centre column.
 */
const TILE_SETS = {
  hero: [
    [-6, 1], [-4, 2], [-1, 3], [1, 1], [3, 2], [5, 4], [-3, 4], [0, 5], [4, 6], [-5, 6],
    [2, 7], [-2, 8], [6, 2], [-7, 4], [3, 9], [-4, 10], [1, 11], [7, 7], [-9, 3], [9, 5],
    [-10, 8], [10, 2], [-8, 9], [8, 10],
  ],
  footer: [
    [-3, 1], [1, 2], [-6, 3], [4, 3], [-1, 5], [2, 6], [-4, 7], [5, 8], [0, 9], [-7, 6], [6, 5],
    [-9, 4], [9, 7],
  ],
  cta: [
    [-5, 0], [-1, 0], [3, 0], [-3, 1], [1, 1], [5, 1], [-6, 2], [-2, 3], [2, 3], [4, 4],
    [-4, 5], [0, 5], [6, 5], [-1, 6], [3, 7], [-5, 7],
  ],
} as const;

export function GridBackdrop({
  variant,
  cell = 64,
  spotlight = false,
  className,
}: {
  variant: keyof typeof TILE_SETS;
  cell?: number;
  spotlight?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 140, damping: 24, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 140, damping: 24, mass: 0.6 });
  const mask = useMotionTemplate`radial-gradient(260px circle at ${sx}px ${sy}px, #000 0%, transparent 100%)`;
  const glow = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(16, 178, 97, 0.10), transparent 70%)`;

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!spotlight || !host) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    const onLeave = () => {
      mx.set(-1000);
      my.set(-1000);
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [spotlight, mx, my]);

  return (
    <div
      ref={ref}
      className={[styles.backdrop, styles[variant], className].filter(Boolean).join(" ")}
      style={{ "--cell": `${cell}px` } as Vars}
      aria-hidden="true"
    >
      <div className={styles.grid}>
        {TILE_SETS[variant].map(([c, r], i) => (
          <motion.span
            key={i}
            className={styles.tile}
            style={{ "--c": c, "--r": r } as Vars}
            initial={{ opacity: 0.25 }}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 6 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: (i * 0.73) % 5 }}
          />
        ))}
      </div>
      {spotlight && (
        <>
          <motion.div className={styles.spotGlow} style={{ background: glow }} />
          <motion.div className={`${styles.grid} ${styles.spotGrid}`} style={{ maskImage: mask, WebkitMaskImage: mask }} />
        </>
      )}
    </div>
  );
}
