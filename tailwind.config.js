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
        // tablet: '430px',
        // laptop: '900px',
        tablet: '640px',
        laptop: '768px',
        desktop: '1024px',
        wide: '1280px',
        // tablet: '430px',
        // laptop: '900px',
        // laptop: '1024px',
        // desktop: '1280px',
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

      // colors: {
      //   base0: '#1B1527',
      //   base1: '#433154',
      //   accent0: '#FD9873',
      //   secondary0: '#B14360',
      //   secondary1: '#F4465B',

      //   base00: '#F7F1EC',
      //   base11: '#010100',
      //   accent00: '#F74A38',
      //   accent11: '#FFDED9',
      //   secondary00: '#00849B',
      //   secondary11: '#7F1234',
      //   accent0: '#FE2001',

      //   highlight: '#128da1',
      //   // highlightFocus: '#05fdb4',
      //   // highlightFocus: '#25FDAA',

      //   'highlight-focus': {
      //     DEFAULT: '#05fdb4',
      //     50: '#edfff9',
      //     100: '#d6fff3',
      //     200: '#afffe7',
      //     300: '#71ffd6',
      //     400: '#2dfbbe',
      //     500: '#05fdb4',
      //     600: '#00bf83',
      //     700: '#00956a',
      //     800: '#067555',
      //     900: '#085f47',
      //     950: '#003627',
      //   },

      //   glacier: {
      //     DEFAULT: '#128da1',
      //     50: '#edfefe',
      //     100: '#d2fafb',
      //     200: '#aaf3f7',
      //     300: '#70e8f0',
      //     400: '#2fd4e1',
      //     500: '#13b7c7',
      //     600: '#128da1',
      //     700: '#167588',
      //     800: '#1b606f',
      //     900: '#1b505e',
      //     950: '#0c3440',
      //   },
      //   amaranth: {
      //     DEFAULT: '#f4465b',
      //     50: '#fef6f7',
      //     100: '#feedef',
      //     200: '#fcd1d6',
      //     300: '#fbb5bd',
      //     400: '#f77e8c',
      //     500: '#f4465b',
      //     600: '#dc3f52',
      //     700: '#b73544',
      //     800: '#922a37',
      //     900: '#6e2029',
      //     950: '#3d1217',
      //   },
      //   linen: {
      //     50: '#fffefe',
      //     100: '#fffdfc',
      //     200: '#fffbf8',
      //     300: '#fff8f4',
      //     400: '#fff3eb',
      //     500: '#ffeee3',
      //     600: '#e6d6cc',
      //     700: '#bfb3aa',
      //     800: '#998f88',
      //     900: '#736b66',
      //     950: '#403c39',
      //   },
      //   peach: {
      //     DEFAULT: '#FBB984',
      //     50: '#fffcf9',
      //     100: '#fff8f3',
      //     200: '#feeee0',
      //     300: '#fde3ce',
      //     400: '#fccea9',
      //     500: '#fbb984',
      //     600: '#e2a777',
      //     700: '#bc8b63',
      //     800: '#976f4f',
      //     900: '#71533b',
      //     950: '#3f2e21',
      //   },
      //   scarlet: {
      //     50: '#fff4f2',
      //     100: '#ffe9e6',
      //     200: '#ffc7c0',
      //     300: '#ffa699',
      //     400: '#fe634d',
      //     500: '#fe2001',
      //     600: '#e51d01',
      //     700: '#bf1801',
      //     800: '#981301',
      //     900: '#720e00',
      //     950: '#400800',
      //   },
      // },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
