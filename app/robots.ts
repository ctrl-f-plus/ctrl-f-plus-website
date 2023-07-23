// app/robots.ts

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://ctrl-f.plus/sitemap.xml',
    host: 'https://ctrl-f.plus',
  };
}
