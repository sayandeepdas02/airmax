"use client";

import { motion } from "motion/react";
import type { SVGProps } from "react";
import { EASE_OUT } from "@/components/motion/Motion";

type IconProps = Omit<SVGProps<SVGSVGElement>, "strokeWidth"> & { size?: number };

const lineProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type Shape =
  | { t: "path"; d: string; fill?: boolean }
  | { t: "circle"; cx: number; cy: number; r: number }
  | { t: "rect"; x: number; y: number; width: number; height: number; rx: number; fill?: boolean };

/** Renders shapes that stroke-draw themselves (motion pathLength) when scrolled into view. */
function DrawnSvg({
  shapes,
  size,
  strokeWidth,
  delay = 0.2,
  ...rest
}: IconProps & { shapes: Shape[]; strokeWidth: number; delay?: number }) {
  const draw = (i: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.8 },
    transition: {
      pathLength: { duration: 1.3, delay: delay + i * 0.14, ease: EASE_OUT },
      opacity: { duration: 0.2, delay: delay + i * 0.14 },
    },
  });
  const fillIn = (i: number) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 0.2 },
    viewport: { once: true, amount: 0.8 },
    transition: { duration: 0.8, delay: delay + 0.6 + i * 0.1 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...lineProps} {...rest}>
      {shapes.map((s, i) => {
        if (s.t === "circle") return <motion.circle key={i} cx={s.cx} cy={s.cy} r={s.r} {...draw(i)} />;
        if (s.t === "rect") {
          return s.fill ? (
            <motion.rect key={i} x={s.x} y={s.y} width={s.width} height={s.height} rx={s.rx} fill="currentColor" stroke="none" {...fillIn(i)} />
          ) : (
            <motion.rect key={i} x={s.x} y={s.y} width={s.width} height={s.height} rx={s.rx} {...draw(i)} />
          );
        }
        return s.fill ? (
          <motion.path key={i} d={s.d} fill="currentColor" stroke="none" {...fillIn(i)} />
        ) : (
          <motion.path key={i} d={s.d} {...draw(i)} />
        );
      })}
    </svg>
  );
}

/* ---------- Service card icons ---------- */

const serviceIcons = {
  search: [
    { t: "circle", cx: 10.5, cy: 10.5, r: 7 },
    { t: "path", d: "M15.6 15.6 21 21" },
    { t: "path", d: "M7.2 12.4l2.3-2.5 1.9 1.6 2.6-3" },
  ],
  chat: [
    {
      t: "path",
      d: "M4 6.2A2.7 2.7 0 0 1 6.7 3.5h10.6A2.7 2.7 0 0 1 20 6.2v7.6a2.7 2.7 0 0 1-2.7 2.7h-6.9L6 20.3v-3.8h.7A2.7 2.7 0 0 1 4 13.8Z",
    },
    { t: "path", d: "m12 6.6.95 2.25 2.25.95-2.25.95L12 13l-.95-2.25-2.25-.95 2.25-.95Z" },
  ],
  chart: [
    { t: "path", d: "M3 21h18" },
    { t: "rect", x: 4.5, y: 12.5, width: 4, height: 6, rx: 1 },
    { t: "rect", x: 10, y: 8, width: 4, height: 10.5, rx: 1 },
    { t: "rect", x: 15.5, y: 3.5, width: 4, height: 15, rx: 1 },
  ],
} satisfies Record<string, Shape[]>;

export type ServiceIconName = keyof typeof serviceIcons;

export function ServiceIcon({ name, size = 24, ...rest }: IconProps & { name: ServiceIconName }) {
  return <DrawnSvg shapes={serviceIcons[name]} size={size} strokeWidth={1.9} {...rest} />;
}

/* ---------- Timeline / process icons (neon line + translucent fill) ---------- */

const benefitIcons = {
  sparkle: [
    { t: "path", d: "M12 3.5l2 5.4 5.5 2.1-5.5 2.1-2 5.4-2-5.4-5.5-2.1 5.5-2.1Z", fill: true },
    { t: "path", d: "M12 3.5l2 5.4 5.5 2.1-5.5 2.1-2 5.4-2-5.4-5.5-2.1 5.5-2.1Z" },
    { t: "path", d: "M18.5 16.5v4M16.5 18.5h4M5.5 3v3M4 4.5h3" },
  ],
  bolt: [
    { t: "path", d: "M13.5 2.5 5 13.5h6l-1 8 8.5-11h-6Z", fill: true },
    { t: "path", d: "M13.5 2.5 5 13.5h6l-1 8 8.5-11h-6Z" },
  ],
  pie: [
    { t: "path", d: "M10.5 4.2v8.1L3.6 16.3a8.3 8.3 0 0 1 6.9-12.1Z", fill: true },
    { t: "path", d: "M10.5 4.2v8.1L3.6 16.3a8.3 8.3 0 0 1 6.9-12.1Z" },
    { t: "path", d: "M13.5 2.8a8.8 8.8 0 1 1-8.2 14.9l8.2-4.8Z" },
  ],
  report: [
    { t: "rect", x: 3, y: 4, width: 18, height: 16, rx: 2.5, fill: true },
    { t: "rect", x: 3, y: 4, width: 18, height: 16, rx: 2.5 },
    { t: "path", d: "M3 8.5h18M7 16.5l3-3.2 2.4 2 4.1-4.3" },
  ],
  audit: [
    { t: "circle", cx: 10.5, cy: 10.5, r: 6.5 },
    { t: "path", d: "M15.3 15.3 20.5 20.5" },
    { t: "path", d: "M7.8 10.6l1.9 1.9 3.3-3.6" },
  ],
  map: [
    { t: "path", d: "M3.5 6.5 9 4l6 2.5 5.5-2.5v13.5L15 20l-6-2.5-5.5 2.5Z", fill: true },
    { t: "path", d: "M3.5 6.5 9 4l6 2.5 5.5-2.5v13.5L15 20l-6-2.5-5.5 2.5Z" },
    { t: "path", d: "M9 4v13.5M15 6.5V20" },
  ],
  rocket: [
    { t: "path", d: "M14.5 4.5c2.8-1 5-1 5-1s0 2.2-1 5l-6.2 6.2-4-4Z", fill: true },
    { t: "path", d: "M14.5 4.5c2.8-1 5-1 5-1s0 2.2-1 5l-6.2 6.2-4-4Z" },
    { t: "path", d: "M8.3 10.7 5 10.2l2.6-2.6 3.7.1M13.3 15.7l.5 3.3 2.6-2.6-.1-3.7M6.5 17.5 4 20" },
  ],
  loop: [
    { t: "path", d: "M4 12a8 8 0 0 1 13.7-5.6L20 8.5" },
    { t: "path", d: "M20 4v4.5h-4.5" },
    { t: "path", d: "M20 12a8 8 0 0 1-13.7 5.6L4 15.5" },
    { t: "path", d: "M4 20v-4.5h4.5" },
  ],
} satisfies Record<string, Shape[]>;

