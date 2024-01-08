import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export default function SplitTextHeader({ container, phrase }) {
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });
  const words = phrase.split(" ");
  return (
    <p
      ref={container}
      className="w-full flex flex-row items-center flex-wrap gap-x-2 md:gap-x-3"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  const emphasized = [
    "software",
    "&",
    "data",
    "visualization",
    "engineer",
    "websites",
  ].includes(children.toLowerCase());

  return (
    <span
      // className="relative mr-3 mt-3"
      className={`relative text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[3.5rem] !leading-[1.135] ${
        emphasized
          ? "font-serif font-light gradient-text"
          : "text-gray-700 font-sans font-extralight"
      }`}
    >
      <span className="absolute opacity-20 !text-gray-400">{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};
