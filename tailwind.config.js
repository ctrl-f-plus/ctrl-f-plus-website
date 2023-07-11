const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      // sm: ['14px', { lineHeight: '24px', letterSpacing: '-0.03em' }],
      // 'fs-md': ['16px', { lineHeight: '20.8px', fontWeight: '600' }],
      // 'fs-sm': ['14px', { lineHeight: '24px' }],
      // 'fs-md2': ['18px', { lineHeight: '24.51px', fontWeight: '400' }],
      // 'fs-lg': ['18px', { lineHeight: '24.51px', fontWeight: '600' }],
      // 'fs-md4': ['18px', { lineHeight: '27px', fontWeight: '400' }],
      // 'fs-xl': ['55px', { lineHeight: '55px', fontWeight: '800' }],

      'fs-base': ['1rem', { lineHeight: '130%', fontWeight: '600' }],
      'fs-sm': ['0.875rem', { lineHeight: '1.5rem' }],
      'fs-md': ['1.125rem', { lineHeight: 'normal', fontWeight: '400' }],
      'fs-md-bold': [
        '1.125rem',
        { lineHeight: '1.53125rem', fontWeight: '600' },
      ],
      'fs-lg': ['1.125rem', { lineHeight: '1.5', fontWeight: '400' }], // body18
      'fs-x0': ['2.0625rem', { lineHeight: '100%', fontWeight: '800' }],
      'fs-xl': ['3.4375rem', { lineHeight: '100%', fontWeight: '800' }], // INTRO

      //
      subtitle: ['1.4375rem', { lineHeight: '1.3', fontWeight: '600' }],
    },

    //styleName: subtitle;
    // font-family: Inter; font-size: 23px; font-weight: 600; line-height: 30px; letter-spacing: 0em; text-align: center;

    extend: {
      screens: {
        // tablet: '640px',
        // laptop: '768px',
        // desktop: '1024px',
        // wide: '1280px',

        // tablet: '430px',
        // laptop: '900px',
        // laptop: '1024px',
        // desktop: '1280px',

        tablet: '430px',
        'tab-pro': '768px',
        laptop: '900px',
        desktop: '1024px',
        wide: '1280px',
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
      },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      colors: {
        // white: 'ffffff',
        // TODO: WHICH COLOR IS THE HIGHLIGHT COLOR - SEE BLOG HEADER CARD?
        'highlight-focus': '#53E7BB',
        'highlight-focus-1': '#48D0A8',
        dark1: '#1B2528',
        primary1: '#0C3440',
        'text-dark': '#434343',
        'gradient-color-1': '#f5fbff',
        'gradient-color-2': '#dde3ee',
        'gradient-color-3': '#f2effb',
        'gradient-color-4': '#d4ece5',
        // color1: '#1b505e',
        // color2: '#f4465b',
        // color3: '#53E7BB',
        // color4: '#e51d01',
        color1: '#dde3ee',
        color2: '#f5fbff',
        color3: '#d4ece5',
        color4: '#f2effb',
      },
      // animation: {
      //   'gradient-x': 'gradient-x .5s ease infinite',
      //   gradient: 'animatedgradient 6s ease infinite alternate',
      // },
      // keyframes: {
      // 'gradient-x': {
      //   '0%, 100%': {
      //     'background-size': '200% 200%',
      //     'background-position': 'right center',
      //   },
      //   '50%': {
      //     'background-size': '200% 200%',
      //     'background-position': 'left center',
      //   },
      // },
      // },

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
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
