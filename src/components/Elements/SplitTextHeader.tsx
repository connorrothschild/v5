import { useRef, useEffect, useState, JSX } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

export default function SplitTextHeader({
  container,
  phrase,
}: {
  container: RefObject<HTMLDivElement>;
  phrase: string;
}) {
  let refs = useRef<HTMLSpanElement[]>([]);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!body.current) return;
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const isInView = useInView(container);
  const [hasInstantiated, setHasInstantiated] = useState(false);

  // Wait to create animation until after refs.current is populated and thing is in view
  useEffect(() => {
    // if (!body.current) return;
    // if (refs.current.length === 0) return;
    if (!isInView) return; // Important to check this last
    if (hasInstantiated) return;

    createAnimation();
    setHasInstantiated(true);
  }, [isInView, hasInstantiated]);

  const createAnimation = () => {
    if (!container.current || !container.current?.offsetHeight) return;

    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,

        start: "top 90%", // When the top of the container reaches 80% down the viewport
        end: "bottom 20%", // When the bottom of the container reaches 20% down the viewport
      },
      opacity: 1,
      ease: "none",
      stagger: 0.1,
    });
  };

  const splitWords = (phrase: string | string[]) => {
    let words;
    if (typeof phrase === "string") {
      words = phrase.split(" ");
    } else {
      words = phrase;
    }

    let bodyText: JSX.Element[] = [];
    words.forEach((word, i) => {
      const letters = splitLetters(word, i === words.length - 1);
      const emphasized = [
        "software",
        "&",
        "data",
        "visualization",
        "engineer",
        "websites",
      ].includes(word.toLowerCase());
      bodyText.push(
        <p
          key={word + "_" + i}
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[3.5rem] !leading-[1.1] ${
            emphasized
              ? "font-serif font-light gradient-text"
              : "font-sans font-extralight text-gray-600 mix-blend-multiply"
          }`}
        >
          {letters}
        </p>
      );
    });
    return bodyText;
  };

  const splitLetters = (word: string, isLast: boolean) => {
    let lettersArray: JSX.Element[] = [];
    word.split("").forEach((letter, i) => {
      lettersArray.push(
        <span
          key={letter + "_" + i}
          className="opacity-10"
          ref={(el: HTMLSpanElement) => {
            refs.current.push(el);
          }}
        >
          {letter}
        </span>
      );
    });
    return lettersArray;
  };

  return (
    <motion.div
      className="w-full flex flex-row items-center flex-wrap gap-x-3 gap-y-1 tracking-tight"
      ref={body}
    >
      {splitWords(phrase)}
    </motion.div>
  );
}
