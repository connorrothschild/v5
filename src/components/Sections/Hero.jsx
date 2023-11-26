import { useEffect, useRef, useState } from "react";
import { useTransform, useScroll, motion, useSpring } from "framer-motion";
import { easeInOutQuint } from "@/config/eases";

import CursorShadow from "@/components/CursorShadow";
import CanvasGradient from "../CanvasGradient";
import GradientButton from "../GradientButton";
import BackgroundVideo from "../Archived/BackgroundVideo";

import { InfiniteGrid } from "../InfiniteGrid/InfiniteGrid";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";

const photos = [
  {
    id: "1075",
    author: "Verne Ho",
    width: 1214,
    height: 809,
    url: "https://unsplash.com/photos/dccIfU1V1VU",
    download_url: "https://picsum.photos/id/1075/1214/809",
  },
  {
    id: "1076",
    author: "Samuel Zeller",
    width: 1208,
    height: 805,
    url: "https://unsplash.com/photos/WlD3vixTVUg",
    download_url: "https://picsum.photos/id/1076/1208/805",
  },
  {
    id: "1077",
    author: "Maico Amorim",
    width: 1000,
    height: 665,
    url: "https://unsplash.com/photos/SJWPKMb9u-k",
    download_url: "https://picsum.photos/id/1077/1000/665",
  },
  {
    id: "1078",
    author: "Vladimir Kudinov",
    width: 1000,
    height: 667,
    url: "https://unsplash.com/photos/KBX9XHk266s",
    download_url: "https://picsum.photos/id/1078/1000/667",
  },
  {
    id: "1079",
    author: "Kamesh Vedula",
    width: 1124,
    height: 750,
    url: "https://unsplash.com/photos/ISL7czxIP-k",
    download_url: "https://picsum.photos/id/1079/1124/750",
  },
  {
    id: "108",
    author: "Florian Klauer",
    width: 1000,
    height: 666,
    url: "https://unsplash.com/photos/t1mqA3V3-7g",
    download_url: "https://picsum.photos/id/108/1000/666",
  },
  {
    id: "1084",
    author: "Jay Ruzesky",
    width: 1144,
    height: 817,
    url: "https://unsplash.com/photos/h13Y8vyIXNU",
    download_url: "https://picsum.photos/id/1084/1144/817",
  },
  {
    id: "109",
    author: "Zwaddi",
    width: 1071,
    height: 598,
    url: "https://unsplash.com/photos/YvYBOSiBJE8",
    download_url: "https://picsum.photos/id/109/1071/598",
  },
  {
    id: "11",
    author: "Paul Jarvis",
    width: 1250,
    height: 833,
    url: "https://unsplash.com/photos/Cm7oKel-X2Q",
    download_url: "https://picsum.photos/id/11/1250/833",
  },
  {
    id: "110",
    author: "Kenneth Thewissen",
    width: 1123,
    height: 748,
    url: "https://unsplash.com/photos/D76DklsG-5U",
    download_url: "https://picsum.photos/id/110/1123/748",
  },
  {
    id: "111",
    author: "Gabe Rodriguez",
    width: 1100,
    height: 664,
    url: "https://unsplash.com/photos/eLUegVAjN7s",
    download_url: "https://picsum.photos/id/111/1100/664",
  },
];

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

        <div className="pointer-events-none w-[calc(100%-2rem)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row gap-2 md:gap-3 text-center justify-center items-center mix-blend-hard-light">
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

        <div className="pl-12 leading-none font-light py-4 text-right absolute bottom-0 left-[6px] w-[calc(100%-12px)] text-xl flex flex-col text-gray-300 border-t border-gray-500 mix-blend-difference tracking-[0.0125rem] font-serif z-[49]">
          The professional portfolio of software developer & data visualization
          engineer & designer Connor Rothschild.
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
        templateAreas={`
          "a a a b b b c c"
          "d d e e e f f f"
          "g g g h h i i i"
        `}
        gridTemplateColumns={"repeat(8, 1fr)"}
        gridTemplateRows={"repeat(3, 1fr)"}
        w={{ base: "150vw", md: "100vw" }}
        h={{ base: "100vh", md: "125vh" }}
        gap={6}
        p={3}
        cursor="grab"
        userSelect="none"
        willChange={"transform"}
      >
        <GridItem area="a" bgSize="cover" rounded="xl">
          <VideoThatPlaysOnHover src="/videos/babby-1-screen-studio.mp4" />
        </GridItem>
        <GridItem area="b" bgSize="cover" rounded="xl">
          <VideoThatPlaysOnHover src="/videos/praxis-1.mp4" />
        </GridItem>
        <GridItem area="c" bgSize="cover" rounded="xl">
          <VideoThatPlaysOnHover src="/videos/gallery-1.mp4" />
        </GridItem>
        <GridItem area="d" bgSize="cover" rounded="xl">
          <VideoThatPlaysOnHover src="/videos/gallery-1.mp4" />
        </GridItem>
        <GridItem area="e" bgSize="cover" rounded="xl">
          <VideoThatPlaysOnHover src="/videos/vana.mp4" />
        </GridItem>
        <GridItem area="f" bgSize="cover" rounded="xl">
          <VideoThatPlaysOnHover src="/videos/babby-1-screen-studio.mp4" />
        </GridItem>
        <GridItem area="g" bgSize="cover" rounded="xl">
          <VideoThatPlaysOnHover src="/videos/praxis-1.mp4" />
        </GridItem>
        <GridItem area="h" bgSize="cover" rounded="xl">
          <VideoThatPlaysOnHover src="/videos/gallery-1.mp4" />
        </GridItem>
        <GridItem area="i" bgSize="cover" rounded="xl">
          <VideoThatPlaysOnHover src="/videos/gallery-1.mp4" />
        </GridItem>
      </Grid>
    </InfiniteGrid>
  );
}

function VideoThatPlaysOnHover({ src }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden user-select-none">
      <video
        // https://web.dev/articles/lazy-loading-video
        // preload="metadata"

        // When using thumbnail images, preload nothing
        preload="none"
        className="absolute w-[calc(100%-2px)] h-[calc(100%-2px)] object-cover top-[1px] left-[1px] user-select-none"
        src={src}
        loop
        muted
        ref={ref}
        onMouseEnter={() => {
          ref.current.play();
          setPlaying(true);
        }}
        onMouseLeave={() => {
          ref.current.pause();
          // Set frame to 0
          ref.current.currentTime = 0;
          setPlaying(false);
        }}
      />

      {/* Use the first frame of the video */}
      {/* <div
        className="pointer-events-none absolute w-full h-full bg-black bg-opacity-50"
        style={{
          opacity: playing ? 0 : 1,
          transition: "opacity .2s ease-in-out",
        }}
      /> */}

      {/* Use thumbnail/covers for each video */}
      <Image
        alt=""
        src="/images/projects/blackouts.png"
        draggable={false}
        layout="fill"
        className="absolute w-full h-full object-cover opacity-50 pointer-events-none user-select-none"
        style={{
          opacity: playing ? 0 : 1,
          transition: "opacity 300ms ease-in-out 100ms",
        }}
      />
    </div>
  );
}
