/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        highlight: '#128da1',
        highlightFocus: '#05fdb4',

        // base0: '#FDFDFD',
        // base1: '#FFEEE3',
        // accent0: '#FE2001',
        // secondary0: '#0C462A',
        // secondary1: '#0E281C',

        base0: '#1B1527',
        base1: '#433154',
        accent0: '#FD9873',
        secondary0: '#B14360',
        secondary1: '#F4465B',

        base00: '#F7F1EC',
        base11: '#010100',
        accent00: '#F74A38',
        accent11: '#FFDED9',
        secondary00: '#00849B',
        secondary11: '#7F1234',
        accent0: '#FE2001',
        accent0: '#FE2001',

        // invert
        // base00: '#7F1234',
        // base11: '#010100',
        // accent00: '#F74A38',
        // accent11: '#FFDED9',
        // secondary00: '#F7F1EC',
        // secondary11: '#7F1234',
        // accent0: '#FE2001',
        greyy: {
          50: '#FCFDFD',
          100: '#FCFDFD',
          200: '#F7F8F8',
          300: '#F4F5F5',
          400: '#F2F3F3',
          500: '#EEEFEF',
          600: '#BDC1C1',
          700: '#8B9292',
          800: '#5C6161',
          900: '#2F3232',
          950: '#161818',
        },
        forest: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FCFDFC',
          400: '#FCFDFC',
          500: '#FCFDFC',
          600: '#BFD4BF',
          700: '#82AB82',
          800: '#527A52',
          900: '#293D29',
          950: '#141F14',
        },
        grapefruit: {
          50: '#FFE9E5',
          100: '#FFD3CC',
          200: '#FFA799',
          300: '#FF7A66',
          400: '#FF4E33',
          500: '#FE2100',
          600: '#CC1B00',
          700: '#991400',
          800: '#660E00',
          900: '#330700',
          950: '#190300',
        },
        leprocon: {
          50: '#DCF9EB',
          100: '#B5F2D5',
          200: '#6BE6AA',
          300: '#25DA83',
          400: '#199056',
          500: '#0C462A',
          600: '#0A3922',
          700: '#072C1A',
          800: '#041A10',
          900: '#020D08',
          950: '#010905',
        },
        orange: {
          50: '#FFFCFA',
          100: '#FFFCFA',
          200: '#FFF9F5',
          300: '#FEF7F0',
          400: '#FEF1E6',
          500: '#FEEFE3',
          600: '#FBB984',
          700: '#F7872B',
          800: '#BB5807',
          900: '#5E2C03',
          950: '#2C1502',
        },
        mint: {
          50: '#DEF2E9',
          100: '#BCE6D4',
          200: '#79CDA9',
          300: '#40AB7C',
          400: '#286C4E',
          500: '#0F281D',
          600: '#0D2118',
          700: '#081610',
          800: '#060F0B',
          900: '#030705',
          950: '#010403',
        },
      },
    },
  },
  plugins: [],
};
