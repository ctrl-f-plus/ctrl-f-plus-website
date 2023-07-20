// app/about/page.tsx

// import Container from '../components/layout/Container';

// export default function About() {
//   return (
//     <div>
//       <Container>
//         <div className="item-center mt-4 flex h-auto w-full justify-center tablet:mt-10 ">
//           <h1>About</h1>
//         </div>
//       </Container>
//     </div>
//   );
// }

// app/blog/page.tsx

import { allBlogs } from 'contentlayer/generated';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Balancer } from 'react-wrap-balancer';
import DrawingIcon from '../components/icons/drawing-icon';
import Container from '../components/layout/Container';
import Image from 'next/image';
import clsx from 'clsx';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog posts index page metadata description',
};

const team = [
  {
    name: 'Ben Chavez',
    role: 'Developer',
    avatar: '/images/ben-avatar.jpg',
    bio: 'Time waits for no man. Unless that man is Chuck Norris. Chuck Norris doesn’t wear a watch. He decides what time it is. Chuck Norris has a mug of nails instead of coffee in the morning. Chuck Norris once ate at Taco Bell and didn’t get diarrhea.',
    twitterUrl: '',
    linkedinUrl: 'https://www.linkedin.com/in/benjaminchavez/',
    githubUrl: 'https://github.com/bmchavez',
  },
  {
    name: 'Ighodalo I',
    role: 'Designer',
    avatar: '/images/ighodalo-avatar.jpeg',
    bio: 'Time waits for no man. Unless that man is Chuck Norris. Chuck Norris doesn’t wear a watch. He decides what time it is. Chuck Norris has a mug of nails instead of coffee in the morning. Chuck Norris once ate at Taco Bell and didn’t get diarrhea.',
    twitterUrl: '',
    linkedinUrl: 'https://www.linkedin.com/in/ighodalo-ijagbone/',
    // githubUrl: '',
  },
];

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={clsx(
        className,
        'h-5 w-5 fill-primary1 hover:fill-highlight-focus-1'
      )}
      aria-hidden="true"
      // fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={clsx(
        className,
        'h-5 w-5 fill-primary1 hover:fill-highlight-focus-1'
      )}
      aria-hidden="true"
      // fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // height="2em"
      className={clsx(
        className,
        'h-5 w-5 fill-primary1 hover:fill-highlight-focus-1'
      )}
      viewBox="0 0 496 512"
    >
      {/* Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
    </svg>
  );
}

export default function About() {
  return (
    <>
      <section>
        <Container className="mx-auto flex flex-col">
          <div className="mt-4 flex w-full items-center justify-center rounded-3xl bg-white/[.47] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:mt-10 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20 ">
            <div className="flex justify-start gap-[9.375rem]">
              <div className="flex flex-col items-start justify-center gap-6 ">
                <h1 className="font-inter text-fs-xl text-dark1">About</h1>
                <Balancer className="font-open-sans text-fs-lg text-dark1">
                  Welcome to development journey of{' '}
                  <span className="text-highlight-focus-1 ">Ctrl-F Plus!</span>{' '}
                  Here, you can find articles about my progress, challenges, and
                  successes. I hope you enjoy reading about my experiences and
                  find them inspiring.
                </Balancer>
              </div>
              <div className="hidden desktop:block"></div>
            </div>
          </div>

          <div
            className="mt-10 grid grid-cols-1 gap-3 gap-x-10 laptop:grid-cols-2 laptop:px-[40px]
          "
          >
            {team.map((mate: any) => (
              <div
                key={mate.name}
                // px-4 py-[19px] mobile-md:px-8 tablet:px-[40px]
                // overflow-hidden
                // className="col-span-3 flex flex-col items-center justify-center rounded-3xl  bg-white/[.68] shadow-sm backdrop-blur-[23px]"
                className=" flex  flex-col items-center justify-center rounded-3xl  bg-white/[.68] shadow-sm backdrop-blur-[23px]"
              >
                <div className="h-auto w-full">
                  <Image
                    src={mate.avatar}
                    width={500}
                    height={500}
                    loading="lazy"
                    alt="Picture of the Team member"
                    className="aspect-[4/3] h-auto w-full rounded-t-3xl object-cover"
                    // className="mx-auto aspect-[1/1] rounded-full object-cover"
                    // className="mt-6 rounded-lg object-cover shadow-xl sm:mt-8 "
                  />
                </div>

                {/* CARD BODY */}
                <div className="flex w-full flex-col justify-start px-4 pb-4">
                  <h3 className="mt-6 font-inter text-fs-x0 text-dark1">
                    {mate.name}
                  </h3>
                  <p className="font-inter text-fs-base leading-7 text-primary1 ">
                    {mate.role}
                  </p>
                  <p className="mt-4 font-open-sans text-fs-lg text-dark1">
                    {mate.bio}
                  </p>
                  <ul
                    role="list"
                    className="mt-6 flex items-center justify-center gap-x-6 "
                  >
                    <li>
                      <a
                        href={mate.twitterUrl}
                        // className="text-gray-400 hover:text-gray-500"
                        className="text-primary1 hover:text-highlight-focus-1"
                      >
                        <span className="sr-only">Twitter</span>
                        <TwitterIcon />
                      </a>
                    </li>
                    <li>
                      <a
                        href={mate.linkedinUrl}
                        // className="text-gray-400 hover:text-gray-500"
                        className="text-primary1 hover:text-highlight-focus-1"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <LinkedInIcon />
                      </a>
                    </li>
                    {mate.githubUrl && (
                      <li>
                        <a
                          href={mate.githubUrl}
                          className="text-primary1 hover:text-highlight-focus-1"
                        >
                          <GithubIcon className="" />
                          <span className="sr-only">Github</span>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
