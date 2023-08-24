// app/components/page-title-card.tsx

import 'server-only';

import { FadeIn, FadeInStagger } from './fade-in';
import Container from './container';

interface PageLayoutProps {
  titleChildren: React.ReactNode;
  bodyChildren: React.ReactNode;
}

export default function PageLayout({
  titleChildren,
  bodyChildren,
}: PageLayoutProps) {
  return (
    <>
      <Container className="mt-18 flex flex-col tablet:mt-24">
        <FadeInStagger>
          <FadeIn className="flex min-h-[318px] w-full items-center justify-center rounded-3xl bg-white/[.47] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20">
            <div className="flex justify-start gap-[9.375rem]">
              <div className="flex flex-col items-start justify-center gap-6">
                {titleChildren}
              </div>
            </div>
          </FadeIn>

          <FadeIn className="mt-10">
            <div className="rounded-3xl bg-white/[.68] px-4 py-14 shadow-sm  backdrop-blur-[23px] mobile-md:px-6 tab-pro:px-14 laptop:px-8 desktop:px-[40px]">
              {bodyChildren}
            </div>
          </FadeIn>
        </FadeInStagger>
      </Container>
    </>
  );
}
