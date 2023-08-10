// app/about/page.tsx
// 'use client';

// import benAvatar from '@/public/images/ben-avatar.jpg';
// import ighodaloAvatar from '@/public/images/ighodalo-avatar-imoge.png';
import benAvatar from '@/public/images/ben-avatar-z.png';
import ighodaloAvatar from '@/public/images/ighodalo-avatar-imoge-z.png';
import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '../components/container';
import { FadeIn, FadeInStagger } from '../components/fade-in';
import {
  EmailIcon,
  GithubIcon,
  LinkedInIcon,
  WebsiteIcon,
} from '../components/icons/social-icons';
import CtrlLink from '../components/ctrl-link';

// import { motion, useReducedMotion } from 'framer-motion';

// "meet Ben Chavez, our lead full-stack software engineer. With an extensive background in financial services, Ben brings a wealth of experience to our team. His naturally analytical mind, coupled with his passion for learning new technologies, makes him a driving force behind our innovative solutions. But Ben isn't all work and no play. When he isn't coding or solving complex problems, he indulges his creative side by writing music and diving into a good book. His unique blend of expertise, humor, and creativity makes him an invaluable part of the Ctrl-F Plus team."

// site: 'https://ctrl-f.plus/about',
export const metadata: Metadata = {
  // title: 'About Us - Ctrl-f Plus',
  title: 'About',
  description:
    'Learn about Ctrl-F Plus, the open source Chrome extension that redefines productivity by extending the native Ctrl-F functionality to search across all tabs in your browser window.',
  alternates: {
    // canonical: new URL('https://ctrl-f.plus'),
    canonical: 'https://ctrl-f.plus/blog',
  },
  keywords: [
    'About Us',
    'Ctrl-F Plus',
    'Chrome Extension',
    'Browser Search',
    'Multi-tab Search',
    'Productivity Tool',
    'Time Saver',
    'Efficiency Tool',
  ],
};

const team = [
  {
    name: 'Ben Chavez',
    role: 'Developer',
    avatar: benAvatar,
    width: 528,
    height: 473,
    bio: 'Ben is a full-stack software engineer with an extensive background in financial services. Possessing a naturally analytical mind, he enjoys learning new technologies and solving complex problems. When Ben isn’t coding, he can often be found writing music or reading',
    linkedinUrl: 'https://www.linkedin.com/in/benjaminchavez/',
    githubUrl: 'https://github.com/benjamin-chavez',
    email: 'mailto:ben.m.chavez@gmail.com',
    website: 'https://benjamin-chavez.com/',
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
              className="text-dark1/70 hover:text-dark1"
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
              className="text-dark1/70 hover:text-dark1"
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
              className="text-dark1/70 hover:text-dark1"
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
              className="text-dark1/70 hover:text-dark1"
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

export default function About() {
  return (
    <>
      <Container className="mt-18 flex flex-col tablet:mt-24">
        <FadeInStagger>
          <FadeIn className="flex min-h-[318px] w-full items-center justify-center rounded-3xl bg-white/[.47] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20">
            <div className="flex justify-start gap-[9.375rem]">
              <div className="flex flex-col items-start justify-center gap-6">
                <h1 className="font-inter text-fs-xl text-dark1">
                  Meet the team
                </h1>

                <p className="font-open-sans text-fs-lg text-dark1 ">
                  {/* <Balancer> */} Welcome to{' '}
                  <span className="text-highlight-focus-1 ">Ctrl-F Plus!</span>{' '}
                  , an open-source Chrome extension that Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Iure corrupti eligendi
                  consequatur repudiandae ratione suscipit minus est repellat
                  eaque reiciendis.
                  {/* </Balancer> */}
                </p>
                {/* <p className="text-dark font-open-sans text-fs-lg [text-wrap:balance]">
                <span className="text-highlight-focus-1 ">Ctrl-F Plus!</span> is
                This project is open source and we welcome your contributions!
                Interested in collaborating with us or contributing to our
                open-source project? Get in touch today and let's improve the
                digital world together!
              </p> */}
              </div>
            </div>
          </FadeIn>

          <FadeIn className="mt-10">
            <div
              // tab-pro:p-20
              className="rounded-3xl bg-white/[.68] px-4 py-14 shadow-sm  backdrop-blur-[23px] mobile-md:px-6 tab-pro:px-14  laptop:px-8 desktop:px-[40px]"
            >
              {/* <div className="grid-cols-1 gap-x-8 xl:grid-cols-2">
                <h2 className="font-inter text-fs-x0 tracking-tight text-dark1">
                  Our team
                </h2>
                <p className=" mt-6 max-w-4xl leading-8 text-dark1 ">
                  We’re a dynamic group of individuals who are passionate about
                  what we do and dedicated to delivering the best results for
                  our clients.
                </p>
              </div> */}
              <div
                // mt-14
                className="mx-auto  grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20   xl:grid-cols-2"
              >
                <ul
                  role="list"
                  className="mx-auto grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
                >
                  {team.map((person: any) => (
                    <li
                      key={person.name}
                      className="flex flex-col justify-between"
                    >
                      <div>
                        <Image
                          loading="lazy"
                          className="aspect-[3/2] w-full rounded-2xl bg-[#DBDFE5]/70 object-cover"
                          src={person.avatar}
                          alt={`Photo of ` + person.name}
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
                      </div>

                      <SocialProfiles person={person} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* <div className="mt-20">
              <h2 className="font-inter text-fs-x0 tracking-tight text-dark1">
                Sponsor This Project
              </h2>
              <p className=" mt-6 max-w-4xl leading-8 text-dark1 ">
                //</p><p className="text-dark font-open-sans text-fs-lg [text-wrap:balance]">
                <span className="text-highlight-focus-1 ">Ctrl-F Plus!</span> is
                This project is open source and we welcome your contributions!
                Interested in collaborating with us or contributing to our
                open-source project? Get in touch today and let's improve the
                digital world together!
              </p>
            </div>

            <div className="mt-20">
              <h2 className="font-inter text-fs-x0 tracking-tight text-dark1">
                Contribute
              </h2>
              <p className=" mt-6 max-w-4xl leading-8 text-dark1 ">
/                //</p><p className="text-dark font-open-sans text-fs-lg [text-wrap:balance]">
                <span className="text-highlight-focus-1 ">Ctrl-F Plus!</span> is
                This project is open source and we welcome your contributions!
                Interested in collaborating with us or contributing to our
                open-source project? Get in touch today and let's improve the
                digital world together!
              </p>
            </div> */}
            </div>
          </FadeIn>
        </FadeInStagger>
      </Container>
    </>
  );
}
