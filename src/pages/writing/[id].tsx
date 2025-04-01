import { GetStaticProps, GetStaticPaths } from "next";
import { getPost, getAllPostIds } from "@/lib/posts";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import { components } from "@/components/mdx-components";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import Footer from "@/components/Sections/Footer";

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
    content: any;
    tableOfContents: TocItem[];
    showToc: boolean;
    showTopImage: boolean;
    image?: string;
  };
};

export default function Post({ post }: Props) {
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    // Store visited posts in local storage
    const visitedPosts = JSON.parse(
      localStorage.getItem("visitedPosts") || "[]"
    ) as Array<{ id: string; visitedAt: string }>;
    if (!visitedPosts.find((visited) => visited.id === post.id)) {
      localStorage.setItem(
        "visitedPosts",
        JSON.stringify([
          ...visitedPosts,
          {
            id: post.id,
            visitedAt: new Date().toISOString(),
          },
        ])
      );
    }

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
    <>
      <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={post.title} />
        <meta name="description" content={`Connor Rothschild | ${post.date}`} />
        <meta
          property="og:description"
          content={`Connor Rothschild | ${post.date}`}
        />
        {/* {post.image && <meta property="og:image" content={post.image} />} */}
      </Head>

      <PageTransitionWrapper>
        <div className="flex flex-col">
          {post.showTopImage && post.image ? (
            <div className="relative h-[500px] max-h-[60vh] w-[90vw] mx-auto mt-[120px] rounded-xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                // style={{ backgroundImage: `url(${post.image})` }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-8 left-8 max-w-[800px]">
            <h1 className="text-white text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-white/80 text-xl">{post.date}</p>
          </div> */}
            </div>
          ) : (
            <div className="h-12" />
          )}

          <div
            className="max-w-[1700px] mx-auto w-full relative px-4 lg:px-8 grid grid-cols-10 my-[--top-gutter]"
            style={{
              ["--top-gutter" as string]: post.showToc ? "80px" : "60px",
            }}
          >
            {post.showToc && (
              <nav
                aria-hidden
                className="tracking-[-0.01em] col-span-1 hidden md:block sticky top-[--top-gutter] h-fit w-[240px] mr-12 text-[16px] shrink-0"
              >
                <a
                  // This slug doesnt exist, but thats fine because we want to go to the top anyway
                  href="#top"
                  className="leading-tight block pl-4 py-1.5 -ml-px font-medium"
                >
                  {post.title}
                </a>
                <div className="border-l border-gray-200">
                  {post.tableOfContents.map((heading) => (
                    <a
                      key={heading.slug}
                      href={`#${heading.slug}`}
                      className={`leading-tight block pl-4 py-1.5 -ml-px border-l hover:border-gray-800 transition-colors ${
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
            )}

            <article
              className={`col-span-full w-full prose ${
                post.showToc
                  ? "md:col-start-5 md:col-span-6 lg:col-start-5 lg:col-span-4"
                  : "md:col-start-2 md:col-span-8 lg:col-start-3 lg:col-span-6"
              }`}
            >
              <h1 className="text-[2.5rem] font-medium mb-3 leading-[1.15] tracking-[-0.02em] text-wrap-pretty">
                {post.title}
              </h1>
              <div className="text-[#666] text-[1rem] mb-8">{post.date}</div>
              <MDXRemote {...post.content} components={components} />
              <hr />
              <Link
                scroll={false}
                href="/writing"
                className="mt-24 !no-underline flex items-center gap-2"
              >
                <ArrowLeftIcon />
                <span>Back to all posts</span>
              </Link>
            </article>
          </div>
          <Footer />
        </div>
      </PageTransitionWrapper>
    </>
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
