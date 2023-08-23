// app/about/page.tsx
// import 'server-only';
'use client';

import benAvatar from '@/public/images/ben-avatar2.png';
// import ighodaloAvatar from '@/public/images/ighodalo-avatar-imoge.png';
import ighodaloAvatar from '@/public/images/ighodalo-avatar.png';
import Image from 'next/image';
import ButtonPrimaryCopy from '../components/buttons/button-primary-copy';
import Container from '../components/container';
import CtrlLink from '../components/ctrl-link';
import { FadeIn, FadeInStagger } from '../components/fade-in';
import {
  FilledStarIcon,
  HeartHandIcon,
} from '../components/icons/button-icons';
import {
  EmailIcon,
  GithubIcon,
  LinkedInIcon,
  WebsiteIcon,
} from '../components/icons/social-icons';
import { ColorAccents } from '../components/temp-components/color-accents';
import Toast from '../components/temp-components/toast';
import { Metadata } from 'next';

// import { motion, useReducedMotion } from 'framer-motion';

// "meet Ben Chavez, our lead full-stack software engineer. With an extensive background in financial services, Ben brings a wealth of experience to our team. His naturally analytical mind, coupled with his passion for learning new technologies, makes him a driving force behind our innovative solutions. But Ben isn't all work and no play. When he isn't coding or solving complex problems, he indulges his creative side by writing music and diving into a good book. His unique blend of expertise, humor, and creativity makes him an invaluable part of the Ctrl-F Plus team."

// export const metadata: Metadata = {
//   title: 'About',
//   description:
//     'Learn more about Ctrl-F Plus, including the company values, commitment to open source, and the team supporting the browser extension',

//   // "We are a small group of people working from Europe, America, and Asia. We help more than three million professionals to create new connections."
//   alternates: {
//     canonical: 'https://ctrl-f.plus/about',
//   },
//   keywords: [
//     'About Us',
//     'Ctrl-F Plus',
//     'Chrome Extension',
//     'Browser Search',
//     'Multi-tab Search',
//     'Productivity Tool',
//     'Time Saver',
//     'Efficiency Tool',
//   ],
// };

const team = [
  {
    name: 'Ben Chavez',
    role: 'Developer',
    avatar: benAvatar,
    width: 528,
    height: 473,
    bio: 'Ben is a full-stack software engineer with an extensive background in financial services. Possessing a naturally analytical mind, he enjoys learning new technologies and solving complex problems. When Ben isn’t coding, he can often be found writing music or reading',
    linkedinUrl: 'https://www.linkedin.com/in/benjaminchavez',
    githubUrl: 'https://github.com/benjamin-chavez',
    email: 'mailto:ben.m.chavez@gmail.com',
    website: 'https://benjamin-chavez.com',
  },
  {
    name: 'Ighodalo I',
    role: 'Designer',
    avatar: ighodaloAvatar,
    width: 800,
    height: 800,
    bio: 'Ighodalo is an experienced Product Designer who is passionate about designing meaningful and impactful web-based digital products that meet user needs, business goals, and technology standards.',
    linkedinUrl: 'https://www.linkedin.com/in/ighodalo-ijagbone/',
  },
];

function SocialProfiles({ person }: any) {
  return (
    <>
      <ul role="list" className="mt-6 flex gap-x-6">
        {person.linkedinUrl && (
          <li>
            <CtrlLink
              href={person.linkedinUrl}
              className="text-shark/70 hover:text-highlighter-900"
              target="_blank"
              atag
            >
              <span className="sr-only">LinkedIn</span>
              <LinkedInIcon className={'h-5 w-5'} />
            </CtrlLink>
          </li>
        )}
        {person.githubUrl && (
          <li>
            <CtrlLink
              href={person.githubUrl}
              className="text-shark/70 hover:text-highlighter-900"
              target="_blank"
              atag
            >
              <span className="sr-only">Github</span>
              <GithubIcon className={'h-5 w-5'} />
            </CtrlLink>
          </li>
        )}

        {person.email && (
          <li>
            <CtrlLink
              href={person.email}
              className="text-shark/70 hover:text-highlighter-900"
              target="_blank"
              atag
            >
              <span className="sr-only">Github</span>
              <EmailIcon className={'h-5 w-5'} />
            </CtrlLink>
          </li>
        )}
        {person.website && (
          <li>
            <CtrlLink
              href={person.website}
              className="text-shark/70 hover:text-highlighter-900"
              target="_blank"
              atag
            >
              <span className="sr-only">Website</span>
              <WebsiteIcon className={'h-5 w-5'} />
            </CtrlLink>
          </li>
        )}
      </ul>
    </>
  );
}

