// app/setup/page.tsx
import 'server-only';

import { allDocs } from '@/.contentlayer/generated/Docs/_index.mjs';
import type { Metadata } from 'next';
import Balancer from 'react-wrap-balancer';
import Container from '../components/container';
import { FadeInStagger } from '../components/fade-in';
import { Mdx } from '../components/mdx';
import PageBodyCard from '../components/page-body-card';
import PageTitleCard from '../components/page-title-card';
import { formatDate, getDocument } from '../lib/utils';

export const metadata: Metadata = {
  title: 'Keyboard Shortcut Setup',
  description: '',
  alternates: {
    canonical: 'https://ctrl-f.plus/setup',
  },
};

export default function Setup() {
  const document = getDocument(allDocs, 'keyboard-shortcut-setup');

  if (!document) {
    return;
  }

  return (
    <Container className="mt-18 flex flex-col tablet:mt-24">
      <FadeInStagger>
        <PageTitleCard>
          <p className="font-open-sans text-[#889397] tab-pro:text-fs-lg">
            <Balancer>{formatDate(document.publishedAt)}</Balancer>
          </p>
          <h1 className="font-inter text-fs-xl text-shark">{document.title}</h1>

          <p className="font-open-sans text-fs-lg text-shark">
            Thank you for choosing to use{' '}
            <span className="text-highlighter-focus-400 ">Ctrl-F Plus!</span>.
            Please follow the instructions below if the Ctrl+Shift+F keyboard
            command is not automatically loaded on your extension.
          </p>
        </PageTitleCard>

        <PageBodyCard>
          <Mdx code={document.body.code} />
        </PageBodyCard>
      </FadeInStagger>
    </Container>
  );
}
