// app/components/icons/button-icons.tsx

'use client';

import { cva, cx, type VariantProps } from 'cva';
import { m } from 'framer-motion';

const icon = cva({
  variants: {
    intent: {
      solid: 'fill-white group-active:fill-white/80 ',
      outline:
        'fill-highlighter-900 color-highlighter-900 group-active:fill-[#0a2b35]/70',
    },
    size: {
      thin: '',
      phat: '',
    },
    animation: {
      none: '',
      slice: '',
    },
  },
  defaultVariants: {
    intent: 'solid',
    animation: 'none',
  },
  compoundVariants: [
    {
      intent: 'solid',
      size: 'thin',
      animation: 'none',
      className: '[--fill-from:#ffffff] [--fill-to:#ffffffcc] ',
    },
    {
      intent: 'solid',
      size: 'thin',
      animation: 'slice',
      className:
        '[--fill-from:#ffffff] [--fill-to:#ffffff] tablet:[--fill-to:#0C3440] group-active:tablet:[--fill-to:#0a2b35b3]',
    },
    {
      intent: 'solid',
      size: 'phat',
      animation: 'slice',
      className:
        '[--fill-from:#0C3440] [--fill-to:#0C3440] tablet:[--fill-to:#48D0A8]',
    },
    {
      intent: 'solid',
      size: 'phat',
      animation: 'none',
      className: '[--fill-from:#0C3440] [--fill-to:#0C3440]',
    },
    {
      intent: 'outline',
      animation: 'none',
      className: 'fill-highlighter-900 tablet:group-active:fill-[#0a2b35]/70',
    },
  ],
});

interface ButtonIconProps extends VariantProps<typeof icon> {
  className?: string;
}

export function PlayIcon({
  className,
  intent,
  size,
  animation,
}: ButtonIconProps) {
  return (
    <svg
      width="19"
      height="22"
      viewBox="0 0 19 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={icon({ intent, size, animation, className })}
    >
      <path d="M16.6275 8.2775L3.75 0.8375C3.3819 0.619715 2.96269 0.50327 2.535 0.5C1.86268 0.5 1.21789 0.76708 0.742485 1.24248C0.26708 1.71789 0 2.36268 0 3.035V19.0025C8.55053e-05 19.4487 0.119686 19.8867 0.346367 20.2709C0.573047 20.6552 0.898531 20.9718 1.28898 21.1877C1.67942 21.4035 2.12057 21.5109 2.56656 21.4986C3.01255 21.4862 3.44709 21.3546 3.825 21.1175L16.7175 12.9725C17.1184 12.7216 17.4474 12.3712 17.6726 11.9553C17.8977 11.5394 18.0113 11.0723 18.0022 10.5995C17.9932 10.1267 17.8618 9.66428 17.6208 9.25735C17.3799 8.85042 17.0377 8.51283 16.6275 8.2775Z" />
    </svg>
  );
}

export function FilledStarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 576 512"
      // className={className}
      className="fill-yellow-500 group-active:fill-yellow-500/70"
    >
      {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
    </svg>
  );
}

export function HeartHandIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // height="1em"
      // width="19"
      width="20"
      height="22"
      viewBox="0 0 576 512"
      fill="currentColor"
      className={className}
    >
      {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
      <path d="M163.9 136.9c-29.4-29.8-29.4-78.2 0-108s77-29.8 106.4 0l17.7 18 17.7-18c29.4-29.8 77-29.8 106.4 0s29.4 78.2 0 108L310.5 240.1c-6.2 6.3-14.3 9.4-22.5 9.4s-16.3-3.1-22.5-9.4L163.9 136.9zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z" />
    </svg>
  );
}

export const PuzzleIcon = m(function PuzzleIcon({
  className,
  intent,
  size,
  animation = 'none',
}: ButtonIconProps) {
  return (
    <>
      <m.svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg"
        className={icon({ intent, size, animation, className })}
        variants={{
          initial: { fill: 'var(--fill-from)' },
          hover: { fill: 'var(--fill-to)' },
        }}
        transition={{ duration: 0.5, ease: 'linear' }}
      >
        <path d="M19.381 10.4762H17.8095V6.28571C17.8095 5.12811 16.8719 4.19046 15.7143 4.19046H11.5238V2.61903C11.5238 1.17332 10.3505 0 8.90475 0C7.45903 0 6.28571 1.17332 6.28571 2.61903V4.19046H2.09525C0.937652 4.19046 0.0105089 5.12806 0.0105089 6.28571L0.00525446 10.2667H1.57143C3.1324 10.2667 4.4 11.5343 4.4 13.0953C4.4 14.6562 3.1324 15.9238 1.57143 15.9238H0.00525446L0 19.9047C0 21.0624 0.937603 22 2.09525 22H6.07622V20.4286C6.07622 18.8676 7.34383 17.6 8.90479 17.6C10.4658 17.6 11.7334 18.8676 11.7334 20.4286V22H15.7143C16.8719 22 17.8095 21.0624 17.8095 19.9047V15.7143H19.381C20.8267 15.7143 22 14.541 22 13.0953C22 11.6495 20.8267 10.4762 19.381 10.4762Z" />
      </m.svg>
    </>
  );
});

