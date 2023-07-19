// app/blog/page.tsx

import { allBlogs } from 'contentlayer/generated';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Balancer } from 'react-wrap-balancer';
import DrawingIcon from '../components/icons/drawing-icon';
import Container from '../components/layout/Container';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog posts index page metadata description',
};

export default function BlogPage() {
  return (
    <>
      <section>
        <Container className="mx-auto flex flex-col">
          {/* Header Card */}

          <div className="mt-4 flex w-full items-center justify-center rounded-3xl bg-white/[.47] px-6 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:mt-10 tablet:p-14 tab-pro:px-14  laptop:px-16 desktop:px-20 ">
            {/*  */}
            {/* Content */}
            {/* TODO: adjust gap for smaller screensizes: gap-?? bg-teal-500 */}
            <div className="flex justify-start gap-[9.375rem]">
              <div className="flex flex-col items-start justify-center gap-6 ">
                <h1 className="font-inter text-fs-xl text-dark1">Blog</h1>

                <Balancer className="font-open-sans text-fs-lg text-dark1">
                  Welcome to development journey of{' '}
                  <span className="text-highlight-focus-1 ">Ctrl-F Plus!</span>{' '}
                  Here, you can find articles about my progress, challenges, and
                  successes. I hope you enjoy reading about my experiences and
                  find them inspiring.
                </Balancer>
              </div>
              <div className="hidden desktop:block">
                <DrawingIcon />
              </div>
            </div>
          </div>
          <div
            className="mt-10 grid grid-cols-1 gap-3 gap-x-10 laptop:grid-cols-2 laptop:px-[40px]
          "
          >
            {allBlogs
              .sort((a, b) => {
                if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
                  return -1;
                }
                return 1;
              })
              .map((post: any) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-3xl bg-white/[.68] px-6 py-[19px] shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:px-[40px]"
                >
                  <div className="flex w-full flex-col">
                    <h2 className="font-inter text-subtitle text-dark1">
                      <Balancer>{post.title}</Balancer>
                    </h2>
                    <p className="font-open-sans text-fs-lg text-dark1">
                      {post.publishedAt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </Container>
      </section>
    </>
  );
}
