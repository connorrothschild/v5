import { useEffect, useRef, useState } from "react";
import { useTransform, useScroll, motion, useSpring } from "framer-motion";
import { easeInOutQuint } from "@/config/eases";

import CursorShadow from "@/components/CursorShadow";
import CanvasGradient from "../CanvasGradient";
import GradientButton from "../GradientButton";
import BackgroundVideo from "../Archived/BackgroundVideo";

import { InfiniteGrid } from "../InfiniteGrid/InfiniteGrid";
import { AspectRatio, ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";

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

  // const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 20]);
  const translateY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const svgOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 1]);

  const shadowSize = useSpring(40, { damping: 100, stiffness: 1000 });
  const LOADING_TIME = 3;

  return (
    <div className="relative h-screen z-[1]" ref={ref} id="home">
      <span className="z-[9] absolute bottom-24 right-8 user-select-none font-serif font-extralight tracking-wide text-yellow-500">
        psst. there&apos;s music—click the menu ☺
      </span>
      <motion.div
        style={{
          // scale,
          borderRadius,
          translateY,
          margin: "0 auto",
        }}
        className="z-10 transform-gpu flex items-center justify-center transform-origin-center h-screen w-screen overflow-hidden relative"
      >
        {/* Gradient spanning entire hero, from transparent to --background */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[--background] z-[49]" />

        {/* <CursorShadow shadowSize={shadowSize} shadowOpacity={svgOpacity} /> */}
        {/* <BackgroundVideo /> */}
        {/* <CanvasGradient opacity={svgOpacity} width="100vw" height="100vh" /> */}
        <ProjectsGrid />

        <div className="pointer-events-none w-[calc(100%-2rem)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row gap-2 md:gap-3 text-center justify-center items-center mix-blend-revert-layer">
          <div className="overflow-hidden px-1.5">
            <motion.h1
              className="font-serif text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-[.85] text-white font-light uppercase tracking-tighter"
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

          <div className="overflow-hidden md:self-end px-1.5">
            <motion.h1
              className="font-serif text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-[.85] text-white font-light uppercase tracking-tight"
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

        {/* Top left */}
        {/* <div className="w-[calc(100%-2rem)] absolute top-[1rem] left-[1rem] flex flex-col items-start mix-blend-overlay"> */}
        {/* <div className="pointer-events-none w-[calc(100%-2rem)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-start mix-blend-overlay">
          <div className="overflow-hidden pr-1">
            <motion.h1
              className="font-serif text-left text-[4rem] md:text-[16.8vw] leading-[.85] text-black font-light uppercase tracking-tighter"
              animate={{ translateY: 0 }}
              initial={{ translateY: "100%" }}
              transition={{
                ease: easeInOutQuint,
                duration: 1,
                delay: LOADING_TIME,
              }}
            >
              Connor<span className="opacity-30">&&&&&&</span>
            </motion.h1>
          </div>

          <div className="overflow-hidden pr-1 self-end">
            <motion.h1
              className="font-serif self-end text-right text-[4rem] md:text-[16.8vw] leading-[.85] text-black font-light uppercase tracking-tight"
              animate={{ translateY: 0 }}
              initial={{ translateY: "100%" }}
              transition={{
                ease: easeInOutQuint,
                duration: 1,
                delay: LOADING_TIME + 0.382,
              }}
            >
              <span className="opacity-30">&&&&&&</span>
              Rothschild
            </motion.h1>
          </div>
        </div> */}

        {/* Top right */}
        {/* <div className="hidden lg:flex absolute top-4 right-4 flex-col items-end mix-blend-soft-light">
          <div className="overflow-hidden pr-1">
            <motion.h1
              className="text-right text-[6.57rem] leading-[.9] text-black font-light uppercase tracking-tight opacity-30"
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
              className="text-right text-[6.57rem] leading-[.9] text-black font-light uppercase tracking-tight opacity-30"
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
        </div> */}

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
          {/* <GradientButton /> */}
        </div>

        <div className="hidden md:flex pl-12 leading-none font-light py-4 text-right absolute bottom-0 left-[6px] w-[calc(100%-12px)] text-xl flex-col text-gray-300 border-t border-gray-500 mix-blend-difference tracking-[0.0125rem] font-serif z-[49]">
          The professional portfolio of software developer & data visualization
          engineer & designer Connor Rothschild.
        </div>
        <div className="flex md:hidden pl-12 leading-none font-light py-4 text-right absolute bottom-0 left-[6px] w-[calc(100%-12px)] text-xl flex-col text-gray-300 border-t border-gray-500 mix-blend-difference tracking-[0.0125rem] font-serif z-[49]">
          2024 Portfolio
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;

function ProjectsGrid() {
  return (
    <InfiniteGrid>
      <Grid
        templateAreas={{
          base: `
          "a b"
          "c d"
          "e f"
          "g h"
          "i j"
          "k l"
          `,
          md: `
          "a a a b b b c c c"
          "d d d e e e f f f"
          "g g g h h h i i i"
          "j j j k k k l l l"
        `,
        }}
        gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "repeat(9, 1fr)" }}
        gridTemplateRows={{ base: "repeat(4, 1fr)", md: "repeat(3, 1fr)" }}
        // w={{ base: "150vw", md: "100vw" }}
        // h={{ base: "100vh", md: "125vh" }}
        gap={{ base: 3, md: 4 }}
        p={2}
        cursor="grab"
        userSelect="none"
        willChange={"transform"}
      >
        <Item id="a" src="row-blackouts-1" />
        <Item id="b" src="babby-2" />
        <Item id="c" src="babby-1" />
        <Item id="d" src="impact" />
        <Item id="e" src="vana-1" />
        <Item id="f" src="praxis-1" />
        <Item id="g" src="row-tech-2" />
        <Item id="h" src="row-tech-1" />
        <Item id="i" src="praxis-2" />
        <Item id="j" src="row-blackouts-2" />
        <Item id="k" src="quarantunes-1" />
        <Item id="l" src="row-tech-3" />
      </Grid>
    </InfiniteGrid>
  );
}

