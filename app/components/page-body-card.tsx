// app/components/page-title-card.tsx

import 'server-only';

import { FadeIn } from '../components/fade-in';

interface PageBodyCardProps {
  children: React.ReactNode;
}

export default function PageBodyCard({ children }: PageBodyCardProps) {
  return (
    <FadeIn className="mt-10">
      <div className="rounded-3xl bg-white/[.68] px-4 py-14 shadow-sm  backdrop-blur-[23px] mobile-md:px-6 tab-pro:px-14 laptop:px-8 desktop:px-[40px]">
        {children}
      </div>
    </FadeIn>
  );
}
