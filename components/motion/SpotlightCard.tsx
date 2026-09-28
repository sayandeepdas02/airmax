"use client";

import { motion, useMotionTemplate, useMotionValue, type HTMLMotionProps, type Variants } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { EASE_OUT } from "./Motion";

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

/**
 * Card that lifts on hover and paints a soft radial highlight under the cursor.
 * Works as a child of <Stagger> (inherits hidden/show variants).
 */
export function SpotlightCard({
  children,
  className,
  glowClassName,
  lift = 6,
  color = "rgba(16, 178, 97, 0.14)",
  size = 360,
  as = "article",
  ...rest
}: Omit<HTMLMotionProps<"article">, "children"> & {
  children: ReactNode;
  glowClassName?: string;
  lift?: number;
  color?: string;
  size?: number;
  as?: "article" | "div" | "li";
}) {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mx}px ${my}px, ${color}, transparent 70%)`;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const Comp = (as === "div" ? motion.div : as === "li" ? motion.li : motion.article) as typeof motion.article;

  return (
    <Comp
      className={className}
      variants={cardVariants}
      whileHover={{ y: -lift, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(-500);
        my.set(-500);
      }}
      {...rest}
    >
      <motion.span className={glowClassName} style={{ background }} aria-hidden="true" />
      {children}
    </Comp>
  );
}
