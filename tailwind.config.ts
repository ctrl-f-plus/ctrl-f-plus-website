import type { Config } from 'tailwindcss';
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'fs-base': ['1rem', { lineHeight: '130%', fontWeight: '600' }],
        'fs-sm': ['0.875rem', { lineHeight: '1.5rem' }],
        'fs-md': ['1.125rem', { lineHeight: 'normal', fontWeight: '400' }],
        'fs-md-bold': [
          '1.125rem',
          { lineHeight: '1.53125rem', fontWeight: '600' },
        ],
        'fs-lg-sm': ['1rem', { lineHeight: '1.5', fontWeight: '400' }], // body18
        'fs-lg': ['1.125rem', { lineHeight: '1.5', fontWeight: '400' }], // body18
        'fs-x0': ['2.0625rem', { lineHeight: '1', fontWeight: '800' }],
        'fs-xxx': ['3.4375rem', { lineHeight: '1.1', fontWeight: '800' }],
        'fs-xx': ['3.4375rem', { lineHeight: '1.5', fontWeight: '800' }],
        'fs-xl': ['3.4375rem', { lineHeight: '1.2', fontWeight: '800' }], // INTRO

        subtitle: ['1.4375rem', { lineHeight: '1.3', fontWeight: '600' }],

        'h1-blog': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'p-blog': ['1.125rem', { lineHeight: '2rem', fontWeight: '400' }],
        'button-18': ['1.125rem', { lineHeight: 'normal', fontWeight: '600' }], //
      },

      screens: {
        // iphone: '403px',
        'mobile-sm': '320px',
        'mobile-md': '400px',
        'mobile-lg': '425px',
        tablet: '480px',
        'tab-pro': '768px',
        laptop: '900px',
        desktop: '1024px',
        wide: '1280px',
        '2xl': '1536px',
      },

      spacing: {
        6.5: '1.625rem', // 26px
        18: '4.5rem', // 72px
        21: '5.25rem', // 84px
        22: '5.5rem', // 88px
        23: '5.75rem', // 92px
        25: '6.25rem', // 100px
        26: '6.5rem', // 104px
        30: '7.5rem', // 120px
        109: '27.25rem', // 436px
        146: '36.5rem', // 584px
        147: '36.75rem', // 588px
        292: '73rem', // 1168px
      },
      maxWidth: {
        94: '23.5rem', // 376px
        174: '43.5rem', // 696px
        276: '69rem', // 1104px
        292: '73rem', // 1168px
        324: '81rem', // 1296px
      },
      minWidth: {
        94: '23.5rem', // 376px
        174: '43.5rem', // 696px
        276: '69rem', // 1104px
        292: '73rem', // 1168px
        324: '81rem', // 1296px
      },
      minHeight: {
        146: '36.5rem', // 584px
        154: '38.5rem', // 616px
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        'open-sans': ['var(--font-open-sans)'],
        arimo: ['var(--font-arimo)'],
      },
      colors: {
        'highlight-focus': '#53E7BB',
        'highlight-focus-1': '#48D0A8',
        dark1: '#1B2528',
        primary1: '#0C3440',
        primary2: '#128DA1',
        'text-dark': '#434343',
        'mongo-black': '#001E2B',
        'gradient-blue': '#f5fbff',
        'gradient-slate': '#dde3ee',
        'gradient-lavender': '#f2effb',
        'gradient-cyan': '#d4ece5',
        'gradient-gray-1': '#5A5A5A',
        'gradient-gray-2': '#606060',
      },

      animation: {
        gradient: 'animatedgradient 6s ease infinite alternate',
        'gradient-x': 'gradient-x 10s ease infinite',
      },
      keyframes: {
        animatedgradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      cursor: {
        'magnifying-glass': `url('/images/magnifyicon.svg'), auto`,
      },
      boxShadow: {
        bg: '-117.23332977294922px 117.23332977294922px 117.23332977294922px 0px rgba(255, 255, 255, 0.10) inset, 117.23332977294922px -117.23332977294922px 117.23332977294922px 0px rgba(165, 165, 165, 0.10) inset',
      },
      backdropBlur: {
        bg: '158px',
      },
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('prettier-plugin-tailwindcss'),
    ...(process.env.NODE_ENV === 'development'
      ? [require('tailwindcss-debug-screens')]
      : []),
  ],
} satisfies Config;
