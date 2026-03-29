import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import {clientEnv} from "@/clientEnv";


export interface Post {
  title: string;
  author: string;
  description: string;
  summary: string;
  image?: string;
  publishedAt: string;
  updatedAt: string;
  slug: string;
  readingTime: { text: string; minutes: number; words: number };
  structuredData: Record<string, unknown>;
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');

let cachedPosts: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cachedPosts) return cachedPosts;

  cachedPosts = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8');
      const { data, content } = matter(raw);

      // Validate required frontmatter fields
      const required = [
        'title',
        'author',
        'description',
        'summary',
        'publishedAt',
        'updatedAt',
      ] as const;
      for (const field of required) {
        if (!data[field]) {
          throw new Error(
            `Missing required frontmatter field "${field}" in ${filename}`,
          );
        }
      }

      const rt = readingTime(content); // body only, not frontmatter

      return {
        ...(data as Omit<Post, 'slug' | 'readingTime' | 'structuredData'>),
        slug,
        readingTime: {
          text: rt.text,
          minutes: Math.ceil(rt.minutes),
          words: rt.words,
        },
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data.title,
          datePublished: data.publishedAt,
          dateModified: data.updatedAt,
          description: data.summary,
          image: data.image
            ? `${clientEnv.NEXT_PUBLIC_APP_URL}${data.image}`
            : `${clientEnv.NEXT_PUBLIC_APP_URL}/og/${slug}.png`,
          url: `${clientEnv.NEXT_PUBLIC_APP_URL}/blog/${slug}/`,
          author: { '@type': 'Person', name: 'Ben Chavez' },
        },
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

  return cachedPosts;
}

export function getPublishedPosts(): Post[] {
  // Compare date strings directly — YYYY-MM-DD format is lexicographically
  // sortable and avoids timezone issues with Date parsing.
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD" in UTC
  return getAllPosts().filter(
    (post) =>
      post.publishedAt <= today || process.env.NODE_ENV === 'development',
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find((p) => p.slug === slug);
}
