import { useEffect, useRef, useMemo, useState } from "react";
import {
  useTransform,
  useScroll,
  motion,
  circOut as ease,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { easeInOutQuint } from "@/config/eases";

const Loader = ({ children }) => {
  const ref = useRef(null);

  return (
    <motion.div
      initial={{
        translateY: "100%",
        // clipPath: "circle(200px at 50% 50%)",
        clipPath: "inset(20% 20% 20% 20% round 40px)",
        borderRadius: "40px",
        position: "fixed",
      }}
      animate={{
        translateY: "0",
        borderRadius: "0px",
        // clipPath: "circle(100% at 50% 50%)",
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        position: "unset",
      }}
      exit={{
        opacity: 0,
        borderRadius: "0px",
        position: "fixed",
      }}
      transition={{
        translateY: { duration: 2, ease: easeInOutQuint },
        clipPath: { duration: 1, delay: 2.25, ease: easeInOutQuint },
        position: { duration: 0, delay: 3.25 },
      }}
      className="w-full h-full top-0 left-0 z-[-1]"
      ref={ref}
    >
      {children}
    </motion.div>
  );
};

export default Loader;
