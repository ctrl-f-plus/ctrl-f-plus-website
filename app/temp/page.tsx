// app/tab-hoarders/page.tsx

import { FadeInStagger } from '../components/fade-in';
import FeaturesHeader from '../components/features-header';
import FeaturesHeaderOld from '../components/features-header-old';

export default function Page() {
  const components = [
    <FeaturesHeader key="featuresHeader" />,
    <FeaturesHeaderOld key="featuresHeader2" />,
  ];

  return <FadeInStagger className="flex flex-col">{components}</FadeInStagger>;
}
