import { easeInOutQuint } from "@/config/eases";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useInView, motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import Dot from "../Elements/Dot";

const images = [
  { src: "/images/mockups/praxis 1.jpg", columns: 3 },
  { src: "/images/mockups/praxis 2.jpg", columns: 1 },
  { src: "/images/mockups/praxis 3.jpg", columns: 2 },
  { src: "/images/mockups/praxis 4.jpg", columns: 2 },
];

export default function ImageGrid() {
  const [hoveredImage, setHoveredImage] = React.useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.25 });

  const container = {
    hidden: {
      opacity: 0,
      pointerEvents: "none",
      transition: {
        staggerChildren: 0.05,
        pointerEvents: {
          duration: 0,
        },
      },
    },
    exit: {
      opacity: 0,
      pointerEvents: "none",
      transition: {
        pointerEvents: {
          duration: 0,
        },
      },
    },
    visible: {
      opacity: 1,
      pointerEvents: "auto",
      transition: {
        staggerChildren: 0.05,
        pointerEvents: {
          delay: 1.1,
        },
      },
    },
  };

  const variants = {
    hidden: {
      opacity: 0,
      y: 100,
      pointerEvents: "none",
      transition: {
        pointerEvents: {
          duration: 0,
        },
      },
    },
    exit: {
      opacity: 0,
      pointerEvents: "none",
      transition: {
        pointerEvents: {
          duration: 0,
        },
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      transition: {
        y: {
          duration: 1.1,
          ease: easeInOutQuint,
        },
        opacity: {
          duration: 1.1,
          ease: easeInOutQuint,
        },
        pointerEvents: {
          delay: 1.1,
          duration: 0,
        },
      },
    },
  };

  return (
    <section className="px-[20px]">
      <motion.div
        className="grid sm:grid-cols-4 md:grid-rows-2 gap-2 max-w-7xl w-full max-h-[700px] mx-auto relative"
        ref={ref}
        variants={container}
        initial="hidden"
        whileInView="visible"
        exit="exit"
      >
        {images.map((image, index) => (
          <div
            className="group relative overflow-hidden rounded-xl max-sm:!col-span-1"
            style={{
              gridColumn: `span ${image.columns}`,
            }}
            key={index}
          >
            <motion.img
              className="object-cover rounded-xl h-full w-full"
              src={image.src}
              alt=""
              variants={variants}
              //   style={{
              //     filter:
              //       hoveredImage !== null && hoveredImage !== index
              //         ? "blur(2px)"
              //         : "none",
              //     transition: "filter 0.5s ease",
              //   }}
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
            />
            {/* Gradient that appears on hover, from top to bottom, transparent to black */}
            <div className="absolute p-4 top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end">
              <p className="text-white text-lg font-sans font-light">Praxis</p>
              <p className="text-gray-300 text-sm font-serif italic font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        ))}
      </motion.div>
      <Link
        href="/archive"
        className="text-gray-500 font-sans text-base flex flex-row items-center gap-1.5 mt-3 justify-end max-w-7xl mx-auto"
      >
        View all <Dot />
      </Link>
    </section>
  );
}
