// src/app/privacy/page.tsx

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
  title: 'Privacy Policy',
  description:
    'What Ctrl-F Plus keeps on your device, what it sends to deliver a Pro license, and what the ctrl-f.plus website records.',
  alternates: {
    canonical: 'https://ctrl-f.plus/privacy/',
  },
};

export default async function Privacy() {
  const { default: PrivacyContent } =
    await import('@/content/documentation/privacy-policy.mdx');

  return (
    <Container className="mt-18 flex flex-col tablet:mt-24">
      <FadeInStagger>
        <PageTitleCard className="min-h-[318px]">
          <PageTitleCardDate>October 16, 2026</PageTitleCardDate>
          <PageTitleCardTitle>Privacy Policy</PageTitleCardTitle>

          <PageTitleCardDescription>
            Thank you for choosing to use{' '}
            <span className="text-highlighter-focus-400">Ctrl-F Plus!</span>{' '}
            This page says what stays on your device, what the extension sends
            when you buy or sign in to Pro, and what our website records.
          </PageTitleCardDescription>
        </PageTitleCard>

        <PageBodyCard>
          <article className="prose max-w-none">
            <PrivacyContent />
          </article>
        </PageBodyCard>
      </FadeInStagger>
    </Container>
  );
}
