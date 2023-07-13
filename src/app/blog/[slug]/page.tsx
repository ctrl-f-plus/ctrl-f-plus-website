// // src/app/blog/[slug]/page.tsx

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

import { FC } from 'react';
import { allBlogs } from 'contentlayer/generated';

interface pageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const doc = allBlogs;
}

const page: FC<pageProps> = ({ params }: pageProps) => {
  return <div>page</div>;
};

export default page;
