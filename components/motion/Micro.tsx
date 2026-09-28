"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Gentle idle bob for icons and badges. */
export function Float({ children, className, distance = 6, duration = 4 }: { children: ReactNode; className?: string; distance?: number; duration?: number }) {
  return (
    <motion.span
      className={className}
      animate={{ y: [0, -distance, 0], rotate: [0, -2, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}

/** Round social button that springs up and tilts on hover. */
export function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -3, rotate: -6, scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 16 }}
    >
      {children}
    </motion.a>
  );
}
