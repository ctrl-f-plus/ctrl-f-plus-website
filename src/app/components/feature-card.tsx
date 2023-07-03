// ctrl-f-plus-website/src/app/tab-hoarders/components/FeatureCard.tsx

import FeatureIcon1 from './icons/feature1';
import Container from './layout/Container';

export default function FeatureCard() {
  return (
    // <Container className="w-full">
    // h-full  min-w-[23.5rem]
    <Container className="mx-auto flex w-full flex-col">
      {/* grid grid-cols-1 */}
      {/* px-[2.25rem] */}
      <div className="flex min-h-[38.3125rem] flex-col items-center justify-center gap-9 rounded-[2.25rem] bg-white">
        <FeatureIcon1 />
        <div className="flex flex-col items-center justify-center gap-9 text-center">
          <h2 className="font-inter text-fs-base text-primary1">
            All-Tab Search: The Panoramic View
          </h2>
          {/*  */}
          <h3 className=" font-inter text-fs-x0 text-dark1">
            Upgrade from
            <br />
            One-Tab Searches
          </h3>
          <p className="max-w-[19rem] font-open-sans text-fs-lg text-dark1">
            Your CTRL+F only searches one tab? That's cute. We prefer the
            panoramic view.
          </p>
        </div>
      </div>
    </Container>
  );
}
