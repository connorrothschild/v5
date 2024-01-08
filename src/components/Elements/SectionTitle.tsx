import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";

export default function SectionTitle({
  children,
  classes = "",
}: {
  children: React.ReactNode;
  classes?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.05, 0.2]);

  return (
    <>
      <motion.h1
        className={`select-none hidden md:block absolute -top-24 leading-none text-[17vw] opacity-20 font-serif font-extralight text-gray-600 italic ${classes}`}
        ref={ref}
        style={{ translateY, opacity }}
      >
        {children}
      </motion.h1>
      <h1 className="md:hidden block text-gray-500 text-xl font-serif italic font-light tracking-wide -mb-9">
        {children}
      </h1>
    </>
  );
}
