// src/app/blog/components/blog-card.tsx

// TODO: date could be a date type add formatter?
type BlogCard = {
  title: string;
  date: string;
};

export default function BlogCard(post: any) {
  return (
    <>
      <li
        key={post.title}
        className="rounded-3xl bg-white/[.68] px-[24px] py-[19px] shadow-sm backdrop-blur-[23px]"
      >
        <div className="">
          <h2 className="font-inter text-subtitle text-dark1">{post.title}</h2>
          <p className="font-open-sans text-fs-lg text-dark1">{post.date}</p>
        </div>
      </li>
    </>

    // <div>
    //   <div key={post.title} className="flex justify-around">
    //     <li
    //       key={post.title}
    //       // className="flex max-w-xl items-start rounded-3xl bg-white/[.68] px-[24px] py-[19px] backdrop-blur-[23px]"
    //       className="min-w-[36rem] rounded-3xl bg-white/[.68] px-[24px] py-[19px] shadow-sm backdrop-blur-[23px]"
    //     >
    //       <div className="flex w-full flex-col items-start gap-2 gap-[12px] p-2">
    //         <h2 className="w-full font-inter text-subtitle text-dark1">
    //           {post.title}
    //         </h2>
    //         <p className="font-open-sans text-fs-lg text-dark1">{post.date}</p>
    //       </div>
    //     </li>
    //   </div>
    // </div>
  );
}
