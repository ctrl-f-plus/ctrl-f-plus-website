// app/page.tsx

import 'server-only';

import CallToAction from './components/call-to-action';
import { FadeInStagger } from './components/fade-in';
import FeatureCard from './components/feature-card';
import FeaturesHeader from './components/features-header';
import Hero from './components/hero';
// import Loading from './loading';

export default function Page() {
  const components = [
    <Hero key="hero" />,
    <FeaturesHeader key="featuresHeader" />,
    <FeatureCard key="featureCard" />,
    <CallToAction key="callToAction" />,
  ];

  return <FadeInStagger className="flex flex-col">{components}</FadeInStagger>;
}
