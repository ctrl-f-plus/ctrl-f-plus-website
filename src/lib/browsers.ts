// src/lib/browsers.ts

export const BROWSERS = {
  brave: {
    displayName: 'Brave',
    storeUrl: process.env.NEXT_PUBLIC_CHROME_STORE_URL,
  },
  chrome: {
    displayName: 'Chrome',
    storeUrl: process.env.NEXT_PUBLIC_CHROME_STORE_URL,
  },
  firefox: {
    displayName: 'Firefox',
    storeUrl: process.env.NEXT_PUBLIC_FIREFOX_STORE_URL,
  },
} as const;

export type Browser = keyof typeof BROWSERS;
