// Security headers (CSP, HSTS, X-Frame-Options, etc.) are handled by the
// hosting layer — CloudFront Response Headers Policy in Phase 2. The Next.js
// `headers()` config is inert when `output: 'export'` is set.

import createMDX from '@next/mdx';
import { readFileSync } from 'node:fs';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkCodeTitles from 'remark-flexible-code-titles';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import {
  rehypeAttachRawStringsToCodeContainer,
  rehypeEnrichCodeContainerMetadata,
} from 'rehype-clipboard-prep-code';

const themePath = './assets/themes/ctrl-markdown-theme.json';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  reactStrictMode: false,
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkGfm,
      [
        remarkCodeTitles,
        {
          titleTagName: 'Title',
          titleClassName: 'custom-code-title',
          titleProperties: (language, title) => ({
            ['data-language']: language,
            title,
          }),
        },
      ],
    ],
    // ORDER MATTERS — rehype-clipboard-prep-code plugins bracket rehype-pretty-code
    rehypePlugins: [
      rehypeAttachRawStringsToCodeContainer, // before pretty-code: reads raw code text
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: JSON.parse(readFileSync(themePath, 'utf-8')),
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node?.properties?.className?.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      rehypeEnrichCodeContainerMetadata, // after pretty-code: reads data-rehype-pretty-code-fragment
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
