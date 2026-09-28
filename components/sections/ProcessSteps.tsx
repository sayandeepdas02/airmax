"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { BenefitIcon, type BenefitIconName } from "@/components/ui/icons";
import { EASE_OUT } from "@/components/motion/Motion";
import styles from "./Process.module.css";

type Step = { readonly icon: BenefitIconName; readonly when: string; readonly title: string; readonly body: string };

/**
 * Four steps joined by a rail. The rail fills with scroll progress (motion useScroll),
 * and each step's orb lights up once the fill reaches it.
 */
export function ProcessSteps({ steps }: { steps: readonly Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const [active, setActive] = useState(-1);

  useMotionValueEvent(fill, "change", (v) => {
    // Orbs sit at 0, 1/3, 2/3 and 1 along the rail.
    const next = v < 0.02 ? -1 : Math.min(steps.length - 1, Math.floor(v * (steps.length - 1) + 0.02));
    if (next !== active) setActive(next);
  });

  return (
    <div ref={ref} className={styles.wrap}>
      <span className={styles.rail} aria-hidden="true">
        <motion.span className={styles.railFill} style={{ ["--p" as string]: fill }} />
      </span>
      <ol className={styles.steps}>
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          className={styles.step}
          data-active={i <= active || undefined}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: i * 0.12, ease: EASE_OUT }}
        >
          <motion.span
            className={styles.orb}
            animate={i <= active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <BenefitIcon name={s.icon} />
          </motion.span>
          <div className={styles.card}>
            <span className={styles.num} aria-hidden="true">
              0{i + 1}
            </span>
            <span className={styles.when}>{s.when}</span>
            <h3 className="t-body-20">{s.title}</h3>
            <p className="t-body-16 muted">{s.body}</p>
          </div>
        </motion.li>
      ))}
      </ol>
    </div>
  );
}
