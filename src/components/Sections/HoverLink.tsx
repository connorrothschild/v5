import Link from "next/link";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function HoverLink({
  href,
  start,
  end,
  hovered,
  setHovered,
}: {
  href: string;
  start: string;
  end: string;
  hovered: null | "W" | "P";
  setHovered: React.Dispatch<React.SetStateAction<null | "W" | "P">>;
}) {
  return (
    <Link
      scroll={false}
      href={href}
      onMouseEnter={() => setHovered(start)}
      className="font-sans font-light text-gray-700"
    >
      <motion.span layout="size" className="flex items-center">
        {start}
        <AnimatePresence>
          {hovered === start && (
            <motion.span
              layout="size"
              initial={{
                opacity: 0,
                width: 0,
              }}
              animate={{
                opacity: 1,
                width: "auto",
                transition: {
                  width: {
                    ease: [0.76, 0, 0.24, 1],
                    duration: 0.4,
                  },
                  opacity: {
                    delay: 0.4,
                  },
                },
              }}
              exit={{
                opacity: 0,
                width: 0,
                transition: {
                  width: {
                    ease: [0.76, 0, 0.24, 1],
                    duration: 0.4,
                  },
                  opacity: {
                    delay: 0,
                  },
                },
              }}
              className="block"
            >
              {end}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </Link>
  );
}
