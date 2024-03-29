// app/components/icons/elipse-blur-green.tsx

export default function ElipseBlurGreen() {
  return (
    <svg
      // width="317"
      width="auto"
      height="222"
      // viewBox="0 0 317 222"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style={{ mixBlendMode: 'color-dodge' }}
        filter="url(#filter0_f_127_4923)"
      >
        <ellipse cx="87" cy="204.5" rx="143" ry="117.5" fill="#03AF7D" />
      </g>
      <defs>
        <filter
          id="filter0_f_127_4923"
          x="-143"
          y="0"
          width="460"
          height="409"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="43.5"
            result="effect1_foregroundBlur_127_4923"
          />
        </filter>
      </defs>
    </svg>
  );
}
