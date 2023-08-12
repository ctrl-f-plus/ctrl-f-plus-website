// app/blog/page.tsx

import { allBlogs } from 'contentlayer/generated';
import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '../components/container';
import { FadeIn, FadeInStagger } from '../components/fade-in';
import DrawingIcon from '../components/icons/drawing-icon';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Explore the development journey of the Ctrl-F Plus chrome extension. Read about progress updates, challenges, and successes in our blog posts!',
};

export default function BlogPage() {
  return (
    <>
      <section>
        <Container className="mt-18 flex flex-col tablet:mt-24">
          <FadeInStagger>
            <FadeIn className="flex min-h-[318px] w-full items-center justify-center rounded-3xl bg-red-500 bg-white/[.47] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tab-pro:px-14 laptop:px-16 desktop:px-20">
              <div className="flex justify-start gap-[9.375rem]">
                <div className="flex flex-col items-start justify-center gap-6 ">
                  <h1 className="font-inter text-fs-xl text-shark">Blog</h1>
                  <p className="font-open-sans text-fs-lg text-shark">
                    Welcome to development journey of{' '}
                    <span className="text-highlight-focus-1">Ctrl-F Plus!</span>{' '}
                    Here, you can find articles about my progress, challenges,
                    and successes. I hope you enjoy reading about my experiences
                    and find them inspiring.
                  </p>
                </div>
                <div className="hidden desktop:block">
                  <DrawingIcon aria-hidden="true" />
                </div>
              </div>
            </FadeIn>

            <div className="mt-10 grid grid-cols-1 gap-3 gap-x-10  laptop:grid-cols-2 ">
              {allBlogs
                .sort((a, b) => {
                  if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
                    return -1;
                  }
                  return 1;
                })
                .map((post: any) => (
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
                          {post.publishedAt}
                        </p>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
            </div>
          </FadeInStagger>
        </Container>
      </section>
    </>
  );
}
