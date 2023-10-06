import { useEffect, useRef, useMemo, useState } from "react";
import { motion, useSpring, motionValue } from "framer-motion";
import CanvasGradient from "../CanvasGradient";
import GradientButton from "../GradientButton";

export default function Footer() {
  const nudgeX = useSpring(0, { stiffness: 100, damping: 100 });
  const handleMousemove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    // Ceiling of 50, floor of -50
    const nudge = Math.min(Math.max((x - centerX) / 10, -30), 30);
    nudgeX.set(nudge);
  };

  const svgOpacity = motionValue(1);

  return (
    // Note that this is visible (opacity: 1) and interactable (pointer-events: auto) when the body is loaded. See globals.css
    <footer
      className="opacity-0 pointer-events-none sticky overflow-hidden h-[300px] flex flex-col justify-center bottom-0 left-0 w-full z-0"
      onMouseMove={handleMousemove}
      onMouseLeave={() => nudgeX.set(0)}
    >
      <CanvasGradient svgOpacity={svgOpacity} />
      <motion.h1
        style={{
          x: nudgeX,
        }}
        className="font-serif text-[10.62vw] z-20 text-center leading-none text-white font-light"
      >
        connorrothschild.com
      </motion.h1>
      <div className="text-lg flex justify-between items-center w-full text-white font-light text-center mix-blend-overlay max-w-[300px] ml-auto mr-4">
        <p className="font-serif cursor-pointer">Twitter</p>
        <p className="font-serif cursor-pointer">Instagram</p>
        <p className="font-serif cursor-pointer">LinkedIn</p>
      </div>
      {/* <GradientButton /> */}
    </footer>
  );
}
