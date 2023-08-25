// app/sitemap.ts

import { allBlogs } from 'contentlayer/generated';

export default async function sitemap() {
  const routes = [
    '',
    '/#features',
    '/blog',
    '/about',
    '/privacy',
    '/setup',
  ].map((route) => ({
    url: `https://ctrl-f.plus${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const blogs = allBlogs.map((post) => ({
    url: `https://ctrl-f.plus/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  return [...routes, ...blogs];
}