function ContributeButtons() {
  return (
    <div className="mt-20 flex justify-center tab-pro:mt-24">
      {/* <div className="grid w-full grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"> */}
      <div className="flex w-3/4 items-center justify-center">
        <div className="flex w-full flex-col justify-self-center tablet:justify-self-end laptop:w-3/4 ">
          <ButtonPrimaryCopy
            variant={'simple'}
            className={''}
            href={'https://opencollective.com/ctrl-f-plus-chrome-extension'}
            aTag
            target={'_blank'}
          >
            <HeartHandIcon /> Become a Sponsor!
          </ButtonPrimaryCopy>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <Container className="mt-18 flex flex-col tablet:mt-24">
        <FadeInStagger>
          <FadeIn
            className="flex min-h-[318px] w-full items-center
          justify-center rounded-3xl bg-white/[.47] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20"
          >
            <div className="flex justify-start gap-[9.375rem]">
              <div className="flex flex-col items-start justify-center gap-6">
                <h1 className="font-inter text-fs-xl text-shark">About</h1>

                <p className="font-open-sans text-fs-lg text-shark">
                  At{' '}
                  <span className="text-highlighter-focus-400 ">
                    Ctrl-F Plus
                  </span>{' '}
                  we&apos;re not just pixel pushers; we&apos;re certified tab
                  hoarders, just like you! Lost in the abyss of endless tabs?
                  Been there, done that, got the T-shirt. That&apos;s why
                  we&apos;re letting our tabs run wild as we transform the old
                  school CTRL F shortcut (Cmd F for our Apple buddies) into the
                  productivity tool that you&apos;ve been searching for.
                </p>
                <p className="font-open-sans text-fs-lg text-shark">
                  Our grand plan? Snatch those fleeting moments from the jaws of
                  tab chaos and gift them back to you. So you can get back to
                  binge-watching cat videos or, you know, other important stuff.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="mt-10">
            <div className="rounded-3xl bg-white/[.68] px-4 py-14 shadow-sm  backdrop-blur-[23px] mobile-md:px-6 tab-pro:px-14 laptop:px-8 desktop:px-[40px]">
              <div
                // gap-y-20
                className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8  xl:grid-cols-2"
              >
                <h2 className="font-inter text-fs-middle text-shark">
                  Our Team
                </h2>
                <ul
                  role="list"
                  className="mx-auto mt-6 grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
                >
                  {team.map((person: any) => (
                    <li
                      key={person.name}
                      className="flex flex-col justify-between "
                    >
                      <div>
                        <Image
                          loading="lazy"
                          className="aspect-[3/2] w-full rounded-2xl bg-[#D3D7DA]/70 object-cover"
                          src={person.avatar}
                          alt={`Photo of ` + person.name}
                          placeholder="blur"
                          quality={100}
                        />

                        <h3 className="mt-6 font-inter text-lg font-semibold leading-8 text-shark">
                          {person.name}
                        </h3>
                        <p className="font-arimo text-base leading-7 text-shark/80">
                          {person.role}
                        </p>
                        <p className="mt-4 font-arimo text-base leading-7 text-shark/80">
                          {person.bio}
                        </p>
                      </div>

                      <SocialProfiles person={person} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className=" flex w-full items-center justify-center overflow-hidden ">
                <div className="isolate mt-5 flex  w-full flex-col items-center justify-center laptop:w-3/4">
                  <div className="flex w-full flex-col justify-self-center tablet:justify-self-start laptop:w-2/5 ">
                    <ButtonPrimaryCopy
                      variant={'simple'}
                      className={'mt-20'}
                      href={process.env.OPEN_COLLECTIVE_URL}
                      aTag
                      target={'_blank'}
                    >
                      <HeartHandIcon /> Become a Sponsor!
                    </ButtonPrimaryCopy>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn
            className="relative mt-20 flex min-h-[318px]
          w-full items-center justify-center overflow-hidden rounded-3xl  bg-white/[.68] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20"
          >
            <ColorAccents />

            <div className=" flex justify-start">
              <div className=" flex flex-col items-center justify-center gap-6 ">
                <h2 className="text-center font-inter text-fs-middle text-shark">
                  Proudly Open Source
                </h2>

                <p className="text-center font-open-sans text-fs-lg text-shark [text-wrap:balance]">
                  Got a soft spot for browser extensions or daydream about
                  Typescript? Then hey, if you&apos;re into it, slide into our
                  codebase with your PRs...
                </p>

                <div className=" flex w-full items-center justify-center overflow-hidden ">
                  <div className="isolate mt-5 flex  w-full flex-col items-center justify-center laptop:w-3/4">
                    <div className="flex w-full flex-col justify-self-center tablet:justify-self-start laptop:w-2/5 ">
                      <ButtonPrimaryCopy
                        variant={'outline'}
                        className="group bg-white/[.68]"
                        href={
                          'https://chrome.google.com/webstore/detail/ctrl-f-plus-multi-tab-sea/dkfbnlclahcmcgehpancgfhogmilankf'
                        }
                        aTag
                        target={'_blank'}
                      >
                        <FilledStarIcon className="  fill-yellow-500 " /> Star
                        us on GitHub!
                      </ButtonPrimaryCopy>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </FadeInStagger>
      </Container>
    </>
  );
}
