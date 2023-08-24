// app/components/page-title-card.tsx

import 'server-only';

import { FadeIn } from '../components/fade-in';

interface PageBodyCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageBodyCard({
  children,
  className,
}: PageBodyCardProps) {
  return (
    <FadeIn className="mt-10" className={className}>
      <div
        // py-6
        // py-14
        className="rounded-3xl bg-white/[.68] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-6 tab-pro:px-14 laptop:px-8 desktop:px-[40px]"
      >
        {children}
      </div>
    </FadeIn>
  );
}
