// contentlayer.config.ts

import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { readFileSync } from 'fs';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkCodeTitles from 'remark-flexible-code-titles';
import { visit } from 'unist-util-visit';

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

// export const PrivacyPolicy = defineDocumentType(() => ({
//   name: 'Privacy',
//   filePathPattern: `privacy/**/*.mdx`,
//   contentType: 'mdx',
//   fields: {
//     title: { type: 'string', required: true },
//     publishedAt: { type: 'string', required: true },
//   },
//   computedFields,
// }));

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
      () => (tree) => {
        visit(tree, (node) => {
          if (
            node?.type === 'element' &&
            node?.tagName === 'div' &&
            node.properties.className[0] === 'remark-code-container'
          ) {
            if (node.children.length > 1) {
              const titleNode = node.children[0];
              const preNode = node.children[1];

              const val = preNode.children['0'].children['0'].value;
              titleNode.__rawString__ = val;
            } else if (node.children.length === 1) {
              const preNode = node.children[0];
              const val = preNode.children['0'].children['0'].value;
              preNode.__rawString__ = val;
            }
          }
        });
      },

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

      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'Title') {
            node.properties['__withMeta__'] =
              node.children.at(0).tagName === 'div';
            node.properties['__rawString__'] = node.__rawString__;
          } else if (node?.type === 'element' && node?.tagName === 'div') {
            if (!('data-rehype-pretty-code-fragment' in node.properties)) {
              return;
            }

            const preElement = node.children.at(-1);

            if (preElement.tagName !== 'pre') {
              return;
            }

            preElement.properties['__withMeta__'] =
              node.children.at(0).tagName === 'div';

            preElement.properties['__rawString__'] = node.__rawString__;
          }
        });
      },

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
