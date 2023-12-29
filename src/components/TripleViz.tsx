import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/dist/MorphSVGPlugin";

const shapes = [
  {
    name: "first",
    paths: [
      "M180,348a103,103 0 1,0 206,0a103,103 0 1,0 -206,0", // circle,
      "M387.667 159.536C259.972 167.941 159 274.179 159 404.001C159 539.312 268.69 649 404 649C465.777 649 522.214 626.137 565.308 588.407L392.581 415.68C389.474 412.641 387.667 408.445 387.667 404.001V159.536Z", // pie
      "M161 324h95s20 0 20 20v380s0 20 -20 20h-95s-20 0 -20 -20v-380s0 -20 20 -20", // rect
    ],
  },
  {
    name: "second",
    paths: [
      "M422,281a103,103 0 1,0 206,0a103,103 0 1,0 -206,0", // circle,
      "M588.407 565.308C626.137 522.214 649 465.777 649 404.001C649 370.412 642.241 338.402 630.008 309.258L431.574 408.475L588.407 565.308Z", // pie
      "M551 192h95s20 0 20 20v512s0 20 -20 20h-95s-20 0 -20 -20v-512s0 -20 20 -20", // rect
    ],
  },
  {
    name: "third",
    paths: [
      "M370,526a103,103 0 1,0 206,0a103,103 0 1,0 -206,0", // circle
      "M615.379 280.05C575.408 212.033 503.545 165.013 420.333 159.536V377.573L615.379 280.05Z", // pie
      "M356 521h95s20 0 20 20v183s0 20 -20 20h-95s-20 0 -20 -20v-183s0 -20 20 -20", // rect
    ],
  },
];

export default function TripleViz({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 807 807"
      fill="none"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      {shapes.map((shape) => (
        <MorphablePath key={shape.name} paths={shape.paths} active={active} />
      ))}
    </svg>
  );
}

const MorphablePath = ({
  paths,
  active,
  duration = 1,
}: {
  paths: string[];
  active: boolean;
  duration?: number;
}) => {
  const svgPathRef = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(MorphSVGPlugin);

    const currentPathRef = svgPathRef.current; // Capture the current ref value

    const tweenToNextPath = () => {
      if (!active) return; // Check if active before animating

      const nextIndex = (currentIndex.current + 1) % paths.length;
      gsap.to(svgPathRef.current, {
        morphSVG: paths[nextIndex],
        duration,
        ease: "power4.out",
        // onComplete: tweenToNextPath,
      });
      currentIndex.current = nextIndex;
    };

    if (active) {
      tweenToNextPath(); // Start the animation only if active
    }

    // Cleanup function to stop the animation when component is not active
    return () => {
      if (!active) {
        gsap.killTweensOf(currentPathRef);
      }
    };
  }, [paths, duration, active]);

  return (
    <path
      ref={svgPathRef}
      d={paths[0]}
      fill="#e5e7eb"
      stroke="#9ca3af"
      strokeWidth={"5"}
    />
  );
};
