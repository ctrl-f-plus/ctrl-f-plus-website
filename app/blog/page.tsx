// app/blog/page.tsx
import 'server-only';

import { allBlogs } from 'contentlayer/generated';
import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '../components/container';
import { FadeIn, FadeInStagger } from '../components/fade-in';
import DrawingIcon from '../components/icons/drawing-icon';
import PuzzleIcon from '../components/icons/puzzle';
import InfoCard from '../components/info-card';
import { formatDate } from '../lib/utils';
import ButtonPrimary from '../components/buttons/ButtonPrimary';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Explore the development journey of the Ctrl-F Plus chrome extension. Read about progress updates, challenges, and successes in our blog posts!',
};

export default function BlogPage() {
  const publicPosts = allBlogs
    .filter(
      (post) =>
        new Date(post.publishedAt) <= new Date() ||
        process.env.NODE_ENV === 'development'
    )
    .sort((a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1;
      }
      return 1;
    });

  return (
    <>
      <section>
        <Container className="mt-18 flex flex-col tablet:mt-24">
          <FadeInStagger>
            <FadeIn className="flex min-h-[318px] w-full items-center justify-center rounded-3xl bg-white/[.47] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tab-pro:px-14 laptop:px-16 desktop:px-20">
              <div
                // gap-[9.375rem]
                //gap-[5rem]
                className="flex justify-start"
              >
                <div className="flex flex-col items-start justify-center gap-6">
                  <h1 className="  font-inter text-fs-xl text-shark">
                    <span className="block">Behind the Tabs: </span>
                    <span className="block">The Ctrl-F Plus Story</span>
                  </h1>

                  <p className="font-open-sans text-fs-lg text-shark desktop:pr-[5rem]">
                    Ever wondered what fuels the madness of a proud tab hoarder?
                    We&apos;re pulling back the curtain to show how we
                    transformed the humble CTRL+F into the ultimate tool for tab
                    enthusiasts: CTRL+Shift+F.
                  </p>
                  <p className="font-open-sans text-fs-lg text-shark desktop:pr-[5rem]">
                    Journey with us as we reveal how React, Next.js, Tailwind,
                    and Typescript became our allies in our search for a better
                    CTRL+F.
                  </p>
                </div>
                <div
                  // desktop:block
                  className="hidden flex-col   justify-center desktop:flex"
                >
                  <DrawingIcon aria-hidden="true" />
                </div>
              </div>
            </FadeIn>

            {publicPosts.length === 0 ? (
              <InfoCard
                title={`Yeah, We're Making You Wait...`}
                description={`Patience, tab hoarder. We're busy cooking up some stories that might just be worth your precious tab space. Until then, Check out  the tool that understands your tab obsession!`}
                showAccents
              >
                {' '}
                <ButtonPrimary
                  variant="solid"
                  size="thin"
                  icon="puzzle2"
                  href={process.env.NEXT_PUBLIC_CHROME_STORE_URL}
                  target={'_blank'}
                  aTag
                >
                  Get the Extension!
                </ButtonPrimary>
              </InfoCard>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-3 gap-x-10  laptop:grid-cols-2 ">
                {publicPosts.map((post: any) => (
                  <FadeIn key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-start gap-2 rounded-3xl bg-white/[.68] px-4 py-6 shadow-sm backdrop-blur-[23px] hover:opacity-75 mobile-md:px-6 tab-pro:px-14 laptop:px-8 desktop:px-[40px] "
                      aria-label={`Read blog post: ${post.title}`}
                    >
                      <div className="flex min-h-[96px] flex-col items-start gap-2 ">
                        <h2 className="transform font-inter text-subtitle text-shark ">
                          {post.title}
                        </h2>
                        <p className="font-open-sans text-fs-lg text-shark">
                          {formatDate(post.publishedAt)}
                        </p>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            )}
          </FadeInStagger>
        </Container>
      </section>
    </>
  );
}
