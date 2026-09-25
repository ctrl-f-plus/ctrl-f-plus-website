import { Suspense } from 'react';
import type { Metadata } from 'next';

import { CheckoutSuccess } from '@/components/checkout-success';
import Container from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Purchase complete | Ctrl-F Plus',
  icons: { icon: '/favicons/favicon-32x32.png' },
};

export default function Page() {
  return (
    <Container className="mt-18 flex flex-col tablet:mt-24">
      <Suspense>
        <CheckoutSuccess />
      </Suspense>
    </Container>
  );
}
