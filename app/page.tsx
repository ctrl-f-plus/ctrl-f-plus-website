// app/page.tsx

import 'server-only';

import CallToAction from './components/call-to-action';
import { FadeInStagger } from './components/fade-in';
import FeatureCard from './components/feature-card';
import FeaturesHeader from './components/features-header';
import Hero from './components/hero';
import { Suspense } from 'react';

export default function Page() {
  const components = [
    <>
      <Hero key="hero" />,
      <Suspense fallback={<></>}>
        <FeaturesHeader key="featuresHeader" />,
      </Suspense>
      <Suspense fallback={<></>}>
        <FeatureCard key="featureCard" />,
      </Suspense>
      <Suspense fallback={<></>}>
        <CallToAction key="callToAction" />,
      </Suspense>
    </>,
  ];

  return <FadeInStagger className="flex flex-col">{components}</FadeInStagger>;
}
