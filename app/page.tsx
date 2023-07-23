// app/tab-hoarders/page.tsx

import CallToAction from './components/call-to-action';
import FeatureCard from './components/feature-card';
import FeaturesHeader from './components/features-header';
import Hero from './components/hero';
import Loading from './loading';

export default function Page() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturesHeader />
      <FeatureCard />
      <CallToAction />
    </div>
  );
}
