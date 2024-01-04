import 'server-only';

import { FadeIn, FadeInStagger } from '@/app/components/fade-in';
import { Mdx } from '@/app/components/mdx';
import { formatDate } from '@/app/lib/utils';
import '@/styles/mdx.css';
import { allBlogs } from 'contentlayer/generated';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '../../components/ui/container';

function getPost(params: any) {
  return allBlogs.find((post) => post.slug === params.slug);
}

export async function generateMetadata({
  params,
}: any): Promise<Metadata | undefined> {
  const post = getPost(params);

  if (!post) {
    return;
  }

  // TODO: double check the `publishedAt` meta data
  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    slug,
  } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://ctrl-f.plus/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

interface BlogProps {
  params: {
    slug: string;
  };
}

export default async function Blog({ params }: BlogProps) {
  const post = getPost(params);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section>
        <Container className="mt-18 flex flex-col tablet:mt-24">
          <FadeInStagger>
            <FadeIn className="relative flex min-h-[318px] w-full items-center justify-start rounded-3xl bg-white/[.47] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tab-pro:px-14 laptop:px-16 desktop:px-20 ">
              <Link
                href="/blog"
                className="group absolute -top-10 left-0 flex w-fit items-center justify-start gap-2 font-open-sans text-button-18 text-mongo-black"
                aria-label="Go back to blog listings"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-[#889397] duration-100 ease-in group-hover:-translate-x-1 group-hover:fill-[#889397]/70"
                  aria-hidden="true"
                >
                  <path d="M12.9999 6.83211L6.05548 6.83211L7.59049 5.2971C7.98101 4.90657 7.98101 4.27341 7.59049 3.88288L7.35157 3.64397C6.96105 3.25344 6.32788 3.25344 5.93736 3.64397L2.55473 7.0266C2.5455 7.03516 2.53639 7.04394 2.52742 7.05291L2.2885 7.29183C1.89797 7.68235 1.89797 8.31552 2.2885 8.70604L5.93965 12.3572C6.33017 12.7477 6.96334 12.7477 7.35386 12.3572L7.59278 12.1183C7.9833 11.7278 7.9833 11.0946 7.59278 10.7041L6.0587 9.16998L12.9999 9.16998C13.5522 9.16998 13.9999 8.72227 13.9999 8.16998V7.83211C13.9999 7.27982 13.5522 6.83211 12.9999 6.83211Z" />
                </svg>
                <span className="duration-100 ease-in group-hover:text-mongo-black/70">
                  back
                </span>
              </Link>

              <div className="flex justify-start gap-[9.375rem] ">
                <div className="flex flex-col items-start justify-center gap-6 ">
                  <div className="flex flex-col gap-3">
                    <p className="font-open-sans text-[#889397] tab-pro:text-fs-lg">
                      {formatDate(post.publishedAt)}
                    </p>

                    <h1 className="font-inter text-fs-x0 text-shark tab-pro:text-fs-middle desktop:text-fs-xxx">
                      {post.title}
                    </h1>
                  </div>

                  <div className="relative flex items-center space-x-2 ">
                    <Image
                      src="/images/ben-avatar.png"
                      width={1024}
                      height={80}
                      alt={`Author's Avatar`}
                      className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                      loading="lazy"
                    />
                    <div className="text-sm leading-6">
                      <p
                        // text-gray-600
                        className="font-open-sans text-fs-lg-sm text-shark tab-pro:text-fs-lg"
                      >
                        {post.author}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn className="mt-10">
              <div className="rounded-3xl bg-white/[.68] px-4 py-6 shadow-sm backdrop-blur-[23px] mobile-md:px-6 tab-pro:px-14 laptop:px-8 desktop:px-[40px]">
                <Mdx code={post?.body.code} />
              </div>
            </FadeIn>
          </FadeInStagger>
        </Container>
      </section>
    </>
  );
}
