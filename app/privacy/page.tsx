import 'server-only';

import { allPrivacies } from '@/.contentlayer/generated/Privacy/_index.mjs';
import type { Metadata } from 'next';
import Balancer from 'react-wrap-balancer';
import Container from '../components/container';
import { FadeIn, FadeInStagger } from '../components/fade-in';
import { Mdx } from '../components/mdx';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn about Ctrl-F Plus, the open source Chrome extension that redefines productivity by extending the native Ctrl-F functionality to search across all tabs in your browser window.',
  alternates: {
    canonical: 'https://ctrl-f.plus/privacy',
  },
};

const getPrivacyPolicy = () => {
  return allPrivacies.find((privacy) => privacy.slug === 'privacy-policy');
};

function TitleContent(privacyPolicy: any) {
  const policy = privacyPolicy.policy;

  return (
    <>
      <p className="font-open-sans text-[#889397] tab-pro:text-fs-lg">
        <Balancer>{policy.publishedAt}</Balancer>
      </p>
      <h1 className="font-inter text-fs-xl text-shark">Privacy Policy</h1>

      <p className="font-open-sans text-fs-lg text-shark">
        Thank you for choosing to use{' '}
        <span className="text-highlighter-focus-400 ">Ctrl-F Plus!</span>. We
        respect your privacy and are committed to protecting any personal
        information you may share with us. As such, Our browser extension does
        not collect any of your personal data.
      </p>
    </>
  );
}

function BodyContent(privacyPolicy: any) {
  const policy = privacyPolicy.policy;

  return <Mdx code={policy.body.code} />;
}

export default function Privacy() {
  const privacyPolicy = getPrivacyPolicy();

  if (!privacyPolicy) {
    return;
  }

  return (
    <>
      <Container className="mt-18 flex flex-col tablet:mt-24">
        <FadeInStagger>
          <FadeIn className="flex min-h-[318px] w-full items-center justify-center rounded-3xl bg-white/[.47] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20">
            <div className="flex justify-start gap-[9.375rem]">
              <div className="flex flex-col items-start justify-center gap-6">
                <TitleContent policy={privacyPolicy} />
              </div>
            </div>
          </FadeIn>

          <FadeIn className="mt-10">
            <div className="rounded-3xl bg-white/[.68] px-4 py-14 shadow-sm  backdrop-blur-[23px] mobile-md:px-6 tab-pro:px-14 laptop:px-8 desktop:px-[40px]">
              <BodyContent policy={privacyPolicy} />
            </div>
          </FadeIn>
        </FadeInStagger>
      </Container>
    </>
  );
}
