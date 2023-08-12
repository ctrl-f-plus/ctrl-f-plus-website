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
    // TODO: Clean up font sizes
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
        'fs-middle': ['2.75rem', { lineHeight: '1.1', fontWeight: '800' }],
        'fs-xxx': ['3.4375rem', { lineHeight: '1.1', fontWeight: '800' }],
        'fs-xx': ['3.4375rem', { lineHeight: '1.5', fontWeight: '800' }],
        'fs-xl': ['3.4375rem', { lineHeight: '1.2', fontWeight: '800' }], // INTRO

        subtitle: ['1.4375rem', { lineHeight: '1.3', fontWeight: '600' }],

        'h1-blog': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'p-blog': ['1.125rem', { lineHeight: '2rem', fontWeight: '400' }],
        'button-18': ['1.125rem', { lineHeight: 'normal', fontWeight: '600' }], //
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
      maxWidth: {
        292: '73rem', // 1168px
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
      // TODO: Update colors throughout
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
        'turquoise-blue': {
          DEFAULT: '#53E7BB',
          50: '#F4FDFB',
          100: '#E2FBF4',
          200: '#BEF6E5',
          300: '#9BF1D7',
          400: '#77ECC9',
          500: '#53E7BB', // highlight-focus
          600: '#22E0A8',
          700: '#19B184',
          800: '#12805F',
          900: '#0B4F3B',
          950: '#083628',
        },
        shamrock: {
          DEFAULT: '#48D0A8',
          50: '#DAF6ED',
          100: '#CAF1E6',
          200: '#A9E9D6',
          300: '#89E1C7',
          400: '#68D8B7',
          500: '#48D0A8', // highlight-focus-1
          600: '#2EB28B',
          700: '#228668',
          800: '#175945',
          900: '#0B2C23',
          950: '#061611',
        },
        elephant: {
          DEFAULT: '#0C3440',
          50: '#2CB0D7',
          100: '#26A4C9',
          200: '#1F88A7',
          300: '#196C85',
          400: '#125062',
          500: '#0C3440', // primary1
          600: '#030E11',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000',
        },
        'blue-chill': {
          DEFAULT: '#128DA1',
          50: '#7AE0F0',
          100: '#68DBEE',
          200: '#43D3EA',
          300: '#1FCAE6',
          400: '#16ADC6',
          500: '#128DA1', // primary2
          600: '#0C616F',
          700: '#07353C',
          800: '#01080A',
          900: '#000000',
          950: '#000000',
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
          500: '#1b2528', // shark
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
      transitionDuration: {
        '900': '900ms',
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
