import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { easeInOutQuint } from "@/config/eases";
import Jukebox from "./Jukebox";

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
      {/* Note that the menu is hidden on page load, once the Loader component applies .loaded it will be visible (see globals.css) */}
      <p
        id="menu-button"
        className={`opacity-0 pointer-events-none fixed bottom-0 left-0 p-4 cursor-pointer text-lg z-50 leading-none font-serif transition-all duration-200 delay-200 mix-blend-difference ${
          showMenu ? "text-white" : "text-gray-400"
        }`}
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        Menu
      </p>

      {/* We want to render the Jukebox at all times so that it plays even when not visible. We only toggle visibility, not rendering. */}
      <Jukebox controllerIsVisible={showMenu} />

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
