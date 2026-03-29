export const dynamic = 'force-static';

import { clientEnv } from '@/src/clientEnv';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${clientEnv.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
    host: clientEnv.NEXT_PUBLIC_APP_URL,
  };
}
