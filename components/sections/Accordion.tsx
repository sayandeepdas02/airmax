"use client";

import { motion } from "motion/react";
import { useId, useState } from "react";
import { Chevron } from "@/components/ui/icons";
import { EASE_OUT } from "@/components/motion/Motion";
import styles from "./Faq.module.css";

/** Single-open accordion; answers animate their height open/closed with motion. */
export function Accordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <motion.ul
      className={styles.list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const btnId = `${base}-btn-${i}`;
        return (
          <motion.li
            key={item.q}
            className={styles.item}
            data-open={isOpen || undefined}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } } }}
          >
            <h3 className={styles.q}>
              <button id={btnId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{item.q}</span>
                <motion.span
                  className={styles.icon}
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 0 : 180 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Chevron />
                </motion.span>
              </button>
            </h3>
            {/* Panels stay mounted (height animates to 0) so answers remain in the HTML for crawlers. */}
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={styles.panel}
              initial={false}
              animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ height: { duration: 0.45, ease: EASE_OUT }, opacity: { duration: isOpen ? 0.4 : 0.2 } }}
            >
              <motion.p
                className="t-body-14 muted"
                initial={false}
                animate={{ y: isOpen ? 0 : -8 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
              >
                {item.a}
              </motion.p>
            </motion.div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
