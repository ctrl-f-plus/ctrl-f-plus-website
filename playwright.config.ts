// playwright.config.ts

import { defineConfig } from '@playwright/test';

const SERVER_PORT = 41743;
const BASE_URL = `http://127.0.0.1:${SERVER_PORT}`;

export default defineConfig({
  testDir: './visual-baseline',
  // Baselines are keyed by platform because system-font metrics differ per OS.
  snapshotPathTemplate: '{testDir}/__snapshots__/{platform}/{arg}{ext}',
  fullyParallel: true,
  retries: 0,
  workers: 4,
  reporter: [['list']],
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 0,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
    },
  },
  use: {
    baseURL: BASE_URL,
    browserName: 'chromium',
    reducedMotion: 'reduce',
    colorScheme: 'light',
    locale: 'en-US',
    timezoneId: 'UTC',
    deviceScaleFactor: 1,
  },
  webServer: {
    command: 'tsx visual-baseline/serve-dist.ts',
    url: `${BASE_URL}/`,
    reuseExistingServer: false,
    env: { PORT: String(SERVER_PORT) },
  },
});
