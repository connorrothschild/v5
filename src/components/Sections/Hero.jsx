import { useEffect, useRef, useState } from "react";
import {
  useTransform,
  useScroll,
  motion,
  useAnimate,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { easeInOutQuint } from "@/config/eases";

import { useWindowSize } from "@react-hook/window-size";

import CanvasGradient from "@/components/CanvasGradient";

const LOADING_TIME = 3.25;

export default function Hero() {
  // useEffect(() => {
  //   const handleMousemove = (e) => {
  //     const { clientX, clientY } = e;
  //     document.documentElement.style.setProperty("--x", `${clientX}px`);
  //     document.documentElement.style.setProperty("--y", `${clientY}px`);
  //   };

  //   window.addEventListener("mousemove", handleMousemove);

  //   return () => {
  //     window.removeEventListener("mousemove", handleMousemove);
  //   };
  // }, []);

  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHasLoaded(true);
    }, LOADING_TIME * 1000);
  }, []);

  const [width, height] = useWindowSize();

  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef);

  return (
    <>
      {/* Create a dummy element that is 1px tall, at the top of the screen.
      This element will be representative of whether the page is fully scrolled to the top. */}
      <div ref={scrollRef} className="absolute top-0 left-0 w-full h-px" />

      <div className="pointer-events-none sticky top-0 left-0 z-10" id="home">
        {/* <span className="z-[9] absolute bottom-24 right-8 user-select-none font-serif font-extralight tracking-wide text-yellow-500">
          psst. there&apos;s music—click the menu ☺
        </span> */}
        <motion.div
          // BOUNCY:
          // transition={{ ease: circInOut, duration: 1 }}
          // transition={{ ease: [0.14, 1.26, 0.64, 1], duration: 0.6 }}
          transition={{ ease: easeInOutQuint, duration: 0.6 }}
          animate={{
            clipPath:
              isInView || !hasLoaded
                ? "inset(0px 0px 0px 0px round 0)"
                : `inset(20px 20px ${height - 80}px 20px round 10px)`,
          }}
          className="transform-gpu flex items-center justify-center transform-origin-center h-screen w-screen overflow-hidden"
        >
          {/* Gradient spanning entire hero, from transparent to --background */}
          {/* <div className="pointer-events-none absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[--background] z-[49]" /> */}

          <CanvasGradient width="100vw" height="100vh" />

          <div className="hidden md:flex pl-12 leading-none font-light py-4 text-right absolute bottom-0 right-4 w-[calc(100%-12px)] text-xl flex-col text-gray-300 mix-blend-screen tracking-[0.0125rem] font-serif z-[49]">
            The portfolio of software & data visualization engineer, Connor
            Rothschild.
          </div>
          <div className="flex md:hidden pl-12 leading-none font-light py-4 text-right absolute bottom-0 right-4 text-xl flex-col text-gray-300 mix-blend-screen tracking-[0.0125rem] font-serif z-[49]">
            2024 Portfolio
          </div>
          <Name hasLoaded={hasLoaded} />
        </motion.div>
      </div>
    </>
  );
}

function Name({ hasLoaded }) {
  return (
    <div
      className="absolute top-0 left-0 z-[-1] h-full w-full flex flex-col md:flex-row text-center justify-center items-center mix-blend-hard-light"
      style={{
        gap: hasLoaded ? ".75rem" : "0.25rem",
      }}
    >
      <div className="">
        <motion.div
          layout="position"
          className="font-serif text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-[.85] text-white font-light"
        >
          C
          {["o", "n", "n", "o", "r"].map((letter, i) => (
            <AnimatePresence key={i}>
              {hasLoaded && (
                <motion.span
                  key={i}
                  className="inline-block font-serif"
                  animate={{ translateX: 0, rotateY: 0, opacity: 1 }}
                  initial={{ translateX: "100%", rotateY: 90, opacity: 0 }}
                  // animate={{ translateY: 0, rotateY: 0, opacity: 1 }}
                  // initial={{ translateY: "100%", rotateY: 15, opacity: 0 }}
                  transition={{
                    ease: easeInOutQuint,
                    duration: 1,
                    delay: (i - 1) * (0.25 / 5),
                  }}
                >
                  {letter}
                </motion.span>
              )}
            </AnimatePresence>
          ))}
        </motion.div>
      </div>

      <div className="">
        <motion.div
          layout="position"
          className="font-serif text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-[.85] text-white font-light"
        >
          R
          {["o", "t", "h", "s", "c", "h", "i", "l", "d"].map((letter, i) => (
            <AnimatePresence key={i}>
              {hasLoaded && (
                <motion.span
                  className="inline-block font-serif"
                  animate={{ translateX: 0, rotateY: 0, opacity: 1 }}
                  initial={{ translateX: "100%", rotateY: 90, opacity: 0 }}
                  // animate={{ translateY: 0, rotateY: 0, opacity: 1 }}
                  // initial={{ translateY: "-100%", rotateY: -15, opacity: 0 }}
                  transition={{
                    ease: easeInOutQuint,
                    duration: 1,
                    delay: (i - 1) * (0.25 / 9),
                  }}
                >
                  {letter}
                </motion.span>
              )}
            </AnimatePresence>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
