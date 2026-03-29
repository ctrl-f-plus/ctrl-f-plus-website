// app/page.tsx

import 'server-only';

import CallToAction from './components/call-to-action';
import { FadeInStagger } from './components/fade-in';
import FeatureCard from './components/feature-card';
import FeaturesHeader from './components/features-header';
import Hero from './components/hero';
import { Suspense } from 'react';

export default function Page() {
  return (
    <FadeInStagger className="flex flex-col">
      <Hero />
      <Suspense fallback={<></>}>
        <FeaturesHeader />
      </Suspense>
      <Suspense fallback={<></>}>
        <FeatureCard />
      </Suspense>
      <Suspense fallback={<></>}>
        <CallToAction />
      </Suspense>
    </FadeInStagger>
  );
}
