import { useEffect, useRef } from "react";
import { useTransform, useScroll, motion, useSpring } from "framer-motion";
import { easeInOutQuint } from "@/config/eases";

import CursorShadow from "@/components/CursorShadow";
import CanvasGradient from "../CanvasGradient";
import GradientButton from "../GradientButton";

const Hero = () => {
  useEffect(() => {
    const handleMousemove = (e) => {
      const { clientX, clientY } = e;
      document.documentElement.style.setProperty("--x", `${clientX}px`);
      document.documentElement.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", handleMousemove);

    return () => {
      window.removeEventListener("mousemove", handleMousemove);
    };
  }, []);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref, // This isn't doing anything since the element is sticky. Could use useViewportScroll to see when 100% of the page is scrolled down.
    offset: ["0%", "50%"],
  });

  const svgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const shadowSize = useSpring(40, { damping: 100, stiffness: 1000 });
  const LOADING_TIME = 3;

  return (
    <div className="h-screen z-[1] sticky top-0" ref={ref}>
      <motion.div
        style={{
          margin: "0 auto",
          background:
            "linear-gradient(to bottom, transparent, var(--background))",
        }}
        className="transform-gpu flex items-center justify-center transform-origin-center h-screen w-screen overflow-hidden relative"
      >
        {/* <CursorShadow shadowSize={shadowSize} shadowOpacity={svgOpacity} /> */}
        <CanvasGradient opacity={svgOpacity} />

        {/* Top left */}
        <div className="absolute top-4 left-4 flex flex-col items-start mix-blend-overlay">
          <div className="overflow-hidden pr-1">
            <motion.h1
              className="text-left text-[4rem] md:text-[6.57rem] leading-[.9] text-black font-normal uppercase tracking-tighter"
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

          <div className="overflow-hidden pr-1">
            <motion.h1
              className="text-left text-[4rem] md:text-[6.57rem] leading-[.9] text-black font-normal uppercase tracking-tighter"
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
        <div className="hidden lg:flex absolute top-4 right-4 flex-col items-end mix-blend-soft-light">
          <div className="overflow-hidden pr-1">
            <motion.h1
              className="text-right text-[6.57rem] leading-[.9] text-black font-normal uppercase tracking-tighter opacity-30"
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
          <div className="overflow-hidden pr-1">
            <motion.h1
              className="text-right text-[6.57rem] leading-[.9] text-black font-normal uppercase tracking-tighter opacity-30"
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

        <div className="absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 w-full -translate-y-1/2 flex flex-col items-center justify-center mix-blend-overlay">
          {/* <h1
            className="cursor-none p-8 text-center text-[1.57rem] leading-[.95] text-black font-light uppercase tracking-normal font-serif"
            onMouseOver={() => {
              shadowSize.set(10);
            }}
            onMouseLeave={() => {
              shadowSize.set(40);
            }}
          >
            Make beautiful stuff on the web.
          </h1> */}
          <GradientButton />
        </div>

        <div className="pl-12 leading-none font-light py-4 text-right absolute bottom-0 left-[6px] w-[calc(100%-12px)] text-xl flex flex-col text-gray-700 border-t border-gray-500 mix-blend-overlay tracking-[0.0125rem] font-serif">
          The professional portfolio of software developer, data visualization
          engineer, and designer Connor Rothschild.
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
