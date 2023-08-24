// app/components/page-title-Content.tsx

import 'server-only';

import React from 'react';
import Container from './container';
import { FadeIn, FadeInStagger } from './fade-in';

interface ChildProps {
  children?: React.ReactNode;
}

export const PageTitleContent: React.FC<ChildProps> = ({ children }) => (
  <>{children}</>
);
export const PageBodyContent: React.FC<ChildProps> = ({ children }) => (
  <>{children}</>
);

function findChildByType(
  children: React.ReactNode,
  componentType: React.ComponentType
) {
  return React.Children.toArray(children).find(
    (child) => (child as React.ReactElement).type === componentType
  );
}

function PageLayout2({ children }: { children: React.ReactNode }) {
  const titleChildren = findChildByType(children, PageTitleContent);
  const bodyChildren = findChildByType(children, PageBodyContent);

  return (
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
          <div className="rounded-3xl bg-white/[.68] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-6 tab-pro:px-14 laptop:px-8 desktop:px-[40px]">
            {bodyChildren}
          </div>
        </FadeIn>
      </FadeInStagger>
    </Container>
  );
}

export default PageLayout2;
