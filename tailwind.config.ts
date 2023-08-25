import type { Config } from 'tailwindcss';

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
      backdropBlur: {
        bg: '158px',
      },
      backgroundSize: {
        '300%': '300%',
      },
      boxShadow: {
        bg: '-117.23332977294922px 117.23332977294922px 117.23332977294922px 0px rgba(255, 255, 255, 0.10) inset, 117.23332977294922px -117.23332977294922px 117.23332977294922px 0px rgba(165, 165, 165, 0.10) inset',
      },
      colors: {
        'mongo-black': '#001E2B',
        'gradient-blue': '#f5fbff',
        'gradient-slate': '#dde3ee',
        'gradient-lavender': '#f2effb',
        'gradient-cyan': '#d4ece5',
        'gradient-gray': {
          1: '#5A5A5A',
          2: '#606060',
        },
        'highlighter-focus': {
          DEFAULT: '#53E7BB',
          50: '#edfcf6',
          100: '#d3f8e8',
          200: '#aaf0d5',
          300: '#53E7BB', // highlighter-focus
          400: '#48d0a8', // highlighter-focus-1
          500: '#17b28a',
          600: '#0b9070',
          700: '#09735c',
          800: '#0a5b4a',
          900: '#094b3f',
          950: '#042a24',
        },
        highlighter: {
          50: '#7AE0F0',
          100: '#68DBEE',
          200: '#43D3EA',
          300: '#1FCAE6',
          400: '#16ADC6',
          500: '#128DA1', // primary2
          600: '#0C616F',
          700: '#07353C',
          800: '#01080A',
          900: '#0C3440', // primary1
        },
        'cape-cod': {
          DEFAULT: '#434343',
          50: '#f5f5f5',
          100: '#ededed',
          200: '#d1d1d1',
          300: '#b3b3b3',
          400: '#7a7a7a',
          500: '#434343', // text-dark
          600: '#3b3535',
          700: '#302424',
          800: '#291818',
          900: '#1f0e0e',
          950: '#140606',
        },
        shark: {
          DEFAULT: '#1b2528',
          50: '#f0f4f5',
          100: '#e4eaeb',
          200: '#b9c7c9',
          300: '#92a5a8',
          400: '#516469',
          500: '#1b2528', // dark1
          600: '#152024',
          700: '#0f191f',
          800: '#0a141a',
          900: '#050c12',
          950: '#02080d',
        },
        bittersweet: {
          DEFAULT: '#ff6960',
          50: '#fff0f0',
          100: '#ffe2e0',
          200: '#ffc5c2',
          300: '#ffa39e',
          400: '#ff8680',
          500: '#ff6960',
          600: '#ff251a',
          700: '#d10a00',
          800: '#8f0700',
          900: '#470400',
          950: '#240200',
        },
        'cod-gray': {
          DEFAULT: '#121212',
          50: '#ebebeb',
          100: '#d9d9d9',
          200: '#b0b0b0',
          300: '#8a8a8a',
          400: '#616161',
          500: '#3b3b3b',
          600: '#121212',
          700: '#0d0d0d',
          800: '#0a0a0a',
          900: '#050505',
          950: '#030303',
        },
      },
      cursor: {
        'magnifying-glass': `url('/images/magnifyicon.svg'), auto`,
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        'open-sans': ['var(--font-open-sans)'],
        arimo: ['var(--font-arimo)'],
      },
      fontSize: {
        'fs-base': ['1rem', { lineHeight: '1.3rem', fontWeight: '600' }],
        'fs-sm': ['0.875rem', { lineHeight: '1.5rem' }],
        'fs-md': ['1.125rem', { lineHeight: 'normal', fontWeight: '400' }],
        'fs-md-bold': [
          '1.125rem',
          { lineHeight: '1.53125rem', fontWeight: '600' },
        ], // text-lg leading-6 font-semibold
        'fs-lg-sm': ['1rem', { lineHeight: '1.5', fontWeight: '400' }], // body18
        'fs-lg': ['1.125rem', { lineHeight: '1.5', fontWeight: '400' }], // body18
        'fs-x0': ['2.0625rem', { lineHeight: '1', fontWeight: '800' }],
        'fs-middle': ['2.75rem', { lineHeight: '1.1', fontWeight: '800' }],
        'fs-xxx': ['3.4375rem', { lineHeight: '1.1', fontWeight: '800' }],
        'fs-xx': ['3.4375rem', { lineHeight: '1.5', fontWeight: '800' }],
        'fs-xl': ['3.4375rem', { lineHeight: '1.2', fontWeight: '800' }], // INTRO

        subtitle: ['1.4375rem', { lineHeight: '1.3', fontWeight: '600' }],

        'h1-blog': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'p-blog': ['1.125rem', { lineHeight: '2rem', fontWeight: '400' }],
        'button-18': ['1.125rem', { lineHeight: 'normal', fontWeight: '600' }], //
      },
      maxWidth: {
        292: '73rem', // 1168px
      },
      minHeight: {
        146: '36.5rem', // 584px
        154: '38.5rem', // 616px
      },
      screens: {
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
        22: '5.5rem', // 88px
        30: '7.5rem', // 120px
        109: '27.25rem', // 436px
        146: '36.5rem', // 584px
        292: '73rem', // 1168px
      },
      transitionDuration: {
        '900': '900ms',
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
