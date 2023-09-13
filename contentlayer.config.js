// contentlayer.config.ts

import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { readFileSync } from 'fs';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkCodeTitles from 'remark-flexible-code-titles';
import {
  attachRawStringToCodeContainers,
  attachMetadataProperties,
} from './plugins/mdxPlugins';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    // resolve: (doc) => `/${doc._raw.flattenedPath}`,
    // resolve: (doc) => doc._raw.flattenedPath,
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
};

export const Documentation = defineDocumentType(() => ({
  name: 'Documentation',
  filePathPattern: `documentation/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'string', required: true },
  },
  computedFields,
}));

export const Blog = defineDocumentType(() => ({
  name: 'Blog',

  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    author: { type: 'string', required: true },
    // description: { type: "string", required: true },
    summary: {
      type: 'string',
      required: true,
    },
    publishedAt: { type: 'string', required: true },
  },
  computedFields,
}));

const themePath = './assets/themes/ctrl-markdown-theme.json';

export default makeSource({
  contentDirPath: 'content',
  contentDirExclude: ['drafts'],
  documentTypes: [Blog, Documentation],
  mdx: {
    remarkPlugins: [
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
    rehypePlugins: [
      attachRawStringToCodeContainers,
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: JSON.parse(readFileSync(themePath, 'utf-8')),
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],

      attachMetadataProperties,

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
