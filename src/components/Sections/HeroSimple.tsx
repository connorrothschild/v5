import React, { useMemo } from "react";
import CanvasGradient from "../CanvasGradient";
import { InfiniteGrid } from "../InfiniteGrid/InfiniteGrid";
import { useRef, useState } from "react";
import Image from "next/image";

import { AspectRatio, ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import { useTransform, motion } from "framer-motion";
import ImageGridWrapper from "./ImageGrid/ImageGrid";
import { easeInOutQuint } from "@/config/eases";

export default function HeroSimple() {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <section className="h-screen w-full relative">
      {/* BOTTOM LEFT CORNER */}
      <motion.div
        className="absolute z-20 text-center w-full"
        animate={{
          top: showProjects ? "100%" : "50%",
          translateY: showProjects ? "-100%" : "-50%",
          left: showProjects ? "100%" : "50%",
          translateX: showProjects ? "-100%" : "-50%",
          scale: showProjects ? 0.5 : 1,
        }}
        transition={{
          ease: easeInOutQuint,
          //   delay: showProjects ? 0 : 0.5,
          delay: 0.5,
        }}
      >
        <motion.h1
          className={`font-serif leading-none text-white pb-[6px] text-[5vw]`}
        >
          <span
            className={`${
              showProjects ? "opacity-0" : "opacity-100"
            } transition duration-500`}
          >
            Making{" "}
          </span>
          <span
            // className="underline underline-offset-8 cursor-pointer !opacity-100"
            className="cursor-pointer font-light italic !opacity-100"
            onClick={() => {
              setShowProjects(!showProjects);
            }}
          >
            beautiful things
          </span>{" "}
          <span
            className={`${
              showProjects ? "opacity-0" : "opacity-100"
            } transition duration-500`}
          >
            on the web.
          </span>
        </motion.h1>
      </motion.div>

      {/* <div
        style={{
          opacity: showProjects ? 1 : 0,
        }}
      >
        <ImageGridWrapper />
      </div>
      <div
        style={{
          opacity: showProjects ? 0 : 1,
        }}
      >
        <CanvasGradient
          // opacity={showProjects ? 0 : 1}
          width="100vw"
          height="100vh"
        />
    </div> */}

      <CanvasGradient
        // opacity={showProjects ? 0 : 1}
        width="100vw"
        height="100vh"
      />

      <motion.div
        animate={{
          opacity: showProjects ? 1 : 0,
          pointerEvents: showProjects ? "all" : "none",
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
          delay: 0.3,
        }}
        className="absolute top-0 left-0 w-full h-full z-10"
      >
        <ImageGridWrapper showProjects={showProjects} />
        {/* <ProjectsGrid /> */}
      </motion.div>
      {/* TOP RIGHT CORNER */}
    </section>
  );
}

// function ProjectsGrid() {
//   return (
//     <InfiniteGrid>
//       <Grid
//         templateAreas={{
//           base: `
//           "a b"
//           "c d"
//           "e f"
//           "g h"
//           "i j"
//           "k l"
//           `,
//           md: `
//           "a a a b b b c c c"
//           "d d d e e e f f f"
//           "g g g h h h i i i"
//           "j j j k k k l l l"
//         `,
//         }}
//         gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "repeat(9, 1fr)" }}
//         gridTemplateRows={{ base: "repeat(4, 1fr)", md: "repeat(3, 1fr)" }}
//         // w={{ base: "150vw", md: "100vw" }}
//         // h={{ base: "100vh", md: "125vh" }}
//         gap={{ base: 3, md: 4 }}
//         p={2}
//         cursor="grab"
//         userSelect="none"
//         willChange={"transform"}
//       >
//         <Item id="a" src="row-blackouts-1" />
//         <Item id="b" src="babby-2" />
//         <Item id="c" src="babby-1" />
//         <Item id="d" src="impact" />
//         <Item id="e" src="vana-1" />
//         <Item id="f" src="praxis-1" />
//         <Item id="g" src="row-tech-2" />
//         <Item id="h" src="row-tech-1" />
//         <Item id="i" src="praxis-2" />
//         <Item id="j" src="row-blackouts-2" />
//         <Item id="k" src="quarantunes-1" />
//         <Item id="l" src="row-tech-3" />
//       </Grid>
//     </InfiniteGrid>
//   );
// }

// function Item({ id, src }) {
//   return (
//     <AspectRatio ratio={1.5} gridArea={id}>
//       <GridItem area={id} bgSize="cover" rounded="xl">
//         <VideoThatPlaysOnHover src={src} />
//       </GridItem>
//     </AspectRatio>
//   );
// }

// function VideoThatPlaysOnHover({ src }) {
//   const ref = useRef(null);
//   const [playing, setPlaying] = useState(false);
//   const [hasLoaded, setHasLoaded] = useState(false);

//   return (
//     <div
//       className="relative w-full h-full rounded-lg overflow-hidden user-select-none"
//       style={{
//         aspectRatio: "1.5 / 1",
//       }}
//     >
//       <video
//         // https://web.dev/articles/lazy-loading-video
//         preload="metadata"
//         // When using thumbnail images, preload nothing
//         // preload="none"
//         className="absolute w-full h-full object-fill top-0 left-0 user-select-none"
//         style={{
//           // Start at top left
//           objectPosition: "top left",
//           cursor: hasLoaded ? "unset" : "wait",
//         }}
//         src={`/videos/${src}.mp4`}
//         loop
//         muted
//         ref={ref}
//         onLoadedData={() => {
//           setHasLoaded(true);
//         }}
//         onMouseEnter={() => {
//           // video.currentTime > 0 &&
//           //   !video.paused &&
//           //   !video.ended &&
//           //   video.readyState > video.HAVE_CURRENT_DATA;
//           // if (playing || ref.current.currentTime > 0 || ref.current.ended) {
//           //   return;
//           // }
//           if (playing) return;
//           ref.current.play();
//           setPlaying(true);
//         }}
//         onMouseLeave={() => {
//           if (!playing) return;
//           ref.current.pause();
//           // Set frame to 0
//           ref.current.currentTime = 0;
//           setPlaying(false);
//         }}
//       />

//       {/* Use the first frame of the video */}
//       <div
//         className="pointer-events-none absolute w-full h-full bg-black bg-opacity-50"
//         style={{
//           opacity: playing ? 0 : 1,
//           transition: "opacity 300ms ease-in-out 100ms",
//         }}
//       />

//       {/* Use thumbnail/covers for each video */}
//       <Image
//         alt=""
//         src={`/images/thumbnails/${src}.jpg`}
//         draggable={false}
//         priority
//         placeholder="blur"
//         blurDataURL={`/images/blurs/${src}.jpg`}
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         layout="fill"
//         className="absolute w-full h-full opacity-50 pointer-events-none user-select-none"
//         style={{
//           opacity: playing ? 0 : 0.5,
//           transition: "opacity 300ms ease-in-out 100ms",
//         }}
//       />
//     </div>
//   );
// }
