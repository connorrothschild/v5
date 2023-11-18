import Image from "next/image";
import gsap from "gsap";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { InfiniteGrid } from "../InfiniteGrid/InfiniteGrid";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";

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

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 1],
    [0, 0, 0.5, 1, 1, 0]
  );
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 1],
    [0, 50, 25, 0, -25, -100]
  );

  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start, target, amount) =>
    start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    gsap.set(plane2.current, {
      x: `+=${xForce * 0.5}`,
      y: `+=${yForce * 0.5}`,
    });
    gsap.set(plane3.current, {
      x: `+=${xForce * 0.25}`,
      y: `+=${yForce * 0.25}`,
    });

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce !== 0 || yForce !== 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };

  return (
    <motion.section
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
      style={{
        opacity,
        // translateY,
      }}
      className="relative h-screen my-24 w-screen overflow-visible"
      ref={ref}
    >
      <div
        ref={plane1}
        className="w-full h-full absolute pointer-events-none z-30"
      >
        <ProjectImage left="90%" top="70%" src="blackouts" scale={1} />
        <ProjectImage left="5%" top="65%" src="blackouts" scale={1} />
        <ProjectImage left="35%" top="0%" src="blackouts" scale={1} />
      </div>
      <div
        ref={plane2}
        className="w-full h-full absolute pointer-events-none z-20"
        style={{
          filter: "brightness(0.9) blur(1px)",
        }}
      >
        <ProjectImage left="5%" top="10%" src="blackouts" scale={0.75} />
        <ProjectImage left="80%" top="5%" src="blackouts" scale={0.75} />
        <ProjectImage left="60%" top="60%" src="blackouts" scale={0.75} />
      </div>
      <div
        ref={plane3}
        className="w-full h-full absolute pointer-events-none z-10"
        style={{
          filter: "brightness(0.8) blur(2px)",
        }}
      >
        <ProjectImage left="65%" top="2.5%" src="blackouts" scale={0.5} />
        <ProjectImage left="40%" top="75%" src="blackouts" scale={0.5} />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%] text-white text-center z-40">
        <h1 className="leading-[1.05] font-light font-serif text-7xl">
          <span className="text-yellow-500">&</span> Some of my projects can be
          found here.
        </h1>
      </div>
      {/* <InfiniteGrid>
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
          gap={4}
          p={2}
        >
          <GridItem
            area="a"
            bgImage={`/images/projects/blackouts.png`}
            bgSize="cover"
            rounded="xl"
          />
          <GridItem
            area="b"
            bgImage={`/images/projects/blackouts.png`}
            bgSize="cover"
            rounded="xl"
          />
          <GridItem
            area="c"
            bgImage={`/images/projects/blackouts.png`}
            bgSize="cover"
            rounded="xl"
          />
          <GridItem
            area="d"
            bgImage={`/images/projects/blackouts.png`}
            bgSize="cover"
            rounded="xl"
          />
          <GridItem
            area="e"
            bgImage={`/images/projects/blackouts.png`}
            bgSize="cover"
            rounded="xl"
          />
          <GridItem
            area="f"
            bgImage={`/images/projects/blackouts.png`}
            bgSize="cover"
            rounded="xl"
          />
          <GridItem
            area="g"
            bgImage={`/images/projects/blackouts.png`}
            bgSize="cover"
            rounded="xl"
          />
          <GridItem
            area="h"
            bgImage={`/images/projects/blackouts.png`}
            bgSize="cover"
            rounded="xl"
          />
          <GridItem
            area="i"
            bgImage={`/images/projects/blackouts.png`}
            bgSize="cover"
            rounded="xl"
          />
        </Grid>
      </InfiniteGrid> */}
      <Link
        href="/archive"
        className="cursor-pointer z-50 absolute bottom-2 right-2 text-lg text-gray-200 font-serif font-light hover:text-gray-1"
      >
        & more projects here
      </Link>
    </motion.section>
  );
}

function ProjectImage({ left, top, scale, src }) {
  const defaultWidth = 300;
  const defaultHeight = 300;

  return (
    <Image
      src={`/images/projects/${src}.png`}
      onClick={() => alert("Open project page")}
      alt="img"
      width={defaultWidth * scale}
      height={defaultHeight * scale}
      className="rounded-md absolute pointer-events-auto cursor-pointer"
      style={{
        left,
        top,
      }}
    />
  );
}
