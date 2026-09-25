// src/app/page.tsx
import 'server-only';

import CallToAction from '@/components/call-to-action';
import { FadeInStagger } from '@/components/fade-in';
import FeatureCards from '@/components/feature-cards';
import FeaturesHeader from '@/components/features-header';
import Hero from '@/components/hero';
import PricingCards from '@/components/pricing-cards';

export default function Page() {
  return (
    <FadeInStagger className="flex flex-col">
      <Hero />
      <FeaturesHeader />
      <FeatureCards />
      <PricingCards />
      <CallToAction />
    </FadeInStagger>
  );
}
