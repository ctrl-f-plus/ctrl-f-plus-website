// app/highlight/page.tsx

import Link from 'next/link';

// @ts-ignore
export const cx = (...classNames) => classNames.filter(Boolean).join(' ');

export default function PostList({ minimal, fontSize, fontWeight }) {
  return (
    <>
      <div
        className={cx(
          'group cursor-pointer'
          // minimal && 'grid gap-10 md:grid-cols-2'
        )}
      >
        <h2
        // className={cx(
        //   fontSize === 'large'
        //     ? 'text-2xl'
        //     : minimal
        //     ? 'text-3xl'
        //     : 'text-lg',
        //   fontWeight === 'normal'
        //     ? 'line-clamp-2 font-medium  tracking-normal text-black'
        //     : 'font-semibold leading-snug tracking-tight',
        //   'mt-2    '
        // )}
        >
          <span
            className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
                       bg-no-repeat
                       transition-[background-size]
                       duration-500
                       hover:bg-[length:100%_3px]
                       group-hover:bg-[length:100%_10px]
                      "
          >
            {'Every Next Level of Your Life Will Demand a Different You'}
          </span>
        </h2>
      </div>
    </>
  );
}
