// src/app/components/icons/feature1.tsx

// TODO: Review the xlinks to see what they actually do and if your solution of removing them will be okay.

// TODO: fix error coming from `width="auto"`
export default function FeatureIcon1({ className }: { className?: string }) {
  return (
    // <svg
    //   width="264"
    //   // width="auto"
    //   // height="auto"
    //   height="222"
    //   viewBox="0 0 264 222"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    //   // xmlns:xlink="http://www.w3.org/1999/xlink"
    //   // xmlns="http://www.w3.org/1999/xlink"
    //   className={className}
    // >
    //   <rect
    //     x="21.7"
    //     y="25.9"
    //     width="219.8"
    //     height="174.3"
    //     rx="11.2"
    //     fill="#F9F9F9"
    //   />
    //   <rect
    //     x="21.7"
    //     y="25.9"
    //     width="219.8"
    //     height="174.3"
    //     rx="11.2"
    //     fill="url(#pattern0)"
    //     fillOpacity="0.32"
    //   />
    //   <rect
    //     x="21.7"
    //     y="25.9"
    //     width="219.8"
    //     height="174.3"
    //     rx="11.2"
    //     fill="url(#paint0_linear_127_4811)"
    //     fillOpacity="0.38"
    //   />
    //   <rect
    //     x="84.35"
    //     y="77.35"
    //     width="112.7"
    //     height="64.5585"
    //     rx="6.06887"
    //     fill="white"
    //     stroke="#A8AEB1"
    //     strokeWidth="0.7"
    //   />
    //   <rect
    //     x="89.6"
    //     y="81.8999"
    //     width="3.88621"
    //     height="3.88621"
    //     rx="1.9431"
    //     fill="#E0467E"
    //   />
    //   <rect
    //     x="95.7069"
    //     y="81.9"
    //     width="3.88621"
    //     height="3.88621"
    //     rx="1.9431"
    //     fill="#E6D540"
    //   />
    //   <rect
    //     x="101.814"
    //     y="81.9"
    //     width="3.88621"
    //     height="3.88621"
    //     rx="1.9431"
    //     fill="#AAE3C4"
    //   />
    //   <rect
    //     x="92.4"
    //     y="93.8"
    //     width="42"
    //     height="37.8"
    //     rx="5.6"
    //     fill="#69757B"
    //   />
    //   <rect
    //     x="141.4"
    //     y="98"
    //     width="16.8"
    //     height="4.2"
    //     rx="1.4"
    //     fill="#48D0A8"
    //   />
    //   <rect
    //     x="141.4"
    //     y="107.8"
    //     width="16.8"
    //     height="4.2"
    //     rx="1.4"
    //     fill="#A8AEB1"
    //   />
    //   <rect
    //     x="170.1"
    //     y="119"
    //     width="16.8"
    //     height="4.2"
    //     rx="1.4"
    //     fill="#A8AEB1"
    //   />
    //   <rect
    //     x="150.15"
    //     y="156.45"
    //     width="112.7"
    //     height="64.5585"
    //     rx="6.06887"
    //     fill="white"
    //     stroke="#A8AEB1"
    //     strokeWidth="0.7"
    //   />
    //   <rect
    //     x="155.4"
    //     y="161"
    //     width="3.88621"
    //     height="3.88621"
    //     rx="1.9431"
    //     fill="#E0467E"
    //   />
    //   <rect
    //     x="161.507"
    //     y="161"
    //     width="3.88621"
    //     height="3.88621"
    //     rx="1.9431"
    //     fill="#E6D540"
    //   />
    //   <rect
    //     x="167.614"
    //     y="161"
    //     width="3.88621"
    //     height="3.88621"
    //     rx="1.9431"
    //     fill="#AAE3C4"
    //   />
    //   <rect
    //     x="158.2"
    //     y="172.9"
    //     width="21.7"
    //     height="14.7"
    //     rx="1.4"
    //     fill="#DDE0E3"
    //   />
    //   <rect
    //     x="158.2"
    //     y="193.2"
    //     width="21.7"
    //     height="14.7"
    //     rx="1.4"
    //     fill="#DDE0E3"
    //   />
    //   <rect
    //     x="229.6"
    //     y="172.9"
    //     width="16.8"
    //     height="4.2"
    //     rx="1.4"
    //     fill="#48D0A8"
    //   />
    //   <rect
    //     x="189"
    //     y="172.9"
    //     width="16.8"
    //     height="4.2"
    //     rx="1.4"
    //     fill="#A8AEB1"
    //   />
    //   <rect
    //     x="217.7"
    //     y="198.1"
    //     width="16.8"
    //     height="4.2"
    //     rx="1.4"
    //     fill="#A8AEB1"
    //   />
    //   <rect
    //     x="0.35"
    //     y="0.35"
    //     width="112.7"
    //     height="64.5585"
    //     rx="6.06887"
    //     fill="white"
    //     stroke="#A8AEB1"
    //     strokeWidth="0.7"
    //   />
    //   <rect
    //     x="5.59998"
    //     y="4.89997"
    //     width="3.88621"
    //     height="3.88621"
    //     rx="1.9431"
    //     fill="#E0467E"
    //   />
    //   <rect
    //     x="11.7068"
    //     y="4.89998"
    //     width="3.88621"
    //     height="3.88621"
    //     rx="1.9431"
    //     fill="#E6D540"
    //   />
    //   <rect
    //     x="17.8137"
    //     y="4.89998"
    //     width="3.88621"
    //     height="3.88621"
    //     rx="1.9431"
    //     fill="#AAE3C4"
    //   />
    //   <rect
    //     x="25.8999"
    //     y="16.8"
    //     width="61.6"
    //     height="21.7"
    //     rx="5.6"
    //     fill="#DDE0E3"
    //   />
    //   <rect
    //     x="46.9"
    //     y="47.6"
    //     width="16.8"
    //     height="4.2"
    //     rx="1.4"
    //     fill="#48D0A8"
    //   />
    //   <rect
    //     x="12.6"
    //     y="47.6"
    //     width="16.8"
    //     height="4.2"
    //     rx="1.4"
    //     fill="#A8AEB1"
    //   />
    //   <rect
    //     x="81.2"
    //     y="54.6"
    //     width="16.8"
    //     height="4.2"
    //     rx="1.4"
    //     fill="#A8AEB1"
    //   />
    //   <defs>
    //     <pattern
    //       id="pattern0"
    //       patternContentUnits="objectBoundingBox"
    //       width="0.203822"
    //       height="0.257028"
    //     >
    //       <use
    //         // xlink:href="#image0_127_4811"
    //         href="#image0_127_4811"
    //         transform="scale(0.00159236 0.00200803)"
    //       />
    //     </pattern>
    //     <linearGradient
    //       id="paint0_linear_127_4811"
    //       x1="34.6499"
    //       y1="6.30001"
    //       x2="199.15"
    //       y2="179.9"
    //       gradientUnits="userSpaceOnUse"
    //     >
    //       <stop stopColor="#0021CD" />
    //       <stop offset="1" stopColor="#8CFFFF" />
    //     </linearGradient>
    //     <image
    //       id="image0_127_4811"
    //       width="128"
    //       height="128"
    //       // xlink:href="data:image/png;base64,
    //       href="data:image/png;base64,
    //       iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAABYlAAAWJQFJUiTwAAAA40lEQVR4Ae3YPRZBMRAG0AnPPtRKrcZSLJWaxgqwBCWFUPgrPBVN5t5qzsl0+U5yZiIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAfymR2Gq9rY+6G47Gs+nkEMkMgtQEIDkBSE4AkhOA5AQguebHwNVmu+s9rDF+1iX2fW3dYDRvdUTsonXvl/yLvsb4ApJr/gUotcz7zmqpy1djLMql7D/1tbwhtAq+swomJQFITgCSE4DkBCC59hdB39xGv0d5LqdjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/NwVr1weZe+7KDYAAAAASUVORK5CYII="
    //     />
    //   </defs>
    // </svg>

    <svg
      width="376"
      height="317"
      viewBox="0 0 376 317"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <rect x="31" y="37" width="314" height="249" rx="16" fill="#F9F9F9" />
      <rect
        x="31"
        y="37"
        width="314"
        height="249"
        rx="16"
        fill="url(#pattern0)"
        fill-opacity="0.53"
      />
      <rect
        x="31"
        y="37"
        width="314"
        height="249"
        rx="16"
        fill="url(#paint0_linear_531_1265)"
        fill-opacity="0.38"
      />
      <rect
        x="120.5"
        y="110.5"
        width="161"
        height="92.2264"
        rx="8.66981"
        fill="white"
        stroke="#A8AEB1"
      />
      <rect
        x="128"
        y="117"
        width="5.55172"
        height="5.55172"
        rx="2.77586"
        fill="#E0467E"
      />
      <rect
        x="136.724"
        y="117"
        width="5.55172"
        height="5.55172"
        rx="2.77586"
        fill="#E6D540"
      />
      <rect
        x="145.448"
        y="117"
        width="5.55172"
        height="5.55172"
        rx="2.77586"
        fill="#AAE3C4"
      />
      <rect x="132" y="134" width="60" height="54" rx="8" fill="#69757B" />
      <rect x="202" y="140" width="24" height="6" rx="2" fill="#48D0A8" />
      <rect x="202" y="154" width="24" height="6" rx="2" fill="#A8AEB1" />
      <rect x="243" y="170" width="24" height="6" rx="2" fill="#A8AEB1" />
      <rect
        x="214.5"
        y="223.5"
        width="161"
        height="92.2264"
        rx="8.66981"
        fill="white"
        stroke="#A8AEB1"
      />
      <rect
        x="222"
        y="230"
        width="5.55172"
        height="5.55172"
        rx="2.77586"
        fill="#E0467E"
      />
      <rect
        x="230.724"
        y="230"
        width="5.55172"
        height="5.55172"
        rx="2.77586"
        fill="#E6D540"
      />
      <rect
        x="239.448"
        y="230"
        width="5.55172"
        height="5.55172"
        rx="2.77586"
        fill="#AAE3C4"
      />
      <rect x="226" y="247" width="31" height="21" rx="2" fill="#DDE0E3" />
      <rect x="226" y="276" width="31" height="21" rx="2" fill="#DDE0E3" />
      <rect x="328" y="247" width="24" height="6" rx="2" fill="#48D0A8" />
      <rect x="270" y="247" width="24" height="6" rx="2" fill="#A8AEB1" />
      <rect x="311" y="283" width="24" height="6" rx="2" fill="#A8AEB1" />
      <rect
        x="0.5"
        y="0.5"
        width="161"
        height="92.2264"
        rx="8.66981"
        fill="white"
        stroke="#A8AEB1"
      />
      <rect
        x="8"
        y="6.99994"
        width="5.55172"
        height="5.55172"
        rx="2.77586"
        fill="#E0467E"
      />
      <rect
        x="16.7241"
        y="6.99997"
        width="5.55172"
        height="5.55172"
        rx="2.77586"
        fill="#E6D540"
      />
      <rect
        x="25.4482"
        y="6.99997"
        width="5.55172"
        height="5.55172"
        rx="2.77586"
        fill="#AAE3C4"
      />
      <rect x="37" y="24" width="88" height="31" rx="8" fill="#DDE0E3" />
      <rect x="67" y="68" width="24" height="6" rx="2" fill="#48D0A8" />
      <rect x="18" y="68" width="24" height="6" rx="2" fill="#A8AEB1" />
      <rect x="116" y="78" width="24" height="6" rx="2" fill="#A8AEB1" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="0.203822"
          height="0.257028"
        >
          <use
            // xlink:href="#image0_531_1265"
            href="#image0_531_1265"
            transform="scale(0.00159236 0.00200803)"
          />
        </pattern>
        <linearGradient
          id="paint0_linear_531_1265"
          x1="49.5"
          y1="9.00001"
          x2="284.5"
          y2="257"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0021CD" />
          <stop offset="1" stop-color="#8CFFFF" />
        </linearGradient>
        <image
          id="image0_531_1265"
          width="128"
          height="128"
          // xlink:href="data:image/png;base64,
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAABYlAAAWJQFJUiTwAAAA40lEQVR4Ae3YPRZBMRAG0AnPPtRKrcZSLJWaxgqwBCWFUPgrPBVN5t5qzsl0+U5yZiIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAfymR2Gq9rY+6G47Gs+nkEMkMgtQEIDkBSE4AkhOA5AQguebHwNVmu+s9rDF+1iX2fW3dYDRvdUTsonXvl/yLvsb4ApJr/gUotcz7zmqpy1djLMql7D/1tbwhtAq+swomJQFITgCSE4DkBCC59hdB39xGv0d5LqdjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/NwVr1weZe+7KDYAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
}
