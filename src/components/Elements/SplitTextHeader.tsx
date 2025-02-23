import { easeInOutQuint } from "@/config/eases";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import VideoPlayer from "../VideoPlayer";
import React, { useEffect, useState } from "react";

import me from "@/components/_Images/me/andys-low.webp";

export default function SplitTextHeader({
  phrase,
  setTriggerBounce,
}: {
  phrase: string;
  setTriggerBounce: (triggerBounce: number) => void;
}) {
  const words = phrase.split(" ");
  const [numberOfHoveredWords, setNumberOfHoveredWords] = useState(0);

  const [tooltip, setTooltip] = useState<string | null>(null);

  // On mobile, we want everything to be visible, don't want to force the user to click on every word lol
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* <AnimatePresence>
        {tooltip && (
          <motion.div
            className="pointer-events-none absolute top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center"
            // onMouseDown={() => {
            //   setTooltip(null);
            // }}

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence> */}
      <p className="self-center flex flex-wrap gap-x-[.4em] md:gap-x-[.65em] text-gray-600 select-none">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word
              key={i}
              setNumberOfHoveredWords={setNumberOfHoveredWords}
              isMobile={isMobile}
              tooltip={tooltip}
              setTooltip={setTooltip}
              setTriggerBounce={setTriggerBounce}
            >
              {word}
            </Word>
          );
        })}
      </p>
      {/* <Link
        scroll={false}
        href="/projects"
        className="bottom-8 absolute left-1/2 transform -translate-x-1/2 cursor-pointer py-6 px-12 text-lg ml-auto flex items-center gap-3 w-max text-white rounded-full transition-all"
        style={
          {
            // backgroundImage: "linear-gradient(198deg, #323232, #141414)",
            // outline: "1px solid rgba(255, 255, 255, .2)",
            // boxShadow:
            //   "-21px -16px 10px rgba(0, 0, 0, .04), -12px -9px 9px rgba(0, 0, 0, .13), -5px 4px 6px rgba(0, 0, 0, .23), -1px 1px 4px rgba(0, 0, 0, .26)",
            // filter: `blur(${Math.round(
            //   12 - (numberOfHoveredWords / words.length) * 12
            // )}px)`,
          }
        }
      >
        Check my work
        <Dot animated />
      </Link> */}
    </>
  );
}

import Dot from "./Dot";
import Link from "next/link";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

const tooltipWords = ["Connor,", "Texas.", "websites"];
const tooltipWordToComponentMap = {
  "Connor,": <ImageOfMe />,
  "Texas.": <div />,
  websites: <Video />,
};

const Word = ({
  children,
  setNumberOfHoveredWords,
  isMobile,
  tooltip,
  setTooltip,
  setTriggerBounce,
}: {
  children: string;
  setNumberOfHoveredWords: React.Dispatch<React.SetStateAction<number>>;
  isMobile: boolean;
  tooltip: string | null;
  setTooltip: React.Dispatch<React.SetStateAction<string | null>>;
  setTriggerBounce: (triggerBounce: number) => void;
}) => {
  const [hoveredOnce, setHoveredOnce] = useState(false);
  // If screen becomes mobile, set hoveredOnce to true
  useEffect(() => {
    if (isMobile) {
      setHoveredOnce(true);
    }
  }, [isMobile]);

  const [tooltipOffsetDirection, setTooltipOffsetDirection] = useState<
    "left" | "right"
  >("left");

  useEffect(() => {
    if (hoveredOnce) {
      setNumberOfHoveredWords((prev) => prev + 1);
    }
  }, [setNumberOfHoveredWords, hoveredOnce]);

  return (
    <span
      className={`font-light relative transition-opacity duration-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[3.8rem] tracking-[-0.03em] leading-[1.1] md:!leading-[1.05] 
        ${
          // FIXME: opacity 0, or something like opacity 25%?
          tooltip && tooltip !== children ? "opacity-0" : ""
        } ${
        hoveredOnce
          ? tooltipWords.includes(children)
            ? "text-gray-800 font-normal"
            : "mix-blend-plus-lighter pointer-events-none text-gray-600"
          : tooltipWords.includes(children)
          ? "font-normal mix-blend-plus-lighter"
          : "mix-blend-plus-lighter"
      }`}
      // style={{
      //   textShadow: tooltipWords.includes(children)
      //     ? "-1px -1px 0 rgba(255,255,255,.25), 1px -1px 0 rgba(255,255,255,.25), -1px 1px 0 rgba(255,255,255,.25), 1px 1px 0 rgba(255,255,255,.25)"
      //     : "none",
      // }}
      onMouseEnter={(event) => {
        setTooltip(children);
        if (children === "Texas.") {
          setTriggerBounce((prev: number) => prev + 1);
        }
        const elementLeft = event.currentTarget.getBoundingClientRect().left;
        const screenWidth = window.innerWidth;
        const elementWidth = window.innerWidth / 2;

        if (elementLeft + elementWidth > screenWidth) {
          setTooltipOffsetDirection("right");
        } else {
          setTooltipOffsetDirection("left");
        }

        if (!hoveredOnce) {
          setHoveredOnce(true);
        }
      }}
      onMouseLeave={() => {
        setTooltip(null);
      }}
    >
      <AnimatePresence>
        {tooltip === children && tooltipWords.includes(children) && (
          <motion.span
            initial={{ opacity: 0, y: 0, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.95 }}
            transition={{ ease: easeInOutQuint, duration: 0.4 }}
            className={`mt-2 z-50 pointer-events-none absolute top-full rounded overflow-hidden transform -translate-x-full mix-blend-normal ${
              tooltipOffsetDirection === "left" ? "left-0" : "right-0"
            }`}
            style={{
              boxShadow: "0 0 30px rgba(0,0,0,.75)",
            }}
          >
            {tooltipWordToComponentMap[children]}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span
        style={{
          filter: hoveredOnce
            ? "blur(0px)"
            : // ? tooltip && tooltip !== children
              //   ? "blur(2px)"
              //   : "blur(0px)"
              "blur(8px)",
        }}
        className={"transition-all duration-300"}
      >
        {children}
        {tooltipWords.includes(children) && <span>*</span>}
      </motion.span>
    </span>
  );
};

function ImageOfMe() {
  return (
    <Image
      src={me}
      alt="Connor Rothschild"
      width={400}
      height={400}
      className="min-w-[min(400px,_50vw)] min-h-[min(400px,_50vw)]"
    />
  );
}

function Video() {
  return (
    <span className="block min-w-[min(400px,_50vw)]">
      <VideoPlayer muted />
    </span>
  );
}
