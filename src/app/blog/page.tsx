// src/app/blog/page.tsx

import { clientEnv } from '@/clientEnv';
import { getPublishedPosts, type Post } from '@/lib/posts';
import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/container';
import { FadeIn, FadeInStagger } from '@/components/fade-in';
import DrawingIcon from '@/components/icons/drawing-icon';
import { BrowserLabel, InstallButton } from '@/components/install-button';
import {
  InfoCard,
  InfoCardAction,
  InfoCardDescription,
  InfoCardTitle,
} from '@/components/info-card';
import {
  PageTitleCard,
  PageTitleCardDescription,
  PageTitleCardTitle,
} from '@/components/page-title-card';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Explore the development journey of the Ctrl-F Plus chrome extension. Read about progress updates, challenges, and successes in our blog posts!',
  alternates: {
    canonical: `${clientEnv.NEXT_PUBLIC_APP_URL}/blog/`,
  },
};

function EmptyBlogState() {
  return (
    <InfoCard showAccents>
      <InfoCardTitle>Yeah, We&apos;re Making You Wait...</InfoCardTitle>
      <InfoCardDescription>
        Patience, tab hoarder. We&apos;re busy cooking up some stories that
        might just be worth your precious tab space. Until then, Check out the
        tool that understands your tab obsession!
      </InfoCardDescription>
      <InfoCardAction>
        <InstallButton intent="solid" size="thin" icon="puzzle2">
          Get the <BrowserLabel /> extension!
        </InstallButton>
      </InfoCardAction>
    </InfoCard>
  );
}

function PostGrid({ posts }: Readonly<{ posts: Post[] }>) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-3 gap-x-10 laptop:grid-cols-2">
      {posts.map((post: Post) => (
        <FadeIn key={post.slug}>
          <Link
            href={`/blog/${post.slug}/`}
            aria-label={`Read blog post: ${post.title}`}
            className="flex items-start gap-2 rounded-3xl bg-white/[.68] px-4 py-6 shadow-sm backdrop-blur-[23px] hover:opacity-75 mobile-md:px-6 tab-pro:px-14 laptop:px-8 desktop:px-[40px]"
          >
            <div className="flex min-h-[96px] flex-col items-start gap-2">
              <h2 className="transform font-inter text-subtitle text-shark">
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
  );
}

function BlogPosts({ posts }: Readonly<{ posts: Post[] }>) {
  if (posts.length === 0) return <EmptyBlogState />;
  return <PostGrid posts={posts} />;
}

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <section>
      <Container className="mt-18 flex flex-col tablet:mt-24">
        <FadeInStagger>
          <PageTitleCard
            className="tablet:px-8"
            illustration={<DrawingIcon aria-hidden="true" />}
          >
            <PageTitleCardTitle>
              <span className="block">Behind the Tabs: </span>
              <span className="block">The Ctrl-F Plus Story</span>
            </PageTitleCardTitle>

            <PageTitleCardDescription className="desktop:pr-[5rem]">
              Ever wondered what fuels the madness of a proud tab hoarder?
              We&apos;re pulling back the curtain to show how we transformed the
              humble CTRL+F into the ultimate tool for tab enthusiasts:
              CTRL+Shift+F.
            </PageTitleCardDescription>

            <PageTitleCardDescription className="desktop:pr-[5rem]">
              Journey with us as we reveal how React, Next.js, Tailwind, and
              Typescript became our allies in our search for a better CTRL+F.
            </PageTitleCardDescription>
          </PageTitleCard>

          <BlogPosts posts={posts} />
        </FadeInStagger>
      </Container>
    </section>
  );
}
