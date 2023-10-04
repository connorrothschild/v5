import { useEffect, useMemo, useRef, useCallback, useState, memo } from "react";
import { useSpring, motion, MotionValue } from "framer-motion";

interface RotatingGradientProps {
  // stopColor1: [number, number, number]; // [hue, saturation, lightness]
  // stopColor2: [number, number, number]; // [hue, saturation, lightness]
  hue: number;
  saturation: number;
  lightness: number;
  // shadowSize: MotionValue<number>;
  randomUuid: string;
}

function RotatingGradientComponent({
  // stopColor1,
  // stopColor2,
  hue,
  saturation,
  lightness,
  // shadowSize,
  randomUuid,
}: RotatingGradientProps) {
  // FIXME: Why rerendering so much?
  console.log("rendering RotatingGradient");

  // const hueRef = useRef(hue);
  const [newHue, setNewHue] = useState(hue);

  // useEffect(() => {
  //   console.log(newHue);
  // }, [newHue]);

  const shadowX = useSpring(50, { damping: 50, stiffness: 300 });
  const shadowY = useSpring(50, { damping: 50, stiffness: 300 });

  const updateShadows = useCallback(
    (x: number, y: number) => {
      shadowX.set(x);
      shadowY.set(y);
    },
    [shadowX, shadowY]
  );

  const updateHues = useCallback(() => {
    setNewHue((prev) => {
      const newH = prev + 1;
      if (newH > 360) {
        return 0;
      }
      return newH;
    });
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(updateHues, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    const handleMousemove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      updateShadows(clientX, clientY);
    };
    window.addEventListener("mousemove", handleMousemove);

    return () => {
      window.removeEventListener("mousemove", handleMousemove);
    };
  }, []);

  useEffect(() => {
    // const handleMousemove = (e: MouseEvent) => {
    //   const { clientX, clientY } = e;
    //   document.documentElement.style.setProperty("--x", `${clientX}px`);
    //   document.documentElement.style.setProperty("--y", `${clientY}px`);
    // };

    const interval = setInterval(() => {
      // setNewHue((hue += 0.5));
      updateHues();
    }, 100);

    // window.addEventListener("mousemove", handleMousemove);

    return () => {
      clearInterval(interval);
      // window.removeEventListener("mousemove", handleMousemove);
    };
  }, []);

  // const stopColor = useMemo(
  //   () => `hsl(${newHue}, ${saturation}%, ${lightness}%)`,
  //   [newHue, saturation, lightness]
  // );

  const baseFrequency = "0.0005 0.0003";

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 700 700"
        width="700"
        height="700"
        id={`svg-${randomUuid}`}
        preserveAspectRatio="none"
        className="w-[100vw] h-[100vh] z-[-2] absolute top-0 left-0"
        //   style={{
        //     opacity,
        //   }}
        // transition={{ ease: "easeInOut", delay: 1.5, duration: 1 }}
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
            <stop
              stopColor={`hsl(${newHue}, ${saturation}%, ${lightness}%)`}
              stopOpacity="1"
              offset="0%"
            />
            <stop
              stopColor={`hsl(${newHue}, ${saturation}%, ${lightness}%)`}
              stopOpacity="1"
              offset="100%"
            />
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
      </svg>

      <motion.div
        className="shadow-follow absolute top-0 left-0 w-full h-full z-[-1] pointer-events-none"
        style={{
          // The 40% here is what defines the size of the shadow
          background: `radial-gradient(circle farthest-side at ${shadowX.get()}px ${shadowY.get()}px, var(--shadow-color, #1250aa) 0%, transparent 40%)`,
          // background: `radial-gradient(circle farthest-side at ${shadowX.get()}px ${shadowY.get()}px, var(--shadow-color, #1250aa) 0%, transparent ${shadowSize.get()}%)`,
          // background: `radial-gradient(circle farthest-side at var(--x, 100px) var(--y, 100px), var(--shadow-color, #1250aa) 0%, transparent ${shadowSize.get()}%)`,
          transition: "background 300ms ease-out",
        }}
      />
    </>
  );
}

const RotatingGradient = memo(RotatingGradientComponent);
export default RotatingGradient;
