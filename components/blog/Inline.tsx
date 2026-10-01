import type { ReactNode } from "react";

/** Renders the tiny markdown subset used in post copy: [text](href) and **bold**. */
export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      const external = /^https?:\/\//.test(m[2]);
      out.push(
        <a key={i++} href={m[2]} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {m[1]}
        </a>,
      );
    } else out.push(<strong key={i++}>{m[3]}</strong>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