function VideoThatPlaysOnHover({ src }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <div
      className="relative w-full h-full rounded-lg overflow-hidden user-select-none"
      style={{
        aspectRatio: "1.5 / 1",
      }}
    >
      <video
        // https://web.dev/articles/lazy-loading-video
        preload="metadata"
        // When using thumbnail images, preload nothing
        // preload="none"
        className="absolute w-full h-full object-fill top-0 left-0 user-select-none"
        style={{
          // Start at top left
          objectPosition: "top left",
          cursor: hasLoaded ? "unset" : "wait",
        }}
        src={`/videos/${src}.mp4`}
        loop
        muted
        ref={ref}
        onLoadedData={() => {
          setHasLoaded(true);
        }}
        onMouseEnter={() => {
          // video.currentTime > 0 &&
          //   !video.paused &&
          //   !video.ended &&
          //   video.readyState > video.HAVE_CURRENT_DATA;
          // if (playing || ref.current.currentTime > 0 || ref.current.ended) {
          //   return;
          // }
          if (playing) return;
          ref.current.play();
          setPlaying(true);
        }}
        onMouseLeave={() => {
          if (!playing) return;
          ref.current.pause();
          // Set frame to 0
          ref.current.currentTime = 0;
          setPlaying(false);
        }}
      />

      {/* Use the first frame of the video */}
      <div
        className="pointer-events-none absolute w-full h-full bg-black bg-opacity-50"
        style={{
          opacity: playing ? 0 : 1,
          transition: "opacity 300ms ease-in-out 100ms",
        }}
      />

      {/* Use thumbnail/covers for each video */}
      <Image
        alt=""
        src={`/images/thumbnails/${src}.jpg`}
        draggable={false}
        priority
        placeholder="blur"
        blurDataURL={`/images/blurs/${src}.jpg`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        layout="fill"
        className="absolute w-full h-full opacity-50 pointer-events-none user-select-none"
        style={{
          opacity: playing ? 0 : 0.5,
          transition: "opacity 300ms ease-in-out 100ms",
        }}
      />
    </div>
  );
}

function Item({ id, src }) {
  return (
    <AspectRatio ratio={1.5} gridArea={id}>
      <GridItem area={id} bgSize="cover" rounded="xl">
        <VideoThatPlaysOnHover src={src} />
      </GridItem>
    </AspectRatio>
  );
}
