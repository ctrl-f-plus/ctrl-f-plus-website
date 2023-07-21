// app/components/icons/hero-animation.tsx\
'use client';

import Image from 'next/image';
import gifHero from '@/public/images/gif-hero.gif';
import { useReducedMotion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export default function HeroAnimation({ className }: any) {
  const prefersReducedMotion = useReducedMotion();

  const classNames = twMerge(
    className,
    prefersReducedMotion ? '-mt-9' : '-mt-18'
  );

  return (
    <>
      <div className={classNames}>
        {prefersReducedMotion ? (
          <StaticHeroAnimation />
        ) : (
          <Image
            unoptimized={true}
            src={gifHero}
            alt={''}
            priority
            // className="flex flex-auto"
          />
        )}
      </div>
    </>
  );
}

function StaticHeroAnimation() {
  return (
    <svg
      // viewBox="0 0 410 338"
      width="auto"
      height="338"
      viewBox="0 0 460 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_ddddii_130_5338)">
        <rect x="48" y="48" width="353" height="54" rx="12" fill="#222D31" />
      </g>
      <g clipPath="url(#clip0_130_5338)">
        <path
          d="M103.716 88.3679L95.9702 80.7461C97.9985 78.5424 99.2448 75.628 99.2448 72.421C99.2438 65.5606 93.5931 60 86.6221 60C79.6511 60 74.0004 65.5606 74.0004 72.421C74.0004 79.2814 79.6511 84.842 86.6221 84.842C89.6341 84.842 92.3966 83.8002 94.5665 82.0683L102.342 89.7201C102.721 90.0933 103.336 90.0933 103.715 89.7201C104.095 89.3469 104.095 88.7411 103.716 88.3679ZM86.6221 82.931C80.7239 82.931 75.9424 78.2255 75.9424 72.421C75.9424 66.6165 80.7239 61.911 86.6221 61.911C92.5204 61.911 97.3018 66.6165 97.3018 72.421C97.3018 78.2255 92.5204 82.931 86.6221 82.931Z"
          fill="white"
        />
      </g>
      <path
        d="M127.704 81H126.201V69.4688H122.158V68.1504H131.729V69.4688H127.704V81ZM131.932 71.3672H133.496L135.623 76.957C135.746 77.2852 135.86 77.6016 135.966 77.9062C136.071 78.2051 136.165 78.4922 136.247 78.7676C136.329 79.043 136.394 79.3096 136.44 79.5674H136.502C136.584 79.2744 136.701 78.8906 136.854 78.416C137.006 77.9355 137.17 77.4463 137.346 76.9482L139.358 71.3672H140.932L136.739 82.415C136.517 83.0068 136.256 83.5225 135.957 83.9619C135.664 84.4014 135.307 84.7383 134.885 84.9727C134.463 85.2129 133.953 85.333 133.355 85.333C133.08 85.333 132.837 85.3154 132.626 85.2803C132.415 85.251 132.233 85.2158 132.081 85.1748V84.0059C132.21 84.0352 132.365 84.0615 132.547 84.085C132.734 84.1084 132.928 84.1201 133.127 84.1201C133.49 84.1201 133.804 84.0498 134.067 83.9092C134.337 83.7744 134.568 83.5752 134.762 83.3115C134.955 83.0479 135.122 82.7344 135.263 82.3711L135.79 81.0176L131.932 71.3672ZM146.996 71.1914C148.197 71.1914 149.155 71.6045 149.87 72.4307C150.585 73.2568 150.942 74.499 150.942 76.1572C150.942 77.2529 150.778 78.1729 150.45 78.917C150.122 79.6611 149.659 80.2236 149.062 80.6045C148.47 80.9854 147.77 81.1758 146.961 81.1758C146.451 81.1758 146.003 81.1084 145.616 80.9736C145.229 80.8389 144.898 80.6572 144.623 80.4287C144.348 80.2002 144.119 79.9512 143.938 79.6816H143.832C143.85 79.9102 143.87 80.1855 143.894 80.5078C143.923 80.8301 143.938 81.1113 143.938 81.3516V85.3066H142.47V71.3672H143.674L143.867 72.791H143.938C144.125 72.498 144.354 72.2314 144.623 71.9912C144.893 71.7451 145.221 71.5518 145.607 71.4111C146 71.2646 146.463 71.1914 146.996 71.1914ZM146.741 72.4219C146.073 72.4219 145.534 72.5508 145.124 72.8086C144.72 73.0664 144.424 73.4531 144.236 73.9688C144.049 74.4785 143.949 75.1201 143.938 75.8936V76.1748C143.938 76.9893 144.025 77.6777 144.201 78.2402C144.383 78.8027 144.679 79.2305 145.089 79.5234C145.505 79.8164 146.062 79.9629 146.759 79.9629C147.356 79.9629 147.854 79.8018 148.253 79.4795C148.651 79.1572 148.947 78.709 149.141 78.1348C149.34 77.5547 149.439 76.8896 149.439 76.1396C149.439 75.0029 149.217 74.1006 148.771 73.4326C148.332 72.7588 147.655 72.4219 146.741 72.4219ZM154.95 71.3672V81H153.491V71.3672H154.95ZM154.238 67.7637C154.479 67.7637 154.684 67.8428 154.854 68.001C155.029 68.1533 155.117 68.3936 155.117 68.7217C155.117 69.0439 155.029 69.2842 154.854 69.4424C154.684 69.6006 154.479 69.6797 154.238 69.6797C153.986 69.6797 153.775 69.6006 153.605 69.4424C153.441 69.2842 153.359 69.0439 153.359 68.7217C153.359 68.3936 153.441 68.1533 153.605 68.001C153.775 67.8428 153.986 67.7637 154.238 67.7637ZM162.605 71.1914C163.748 71.1914 164.612 71.4727 165.198 72.0352C165.784 72.5918 166.077 73.4883 166.077 74.7246V81H164.636V74.8213C164.636 74.0186 164.451 73.418 164.082 73.0195C163.719 72.6211 163.159 72.4219 162.403 72.4219C161.337 72.4219 160.587 72.7236 160.153 73.3271C159.72 73.9307 159.503 74.8066 159.503 75.9551V81H158.044V71.3672H159.222L159.441 72.7559H159.521C159.726 72.416 159.986 72.1318 160.303 71.9033C160.619 71.6689 160.974 71.4932 161.366 71.376C161.759 71.2529 162.172 71.1914 162.605 71.1914ZM171.772 85.3242C170.507 85.3242 169.531 85.0869 168.846 84.6123C168.16 84.1436 167.817 83.4844 167.817 82.6348C167.817 82.0312 168.008 81.5156 168.389 81.0879C168.775 80.6602 169.309 80.376 169.988 80.2354C169.736 80.1182 169.52 79.9424 169.338 79.708C169.162 79.4736 169.074 79.2041 169.074 78.8994C169.074 78.5479 169.171 78.2402 169.364 77.9766C169.563 77.707 169.865 77.4492 170.27 77.2031C169.766 76.998 169.355 76.6523 169.039 76.166C168.729 75.6738 168.573 75.1025 168.573 74.4521C168.573 73.7607 168.717 73.1719 169.004 72.6855C169.291 72.1934 169.707 71.8184 170.252 71.5605C170.797 71.3027 171.456 71.1738 172.229 71.1738C172.399 71.1738 172.569 71.1826 172.739 71.2002C172.915 71.2119 173.082 71.2324 173.24 71.2617C173.398 71.2852 173.536 71.3145 173.653 71.3496H176.958V72.29L175.183 72.5098C175.358 72.7383 175.505 73.0137 175.622 73.3359C175.739 73.6582 175.798 74.0156 175.798 74.4082C175.798 75.3691 175.473 76.1338 174.822 76.7021C174.172 77.2646 173.278 77.5459 172.142 77.5459C171.872 77.5459 171.597 77.5225 171.315 77.4756C171.028 77.6338 170.809 77.8096 170.656 78.0029C170.51 78.1963 170.437 78.4189 170.437 78.6709C170.437 78.8584 170.492 79.0078 170.604 79.1191C170.721 79.2305 170.888 79.3125 171.104 79.3652C171.321 79.4121 171.582 79.4355 171.887 79.4355H173.583C174.632 79.4355 175.435 79.6553 175.991 80.0947C176.554 80.5342 176.835 81.1758 176.835 82.0195C176.835 83.0859 176.401 83.9033 175.534 84.4717C174.667 85.04 173.413 85.3242 171.772 85.3242ZM171.816 84.1816C172.613 84.1816 173.272 84.0996 173.794 83.9355C174.321 83.7773 174.714 83.5459 174.972 83.2412C175.235 82.9424 175.367 82.585 175.367 82.1689C175.367 81.7822 175.279 81.4893 175.104 81.29C174.928 81.0967 174.67 80.9678 174.33 80.9033C173.99 80.833 173.574 80.7979 173.082 80.7979H171.412C170.979 80.7979 170.601 80.8652 170.278 81C169.956 81.1348 169.707 81.334 169.531 81.5977C169.361 81.8613 169.276 82.1895 169.276 82.582C169.276 83.1035 169.496 83.499 169.936 83.7686C170.375 84.0439 171.002 84.1816 171.816 84.1816ZM172.194 76.4824C172.892 76.4824 173.416 76.3066 173.768 75.9551C174.119 75.6035 174.295 75.0908 174.295 74.417C174.295 73.6963 174.116 73.1572 173.759 72.7998C173.401 72.4365 172.874 72.2549 172.177 72.2549C171.509 72.2549 170.993 72.4424 170.63 72.8174C170.272 73.1865 170.094 73.7285 170.094 74.4434C170.094 75.0996 170.275 75.6035 170.639 75.9551C171.002 76.3066 171.521 76.4824 172.194 76.4824Z"
        fill="white"
      />
      <path
        d="M375 66L383.5 74.5L375 83"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M343.5 83L335 74.5L343.5 66"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g clipPath="url(#clip1_130_5338)">
        <g filter="url(#filter1_bii_130_5338)">
          <rect
            x="51"
            y="151"
            width="347"
            height="179"
            rx="24"
            fill="#D9D9D9"
            fillOpacity="0.111"
          />
          <rect
            x="53"
            y="153"
            width="343"
            height="175"
            rx="22"
            stroke="white"
            strokeWidth="4"
          />
        </g>
        <path
          d="M51 175C51 161.745 61.7452 151 75 151H138V163C138 176.255 127.255 187 114 187H51V175Z"
          fill="white"
        />
        <circle cx="76.5" cy="169" r="5" fill="#F83A5C" />
        <circle cx="94.5" cy="169" r="5" fill="#FFF737" />
        <circle cx="112.5" cy="169" r="5" fill="#84DD97" />
        <g clipPath="url(#clip2_130_5338)">
          <path
            d="M130.498 212.472H121.018V289.528H130.498C147.343 289.528 161 272.278 161 251C161 229.722 147.343 212.472 130.498 212.472Z"
            fill="url(#paint0_linear_130_5338)"
          />
          <path
            d="M130.498 212.472H121.018V289.528H130.498C147.343 289.528 161 272.278 161 251C161 229.722 147.343 212.472 130.498 212.472Z"
            fill="url(#paint1_linear_130_5338)"
          />
          <path
            d="M121.018 289.528H130.498C147.343 289.528 161 272.278 161 251C161 249.116 160.891 247.264 160.684 245.453H121.018V289.528Z"
            fill="url(#paint2_linear_130_5338)"
          />
          <path
            d="M121.018 289.528C137.864 289.528 151.519 272.278 151.519 251C151.519 229.722 137.864 212.472 121.018 212.472C104.173 212.472 90.5168 229.722 90.5168 251C90.5168 272.278 104.173 289.528 121.018 289.528Z"
            fill="url(#paint3_linear_130_5338)"
          />
          <path
            d="M121.343 249.404H90.5448C90.5278 249.934 90.5168 250.465 90.5168 251C90.5168 272.278 104.173 289.528 121.018 289.528C131.138 289.528 140.106 283.3 145.654 273.716L121.343 249.404Z"
            fill="url(#paint4_linear_130_5338)"
          />
          <path
            d="M90.5168 251C90.5168 272.278 104.173 289.528 121.018 289.528C137.864 289.528 151.519 272.278 151.519 251C151.519 250.229 151.499 249.465 151.464 248.705H90.5722C90.5368 249.465 90.5168 250.229 90.5168 251Z"
            fill="url(#paint5_linear_130_5338)"
          />
          <path
            d="M114.447 248.705H90.5722C90.537 249.465 90.517 250.229 90.517 251C90.517 269.428 100.761 284.832 114.447 288.628V248.705Z"
            fill="url(#paint6_linear_130_5338)"
          />
          <path
            d="M121.018 212.472C119.305 212.472 117.627 212.653 115.991 212.996V289.004C117.627 289.347 119.306 289.528 121.018 289.528C137.864 289.528 151.519 272.278 151.519 251C151.519 229.722 137.864 212.472 121.018 212.472Z"
            fill="url(#paint7_linear_130_5338)"
          />
          <path
            d="M121.018 219.349C107.18 219.349 95.9617 233.521 95.9617 251C95.9617 268.479 107.18 282.651 121.018 282.651C134.856 282.651 146.075 268.479 146.075 251C146.075 233.521 134.856 219.349 121.018 219.349ZM121.018 276.322C109.947 276.322 100.972 264.984 100.972 251C100.972 237.016 109.947 225.678 121.018 225.678C132.089 225.678 141.064 237.016 141.064 251C141.064 264.984 132.089 276.322 121.018 276.322Z"
            fill="url(#paint8_linear_130_5338)"
          />
          <path
            d="M121.018 232.545C112.949 232.545 106.409 240.807 106.409 251C106.409 261.193 112.949 269.455 121.018 269.455C129.088 269.455 135.628 261.193 135.628 251C135.628 240.807 129.088 232.545 121.018 232.545ZM121.018 262.058C116.183 262.058 112.263 257.107 112.263 251C112.263 244.893 116.182 239.942 121.018 239.942C125.854 239.942 129.773 244.893 129.773 251C129.773 257.107 125.854 262.058 121.018 262.058Z"
            fill="url(#paint9_linear_130_5338)"
          />
          <path
            d="M128.56 256.621C127.036 259.876 124.229 262.058 121.018 262.058C116.183 262.058 112.264 257.106 112.264 251C112.264 250.457 112.295 249.924 112.354 249.404H106.464C106.426 249.93 106.408 250.462 106.408 251C106.408 261.193 112.949 269.455 121.018 269.455C126.091 269.455 130.558 266.192 133.175 261.236L128.56 256.621Z"
            fill="url(#paint10_linear_130_5338)"
          />
          <path
            d="M137.447 265.51C133.823 272.048 127.815 276.321 121.018 276.321C109.947 276.321 100.973 264.983 100.973 251C100.973 250.463 100.986 249.932 101.012 249.404H95.9935C95.9722 249.932 95.9623 250.465 95.9623 251C95.9623 268.479 107.181 282.651 121.018 282.651C129.408 282.651 136.834 277.442 141.383 269.446L137.447 265.51Z"
            fill="url(#paint11_linear_130_5338)"
          />
          <path
            d="M107.116 251H86.1033L77.2784 238.425C76.5713 237.417 77.2932 236.029 78.5236 236.029H79.4358C80.3267 236.029 81.1618 236.462 81.672 237.192L83.7015 240.083L82.909 237.304C82.7269 236.666 83.206 236.029 83.8704 236.029H87.4982C87.6721 236.029 87.8396 236.095 87.9676 236.212L88.4904 236.693C88.7162 236.901 89.0515 236.936 89.315 236.778C89.5258 236.653 89.7874 236.648 90.0028 236.765L90.8213 237.213C91.1428 237.388 91.5422 237.326 91.7948 237.061C92.4727 236.348 93.4873 236.07 94.4361 236.329C96.3205 236.842 97.9933 237.998 99.1414 239.635L107.116 251Z"
            fill="url(#paint12_linear_130_5338)"
          />
          <path
            d="M86.1033 251H107.116L100.878 242.111H79.8652L86.1033 251Z"
            fill="url(#paint13_linear_130_5338)"
          />
          <path
            d="M99.1413 239.635C97.9931 237.998 96.3205 236.842 94.436 236.329C93.4873 236.071 92.4727 236.348 91.7948 237.061C91.5421 237.326 91.1428 237.388 90.8212 237.213L90.0027 236.766C89.7873 236.648 89.5258 236.653 89.315 236.778C89.0515 236.935 88.7162 236.901 88.4904 236.693L87.9675 236.212C87.8396 236.095 87.6721 236.029 87.4982 236.029H83.8704C83.206 236.029 82.7269 236.666 82.909 237.304L83.6852 240.026L91.3858 251H107.116L99.1413 239.635Z"
            fill="url(#paint14_linear_130_5338)"
          />
          <path
            d="M99.1414 239.635C97.9931 237.998 96.3205 236.842 94.4361 236.329C93.4873 236.071 92.4727 236.348 91.7948 237.061C91.5422 237.326 91.1428 237.388 90.8213 237.213L90.0028 236.766C89.7874 236.648 89.5258 236.653 89.315 236.778C89.0515 236.935 88.7162 236.901 88.4904 236.693L87.9676 236.212C87.8396 236.095 87.6721 236.029 87.4982 236.029H83.8704C83.6301 236.029 83.4147 236.113 83.2454 236.25C83.3896 236.265 83.5336 236.29 83.6762 236.329C85.5606 236.842 87.2334 237.998 88.3815 239.635L96.3566 251H107.116L99.1414 239.635Z"
            fill="url(#paint15_linear_130_5338)"
          />
          <path
            d="M99.1414 239.635C97.9931 237.998 96.3205 236.842 94.436 236.329C93.4873 236.071 92.4727 236.348 91.7948 237.061C91.5421 237.326 91.1428 237.389 90.8213 237.213L90.0027 236.766C89.7873 236.648 89.5258 236.653 89.315 236.778C89.1391 236.883 88.9317 236.901 88.7459 236.84C90.058 237.459 91.2081 238.413 92.0655 239.635L100.041 251H107.116L99.1414 239.635Z"
            fill="url(#paint16_linear_130_5338)"
          />
          <path
            d="M99.1414 239.635C97.9931 237.998 96.3205 236.842 94.436 236.329C93.4873 236.071 92.4727 236.348 91.7948 237.061C91.5421 237.326 91.1428 237.389 90.8213 237.213L90.0027 236.766C89.7873 236.648 89.5258 236.653 89.315 236.778C89.1391 236.883 88.9317 236.901 88.7459 236.84C90.058 237.459 91.2081 238.413 92.0655 239.635L100.041 251H107.116L99.1414 239.635Z"
            fill="url(#paint17_linear_130_5338)"
          />
          <path
            d="M107.116 251H86.1033L77.2784 263.575C76.5713 264.583 77.2932 265.971 78.5236 265.971H79.4358C80.3267 265.971 81.1617 265.538 81.672 264.807L83.7014 261.917L82.909 264.696C82.7269 265.334 83.206 265.971 83.8704 265.971H87.4982C87.6721 265.971 87.8396 265.905 87.9676 265.788L88.4904 265.307C88.7162 265.099 89.0515 265.064 89.315 265.222C89.5258 265.347 89.7873 265.352 90.0027 265.234L90.8213 264.787C91.1428 264.612 91.5421 264.674 91.7948 264.939C92.4727 265.652 93.4873 265.929 94.436 265.671C96.3205 265.158 97.9932 264.002 99.1414 262.365L107.116 251Z"
            fill="url(#paint18_linear_130_5338)"
          />
          <path
            d="M81.1791 258.017L77.2784 263.575C76.5713 264.583 77.2931 265.971 78.5236 265.971H79.4358C80.3267 265.971 81.1617 265.537 81.672 264.807L83.7014 261.917L82.909 264.696C82.7269 265.334 83.206 265.971 83.8704 265.971H87.4982C87.6721 265.971 87.8396 265.905 87.9675 265.788L88.4904 265.307C88.7162 265.099 89.0515 265.064 89.315 265.222C89.5258 265.347 89.7873 265.352 90.0027 265.234L90.8212 264.787C91.1428 264.612 91.5421 264.674 91.7948 264.939C92.4727 265.652 93.4873 265.929 94.436 265.671C96.3205 265.158 97.9932 264.002 99.1413 262.365L102.192 258.017H81.1791V258.017Z"
            fill="url(#paint19_linear_130_5338)"
          />
          <path
            d="M99.1413 262.365C97.9931 264.002 96.3204 265.158 94.436 265.671C93.4872 265.929 92.4727 265.652 91.7948 264.939C91.5421 264.674 91.1428 264.611 90.8212 264.787L90.0027 265.234C89.7873 265.352 89.5258 265.347 89.315 265.222C89.0515 265.065 88.7161 265.099 88.4904 265.307L87.9675 265.788C87.8396 265.905 87.6721 265.971 87.4981 265.971H83.8704C83.2059 265.971 82.7269 265.334 82.909 264.696L83.6852 261.974L91.3858 251H107.116L99.1413 262.365Z"
            fill="url(#paint20_linear_130_5338)"
          />
          <path
            d="M99.1414 262.365C97.9931 264.002 96.3205 265.158 94.436 265.671C93.4873 265.929 92.4727 265.652 91.7948 264.939C91.5422 264.674 91.1428 264.611 90.8213 264.787L90.0028 265.234C89.7873 265.352 89.5258 265.347 89.315 265.222C89.0515 265.065 88.7162 265.099 88.4904 265.307L87.9676 265.788C87.8396 265.905 87.6721 265.971 87.4982 265.971H83.8704C83.6301 265.971 83.4147 265.886 83.2453 265.75C83.3896 265.735 83.5336 265.71 83.6762 265.671C85.5606 265.158 87.2334 264.002 88.3815 262.365L96.3566 251H107.116L99.1414 262.365Z"
            fill="url(#paint21_linear_130_5338)"
          />
          <path
            d="M99.1413 262.365C97.9931 264.002 96.3205 265.158 94.436 265.671C93.4873 265.929 92.4727 265.652 91.7948 264.939C91.5421 264.674 91.1428 264.611 90.8212 264.787L90.0027 265.234C89.7873 265.352 89.5258 265.347 89.315 265.222C89.1391 265.117 88.9317 265.099 88.7458 265.16C90.058 264.541 91.2081 263.587 92.0655 262.365L100.041 251H107.116L99.1413 262.365Z"
            fill="url(#paint22_linear_130_5338)"
          />
          <path
            d="M99.1413 262.365C97.9931 264.002 96.3205 265.158 94.436 265.671C93.4873 265.929 92.4727 265.652 91.7948 264.939C91.5421 264.674 91.1428 264.611 90.8212 264.787L90.0027 265.234C89.7873 265.352 89.5258 265.347 89.315 265.222C89.1391 265.117 88.9317 265.099 88.7458 265.16C90.058 264.541 91.2081 263.587 92.0655 262.365L100.041 251H107.116L99.1413 262.365Z"
            fill="url(#paint23_linear_130_5338)"
          />
          <path
            d="M121.977 251V251.024C121.976 252.278 120.958 253.295 119.703 253.295H79.2952C78.0277 253.295 77 252.268 77 251C77 249.732 78.0277 248.705 79.2952 248.705H119.703C120.958 248.705 121.976 249.721 121.977 250.976L121.977 251Z"
            fill="url(#paint24_linear_130_5338)"
          />
        </g>
        <rect x="215" y="206" width="1" height="17" rx="0.5" fill="#0C3440" />
        <rect x="346" y="206" width="1" height="17" rx="0.5" fill="#0C3440" />
        <rect x="245" y="228" width="1" height="17" rx="0.5" fill="#0C3440" />
        <rect x="313" y="249" width="1" height="17" rx="0.5" fill="#0C3440" />
        <rect x="253" y="270" width="1" height="17" rx="0.5" fill="#0C3440" />
        <rect
          x="146.5"
          y="161.5"
          width="64"
          height="20"
          rx="10"
          fill="white"
          stroke="#0C3440"
        />
        <rect x="217" y="161" width="65" height="21" rx="10.5" fill="white" />
        <rect x="288" y="161" width="65" height="21" rx="10.5" fill="white" />
      </g>
      <rect
        x="51.5"
        y="151.5"
        width="346"
        height="178"
        rx="23.5"
        stroke="#F9F9F9"
      />
      <defs>
        <filter
          id="filter0_ddddii_130_5338"
          x="0"
          y="0"
          width="457"
          height="158"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="16" dy="16" />
          <feGaussianBlur stdDeviation="20" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.792157 0 0 0 0 0.792157 0 0 0 0 0.792157 0 0 0 0.9 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_130_5338"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-16" dy="-16" />
          <feGaussianBlur stdDeviation="16" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.909804 0 0 0 0 0.909804 0 0 0 0 0.909804 0 0 0 0.9 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_130_5338"
            result="effect2_dropShadow_130_5338"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="16" dy="-16" />
          <feGaussianBlur stdDeviation="16" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.792157 0 0 0 0 0.792157 0 0 0 0 0.792157 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_130_5338"
            result="effect3_dropShadow_130_5338"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-16" dy="16" />
          <feGaussianBlur stdDeviation="16" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.792157 0 0 0 0 0.792157 0 0 0 0 0.792157 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_dropShadow_130_5338"
            result="effect4_dropShadow_130_5338"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect4_dropShadow_130_5338"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1" dy="-1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.792157 0 0 0 0 0.792157 0 0 0 0 0.792157 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect5_innerShadow_130_5338"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.909804 0 0 0 0 0.909804 0 0 0 0 0.909804 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="effect5_innerShadow_130_5338"
            result="effect6_innerShadow_130_5338"
          />
        </filter>
        <filter
          id="filter1_bii_130_5338"
          x="6.10933"
          y="106.109"
          width="436.781"
          height="268.781"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="22.4453" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_130_5338"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_130_5338"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-14.7667" dy="14.7667" />
          <feGaussianBlur stdDeviation="7.38333" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.111 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_130_5338"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="14.7667" dy="-14.7667" />
          <feGaussianBlur stdDeviation="7.38333" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.646745 0 0 0 0 0.646745 0 0 0 0 0.646745 0 0 0 0.111 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_130_5338"
            result="effect3_innerShadow_130_5338"
          />
        </filter>
        <linearGradient
          id="paint0_linear_130_5338"
          x1="141.009"
          y1="215.532"
          x2="141.009"
          y2="290.621"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFA1AE" />
          <stop offset="1" stopColor="#FF4565" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_130_5338"
          x1="140.898"
          y1="256.496"
          x2="159.413"
          y2="264.596"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FE0364" stopOpacity="0" />
          <stop offset="0.2343" stopColor="#F90362" stopOpacity="0.234" />
          <stop offset="0.5173" stopColor="#EA035B" stopOpacity="0.517" />
          <stop offset="0.8243" stopColor="#D20250" stopOpacity="0.824" />
          <stop offset="1" stopColor="#C00148" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_130_5338"
          x1="141.009"
          y1="253.141"
          x2="141.009"
          y2="287.209"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FE0364" stopOpacity="0" />
          <stop offset="0.2343" stopColor="#F90362" stopOpacity="0.234" />
          <stop offset="0.5173" stopColor="#EA035B" stopOpacity="0.517" />
          <stop offset="0.8243" stopColor="#D20250" stopOpacity="0.824" />
          <stop offset="1" stopColor="#C00148" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_130_5338"
          x1="98.9768"
          y1="238.32"
          x2="146.808"
          y2="265.836"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFA1AE" />
          <stop offset="1" stopColor="#FF4565" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_130_5338"
          x1="118.026"
          y1="265.692"
          x2="113.582"
          y2="250.839"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FE0364" stopOpacity="0" />
          <stop offset="0.2343" stopColor="#F90362" stopOpacity="0.234" />
          <stop offset="0.5173" stopColor="#EA035B" stopOpacity="0.517" />
          <stop offset="0.8243" stopColor="#D20250" stopOpacity="0.824" />
          <stop offset="1" stopColor="#C00148" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_130_5338"
          x1="121.018"
          y1="270.306"
          x2="121.018"
          y2="292.346"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FE0364" stopOpacity="0" />
          <stop offset="0.2343" stopColor="#F90362" stopOpacity="0.234" />
          <stop offset="0.5173" stopColor="#EA035B" stopOpacity="0.517" />
          <stop offset="0.8243" stopColor="#D20250" stopOpacity="0.824" />
          <stop offset="1" stopColor="#C00148" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_130_5338"
          x1="105.617"
          y1="262.54"
          x2="100.783"
          y2="258.096"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FE0364" stopOpacity="0" />
          <stop offset="0.2343" stopColor="#F90362" stopOpacity="0.234" />
          <stop offset="0.5173" stopColor="#EA035B" stopOpacity="0.517" />
          <stop offset="0.8243" stopColor="#D20250" stopOpacity="0.824" />
          <stop offset="1" stopColor="#C00148" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_130_5338"
          x1="132.073"
          y1="258.341"
          x2="148.081"
          y2="272.034"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FE0364" stopOpacity="0" />
          <stop offset="0.2343" stopColor="#F90362" stopOpacity="0.234" />
          <stop offset="0.5173" stopColor="#EA035B" stopOpacity="0.517" />
          <stop offset="0.8243" stopColor="#D20250" stopOpacity="0.824" />
          <stop offset="1" stopColor="#C00148" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_130_5338"
          x1="102.912"
          y1="240.584"
          x2="142.204"
          y2="263.188"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F5FBFF" />
          <stop offset="1" stopColor="#DBD5EF" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_130_5338"
          x1="110.46"
          y1="244.926"
          x2="133.371"
          y2="258.106"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F5FBFF" />
          <stop offset="1" stopColor="#DBD5EF" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_130_5338"
          x1="119.69"
          y1="257.644"
          x2="117.039"
          y2="249.535"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DBD5EF" stopOpacity="0" />
          <stop offset="0.2853" stopColor="#D9D2EE" stopOpacity="0.285" />
          <stop offset="0.4739" stopColor="#D4C9E9" stopOpacity="0.474" />
          <stop offset="0.6346" stopColor="#CBBAE2" stopOpacity="0.635" />
          <stop offset="0.7795" stopColor="#BFA5D7" stopOpacity="0.78" />
          <stop offset="0.9126" stopColor="#AF8ACA" stopOpacity="0.913" />
          <stop offset="1" stopColor="#A274BF" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_130_5338"
          x1="109.206"
          y1="260.888"
          x2="103.982"
          y2="256.678"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DBD5EF" stopOpacity="0" />
          <stop offset="0.2853" stopColor="#D9D2EE" stopOpacity="0.285" />
          <stop offset="0.4739" stopColor="#D4C9E9" stopOpacity="0.474" />
          <stop offset="0.6346" stopColor="#CBBAE2" stopOpacity="0.635" />
          <stop offset="0.7795" stopColor="#BFA5D7" stopOpacity="0.78" />
          <stop offset="0.9126" stopColor="#AF8ACA" stopOpacity="0.913" />
          <stop offset="1" stopColor="#A274BF" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_130_5338"
          x1="92.0581"
          y1="237.851"
          x2="92.0581"
          y2="247.077"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B3DAFE" />
          <stop offset="1" stopColor="#0182FC" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_130_5338"
          x1="93.4907"
          y1="245.853"
          x2="93.4907"
          y2="249.948"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#314DC9" stopOpacity="0" />
          <stop offset="0.2761" stopColor="#304BC4" stopOpacity="0.276" />
          <stop offset="0.5628" stopColor="#2B45B8" stopOpacity="0.563" />
          <stop offset="0.8535" stopColor="#243BA3" stopOpacity="0.854" />
          <stop offset="1" stopColor="#1F3596" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_130_5338"
          x1="92.6463"
          y1="245.968"
          x2="88.7283"
          y2="249.594"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#314DC9" stopOpacity="0" />
          <stop offset="0.2761" stopColor="#304BC4" stopOpacity="0.276" />
          <stop offset="0.5628" stopColor="#2B45B8" stopOpacity="0.563" />
          <stop offset="0.8535" stopColor="#243BA3" stopOpacity="0.854" />
          <stop offset="1" stopColor="#1F3596" />
        </linearGradient>
        <linearGradient
          id="paint15_linear_130_5338"
          x1="94.7291"
          y1="244.235"
          x2="91.3958"
          y2="248.738"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#314DC9" stopOpacity="0" />
          <stop offset="0.2761" stopColor="#304BC4" stopOpacity="0.276" />
          <stop offset="0.5628" stopColor="#2B45B8" stopOpacity="0.563" />
          <stop offset="0.8535" stopColor="#243BA3" stopOpacity="0.854" />
          <stop offset="1" stopColor="#1F3596" />
        </linearGradient>
        <linearGradient
          id="paint16_linear_130_5338"
          x1="96.3859"
          y1="244.541"
          x2="90.7136"
          y2="246.822"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#314DC9" stopOpacity="0" />
          <stop offset="0.2761" stopColor="#304BC4" stopOpacity="0.276" />
          <stop offset="0.5628" stopColor="#2B45B8" stopOpacity="0.563" />
          <stop offset="0.8535" stopColor="#243BA3" stopOpacity="0.854" />
          <stop offset="1" stopColor="#1F3596" />
        </linearGradient>
        <linearGradient
          id="paint17_linear_130_5338"
          x1="98.3378"
          y1="243.697"
          x2="101.32"
          y2="242.06"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#314DC9" stopOpacity="0" />
          <stop offset="0.2761" stopColor="#304BC4" stopOpacity="0.276" />
          <stop offset="0.5628" stopColor="#2B45B8" stopOpacity="0.563" />
          <stop offset="0.8535" stopColor="#243BA3" stopOpacity="0.854" />
          <stop offset="1" stopColor="#1F3596" />
        </linearGradient>
        <linearGradient
          id="paint18_linear_130_5338"
          x1="88.7526"
          y1="252.711"
          x2="94.7758"
          y2="262.243"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B3DAFE" />
          <stop offset="1" stopColor="#0182FC" />
        </linearGradient>
        <linearGradient
          id="paint19_linear_130_5338"
          x1="89.5962"
          y1="261.935"
          x2="89.5962"
          y2="266.456"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#314DC9" stopOpacity="0" />
          <stop offset="0.2761" stopColor="#304BC4" stopOpacity="0.276" />
          <stop offset="0.5628" stopColor="#2B45B8" stopOpacity="0.563" />
          <stop offset="0.8535" stopColor="#243BA3" stopOpacity="0.854" />
          <stop offset="1" stopColor="#1F3596" />
        </linearGradient>
        <linearGradient
          id="paint20_linear_130_5338"
          x1="92.6463"
          y1="256.032"
          x2="88.7283"
          y2="252.406"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#314DC9" stopOpacity="0" />
          <stop offset="0.2761" stopColor="#304BC4" stopOpacity="0.276" />
          <stop offset="0.5628" stopColor="#2B45B8" stopOpacity="0.563" />
          <stop offset="0.8535" stopColor="#243BA3" stopOpacity="0.854" />
          <stop offset="1" stopColor="#1F3596" />
        </linearGradient>
        <linearGradient
          id="paint21_linear_130_5338"
          x1="94.7291"
          y1="257.765"
          x2="91.3958"
          y2="253.262"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#314DC9" stopOpacity="0" />
          <stop offset="0.2761" stopColor="#304BC4" stopOpacity="0.276" />
          <stop offset="0.5628" stopColor="#2B45B8" stopOpacity="0.563" />
          <stop offset="0.8535" stopColor="#243BA3" stopOpacity="0.854" />
          <stop offset="1" stopColor="#1F3596" />
        </linearGradient>
        <linearGradient
          id="paint22_linear_130_5338"
          x1="96.3859"
          y1="257.458"
          x2="90.7136"
          y2="255.178"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#314DC9" stopOpacity="0" />
          <stop offset="0.2761" stopColor="#304BC4" stopOpacity="0.276" />
          <stop offset="0.5628" stopColor="#2B45B8" stopOpacity="0.563" />
          <stop offset="0.8535" stopColor="#243BA3" stopOpacity="0.854" />
          <stop offset="1" stopColor="#1F3596" />
        </linearGradient>
        <linearGradient
          id="paint23_linear_130_5338"
          x1="98.3378"
          y1="258.303"
          x2="101.32"
          y2="259.94"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#314DC9" stopOpacity="0" />
          <stop offset="0.2761" stopColor="#304BC4" stopOpacity="0.276" />
          <stop offset="0.5628" stopColor="#2B45B8" stopOpacity="0.563" />
          <stop offset="0.8535" stopColor="#243BA3" stopOpacity="0.854" />
          <stop offset="1" stopColor="#1F3596" />
        </linearGradient>
        <linearGradient
          id="paint24_linear_130_5338"
          x1="99.4884"
          y1="249.264"
          x2="99.4884"
          y2="252.092"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5A5A5A" />
          <stop offset="1" stopColor="#444444" />
        </linearGradient>
        <clipPath id="clip0_130_5338">
          <rect
            width="30"
            height="30"
            fill="white"
            transform="translate(74 60)"
          />
        </clipPath>
        <clipPath id="clip1_130_5338">
          <rect x="51" y="151" width="347" height="179" rx="24" fill="white" />
        </clipPath>
        <clipPath id="clip2_130_5338">
          <rect
            width="84"
            height="84"
            fill="white"
            transform="translate(77 209)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
