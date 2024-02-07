import React, { useRef } from "react";
import VideoPlayer from "../VideoPlayer";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Showreel() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start center"],
  });

  // const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // const translateY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.section
      className="max-w-7xl px-[20px] mx-auto mt-24 md:-mt-36 mb-24 md:mb-64"
      ref={container}
    >
      <VideoPlayer />
    </motion.section>
  );
}
