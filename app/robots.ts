// app/robots.ts

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://ctrl-f.plus/sitemap.xml',
    host: 'https://ctrl-f.plus',
  };
}