export const PuzzleIcon2 = m(function PuzzleIcon2({
  className,
  intent,
  size,
  animation = 'none',
}: ButtonIconProps) {
  return (
    <m.svg
      className={icon({ intent, size, animation, className })}
      width="23"
      height="22"
      viewBox="0 0 23 22"
      xmlns="http://www.w3.org/2000/svg"
      variants={{
        initial: { fill: 'var(--fill-from)' },
        hover: { fill: 'var(--fill-to)' },
      }}
    >
      <g id="extension 1" clipPath="url(#clip0_238_1292)">
        <g id="Group">
          <g id="Group_2_1">
            <path
              id="Vector"
              d="M19.881 10.4762H18.3095V6.28571C18.3095 5.12811 17.3719 4.19046 16.2143 4.19046H12.0238V2.61903C12.0238 1.17332 10.8505 0 9.40474 0C7.95903 0 6.78571 1.17332 6.78571 2.61903V4.19046H2.59525C1.43765 4.19046 0.510509 5.12806 0.510509 6.28571L0.505254 10.2667H2.07143C3.6324 10.2667 4.9 11.5343 4.9 13.0953C4.9 14.6562 3.6324 15.9238 2.07143 15.9238H0.505254L0.5 19.9047C0.5 21.0624 1.4376 22 2.59525 22H6.57622V20.4286C6.57622 18.8676 7.84383 17.6 9.40479 17.6C10.9658 17.6 12.2334 18.8676 12.2334 20.4286V22H16.2143C17.3719 22 18.3095 21.0624 18.3095 19.9047V15.7143H19.881C21.3267 15.7143 22.5 14.541 22.5 13.0953C22.5 11.6495 21.3267 10.4762 19.881 10.4762Z"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_238_1292">
          <rect width="22" height="22" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </m.svg>
  );
});

export const PuzzleIconWithBg = m(function puzzleIconWithBg({
  intent,
  size,
  animation = 'none',
}: ButtonIconProps) {
  return (
    <m.div
      className={cx(
        'relative mr-2 flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[1.5rem] bg-white p-[0.5625rem] [--backgroundColor-from:#ffffff] [--backgroundColor-to:#ffffff]',
        animation !== 'none'
          ? 'tablet:[--backgroundColor-to:#0C3440] group-active:tablet:[--backgroundColor-to:#0a2b35b3]'
          : 'group-active:[--backgroundColor-to:#ffffffcc]'
      )}
      variants={{
        initial: { backgroundColor: 'var(--backgroundColor-from)' },
        hover: { backgroundColor: 'var(--backgroundColor-to)' },
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <m.span
        transition={{ type: 'spring', bounce: 0.6 }}
        className={cx(
          '[--rotate-from:0deg]',
          animation === 'none'
            ? 'tablet:[--rotate-to:0deg]'
            : 'tablet:[--rotate-to:-90deg]'
        )}
        variants={{
          initial: { rotate: 'var(--rotate-from)' },
          hover: { rotate: 'var(--rotate-to)' },
        }}
      >
        <PuzzleIcon2 animation={animation} intent={intent} size={size} />
      </m.span>
    </m.div>
  );
});

export const JoinIcon = m(function PuzzleIcon2({
  className,
  intent,
  size,
  animation = 'none',
}: ButtonIconProps) {
  return (
    <m.svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 640 512"
      fill="white"
    >
      {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
      <path d="M448 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V43c0 55.2 21.9 108.1 60.9 147.1l21 21c9 9 14.1 21.2 14.1 33.9v11c0 17.7 14.3 32 32 32s32-14.3 32-32V245c0-29.7-11.8-58.2-32.8-79.2l-21-21C463.2 117.8 448 81.2 448 43V32zM576 256c0 17.7 14.3 32 32 32s32-14.3 32-32V245c0-55.2-21.9-108.1-60.9-147.1l-21-21c-9-9-14.1-21.2-14.1-33.9V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V43c0 29.7 11.8 58.2 32.8 79.2l21 21c27 27 42.2 63.6 42.2 101.8v11zM229.8 360c-4.7-2.3-10-2.7-15.2-2c-37.8 5.6-75.2 14.3-106.9 22.8C81.3 388 58.3 395.1 42 400.4c-8.2 2.7-14.7 4.9-19.2 6.5c-2.3 .8-4 1.4-5.2 1.8l-1.3 .5C6.8 412.5 0 421.4 0 432s6.8 19.5 16.3 22.7l1.3 .5c1.2 .4 3 1.1 5.2 1.8c4.5 1.6 11 3.8 19.2 6.5c16.3 5.4 39.2 12.5 65.7 19.6C160.3 497.3 228.8 512 288 512h67.3c4.1 0 6.3-5.1 3.6-8.3L256.5 380.8c-7.4-8.9-16.5-15.9-26.7-20.8zM445 512h19 51.3c4.1 0 6.3-5.1 3.6-8.3L416.5 380.8C401.3 362.5 378.8 352 355 352H336 288c-1.1 0-2.3 0-3.4 0c-4.1 0-6.2 5.1-3.5 8.3L383.5 483.2C398.7 501.5 421.2 512 445 512zm-3.9-151.7L543.5 483.2c14.6 17.5 35.9 27.9 58.6 28.7c21.1-1.1 37.9-18.6 37.9-39.9V392c0-22.1-17.9-40-40-40H444.7c-4.1 0-6.3 5.1-3.6 8.3z" />
    </m.svg>
  );
});
