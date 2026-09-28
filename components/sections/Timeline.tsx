"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BenefitIcon, type BenefitIconName } from "@/components/ui/icons";
import { EASE_OUT } from "@/components/motion/Motion";
import styles from "./Timeline.module.css";

type Item = { readonly icon: BenefitIconName; readonly title: string; readonly body: string };

/**
 * Alternating benefit timeline. The centre rail fills as the viewport's midline
 * scrolls past (motion useScroll), and each node lights up once the fill reaches it.
 */
export function Timeline({ items }: { items: readonly Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 });
  const stops = useRef<number[]>([]);
  const [active, setActive] = useState(-1);

  // Where each row's node sits along the rail, as a 0–1 fraction.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const h = el.offsetHeight || 1;
      stops.current = Array.from(el.querySelectorAll<HTMLElement>("[data-row]")).map((r) => (r.offsetTop + 26) / h);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useMotionValueEvent(fill, "change", (v) => {
    let n = -1;
    stops.current.forEach((s, i) => v >= s && (n = i));
    if (n !== active) setActive(n);
  });

  return (
    <div ref={ref} className={styles.timeline}>
      <span className={styles.track} aria-hidden="true">
        <motion.span className={styles.fill} style={{ scaleY: fill }} />
      </span>
      <span className={`${styles.cap} ${styles.capTop}`} aria-hidden="true" />
      <span className={`${styles.cap} ${styles.capBottom}`} aria-hidden="true" />

      <ol className={styles.rows}>
        {items.map((item, i) => {
          const side = i % 2 ? "right" : "left";
          return (
            <li key={item.title} className={styles.row} data-row data-side={side} data-active={i <= active || undefined}>
              <motion.div
                className={styles.cell}
                initial={{ opacity: 0, x: side === "left" ? -36 : 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, ease: EASE_OUT }}
              >
                <div className={styles.iconRow} aria-hidden="true">
                  <motion.span
                    className={styles.orb}
                    animate={i <= active ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                  >
                    <svg className={styles.orbBg} width="52" height="52" viewBox="0 0 52 52">
                      <g filter="url(#orb-inner)">
                        <rect width="52" height="52" rx="26" fill="#0B1919" />
                      </g>
                      <rect x=".375" y=".375" width="51.25" height="51.25" rx="25.625" fill="none" stroke="url(#orb-ring)" strokeOpacity=".12" strokeWidth=".75" />
                    </svg>
                    <BenefitIcon name={item.icon} className={styles.orbIcon} />
                  </motion.span>
                  <motion.span
                    className={styles.connector}
                    style={{ originX: side === "left" ? 0 : 1 }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT }}
                  />
                  <span className={styles.node} />
                </div>
                <div className={styles.text}>
                  <h3 className="t-body-20">{item.title}</h3>
                  <p className="t-body-16 muted">{item.body}</p>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
