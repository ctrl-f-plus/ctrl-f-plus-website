// src/app/components/Hero.tsx

import Container from './layout/Container';
import ButtonPrimary from './ButtonPrimary';

export default function Hero() {
  return (
    <div>
      <Container className="my-[4.5rem] flex flex-col gap-[3.44rem]">
        <div className="relative flex flex-col items-start gap-8">
          <h1 className="z-10 text-fs-xl text-dark1">
            Ctrl-F Plus:
            <br />
            For the
            <br />
            <span className="">Tab Hoarders</span>
          </h1>
          <p className="font-open-sans text-fs-lg text-dark1">
            Tab hoarders, your time has come. Ctrl-F Plus searches across all
            your precious tabs, not just the one you're currently obsessing
            over.
          </p>
          <span className="absolute -left-[0.5625rem] top-[6.6875rem]  h-[3.8125rem] w-[24.5rem] rounded-2xl bg-highlight-focus" />
        </div>
        <div className="flex flex-col gap-6">
          <ButtonPrimary variant="solid">Add to Chrome for free</ButtonPrimary>
          <ButtonPrimary variant="outline">See how it works</ButtonPrimary>
        </div>
      </Container>
    </div>
  );
}
