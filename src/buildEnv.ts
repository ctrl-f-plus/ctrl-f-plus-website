// buildEnv.ts

// NOTE: Build-time env vars for the static export pipeline (OG image generation, CDK, etc.).
// The 'server-only' guard prevents accidental import from 'use client' components.
import 'server-only';

import { z } from 'zod';

const envSchema = z.object({
  AWS_REGION: z.string().min(1),
});

const parsed = envSchema.safeParse({
  AWS_REGION: process.env.AWS_REGION || undefined,
});

if (!parsed.success) {
  console.error(
    '❌ Invalid build environment variables:\n' + z.prettifyError(parsed.error),
  );
  throw new Error('Invalid build environment variables');
}

export const buildEnv = parsed.data;
