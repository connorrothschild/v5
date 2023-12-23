import React, { useMemo } from "react";
import CanvasGradient from "../CanvasGradient";
import { InfiniteGrid } from "../InfiniteGrid/InfiniteGrid";
import { useRef, useState } from "react";
import Image from "next/image";

import { AspectRatio, ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import { useTransform, motion } from "framer-motion";
import ImageGridWrapper from "./ImageGrid/ImageGrid";
import { easeInOutQuint } from "@/config/eases";

const imageUrls = [
  "/images/thumbnails/gallery-1.jpg",
  "/images/thumbnails/babby-1.jpg",
  "/images/thumbnails/impact.jpg",
  "/images/thumbnails/vana-1.jpg",
  "/images/thumbnails/praxis-1.jpg",
  "/images/thumbnails/row-blackouts-1.jpg",
  "/images/thumbnails/quarantunes-1.jpg",
];

const GOLDENRATIO = 1.196; // 1.61803398875;

// const pexel = (id) =>
//   `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;
const imageConstructor = (id: string) => `/images/thumbnails/${id}.jpg`;
const CAROUSEL_LAYOUT = [
  // Front
  {
    position: [0, 0, -1.2],
    rotation: [0, 0, 0],
    url: imageConstructor(1103970),
  },

  // Back
  {
    position: [-1, 0, -0.6],
    rotation: [0, 0, 0],
    url: imageConstructor(416430),
  },
  {
    position: [1, 0, -0.6],
    rotation: [0, 0, 0],
    url: imageConstructor(310452),
  },

  // Left
  {
    position: [-1.75, 0, 0.25],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor(327482),
  },
  {
    position: [-2.15, 0, 1.5],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor(325185),
  },
  {
    position: [-2, 0, 2.75],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor(358574),
  },

  // Right
  {
    position: [1.75, 0, 0.25],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor(227675),
  },
  {
    position: [2.15, 0, 1.5],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor(911738),
  },
  {
    position: [2, 0, 2.75],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor(1738986),
  },
];

const LINE_LAYOUT = [
  // Front
  {
    position: [0, 0.5, 0],
    rotation: [0, 0, 0],
    url: imageUrls[0],
    name: "Gallery",
    link: "https://gallery.so/",
  },

  // Back
  {
    position: [1 * GOLDENRATIO, 0.5, 0],
    rotation: [0, 0, 0],
    url: imageUrls[1],
    name: "Babby",
    link: "https://babby.xyz/",
  },
  {
    position: [2 * GOLDENRATIO, 0.5, 0],
    rotation: [0, 0, 0],
    url: imageUrls[2],
    name: "Collaborative Fund",
    link: "https://collaborativefund.com/",
  },

  // Left
  // {
  //   position: [3 * GOLDENRATIO, 0.5, 0],
  //   rotation: [0, 0, 0],
  //   // rotation: [0, Math.PI / 2.5, 0],
  //   url: imageUrls[3],

  //   name: "Gallery",
  //   link: "https://gallery.so/",
  // },
  {
    position: [4 * GOLDENRATIO, 0.5, 0],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageUrls[4],

    name: "Vana",
    link: "https://vana.com/",
  },
  {
    position: [5 * GOLDENRATIO, 0.5, 0],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageUrls[5],

    name: "Praxis",
    link: "https://cityofpraxis.org/",
  },

  // Right
  {
    position: [6 * GOLDENRATIO, 0.5, 0],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageUrls[6],

    name: "Rest of World",
    link: "https://restofworld.org/",
  },
  // {
  //   position: [7 * GOLDENRATIO, 0.5, 0],
  //   rotation: [0, 0, 0],
  //   // rotation: [0, -Math.PI / 2.5, 0],
  //   url: imageUrls[7],

  //   name: 'Quarantunes',
  //   link: 'https://quarantunes.club/'
  // },
  // {
  //   position: [8 * GOLDENRATIO, 0.5, 0],
  //   rotation: [0, 0, 0],
  //   // rotation: [0, -Math.PI / 2.5, 0],
  //   url: imageUrls[7],

  //   name: "ACLU of Texas",
  //   link: "https://www.aclutx.org/",
  // },
];

const FLOATING_LAYOUT = [
  // Front
  {
    position: [3, 1, 1],
    rotation: [0, 0, 0],
    url: imageConstructor("babby-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },

  // Back
  {
    position: [-3, 0, -1],
    rotation: [0, 0, 0],
    url: imageConstructor("row-tech-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },
  {
    position: [-1, 1, -4],
    rotation: [0, 0, 0],
    url: imageConstructor("row-blackouts-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },

  // Left
  {
    position: [2, 3, -2],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor("vana-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },
  {
    position: [3, 0, -1],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor("impact"),
    name: "Gallery",
    link: "https://gallery.so/",
  },
  {
    position: [-3, 3, 0],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor("praxis-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },

  // Right
  {
    position: [-1, 2, 0],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor("quarantunes-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },
  {
    position: [3, 0, 2],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor("row-blackouts-2"),
    name: "Gallery",
    link: "https://gallery.so/",
  },
  {
    position: [-2, 0, 3],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor("gallery-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },
  {
    position: [-3, 3, 2],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor("babby-2"),
    name: "Babby",
    link: "https://babby.xyz/",
  },
];

const images = LINE_LAYOUT;

export default function HeroSimple() {
  const [showProjects, setShowProjects] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <section className="h-[calc(100vh-50px)] w-full relative  rounded-b-[1rem] overflow-hidden">
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
        {/* <div className="absolute top-0 left-0 w-screen h-screen z-50 leading-none">
          {images.map((image, i) => (
            <div
              key={image.url}
              className="text-[8vw] text-white font-light tracking-tighter font-serif uppercase inline-block px-4"
              style={{
                opacity:
                  currentImageIndex === null || currentImageIndex === i
                    ? 1
                    : 0.2,
                transition: "opacity 300ms ease-in-out 100ms",
              }}
              onMouseOver={() => {
                setCurrentImageIndex(i);
              }}
            >
              {image.name} &
            </div>
          ))}
        </div> */}
        {/* <ImageGridWrapper
          showProjects={showProjects}
          images={images}
          currentImageIndex={currentImageIndex}
        /> */}
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
