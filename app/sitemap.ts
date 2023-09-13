// app/sitemap.ts

import { allBlogs } from 'contentlayer/generated';

export default async function sitemap() {
  const today = new Date();

  const filteredBlogs = allBlogs.filter((post) => {
    const publishDate = new Date(post.publishedAt);
    return publishDate <= today;
  });

  const blogs = filteredBlogs.map((post) => ({
    url: `https://ctrl-f.plus/blog/${post.slug}/`,
    lastModified: post.publishedAt,
  }));

  const routes = [
    '',
    '/#features',
    '/blog',
    '/about',
    '/privacy',
    '/setup',
  ].map((route) => ({
    url: `https://ctrl-f.plus${route}/`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
