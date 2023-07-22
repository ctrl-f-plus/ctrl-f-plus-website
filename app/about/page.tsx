// app/about/page.tsx

import benAvatar from '@/public/images/ben-avatar.jpg';
import ighodaloAvatar from '@/public/images/ighodalo-avatar.jpeg';
import clsx from 'clsx';
import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '../components/Container';
import { Balancer } from 'react-wrap-balancer';

export const metadata: Metadata = {
  title: 'About Us - Ctrl-f Plus',
  description: 'Ctrl-F Plus is an open source chrome extension. Meet our team.',
};

const team = [
  {
    name: 'Ben Chavez',
    role: 'Developer',
    // avatar: '/images/ben-avatar.jpg',
    avatar: benAvatar,
    width: 528,
    height: 473,
    bio: 'Time waits for no man. Unless that man is Chuck Norris. Chuck Norris doesn’t wear a watch. He decides what time it is. Chuck Norris has a mug of nails instead of coffee in the morning. Chuck Norris once ate at Taco Bell and didn’t get diarrhea.',
    twitterUrl: '',
    linkedinUrl: 'https://www.linkedin.com/in/benjaminchavez/',
    githubUrl: 'https://github.com/bmchavez',
  },
  {
    name: 'Ighodalo I',
    role: 'Designer',
    // avatar: '/images/ighodalo-avatar.jpeg',
    avatar: ighodaloAvatar,
    width: 800,
    height: 800,
    bio: 'Time waits for no man. Unless that man is Chuck Norris. Chuck Norris doesn’t wear a watch. He decides what time it is. Chuck Norris has a mug of nails instead of coffee in the morning. Chuck Norris once ate at Taco Bell and didn’t get diarrhea.',
    twitterUrl: '',
    linkedinUrl: 'https://www.linkedin.com/in/ighodalo-ijagbone/',
    // githubUrl: '',
  },
];

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={clsx(className, 'h-5 w-5 fill-primary1 hover:fill-gray-300')}
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
      className={clsx(className, 'h-5 w-5 fill-primary1 hover:fill-gray-300')}
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
      className={clsx(className, 'h-5 w-5 fill-primary1 hover:fill-gray-300')}
      viewBox="0 0 496 512"
    >
      {/* Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
    </svg>
  );
}

function SocialProfiles({ person }: any) {
  return (
    <ul role="list" className="mt-6 flex items-center justify-center gap-x-6 ">
      <li>
        <a href={person.twitterUrl} className="text-dark1 hover:text-gray-300">
          <span className="sr-only">Twitter</span>
          <TwitterIcon />
        </a>
      </li>
      <li>
        <a
          href={person.linkedinUrl}
          className="text-primary1 hover:text-gray-300"
        >
          <span className="sr-only">LinkedIn</span>
          <LinkedInIcon />
        </a>
      </li>
      {person.githubUrl && (
        <li>
          <a
            href={person.githubUrl}
            className="text-primary1 hover:text-gray-300"
          >
            <GithubIcon className="" />
            <span className="sr-only">Github</span>
          </a>
        </li>
      )}
    </ul>
  );
}

export default function About() {
  return (
    <>
      <Container className="mt-18 flex flex-col tablet:mt-24">
        <div className="flex min-h-[318px] w-full items-center justify-center rounded-3xl bg-white/[.47] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20">
          <div className="flex justify-start gap-[9.375rem]">
            <div className="flex flex-col items-start justify-center gap-6">
              <h1 className="font-inter text-fs-xl text-dark1">About</h1>

              <p className="font-open-sans text-fs-lg text-dark1 ">
                {/* <Balancer> */} Welcome to{' '}
                <span className="text-highlight-focus-1 ">Ctrl-F Plus!</span> ,
                an open-source Chrome extension that Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Iure corrupti eligendi consequatur
                repudiandae ratione suscipit minus est repellat eaque
                reiciendis.
                {/* </Balancer> */}
              </p>
              <p className="text-dark font-open-sans text-fs-lg [text-wrap:balance]">
                <span className="text-highlight-focus-1 ">Ctrl-F Plus!</span> is
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                corrupti eligendi consequatur repudiandae ratione suscipit minus
                est repellat eaque reiciendis.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 laptop:px-[40px]">
          <div
            // tab-pro:p-20
            className="rounded-3xl bg-white/[.68] px-4 py-14 shadow-sm  backdrop-blur-[23px] mobile-md:px-6 tab-pro:px-14  laptop:px-8 desktop:px-[40px]"
          >
            <div className="grid-cols-1 gap-x-8 xl:grid-cols-2">
              <h2 className="font-inter text-fs-x0 tracking-tight text-dark1">
                Our team
              </h2>
              <p className=" mt-6 max-w-4xl leading-8 text-dark1 ">
                We’re a dynamic group of individuals who are passionate about
                what we do and dedicated to delivering the best results for our
                clients.
              </p>
            </div>
            <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20   xl:grid-cols-2">
              <ul
                role="list"
                className="mx-auto grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
              >
                {team.map((person: any) => (
                  <li key={person.name}>
                    <Image
                      loading="lazy"
                      className="aspect-[3/2] w-full rounded-2xl bg-gray-300 object-cover"
                      src={person.avatar}
                      alt=""
                      placeholder="blur"
                      quality={100}
                    />

                    <h3 className="mt-6 font-inter text-lg font-semibold leading-8 text-dark1">
                      {person.name}
                    </h3>
                    <p className="font-arimo text-base leading-7 text-dark1/80">
                      {person.role}
                    </p>
                    <p className="mt-4 font-arimo text-base leading-7 text-dark1/80">
                      {person.bio}
                    </p>
                    <ul role="list" className="mt-6 flex gap-x-6">
                      <li>
                        <a
                          href={person.twitterUrl}
                          className="text-dark1/70 hover:text-dark1"
                        >
                          <span className="sr-only">Twitter</span>
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href={person.linkedinUrl}
                          className="text-dark1/70 hover:text-dark1"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
