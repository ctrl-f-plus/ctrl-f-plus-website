'use client';

import { useEffect } from 'react';
import { clientEnv } from '@/src/clientEnv';

export function SentryInit() {
  useEffect(() => {
    const dsn = clientEnv.NEXT_PUBLIC_SENTRY_DSN;
    if (!dsn) return;

    import('@sentry/browser').then((Sentry) => {
      Sentry.init({
        dsn,
        tracesSampleRate: 0,
        environment: process.env.NODE_ENV,
      });
    });
  }, []);

  return null;
}
