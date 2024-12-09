// pages/blog/[id].tsx
import { GetStaticProps, GetStaticPaths } from "next";
import { getPost, getAllPostIds } from "@/lib/posts";
import React, { useEffect, useState } from "react";

type TocItem = {
  value: string;
  depth: number;
  slug: string;
};

type Props = {
  post: {
    id: string;
    title: string;
    date: string;
    content: string;
    tableOfContents: TocItem[];
  };
};

export default function Post({ post }: Props) {
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    const headings = document.querySelectorAll("h2, h3, h4");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  return (
    <div className="relative px-4 lg:px-8 grid grid-cols-10 [--top-gutter:150px] my-[--top-gutter]">
      <nav
        aria-hidden
        className="font-serif tracking-[-0.02em] col-span-1 hidden md:block sticky top-[--top-gutter] h-fit w-[240px] mr-12 text-[16px] shrink-0"
      >
        <div className="border-l border-gray-200">
          {post.tableOfContents.map((heading) => (
            <a
              key={heading.slug}
              href={`#${heading.slug}`}
              className={`leading-tight block pl-4 py-1 -ml-px border-l hover:border-gray-800 transition-colors ${
                activeHeading === heading.slug
                  ? "border-gray-800 text-gray-900"
                  : "border-transparent text-gray-500"
              } ${heading.depth === 3 ? "pl-8" : ""} ${
                heading.depth === 4 ? "pl-12" : ""
              }`}
              style={
                {
                  textWrap: "pretty",
                } as React.CSSProperties
              }
            >
              {heading.value}
            </a>
          ))}
        </div>
      </nav>

      <article className="col-span-full md:col-start-5 md:col-span-6 lg:col-start-5 lg:col-span-4 w-full font-serif">
        <h1 className="text-[2.5rem] font-bold mb-3 leading-tight tracking-[-0.02em]">
          {post.title}
        </h1>
        <div className="text-[#666] text-[1rem] mb-8">{post.date}</div>
        <div
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params?.id as string);
  return {
    props: {
      post,
    },
  };
};
