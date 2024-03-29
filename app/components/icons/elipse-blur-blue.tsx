// app/components/icons/elipse-blur-green.tsx

export default function ElipseBlurBlue() {
  return (
    <svg
      width="287"
      height="232"
      viewBox="0 0 287 232"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style={{ mixBlendMode: 'color-dodge' }}
        filter="url(#filter0_f_127_4924)"
      >
        <ellipse cx="230" cy="27.5" rx="143" ry="117.5" fill="#8DBEDA" />
      </g>
      <defs>
        <filter
          id="filter0_f_127_4924"
          x="0"
          y="-177"
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
            result="effect1_foregroundBlur_127_4924"
          />
        </filter>
      </defs>
    </svg>
  );
}
