import type { Metadata } from 'next';
import Container from '../components/ui/container';
import { FadeInStagger } from '../components/fade-in';
import PageBodyCard from '../components/page-body-card';
import PageTitleCard from '../components/page-title-card';

export const metadata: Metadata = {
  title: 'Keyboard Shortcut Setup',
  description: '',
  alternates: {
    canonical: 'https://ctrl-f.plus/setup/',
  },
};

export default async function Setup() {
  const { default: SetupContent } = await import(
    '@/content/documentation/keyboard-shortcut-setup.mdx'
  );

  return (
    <Container className="mt-18 flex flex-col tablet:mt-24">
      <FadeInStagger>
        <PageTitleCard>
          <p className="font-open-sans text-[#889397] tab-pro:text-fs-lg">
            August 23, 2023
          </p>
          <h1 className="font-inter text-fs-xl text-shark">
            Keyboard Shortcut Setup
          </h1>

          <p className="font-open-sans text-fs-lg text-shark">
            Thank you for choosing to use{' '}
            <span className="text-highlighter-focus-400 ">Ctrl-F Plus!</span>.
            Please follow the instructions below if the Ctrl+Shift+F keyboard
            command is not automatically loaded on your extension.
          </p>
        </PageTitleCard>

        <PageBodyCard>
          <article className="prose max-w-none">
            <SetupContent />
          </article>
        </PageBodyCard>
      </FadeInStagger>
    </Container>
  );
}
