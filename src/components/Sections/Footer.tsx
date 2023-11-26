import { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValue,
  animate,
} from "framer-motion";
import { easeInOutQuint } from "@/config/eases";

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
  const DEFAULT_TRANSLATE_Y = -10;

  const rotateX = useMotionValue(DEFAULT_ROTATE_X);
  const translateY = useMotionValue(DEFAULT_TRANSLATE_Y);

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
      // className="overflow-hidden h-[600px] w-full z-0 grid grid-cols-1 lg:grid-cols-3 gap-12 relative bg-[var(--background)] py-24 px-4 lg:px-12"
      className="overflow-hidden h-[600px] w-full z-0 grid grid-cols-1 lg:grid-cols-3 gap-12 relative bg-[var(--background)] py-24 px-4"
      ref={container}
      style={{
        perspective: "10px",
      }}
      onMouseEnter={() => {
        setShowEmail(true);
        animate(rotateX, 0, {
          duration: 1,
          ease: easeInOutQuint,
        });
        animate(translateY, 0, {
          duration: 1,
          ease: easeInOutQuint,
        });
      }}
      onMouseLeave={() => {
        setShowEmail(false);
        animate(rotateX, DEFAULT_ROTATE_X, {
          duration: 1,
          ease: easeInOutQuint,
        });
        animate(translateY, DEFAULT_TRANSLATE_Y, {
          duration: 1,
          ease: easeInOutQuint,
        });
      }}
    >
      <motion.div
        // className="col-span-2 lg:col-start-2 flex flex-col justify-center items-start relative z-10"
        className="col-span-3 lg:col-start-1 flex flex-col justify-center items-start relative z-10"
        style={{
          opacity,
          translateY,
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
          className="cursor-pointer font-serif text-[11.7vw] z-20 text-left leading-[.8] text-white font-extralight "
        >
          connorrothschild.com
        </h1>
        <div className="text-lg flex justify-start lg:justify-end gap-2 items-center w-full text-gray-200 font-light text-center max-w-[300px] lg:ml-auto mt-3 lg:mt-6">
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
        </div>
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
