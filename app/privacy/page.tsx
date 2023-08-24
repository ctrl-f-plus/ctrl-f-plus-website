// import 'server-only';

// import { allPrivacies } from '@/.contentlayer/generated/Privacy/_index.mjs';
// import type { Metadata } from 'next';
// import Balancer from 'react-wrap-balancer';
// import { Mdx } from '../components/mdx';
// import PageContent from '../components/pageLayout3';
// import { formatDate } from '../lib/utils';

// export const metadata: Metadata = {
//   title: 'Privacy Policy',
//   description:
//     'Learn about Ctrl-F Plus, the open source Chrome extension that redefines productivity by extending the native Ctrl-F functionality to search across all tabs in your browser window.',
//   alternates: {
//     canonical: 'https://ctrl-f.plus/privacy',
//   },
// };

// const getPrivacyPolicy = () => {
//   return allPrivacies.find((privacy) => privacy.slug === 'privacy-policy');
// };

// function TitleContent(privacyPolicy: any) {
//   const policy = privacyPolicy;

//   return (
//     <>
//       <p className="font-open-sans text-[#889397] tab-pro:text-fs-lg">
//         <Balancer>{formatDate(policy.publishedAt)}</Balancer>
//       </p>
//       <h1 className="font-inter text-fs-xl text-shark">Privacy Policy</h1>

//       <p className="font-open-sans text-fs-lg text-shark">
//         Thank you for choosing to use{' '}
//         <span className="text-highlighter-focus-400 ">Ctrl-F Plus!</span>. We
//         respect your privacy and are committed to protecting any personal
//         information you may share with us. As such, Our browser extension does
//         not collect any of your personal data.
//       </p>
//     </>
//   );
// }

// function BodyContent(privacyPolicy: any) {
//   const policy = privacyPolicy;
//   return <Mdx code={policy.body.code} />;
// }

// export default function Privacy() {
//   const privacyPolicy = getPrivacyPolicy();

//   if (!privacyPolicy) {
//     return;
//   }

//   return (
//     <PageContent
//       titleChildren={TitleContent(privacyPolicy)}
//       bodyChildren={BodyContent(privacyPolicy)}
//     />
//   );
// }

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
  title: 'Privacy Policy',
  description:
    'Learn about Ctrl-F Plus, the open source Chrome extension that redefines productivity by extending the native Ctrl-F functionality to search across all tabs in your browser window.',
  alternates: {
    canonical: 'https://ctrl-f.plus/privacy',
  },
};

export default function Privacy() {
  const privacyPolicy = getDocument(allDocs, 'privacy-policy');

  if (!privacyPolicy) {
    return;
  }

  return (
    <Container className="mt-18 flex flex-col tablet:mt-24">
      <FadeInStagger>
        <PageTitleCard>
          <p className="font-open-sans text-[#889397] tab-pro:text-fs-lg">
            <Balancer>{formatDate(privacyPolicy.publishedAt)}</Balancer>
          </p>
          <h1 className="font-inter text-fs-xl text-shark">Privacy Policy</h1>

          <p className="font-open-sans text-fs-lg text-shark">
            Thank you for choosing to use{' '}
            <span className="text-highlighter-focus-400 ">Ctrl-F Plus!</span>.
            We respect your privacy and are committed to protecting any personal
            information you may share with us. As such, Our browser extension
            does not collect any of your personal data.
          </p>
        </PageTitleCard>

        <PageBodyCard>
          <Mdx code={privacyPolicy.body.code} />;
        </PageBodyCard>
      </FadeInStagger>
    </Container>
  );
}
