// app/page.tsx

import 'server-only';

import CallToAction from '@/src/components/call-to-action';
import { FadeInStagger } from '@/src/components/fade-in';
import FeatureCard from '@/src/components/feature-card';
import FeaturesHeader from '@/src/components/features-header';
import Hero from '@/src/components/hero';
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
