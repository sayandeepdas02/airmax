import { ImageResponse } from "next/og";
import { getPost, posts } from "@/lib/blog";

export const alt = "AirMax blog article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#060e0e", color: "#f6f9f7", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", color: "#00f57b", fontSize: 26, letterSpacing: 2, textTransform: "uppercase" }}>{post?.category ?? "AirMax Blog"}</div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>{post?.title ?? "AirMax Blog"}</div>
        <div style={{ display: "flex", fontSize: 32 }}>
          <span style={{ fontWeight: 700 }}>AirMax</span>
          <span style={{ marginLeft: 16, color: "#8fa5a0" }}>AEO agency for startups</span>
        </div>
      </div>
    ),
    size,
  );
}
