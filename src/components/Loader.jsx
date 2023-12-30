import { motion } from "framer-motion";
import { easeInOutQuint } from "@/config/eases";

const Loader = ({ children }) => {
  const DURATION = 3.5;
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
        translateY: { duration: DURATION * 0.6153, ease: easeInOutQuint },
        clipPath: {
          duration: DURATION * 0.30769,
          delay: DURATION * 0.692,
          ease: easeInOutQuint,
        },
        position: {
          duration: 0,
          delay: DURATION,
        },
      }}
      className="w-full h-full top-0 left-0 z-[1] overflow-clip"
    >
      {children}
    </motion.div>
  );
};

export default Loader;
