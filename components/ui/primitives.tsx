import type { ReactNode } from "react";
import styles from "./ui.module.css";

/* ---------- Brand ---------- */

export function LogoMark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={[styles.logoMark, className].filter(Boolean).join(" ")}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.2 13.6 12 4.8l8.8 8.8"
        stroke="currentColor"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.6 21.2 12 16.8l4.4 4.4"
        stroke="currentColor"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <a href={href} className={[styles.logo, className].filter(Boolean).join(" ")} aria-label="AirMax home">
      <LogoMark />
      <span className={styles.logoWord}>AirMax</span>
    </a>
  );
}

/* ---------- Pill (Framer "Subtext") ---------- */

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={[styles.pill, className].filter(Boolean).join(" ")}>{children}</span>;
}

/* ---------- Check icon (gradient + inner shadow defs live in <SvgDefs />) ---------- */

export function Check({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={[styles.check, className].filter(Boolean).join(" ")}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <g filter="url(#chk-inner)">
        <circle cx="10" cy="10" r="8.333" fill="#10B261" />
      </g>
      <circle cx="10" cy="10" r="8.333" stroke="url(#chk-ring)" strokeWidth="0.5" />
      <path
        d="M6.668 10l2.5 2.5 4.167-5"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Shared SVG definitions, rendered once in the layout so icons can reference them by id. */
export function SvgDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <filter
          id="chk-inner"
          x="1.4"
          y="1.4"
          width="17.2"
          height="21.2"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="bg" />
          <feBlend in="SourceGraphic" in2="bg" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="alpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="alpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.12 0 0 0 0 0.92 0 0 0 0 0.52 0 0 0 1 0" />
          <feBlend in2="shape" />
        </filter>
        <radialGradient
          id="chk-ring"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(9 0.5) rotate(83.29) scale(17.12)"
        >
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#10B261" />
        </radialGradient>
        <filter
          id="orb-inner"
          x="0"
          y="0"
          width="52"
          height="56"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="bg" />
          <feBlend in="SourceGraphic" in2="bg" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="alpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="alpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.95 0 0 0 0 1 0 0 0 0 0.95 0 0 0 0.06 0" />
          <feBlend in2="shape" />
        </filter>
        <linearGradient id="orb-ring" x1="26" y1="0" x2="26" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00F57B" />
          <stop offset="1" stopColor="#00F57B" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
