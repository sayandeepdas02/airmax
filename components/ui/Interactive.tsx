"use client";

import { motion, useMotionValue, useSpring, type Variants } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { EASE_ROLL } from "@/components/motion/Motion";
import styles from "./ui.module.css";

/* ---------- Rolling letters (driven by a parent's "hover" variant) ---------- */

const letter: Variants = {
  rest: (i: number) => ({ y: "0%", transition: { duration: 0.45, ease: EASE_ROLL, delay: i * 0.018 } }),
  hover: (i: number) => ({ y: "-100%", transition: { duration: 0.45, ease: EASE_ROLL, delay: i * 0.022 } }),
};

export function RollingText({ text, lineHeight = 18 }: { text: string; lineHeight?: number }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span className={styles.roll} style={{ ["--roll-lh" as string]: `${lineHeight}px` }} aria-hidden="true">
        {Array.from(text).map((ch, i) => (
          <motion.span key={i} custom={i} variants={letter}>
            {ch}
          </motion.span>
        ))}
      </span>
    </>
  );
}

/** Link whose label letters roll up on hover/focus. */
export function RollLink({
  href,
  text,
  className,
  children,
  lineHeight,
  ...rest
}: {
  href: string;
  text: string;
  className?: string;
  children?: ReactNode;
  lineHeight?: number;
  target?: string;
  rel?: string;
  "aria-haspopup"?: boolean | "true";
  "aria-expanded"?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.a
      href={href}
      className={className}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      {...rest}
    >
      <RollingText text={text} lineHeight={lineHeight} />
      {children}
    </motion.a>
  );
}

/* ---------- Button: label rolls, background flips, optional magnetic pull ---------- */

const labelRoll: Variants = {
  rest: { y: 0, transition: { duration: 0.55, ease: EASE_ROLL } },
  hover: { y: -32, transition: { duration: 0.55, ease: EASE_ROLL } },
};

type ButtonProps = {
  href?: string;
  children: string;
  variant?: "light" | "dark";
  size?: "default" | "small";
  block?: boolean;
  type?: "button" | "submit";
  className?: string;
  magnetic?: boolean;
  disabled?: boolean;
};

export function Button({
  href,
  children,
  variant = "light",
  size = "default",
  block,
  type = "button",
  className,
  magnetic,
  disabled,
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent) => {
    if (!magnetic || !ref.current || e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const cls = [
    styles.btn,
    variant === "light" ? styles.btnLight : styles.btnDark,
    size === "small" && styles.btnSmall,
    block && styles.btnBlock,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const common = {
    className: cls,
    initial: "rest",
    animate: "rest",
    whileHover: disabled ? undefined : "hover",
    whileFocus: disabled ? undefined : "hover",
    whileTap: disabled ? undefined : { scale: 0.97 },
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    style: magnetic ? { x, y } : undefined,
  } as const;

  const label = (
    <span className={styles.btnLabel}>
      <motion.span className={styles.btnText} variants={labelRoll}>
        {children}
      </motion.span>
      <motion.span className={`${styles.btnText} ${styles.btnTextNext}`} variants={labelRoll} aria-hidden="true">
        {children}
      </motion.span>
    </span>
  );

  if (href) {
    return (
      <motion.a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} {...common}>
        {label}
      </motion.a>
    );
  }
  return (
    <motion.button ref={ref as React.RefObject<HTMLButtonElement>} type={type} disabled={disabled} {...common}>
      {label}
    </motion.button>
  );
}
