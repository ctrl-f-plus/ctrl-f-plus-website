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
    'Learn about Ctrl-F Plus, the Chrome extension that redefines productivity by extending the native Ctrl-F functionality to search across all tabs in your browser window.',
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
          <PageTitleCardDate>August 10, 2023</PageTitleCardDate>
          <PageTitleCardTitle>Privacy Policy</PageTitleCardTitle>

          <PageTitleCardDescription>
            Thank you for choosing to use{' '}
            <span className="text-highlighter-focus-400">Ctrl-F Plus!</span> We
            respect your privacy and are committed to protecting any personal
            information you may share with us. As such, Our browser extension
            does not collect any of your personal data.
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
