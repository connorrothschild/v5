import { useEffect, useRef, useMemo, useState } from "react";
import { motion, useSpring, motionValue } from "framer-motion";
import CanvasGradient from "../CanvasGradient";
import GradientButton from "../GradientButton";

export default function Footer() {
  const nudgeX = useSpring(0, { stiffness: 100, damping: 100 });
  const nudgeY = useSpring(0, { stiffness: 100, damping: 100 });
  const handleMousemove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    // Ceiling of 50, floor of -50
    const nX = Math.min(Math.max((x - centerX) / 10, -30), 30);
    nudgeX.set(nX);

    const nY = Math.min(Math.max((y - centerY) / 10, -30), 30);
    nudgeY.set(nY);
  };

  const svgOpacity = motionValue(1);

  return (
    // Note that this is visible (opacity: 1) and interactable (pointer-events: auto) when the body is loaded. See globals.css
    <footer
      className="opacity-0 pointer-events-none sticky overflow-hidden h-[600px] flex flex-col justify-center bottom-0 left-0 w-full z-0 bg-gray-900"
      onMouseMove={handleMousemove}
      onMouseLeave={() => nudgeX.set(0)}
    >
      <div className="max-w-7xl mx-auto">
        {/* <CanvasGradient svgOpacity={svgOpacity} width="100vw" height="100vh" /> */}
        <h2
          className="cursor-pointer font-serif text-[2.5rem] z-20 text-left leading-none text-gray-200 font-extralight"
          onClick={() => {
            // Copy email to clipboard
            navigator.clipboard.writeText("connor@connorrothschild.com");
          }}
        >
          connor@
        </h2>
        <motion.h1
          onClick={() => {
            // Copy email to clipboard
            navigator.clipboard.writeText("connor@connorrothschild.com");
          }}
          style={
            {
              // x: nudgeX,
              // y: nudgeY,
            }
          }
          className="cursor-pointer font-serif text-[60px] lg:text-[110px] z-20 text-center leading-[.8] text-white font-extralight "
        >
          connorrothschild.com
        </motion.h1>
        <div className="text-lg flex justify-end gap-4 items-center w-full text-gray-200 font-extralight text-center max-w-[300px] ml-auto mt-6">
          <p className="font-serif cursor-pointer">Twitter</p>
          <p className="font-serif cursor-pointer">Instagram</p>
          <p className="font-serif cursor-pointer">LinkedIn</p>
        </div>
        {/* <GradientButton /> */}
      </div>
    </footer>
  );
}
