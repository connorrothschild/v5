import { useEffect, useRef, useMemo, useState, memo } from "react";
import {
  useTransform,
  useScroll,
  motion,
  circOut as ease,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { easeInOutQuint } from "@/config/eases";
import RotatingGradient from "@/components/Archived/RotatingGradient";

// const allPortfolioItems = [
//   {
//     title: "Project #1",
//     category: "websites",
//     image: "https://picsum.photos/200/300",
//     xPosition: 10,
//     yPosition: 10,
//   },
//   {
//     title: "Project #2",
//     category: "websites",
//     image: "https://picsum.photos/200/300",
//     xPosition: 70,
//     yPosition: 10,
//   },
//   {
//     title: "Project #3",
//     category: "websites",
//     image: "https://picsum.photos/200/300",
//     xPosition: 30,
//     yPosition: 70,
//   },
//   {
//     title: "Project #4",
//     category: "software",
//     image: "https://picsum.photos/200/300",
//     xPosition: 50,
//     yPosition: 10,
//   },
//   {
//     title: "Project #5",
//     category: "software",
//     image: "https://picsum.photos/200/300",
//     xPosition: 50,
//     yPosition: 70,
//   },
//   {
//     title: "Project #7",
//     category: "data visualizations",
//     image: "https://picsum.photos/200/300",
//     xPosition: 30,
//     yPosition: 10,
//   },
//   {
//     title: "Project #8",
//     category: "data visualizations",
//     image: "https://picsum.photos/200/300",
//     xPosition: 70,
//     yPosition: 70,
//   },
//   {
//     title: "Project #9",
//     category: "data visualizations",
//     image: "https://picsum.photos/200/300",
//     xPosition: 10,
//     yPosition: 70,
//   },
// ];

const Hero = ({}) => {
  console.log("rendering Hero");

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  // Required to use same unit for start and end clipPath
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    // ["circle(100% at 50% 50%)", "circle(0% at 50% 50%)"]
    ["circle(2000px at 50% 50%)", "circle(250px at 50% 50%)"]
  );
  // const clipPath = useTransform(
  //   scrollYProgress,
  //   [0, 1],
  //   // ["inset(0 0 0 0)", "inset(400px 400px 400px 400px)"]
  // );

  const shadowSize = useSpring(40, { damping: 100, stiffness: 1000 });
  const LOADING_TIME = 3;

  return (
    // https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/
    <div className="h-[300vh] relative" ref={ref}>
      <div className="sticky top-0 h-screen">
        <motion.div
          style={{
            clipPath,
            margin: "0 auto",
          }}
          className="transform-gpu flex items-center justify-center transform-origin-center h-screen w-screen overflow-hidden relative"
        >
          {/* <video
            className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
            style={{
              filter: "brightness(0.75)",
            }}
            autoPlay
            muted
            loop
            src="https://res.cloudinary.com/air-company/video/upload/c_scale,q_auto:best,w_960/v1673977241/Website/MWxAIRCO_overview_mobile-hb-rf25_3_njpwpr_Re_h6d9bl.mp4"
            // src="/videos/2.mp4"
            // src="/videos/stars.mp4"
          /> */}

          <RotatingGradient
            hue={250}
            saturation={100}
            lightness={10}
            // shadowSize={shadowSize}
            randomUuid="hero"
          />

          {/* Top left */}
          <div className="absolute top-4 left-4 flex flex-col items-start mix-blend-exclusion">
            <div className="overflow-y-hidden pr-px">
              <motion.h1
                className="text-center text-[6.57rem] leading-[.95] text-white font-light uppercase tracking-tighter"
                animate={{ translateY: 0 }}
                initial={{ translateY: "100%" }}
                transition={{
                  ease: easeInOutQuint,
                  duration: 1,
                  delay: LOADING_TIME,
                }}
              >
                Connor
              </motion.h1>
            </div>

            <div className="overflow-y-hidden pr-px">
              <motion.h1
                className="text-center text-[6.57rem] leading-[.95] text-white font-light uppercase tracking-tighter"
                animate={{ translateY: 0 }}
                initial={{ translateY: "100%" }}
                transition={{
                  ease: easeInOutQuint,
                  duration: 1,
                  delay: LOADING_TIME + 0.382,
                }}
              >
                Rothschild
              </motion.h1>
            </div>
          </div>

          {/* Top right */}
          <div className="hidden lg:flex absolute top-4 right-4 flex-col items-end mix-blend-overlay">
            <div className="overflow-y-hidden pr-px">
              <motion.h1
                className="text-center text-[6.57rem] leading-[.95] text-white font-light uppercase tracking-tighter opacity-30"
                animate={{ translateY: 0 }}
                initial={{ translateY: "100%" }}
                transition={{
                  ease: easeInOutQuint,

                  duration: 1,
                  delay: LOADING_TIME + 0.382,
                }}
              >
                Portfolio
              </motion.h1>
            </div>
            <div className="overflow-y-hidden pr-px">
              <motion.h1
                className="text-center text-[6.57rem] leading-[.95] text-white font-light uppercase tracking-tighter opacity-30"
                animate={{ translateY: 0 }}
                initial={{ translateY: "100%" }}
                transition={{
                  ease: easeInOutQuint,
                  duration: 1,
                  delay: LOADING_TIME,
                }}
              >
                2023
              </motion.h1>
            </div>
          </div>

          {/* List of clients, middle */}
          <div className="absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 w-full -translate-y-1/2 flex flex-col items-center justify-center mix-blend-overlay">
            <h1
              className="cursor-none p-8 text-center text-[1.57rem] leading-[.95] text-white font-light uppercase tracking-normal"
              onMouseOver={() => {
                console.log("hovering");
                shadowSize.set(10);
              }}
              onMouseLeave={() => {
                shadowSize.set(40);
              }}
            >
              {/* Available for freelance beginning December 2023. */}
              Make{" "}
              {/* <span
                style={{
                  fontFamily: "Instrument Serif",
                }}
                className="tracking-wider"
              >
                beautiful stuff
              </span>{" "} */}
              beautiful stuff on the web.
            </h1>
          </div>

          {/* Bottom, spans entire screen */}
          <div className="pl-12 leading-none font-light py-4 text-right absolute bottom-0 left-[6px] w-[calc(100%-12px)] text-xl flex flex-col text-gray-200 border-t border-gray-400 mix-blend-overlay tracking-[0.0125rem] font-serif">
            The professional portfolio of software developer, data visualization
            engineer, and designer Connor Rothschild.
            {/* Last updated 2023. */}
          </div>
          {/* <section className="z-20 flex p-8 h-screen flex-col justify-center w-full items-center relative">
            <div className="flex flex-row gap-4">
              <div className="overflow-hidden">
                <motion.h1
                  className="text-center text-[6.57rem] leading-[.95] text-white font-light uppercase tracking-tighter"
                  animate={{ translateY: 0 }}
                  initial={{ translateY: "100%" }}
                  transition={{
                    ease: easeInOutQuint,
                    duration: 1,
                    delay: LOADING_TIME,
                  }}
                >
                  Connor
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  className="text-center text-[6.57rem] leading-[.95] text-white font-light uppercase tracking-tighter"
                  animate={{ translateY: 0 }}
                  initial={{ translateY: "100%" }}
                  transition={{
                    ease: easeInOutQuint,
                    duration: 0.618,
                    delay: LOADING_TIME + 0.382,
                  }}
                >
                  Rothschild
                </motion.h1>
              </div>
            </div>
            <div className="flex gap-4 overflow-hidden mt-px">
              {["Developer,", "Engineer,", "Designer"].map((item, index) => (
                <motion.h2
                  key={index}
                  animate={{ translateY: 0 }}
                  initial={{ translateY: "-100%" }}
                  transition={{
                    ease: easeInOutQuint,
                    duration: 1.218,
                    delay: LOADING_TIME + 0.182 + index * 0.1,
                  }}
                  onMouseOver={() => {
                    shadowSize.set(10);
                    setHoveredCategory(item);
                  }}
                  onMouseLeave={() => {
                    shadowSize.set(40);
                    setHoveredCategory(null);
                    imageTranslateX.set(0);
                    imageTranslateY.set(0);
                  }}
                  onMouseMove={(e) => {
                    // Scale according to mouse position within the relevant span
                    // const imageXTranslate =
                    //   (e.clientX - e.target.offsetLeft) / 10;
                    // const imageYTranslate =
                    //   (e.clientY - e.target.offsetTop) / 5;
                    // imageTranslateX.set(imageXTranslate);
                    // imageTranslateY.set(imageYTranslate);
                  }}
                  className={`${
                    hoveredCategory &&
                    hoveredCategory !== item &&
                    "opacity-30 blur-[2px]"
                  } text-[3rem] transition-[all] duration-300 ease-in-out cursor-none text-center z-20 leading-[1] text-white opacity-50 font-normal uppercase tracking-tight`}
                >
                  {item}
                </motion.h2>
              ))}
            </div>
          </section> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
