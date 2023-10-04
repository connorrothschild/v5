import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { easeInOutQuint } from "@/config/eases";

export default function Menu({}) {
  const [showMenu, setShowMenu] = useState(false);

  const MENU_IN_DURATION = 1.5;
  const WORD_IN_DURATION = 1;

  const container = {
    hidden: { translateY: "100%" },
    show: {
      translateY: 0,
      transition: {
        duration: MENU_IN_DURATION,
        ease: easeInOutQuint,
        staggerChildren: 0.5,
        delayChildren: MENU_IN_DURATION,
      },
    },
    exit: {
      translateY: "-100%",
    },
  };

  const word = {
    hidden: {
      opacity: 1,
      translateY: "-100%",
    },
    show: {
      opacity: 1,
      translateY: 0,
      transition: {
        duration: WORD_IN_DURATION,
        delay: MENU_IN_DURATION,
        ease: easeInOutQuint,
        staggerChildren: 0.05,
        delayChildren: MENU_IN_DURATION,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const letter = {
    // From translateX: 100% to translateX: 0
    hidden: { translateY: "100%" },
    show: {
      translateY: 0,
      transition: {
        duration: WORD_IN_DURATION,
        ease: easeInOutQuint,
      },
    },
    exit: {
      //   translateY: "-100%",
      opacity: 0,
    },
  };

  return (
    <>
      <p
        className="fixed bottom-0 left-0 p-4 text-stone-800 cursor-pointer text-lg z-50 leading-none font-serif mix-blend-hard-light"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        Menu
      </p>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            variants={container}
            key="menu"
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: MENU_IN_DURATION, ease: easeInOutQuint }}
            className="z-40 fixed top-0 left-0 w-screen h-screen flex justify-center items-center gap-2 font-serif"
            style={{
              background: "rgba(0,0,0,.7)",
              backdropFilter: "blur(7px)",
            }}
          >
            {["Projects,", "Awards,", "About,", "Contact"].map((w, index) => (
              <motion.h2
                variants={word}
                key={`menu-${index}`}
                initial="hidden"
                animate="show"
                exit="exit"
                className="text-white text-4xl overflow-hidden cursor-pointer"
              >
                {w.split("").map((l, index) => {
                  return (
                    <motion.span
                      variants={letter}
                      key={index}
                      className="inline-block"
                    >
                      {l}
                    </motion.span>
                  );
                })}{" "}
              </motion.h2>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
