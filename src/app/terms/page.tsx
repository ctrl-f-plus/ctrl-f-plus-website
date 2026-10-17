// src/app/terms/page.tsx

import type { Metadata } from 'next';
import Container from '@/components/ui/container';
import { FadeInStagger } from '@/components/fade-in';
import PageBodyCard from '@/components/page-body-card';
import {
  PageTitleCard,
  PageTitleCardDate,
  PageTitleCardDescription,
  PageTitleCardTitle,
} from '@/components/page-title-card';

export const metadata: Metadata = {
  title: 'Terms of Sale',
  description:
    'Who sells Ctrl-F Plus Pro, what it includes, how subscriptions renew and cancel, and how refunds work.',
  alternates: {
    canonical: 'https://ctrl-f.plus/terms/',
  },
};

export default async function TermsOfSale() {
  const { default: TermsOfSaleContent } =
    await import('@/content/documentation/terms-of-sale.mdx');

  return (
    <Container className="mt-18 flex flex-col tablet:mt-24">
      <FadeInStagger>
        <PageTitleCard className="min-h-[318px]">
          <PageTitleCardDate>October 16, 2026</PageTitleCardDate>
          <PageTitleCardTitle>Terms of Sale</PageTitleCardTitle>

          <PageTitleCardDescription>
            These terms cover{' '}
            <span className="text-highlighter-focus-400">Ctrl-F Plus Pro</span>,
            the optional paid upgrade. The free extension is not affected by
            them.
          </PageTitleCardDescription>
        </PageTitleCard>

        <PageBodyCard>
          <article className="prose max-w-none">
            <TermsOfSaleContent />
          </article>
        </PageBodyCard>
      </FadeInStagger>
    </Container>
  );
}
