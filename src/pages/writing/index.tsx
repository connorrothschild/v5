import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { useState, useEffect, CSSProperties } from "react";

type Post = {
  id: string;
  title: string;
  date: string;
  category: string;
  image?: string;
};

type VisitedPost = {
  id: string;
  visitedAt: string;
};

interface Props {
  posts: Post[];
}

const CATEGORY_LABELS = {
  personal: "Personal",
  technical: "Technical",
} as const;

const META_TITLE = "Writing | Connor Rothschild";
const META_DESCRIPTION =
  "Thoughts on web development, design, and data visualization";

export default function Writing({ posts }: Props) {
  const [visitedPosts, setVisitedPosts] = useState<VisitedPost[]>([]);

  useEffect(() => {
    const storedVisitedPosts = JSON.parse(
      localStorage.getItem("visitedPosts") || "[]"
    ) as VisitedPost[];
    setVisitedPosts(storedVisitedPosts);
  }, []);

  const categories = Object.keys(CATEGORY_LABELS) as Array<
    keyof typeof CATEGORY_LABELS
  >;
  const postsByCategory = categories.reduce((acc, category) => {
    acc[category] = posts
      .filter((post) => post.category === category)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return acc;
  }, {} as Record<keyof typeof CATEGORY_LABELS, Post[]>);

  return (
    <>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META_TITLE} />
        <meta name="twitter:description" content={META_DESCRIPTION} />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
      </Head>
      <PageTransitionWrapper>
        <section className="max-w-5xl mx-auto w-full pt-48 pb-24 relative flex flex-col items-start justify-start min-h-screen text-black px-[20px]">
          <div className="max-w-5xl mx-auto w-full">
            <h1 className="text-5xl md:text-7xl font-sans font-extralight text-gray-700 mb-12 tracking-[-0.02em]">
              Writing
            </h1>

            <ChatBot />
            <div className="grid gap-24">
              {categories.map((category) => (
                <section key={category} className="relative">
                  <h2 className="text-xl font-sans font-extralight text-gray-700 mb-1">
                    {CATEGORY_LABELS[category]}
                  </h2>
                  <div className="grid">
                    {postsByCategory[category].map((post, index) => (
                      <Link
                        scroll={false}
                        href={`/writing/${post.id}`}
                        key={post.id}
                        className="group no-underline"
                      >
                        <article
                          className="grid grid-cols-[auto,1fr] items-center gap-8 py-6 border-b border-gray-200"
                          style={
                            {
                              "--opacity": visitedPosts.find(
                                (v) => v.id === post.id
                              )
                                ? 0.65
                                : 1,
                            } as CSSProperties
                          }
                        >
                          {/* <span className="text-sm font-mono text-gray-400">
                            {String(index + 1).padStart(2, "0")}
                          </span> */}

                          <div className="grid gap-1.5">
                            <h3 className="opacity-[--opacity] text-lg leading-[1.25] font-medium text-gray-900 flex items-center gap-2">
                              {post.title}
                              <ArrowRightIcon className="opacity-0 group-hover:opacity-100 max-sm:hidden transition-opacity duration-300" />
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <time className="opacity-[--opacity] text-sm text-gray-500">
                                {post.date}
                              </time>
                              {visitedPosts.find((v) => v.id === post.id) && (
                                <ExpandedDate
                                  date={
                                    visitedPosts.find((v) => v.id === post.id)!
                                      .visitedAt
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </PageTransitionWrapper>
    </>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/Sections/Footer";
import { ChatBot } from "@/components/Chat/ChatBot";

function ExpandedDate({ date }: { date: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      className="whitespace-nowrap w-max inline-block text-[11px] px-2 py-1 rounded-full bg-[#eaeaea] text-[#666666]"
      initial="default"
      whileHover="hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div className="inline-block">
        Read{" "}
        {new Date(date).toLocaleDateString("en-US", {
          month: "long",
        })}
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            className="inline-block ml-[2px]"
            initial={{ width: 0, marginLeft: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              width: "auto",
              marginLeft: "2px",
              transition: {
                width: {
                  ease: [0.76, 0, 0.24, 1],
                  duration: 0.4,
                },
                marginLeft: {
                  ease: [0.76, 0, 0.24, 1],
                  duration: 0.4,
                },
                opacity: {
                  delay: 0.4,
                },
              },
            }}
            exit={{
              opacity: 0,
              width: 0,
              marginLeft: 0,
              transition: {
                width: {
                  ease: [0.76, 0, 0.24, 1],
                  duration: 0.4,
                },
                marginLeft: {
                  ease: [0.76, 0, 0.24, 1],
                  duration: 0.4,
                },
                opacity: {
                  delay: 0,
                },
              },
            }}
          >
            {new Date(date).toLocaleDateString("en-US", {
              day: "numeric",
            })}
            ,{" "}
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.span>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        date: post.date,
        category: post.category,
        image: post.image,
      })),
    },
  };
};
