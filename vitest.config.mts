// vitest.config.mts

import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const sourceDirectoryPath = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  resolve: {
    alias: { '@': sourceDirectoryPath },
  },
  test: {
    // Playwright owns the specs under visual-baseline.
    include: ['src/**/*.spec.ts'],
  },
});
