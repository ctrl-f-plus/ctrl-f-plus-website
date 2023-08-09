// app/tab-hoarders/page.tsx

import CallToAction from './components/call-to-action';
import { FadeIn, FadeInStagger } from './components/fade-in';
import FeatureCard from './components/feature-card';
import FeaturesHeader from './components/features-header';
import FeaturesHeaderOld from './components/features-header-old';
import Hero from './components/hero';
import Loading from './loading';

export default function Page() {
  const components = [
    <Hero key="hero" />,
    <FeaturesHeader key="featuresHeader" />,
    // <FeaturesHeaderOld key="featuresHeader2" />,
    <FeatureCard key="featureCard" />,
    <CallToAction key="callToAction" />,
  ];

  return <FadeInStagger className="flex flex-col">{components}</FadeInStagger>;
}
