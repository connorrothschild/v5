import { useEffect, useRef, useMemo, useState } from "react";
import {
  useTransform,
  useScroll,
  motion,
  circOut as ease,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const allPortfolioItems = [
  {
    title: "Award #1",
    category: "awards",
    image: "https://picsum.photos/200/300",
    xPosition: 10,
    yPosition: 10,
  },
  {
    title: "Award #2",
    category: "awards",
    image: "https://picsum.photos/200/300",
    xPosition: 70,
    yPosition: 10,
  },
  {
    title: "Award #3",
    category: "awards",
    image: "https://picsum.photos/200/300",
    xPosition: 30,
    yPosition: 70,
  },
  {
    title: "Award #4",
    category: "awards",
    image: "https://picsum.photos/200/300",
    xPosition: 50,
    yPosition: 10,
  },
  {
    title: "Award #5",
    category: "awards",
    image: "https://picsum.photos/200/300",
    xPosition: 50,
    yPosition: 70,
  },
  {
    title: "Award #7",
    category: "awards",
    image: "https://picsum.photos/200/300",
    xPosition: 30,
    yPosition: 10,
  },
  {
    title: "Award #8",
    category: "awards",
    image: "https://picsum.photos/200/300",
    xPosition: 70,
    yPosition: 70,
  },
  {
    title: "Award #9",
    category: "awards",
    image: "https://picsum.photos/200/300",
    xPosition: 10,
    yPosition: 70,
  },
];

const RandomGradientComponent = ({
  stopColor1Saturation,
  stopColor1Lightness,
  stopColor2Saturation,
  stopColor2Lightness,
  stopColor1HueBase,
  stopColor2HueBase,
  randomUuid,
}) => {
  let [stopColor1Hue, setStopColor1Hue] = useState(stopColor1HueBase);
  let [stopColor2Hue, setStopColor2Hue] = useState(stopColor2HueBase);

  useEffect(() => {
    const handleMousemove = (e) => {
      const { clientX, clientY } = e;
      document.documentElement.style.setProperty("--x", `${clientX}px`);
      document.documentElement.style.setProperty("--y", `${clientY}px`);
    };

    const interval = setInterval(() => {
      setStopColor1Hue((stopColor1HueBase += 0.5));
      setStopColor2Hue((stopColor2HueBase += 0.5));
    }, 10);

    window.addEventListener("mousemove", handleMousemove);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMousemove);
    };
  }, []);

  const stopColor1 = useMemo(
    () =>
      `hsl(${stopColor1Hue}, ${stopColor1Saturation}%, ${stopColor1Lightness}%)`,
    [stopColor1Hue, stopColor1Saturation, stopColor1Lightness]
  );
  const stopColor2 = useMemo(
    () =>
      `hsl(${stopColor2Hue}, ${stopColor2Saturation}%, ${stopColor2Lightness}%)`,
    [stopColor2Hue, stopColor2Saturation, stopColor2Lightness]
  );

  const baseFrequency = "0.0005 0.0003";

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9], {
    ease: ease,
  });
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 0.9, 1], [1, 1, 0, 0]);
  const imagesOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0, 1]);
  //   const shadowColor = useTransform(
  //     scrollYProgress,
  //     [0, 1],
  //     ["#1250aa", "#000"]
  //   );

  const shadowSize = useSpring(40, { damping: 100, stiffness: 1000 });
  const imageTranslateX = useSpring(0, { damping: 100, stiffness: 1000 });
  const imageTranslateY = useSpring(0, { damping: 100, stiffness: 1000 });

  const [hoveredCategory, setHoveredCategory] = useState(null);

  // const portfolioItems = useMemo(() => {
  //   if (hoveredCategory) {
  //     return allPortfolioItems.filter(
  //       (item) => item.category === hoveredCategory
  //     );
  //   } else {
  //     return allPortfolioItems;
  //   }
  // }, [hoveredCategory]);

  return (
    <div
      className="h-[300vh]"
      ref={ref}
      style={{
        boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)",
      }}
    >
      <motion.div
        className="sticky top-0 overflow-hidden transform-gpu"
        style={{
          scale,
          borderRadius,
          // "--shadow-color": shadowColor,
        }}
      >
        <div
          className="shadow-follow absolute top-0 left-0 w-full h-full z-[-1]"
          style={{
            // The 40% here is what defines the size of the shadow
            background: `radial-gradient(circle farthest-side at var(--x, 100px) var(--y, 100px), var(--shadow-color, #ff5a5a) 0%, transparent ${shadowSize.get()}%)`,
            transition: "background 300ms ease-out",
          }}
        />
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlnssvgjs="http://svgjs.dev/svgjs"
          viewBox="0 0 700 700"
          width="700"
          height="700"
          id={`svg-${randomUuid}`}
          preserveAspectRatio="none"
          className="w-[100vw] h-[100vh] z-[-2] absolute top-0 left-0"
          style={{
            opacity,
          }}
        >
          <defs>
            <linearGradient
              gradientTransform="rotate(150, 0.5, 0.5)"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id={`gradient-${randomUuid}`}
            >
              <stop stopColor={stopColor1} stopOpacity="1" offset="0%" />
              <stop stopColor={stopColor2} stopOpacity="1" offset="100%" />
            </linearGradient>
            <filter
              id={`filter-${randomUuid}`}
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency={baseFrequency}
                numOctaves="2"
                seed="304"
                stitchTiles="stitch"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                result="turbulence"
              />
              <feGaussianBlur
                stdDeviation="20 0"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="turbulence"
                edgeMode="duplicate"
                result="blur"
              />
              <feBlend
                mode="color-dodge"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="SourceGraphic"
                in2="blur"
                result="blend"
              />
            </filter>
          </defs>
          <rect
            width="700"
            height="700"
            fill={`url(#gradient-${randomUuid})`}
            filter={`url(#filter-${randomUuid})`}
          />
        </motion.svg>

        <section className="flex p-8 h-screen flex-col justify-center items-center">
          <motion.h1
            className="text-center text-[4.57rem] leading-[.95] text-white font-light uppercase tracking-tighter"
            style={{
              opacity: textOpacity,
            }}
          >
            <span
              className={`transition-[all] duration-300 ease-in-out ${
                hoveredCategory && "opacity-30 blur-[2px]"
              }`}
            >
              Available for freelance beginning December 2023.{" "}
            </span>
            <span
              onMouseOver={() => {
                shadowSize.set(10);
                setHoveredCategory("connor@connorrothschild.com");
              }}
              onMouseLeave={() => {
                shadowSize.set(40);
                setHoveredCategory(null);
                imageTranslateX.set(0);
                imageTranslateY.set(0);
              }}
              onMouseMove={(e) => {
                // Scale according to mouse position within the relevant span
                const imageXTranslate = (e.clientX - e.target.offsetLeft) / 10;
                const imageYTranslate = (e.clientY - e.target.offsetTop) / 5;

                imageTranslateX.set(imageXTranslate);
                imageTranslateY.set(imageYTranslate);
              }}
              className="cursor-none transition-[all] duration-300 ease-in-out"
            >
              {/* connor
              <br className="xs:hidden" />
              @connorrothschild
              <br className="xs:hidden" />
              .com */}
              Contact Via Email
            </span>
            .
          </motion.h1>
        </section>
      </motion.div>
    </div>
  );
};

export default RandomGradientComponent;
