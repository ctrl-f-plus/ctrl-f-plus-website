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

interface pageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const post = allBlogs.find((post) => post.slugAsParams === slug);

  if (!post) notFound;

  return post;
}

const page = async ({ params }: pageProps) => {
  const post = await getDocFromParams(params.slug);

  // @ts-ignore
  return (
    <>
      <div>
        <h1 className="text-red-500">{post.title}</h1>
        <Mdx code={post?.body.code} />;
      </div>
    </>
  );
};

export default page;
