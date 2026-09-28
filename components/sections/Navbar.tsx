"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { Logo } from "@/components/ui/primitives";
import { Button, RollLink } from "@/components/ui/Interactive";
import { ArrowRight, ChevronDown } from "@/components/ui/icons";
import { EASE_OUT } from "@/components/motion/Motion";
import styles from "./Navbar.module.css";

type DropdownLink = { label: string; href: string; children: { label: string; href: string; note: string }[] };

function Dropdown({ link }: { link: DropdownLink }) {
  const [open, setOpen] = useState(false);
  return (
    <li
      className={styles.dropdown}
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <RollLink href={link.href} text={link.label} className={styles.link} aria-haspopup="true" aria-expanded={open}>
        <motion.span className={styles.caret} animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.35, ease: EASE_OUT }}>
          <ChevronDown />
        </motion.span>
      </RollLink>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 10, scale: 0.97, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 6, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
          >
            <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.04 } } }}>
              {link.children.map((child) => (
                <motion.li
                  key={child.label}
                  variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <a href={child.href} className={styles.panelLink} onClick={() => setOpen(false)}>
                    <span>
                      <strong>{child.label}</strong>
                      <small>{child.note}</small>
                    </span>
                    <ArrowRight className={styles.panelArrow} />
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <motion.header
      className={styles.wrap}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
    >
      <nav className={styles.nav} aria-label="Main">
        <div className={styles.container}>
          <Logo className={styles.logo} />

          <ul className={styles.menu}>
            {nav.links.map((link) =>
              link.children ? (
                <Dropdown key={link.label} link={{ ...link, children: link.children }} />
              ) : (
                <li key={link.label}>
                  <RollLink href={link.href} text={link.label} className={styles.link} />
                </li>
              ),
            )}
          </ul>

          <div className={styles.cta}>
            <Button href={nav.cta.href} variant="dark">
              {nav.cta.label}
            </Button>
          </div>

          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <motion.span animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }} transition={{ duration: 0.35, ease: EASE_OUT }} />
            <motion.span animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }} transition={{ duration: 0.35, ease: EASE_OUT }} />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              className={styles.mobile}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
            >
              <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}>
                {nav.links.map((link) => (
                  <motion.li key={link.label} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                    <a href={link.href}>
                      {link.label}
                      <ArrowRight />
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <Button href={nav.cta.href} block>
                {nav.cta.label}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
