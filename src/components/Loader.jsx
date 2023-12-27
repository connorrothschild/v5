import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { easeInOutQuint } from "@/config/eases";
import { useRouter } from "next/router";

const Loader = ({ children }) => {
  // We only want this loader on 1) fresh loads and 2) on the home page
  // const router = useRouter();
  // const [skipLoading, setSkipLoading] = useState(false);

  // useEffect(() => {
  //   if (router.pathname !== "/") {
  //     setSkipLoading(true);
  //   }
  // }, [router.pathname]);

  // useEffect(() => {
  //   const startHandler = () => {
  //     console.log("Router change started");
  //     setSkipLoading(true);
  //   };

  //   const completeHandler = () => {
  //     console.log("Router change completed");
  //   };

  //   router.events.on("routeChangeStart", startHandler);
  //   router.events.on("routeChangeComplete", completeHandler);

  //   return () => {
  //     router.events.off("routeChangeStart", startHandler);
  //     router.events.off("routeChangeComplete", completeHandler);
  //   };
  // }, []);

  // const LOADING_TIME = 3.25;
  // useEffect(() => {
  //   if (skipLoading) {
  //     document.body.classList.add("loaded");
  //     return;
  //   }

  //   document.body.classList.add("loading");
  //   document.body.classList.remove("loaded");

  //   setTimeout(() => {
  //     document.body.classList.remove("loading");
  //     document.body.classList.add("loaded");
  //   }, LOADING_TIME * 1000);
  // }, [skipLoading]);

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
        clipPath: {
          duration: 1,
          delay: 2.25,
          ease: easeInOutQuint,
        },
        position: {
          duration: 0,
          delay: 3.25,
        },
      }}
      className="w-full h-full top-0 left-0 z-[1] overflow-clip"
    >
      {children}
    </motion.div>
  );
};

export default Loader;
