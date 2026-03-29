export const dynamic = 'force-static';

import { clientEnv } from '@/src/clientEnv';
import { getPublishedPosts } from '@/src/lib/posts';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getPublishedPosts().map((post) => ({
    url: `${clientEnv.NEXT_PUBLIC_APP_URL}/blog/${post.slug}/`,
    lastModified: post.updatedAt,
  }));

  const routes = ['', '/blog', '/about', '/privacy', '/setup'].map(
    (route) => ({
      url: `${clientEnv.NEXT_PUBLIC_APP_URL}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }),
  );

  return [...routes, ...blogs];
}
