import type { Post } from "./types";
import { aeoVsSeo } from "./posts/aeo-vs-seo";
import { seoBestPractices } from "./posts/seo-best-practices";
import { whatIsAeo } from "./posts/what-is-answer-engine-optimization";
import { whatIsGeo } from "./posts/what-is-generative-engine-optimization";
import { aeoStrategies } from "./posts/aeo-strategies-for-startups";

export type { Block, Post } from "./types";

export const posts: Post[] = [aeoVsSeo, seoBestPractices, whatIsAeo, whatIsGeo, aeoStrategies];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Strip the lightweight markdown ([text](url), **bold**) used in post copy. */
export const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
