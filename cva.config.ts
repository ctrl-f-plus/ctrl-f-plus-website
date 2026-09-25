// cva.config.ts

import { defineConfig } from 'cva';
import { extendTailwindMerge } from 'tailwind-merge';

// Mirrors theme.extend.fontSize in tailwind.config.ts. Without this list,
// tailwind-merge reads a size like text-fs-lg as a colour and drops it.
const CUSTOM_FONT_SIZE_TOKENS = [
  'fs-base',
  'fs-sm',
  'fs-lg-sm',
  'fs-lg',
  'fs-x0',
  'fs-middle',
  'fs-xxx',
  'fs-xx',
  'fs-xl',
  'subtitle',
  'h1-blog',
  'p-blog',
  'button-18',
  'button-label',
  'card-heading',
  'body-sm',
  'nav-mobile',
  'label',
  'footnote',
  'code-title',
  'copyright',
];

const twMerge = extendTailwindMerge({
  classGroups: { 'font-size': [{ text: CUSTOM_FONT_SIZE_TOKENS }] },
});

export const { cva, cx, compose } = defineConfig({
  hooks: {
    'cx:done': (className) => twMerge(className),
  },
});