export type BenefitIconName = keyof typeof benefitIcons;

export function BenefitIcon({ name, size = 24, ...rest }: IconProps & { name: BenefitIconName }) {
  return <DrawnSvg shapes={benefitIcons[name]} size={size} strokeWidth={1.6} delay={0.35} {...rest} />;
}

/* ---------- UI glyphs ---------- */

export function Chevron({ size = 18, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden="true" {...lineProps} strokeWidth={2} {...rest}>
      <path d="M4.125 13.75 11 6.875l6.875 6.875" stroke="#F5FFFA" />
    </svg>
  );
}

export function ChevronDown({ size = 16, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...lineProps} strokeWidth={1.3} {...rest}>
      <path d="M4 6.25 8 10l4-3.75" />
    </svg>
  );
}

export function ArrowRight({ size = 16, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...lineProps} strokeWidth={1.5} {...rest}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function Cross({ size = 20, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" {...rest}>
      <circle cx="10" cy="10" r="8.33" fill="rgba(246,249,247,0.06)" stroke="rgba(246,249,247,0.12)" strokeWidth="0.75" />
      <path d="M7.4 7.4l5.2 5.2M12.6 7.4l-5.2 5.2" stroke="rgba(246,249,247,0.45)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function Partial({ size = 20, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" {...rest}>
      <circle cx="10" cy="10" r="8.33" fill="rgba(246,249,247,0.06)" stroke="rgba(246,249,247,0.12)" strokeWidth="0.75" />
      <path d="M6.8 10h6.4" stroke="rgba(246,249,247,0.5)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Social ---------- */

const socialIcons = {
  x: <path d="M13.9 10.5 20.4 3h-1.5l-5.7 6.5L8.7 3H3.5l6.8 9.8L3.5 20.6h1.5l6-6.8 4.8 6.8H21Zm-2.1 2.4-.7-1L5.6 4.1H8l4.4 6.3.7 1 5.8 8.1h-2.4Z" />,
  linkedin: (
    <path d="M6.2 8.6H2.9V20h3.3ZM4.6 3.2a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Zm15.3 10c0-3.1-.7-5-3.9-5-1.6 0-2.6.6-3.1 1.5h-.1V8.6H9.6V20h3.3v-5.6c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.7 1.8 3V20h3.2Z" />
  ),
  instagram: (
    <path d="M12 7.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.1-9.4a1.1 1.1 0 1 0 0 2.3 1.1 1.1 0 0 0 0-2.3ZM21.3 7.8c-.1-1.6-.4-3-1.6-4.2S17 2.1 15.4 2c-1.6-.1-6.4-.1-8 0-1.6.1-3 .4-4.2 1.6S1.7 6.2 1.6 7.8c-.1 1.6-.1 6.4 0 8 .1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 6.4.1 8 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-6.4 0-8Zm-2.1 9.9a3.3 3.3 0 0 1-1.8 1.8c-1.3.5-4.3.4-5.6.4s-4.4.1-5.6-.4a3.3 3.3 0 0 1-1.8-1.8c-.5-1.3-.4-4.3-.4-5.7s-.1-4.4.4-5.7a3.3 3.3 0 0 1 1.8-1.8c1.3-.5 4.3-.4 5.6-.4s4.4-.1 5.6.4a3.3 3.3 0 0 1 1.8 1.8c.5 1.3.4 4.3.4 5.7s.1 4.4-.4 5.7Z" />
  ),
  youtube: (
    <path d="M22 7.6a2.7 2.7 0 0 0-1.9-1.9C18.4 5.2 12 5.2 12 5.2s-6.4 0-8.1.5A2.7 2.7 0 0 0 2 7.6 28.6 28.6 0 0 0 1.5 12c0 1.5.1 3 .5 4.4a2.7 2.7 0 0 0 1.9 1.9c1.7.5 8.1.5 8.1.5s6.4 0 8.1-.5a2.7 2.7 0 0 0 1.9-1.9c.4-1.4.5-2.9.5-4.4s-.1-3-.5-4.4ZM9.9 15.1V8.9l5.3 3.1Z" />
  ),
};

export type SocialIconName = keyof typeof socialIcons;

export function SocialIcon({ name, size = 18, ...rest }: IconProps & { name: SocialIconName }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
      {socialIcons[name]}
    </svg>
  );
}
