// // app/blog/[slug]/page.tsx

// interface PageProps

// export default function Blog({ params }: any) {
//   // const post = allBlogs.find((post) => post.slug === params.slug);

//   return (
//     <>
//       <div className="bg-red-500">
//         <h1>Blog Post</h1>
//       </div>
//     </>
//   );
// }

import { allBlogs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Mdx } from '@/app/components/mdx';
import Balancer from 'react-wrap-balancer';
import Container from '@/app/components/layout/Container';

interface pageProps {
  params: {
    slug: string;
  };
}

// async function getBlogPostFromParams(slug: string) {
export default async function Blog({ params }) {
  // const post = allBlogs.find((post) => post.slugAsParams === slug);
  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  //   return post;
  // }

  // const page = async ({ params }: pageProps) => {
  //   const post = await getBlogPostFromParams(params.slug);

  // @ts-ignore
  return (
    <>
      <section>
        <Container>
          {/* <script type="application/ld+json" suppressHydrationWarning>
          {JSON.stringify(post.structuredData)}
        </script> */}
          <h1 className="">
            <Balancer>{post.title}</Balancer>
          </h1>
          <Mdx code={post?.body.code} />;
        </Container>
      </section>
    </>
  );
}

// export default page;
