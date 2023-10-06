import { motion, useMotionValue, useTransform } from "framer-motion";
import { easeInOutQuint } from "@/config/eases";

import { useState } from "react";

const GradientButton = () => {
  const width = useMotionValue(550);
  const height = useMotionValue(80);

  const [isBig, setIsBig] = useState(false);
  return (
    <div
      className="relative flex justify-center items-center group cursor-pointer"
      onClick={() => {
        setIsBig(!isBig);
      }}
    >
      <motion.div
        className="relative rounded-full bg-[conic-gradient(from_var(--r),#222_0%,#eee_10%,#222_20%)] after:bg-[rgba(45,45,45)] group-hover:opacity-100 opacity-0 transition-opacity ease-in-out"
        // style={{
        //   width,
        //   height,
        // }}
        initial={false}
        animate={{
          height: !isBig ? 80 : window.innerHeight * 1.1,
          width: !isBig ? 550 : window.innerWidth * 1.1,
        }}
        transition={{ ease: easeInOutQuint, duration: 2 }}
        id="a"
      />
      <p className="z-50 uppercase w-full text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[1.57rem] leading-[.95] text-black font-light tracking-normal font-serif mix-blend-overlay group-hover:mix-blend-normal group-hover:text-white transition-colors duration-500 ease-in-out">
        Make beautiful stuff on the web.
      </p>
    </div>
  );
};

export default GradientButton;
