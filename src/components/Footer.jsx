import { useEffect, useRef, useMemo, useState } from "react";
import {
  useTransform,
  useScroll,
  motion,
  circOut as ease,
  useSpring,
  AnimatePresence,
} from "framer-motion";

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

  return (
    <footer
      className="sticky overflow-hidden h-[300px] flex flex-col justify-center bottom-0 left-0 w-full z-0 pointer-events-auto"
      onMouseMove={handleMousemove}
      onMouseLeave={() => nudgeX.set(0)}
    >
      <motion.h1
        style={{
          x: nudgeX,
        }}
        className="tracking-tighter text-[10.42vw] z-20 text-center leading-none text-white font-normal max-w-7xl"
      >
        CONNORROTHSCHILD
      </motion.h1>
      <div className="text-lg uppercase flex justify-between items-center w-full text-gray-400 font-light text-center">
        <p>Twitter</p>
        <p>Instagram</p>
        <p>LinkedIn</p>
      </div>
    </footer>
  );
}
