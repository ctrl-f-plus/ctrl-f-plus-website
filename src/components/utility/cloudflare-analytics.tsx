// src/components/utility/cloudflare-analytics.tsx
import 'server-only';

import Script from 'next/script';
import { clientEnv } from '@/clientEnv';

export function CloudflareAnalytics() {
  const token = clientEnv.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;
  if (!token) return null;

  return (
    <Script
      strategy="afterInteractive"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={`{"token":"${token}"}`}
    />
  );
}
