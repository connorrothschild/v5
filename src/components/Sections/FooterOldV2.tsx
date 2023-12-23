import { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValue,
  animate,
} from "framer-motion";
import { easeInOutQuint } from "@/config/eases";
import CanvasGradient from "@/components/CanvasGradient";

export default function Footer() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["center end", "100% 100%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // const translateY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  // const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);

  const DEFAULT_ROTATE_X = 15;
  const DEFAULT_TRANSLATE_Y = "100%";

  const rotateX = useMotionValue(DEFAULT_ROTATE_X);
  // const translateY = useMotionValue(DEFAULT_TRANSLATE_Y);

  const [showEmail, setShowEmail] = useState(false);
  const [showEmailCopied, setShowEmailCopied] = useState(false);
  useEffect(() => {
    if (!showEmail) return;
    if (showEmailCopied) {
      const timeout = setTimeout(() => {
        setShowEmailCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [showEmail, showEmailCopied]);

  return (
    <footer
      // className="opacity-0 pointer-events-none sticky overflow-hidden h-[600px] flex flex-col justify-center bottom-0 left-0 w-full z-0 bg-gray-900"
      // className="overflow-hidden h-[600px] w-full z-0 grid grid-cols-1 lg:grid-cols-3 gap-12 relative bg-[var(--background)] py-24 px-[20px]"
      className="overflow-hidden group bg-[--background-invert] h-[600px] w-full z-0 grid grid-cols-1 lg:grid-cols-3 gap-12 relative py-24 px-4"
      ref={container}
      style={{
        perspective: "10px",
      }}
      onMouseEnter={() => {
        setShowEmail(true);
        animate(rotateX, 0, {
          duration: 0.75,
          ease: easeInOutQuint,
        });
        // animate(translateY, "50%", {
        //   duration: 0.75,
        //   ease: easeInOutQuint,
        // });
      }}
      onMouseLeave={() => {
        setShowEmail(false);
        animate(rotateX, DEFAULT_ROTATE_X, {
          duration: 1,
          ease: easeInOutQuint,
        });
        // animate(translateY, DEFAULT_TRANSLATE_Y, {
        //   duration: 1,
        //   ease: easeInOutQuint,
        // });
      }}
    >
      {/* Gradient overlaying */}
      <div className="absolute h-full w-full top-0 left-0 z-[11] bg-gradient-to-b from-transparent to-black opacity-100 group-hover:opacity-0 transition-all duration-300 delay-300 flex flex-col justify-end" />
      {/* <CanvasGradient /> */}
      {/* <Gradient /> */}
      <motion.div
        // className="col-span-2 lg:col-start-2 flex flex-col justify-center items-start relative z-10"
        className="col-span-3 lg:col-start-1 flex flex-col justify-center items-start relative z-10"
        style={{
          opacity,
          // translateY,
          rotateX,
          transformOrigin: "center",
          transformStyle: "preserve-3d",
        }}
      >
        {/* <CanvasGradient svgOpacity={svgOpacity} width="100vw" height="100vh" /> */}

        <motion.h2
          key={showEmailCopied}
          className="cursor-pointer font-serif text-[1.5rem] md:text-[2.5rem] z-20 text-left leading-none text-gray-200 font-extralight"
          onClick={() => {
            // Copy email to clipboard
            navigator.clipboard.writeText("connor@connorrothschild.com");
            setShowEmailCopied(true);
          }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{
            y: 0,
            opacity: showEmail ? 1 : 0,
          }}
          exit={{
            y: "100%",
            opacity: showEmail ? 1 : 0,
          }}
          // transition={{
          //   delay: showEmailCopied ? 0 : showEmail ? 1 : 0,
          // }}
        >
          {showEmailCopied ? "copied" : "connor@"}
        </motion.h2>

        <h1
          onClick={() => {
            // Copy email to clipboard
            navigator.clipboard.writeText("connor@connorrothschild.com");
            setShowEmailCopied(true);
          }}
          // className="cursor-pointer font-serif text-[40px] sm:text-[50px] md:text-[60px] lg:text-[7.5vw] z-20 text-left leading-[.8] text-white font-extralight "
          className="cursor-pointer font-serif text-[9vw] z-20 text-left leading-[.8] text-white font-light"
        >
          CONNORROTHSCHILD
        </h1>
        {/* <div className="z-40 text-lg flex justify-start lg:justify-end gap-2 items-center w-full text-gray-200 font-light text-center max-w-[300px] lg:ml-auto mt-3 lg:mt-6">
          <FooterSocialLink
            label="X"
            link="https://twitter.com/CL_Rothschild"
          />
          <span className="font-serif text-gray-500 font-extralight">&</span>

          <FooterSocialLink
            label="IG"
            link="https://www.instagram.com/connorrothschild/"
          />
          <span className="font-serif text-gray-500 font-extralight">&</span>
          <FooterSocialLink
            label="LI"
            link="https://www.linkedin.com/in/connor-rothschild/"
          />
        </div> */}
      </motion.div>
    </footer>
  );
}

function FooterSocialLink({ label, link }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative font-sans uppercase cursor-pointer"
      style={{
        perspective: "100px",
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div
        className="overflow-hidden relative flex flex-col group h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 800ms cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <p
          className="transition-all duration-[500ms] ease-in-out pointer-events-none"
          style={{
            opacity: isActive ? 0 : 1,
            transform: isActive
              ? "translateY(DEFAULT_TRANSLATE_Y%)"
              : "translateY(0)",
          }}
        >
          {label}
        </p>
        <p
          className="absolute transform transition-all duration-[500ms] ease-in-out pointer-events-none"
          style={{
            transform: isActive ? "none" : "rotateX(-90deg)",
            opacity: isActive ? 1 : 0,
            transformOrigin: "bottom center",
            transitionDelay: isActive ? "100ms" : "0ms",
          }}
        >
          {label}
        </p>
      </div>
    </a>
  );
}

function Gradient() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 800 800"
      className="absolute top-0 left-0 w-full z-[-1]"
    >
      <defs>
        <filter
          id="bbblurry-filter"
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feGaussianBlur
            stdDeviation="51"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="SourceGraphic"
            edgeMode="none"
            result="blur"
          ></feGaussianBlur>
        </filter>
      </defs>
      <g filter="url(#bbblurry-filter)">
        <ellipse
          rx="243.5"
          ry="78"
          cx="413.62599717384865"
          cy="453.64640320782894"
          fill="hsla(212, 72%, 59%, 1.00)"
        ></ellipse>
        <ellipse
          rx="243.5"
          ry="78"
          cx="30.74883729625128"
          cy="519.9080150664164"
          fill="hsla(37, 91%, 55%, 1.00)"
        ></ellipse>
        <ellipse
          rx="243.5"
          ry="78"
          cx="180.56206244823193"
          cy="290.1731225458115"
          fill="hsla(0, 52%, 74%, 1.00)"
        ></ellipse>
      </g>
    </svg>
  );
}
