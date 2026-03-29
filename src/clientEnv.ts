import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
  NEXT_PUBLIC_SITE_NAME: z.string().optional(),
  NEXT_PUBLIC_CHROME_STORE_URL: z.string().optional(),
  NEXT_PUBLIC_GITHUB_EXT_URL: z.string().optional(),
  NEXT_PUBLIC_GITHUB_ORGANIZATION_URL: z.string().optional(),
  NEXT_PUBLIC_OPEN_COLLECTIVE_URL: z.string().optional(),
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().optional(),
  NEXT_PUBLIC_CF_ANALYTICS_TOKEN: z.string().optional(),
  NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID: z.string().optional(),
  NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID: z.string().optional(),
  NEXT_PUBLIC_AWS_REGION: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || undefined,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || undefined,
  NEXT_PUBLIC_CHROME_STORE_URL:
    process.env.NEXT_PUBLIC_CHROME_STORE_URL || undefined,
  NEXT_PUBLIC_GITHUB_EXT_URL:
    process.env.NEXT_PUBLIC_GITHUB_EXT_URL || undefined,
  NEXT_PUBLIC_GITHUB_ORGANIZATION_URL:
    process.env.NEXT_PUBLIC_GITHUB_ORGANIZATION_URL || undefined,
  NEXT_PUBLIC_OPEN_COLLECTIVE_URL:
    process.env.NEXT_PUBLIC_OPEN_COLLECTIVE_URL || undefined,
  NEXT_PUBLIC_CONTACT_EMAIL:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
  NEXT_PUBLIC_CF_ANALYTICS_TOKEN:
    process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN || undefined,
  NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID:
    process.env.NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID || undefined,
  NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID:
    process.env.NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID || undefined,
  NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION || undefined,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN || undefined,
});

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:\n' + z.prettifyError(parsed.error),
  );
  throw new Error('Invalid environment variables');
}

export const clientEnv = parsed.data;
