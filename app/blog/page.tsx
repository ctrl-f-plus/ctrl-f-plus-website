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
        <Container className="mt-18 flex flex-col tablet:mt-24">
          <div className="flex min-h-[318px] w-full items-center justify-center rounded-3xl bg-red-500 bg-white/[.47] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tab-pro:px-14 laptop:px-16 desktop:px-20">
            <div className="flex justify-start gap-[9.375rem]">
              <div className="flex flex-col items-start justify-center gap-6 ">
                <h1 className="font-inter text-fs-xl text-dark1">Blog</h1>
                <p className="font-open-sans text-fs-lg text-dark1">
                  Welcome to development journey of{' '}
                  <span className="text-highlight-focus-1">Ctrl-F Plus!</span>{' '}
                  Here, you can find articles about my progress, challenges, and
                  successes. I hope you enjoy reading about my experiences and
                  find them inspiring.
                </p>
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
                  // className="rounded-3xl bg-white/[.68] px-4 py-[19px] shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:px-[40px]"
                  // className="flex items-start gap-2 rounded-3xl bg-white/[.68] px-6 py-[19px] shadow-sm backdrop-blur-[23px]"
                  // mx-[24px] p-10
                  className="flex items-start gap-2 rounded-3xl bg-white/[.68] px-4  py-6 shadow-sm backdrop-blur-[23px]   mobile-md:px-6 tab-pro:px-14 laptop:px-8 desktop:px-[40px]"
                >
                  <div className="flex min-h-[96px] flex-col items-start gap-2 ">
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
