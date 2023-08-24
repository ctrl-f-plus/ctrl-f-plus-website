// app/components/page-title-card.tsx

import 'server-only';

import { FadeIn } from '../components/fade-in';

interface PageTitleCardProps {
  children: React.ReactNode;
}

export default function PageTitleCard({ children }: PageTitleCardProps) {
  return (
    <FadeIn className="flex min-h-[318px] w-full items-center justify-center rounded-3xl bg-white/[.47] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20">
      <div className="flex justify-start gap-[9.375rem]">
        <div className="flex flex-col items-start justify-center gap-6">
          {children}
        </div>
      </div>
    </FadeIn>
  );
}
