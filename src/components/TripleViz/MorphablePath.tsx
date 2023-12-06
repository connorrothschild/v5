import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/dist/MorphSVGPlugin";
import { easeInOutQuint } from "@/config/eases";

const SVGMorph = ({
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
      fill="#fde68a"
      stroke="#fbbf24"
      strokeWidth={"5"}
    />
  );
};

export default SVGMorph;
