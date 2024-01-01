import { useRef, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { motion, useInView } from "framer-motion";
import type { RefObject } from "react";

export default function SplitTextHeader({
  container,
  phrase,
}: {
  container: RefObject<HTMLDivElement>;
  phrase: string;
}) {
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!body.current) return;
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const isInView = useInView(container);
  const [hasInstantiated, setHasInstantiated] = useState(false);

  useEffect(() => {
    if (!isInView || hasInstantiated) return;
    createAnimation();
    setHasInstantiated(true);
  }, [isInView, hasInstantiated]);

  const createAnimation = () => {
    if (!container.current || !container.current.offsetHeight) return;

    gsap.to(wordsRef.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        start: "top 90%",
        end: "bottom 20%",
      },
      opacity: 1,
      ease: "none",
      stagger: 0.1,
    });
  };

  const splitWords = (phrase: string) => {
    return phrase.split(" ").map((word, index) => {
      const emphasized = [
        "software",
        "&",
        "data",
        "visualization",
        "engineer",
        "websites",
      ].includes(word.toLowerCase());
      return (
        <span
          key={word + "_" + index}
          className={`opacity-10 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[3.5rem] !leading-[1] ${
            emphasized
              ? "font-serif font-light gradient-text"
              : "text-gray-600 font-sans"
          }`}
          ref={(el) => {
            wordsRef.current.push(el);
          }}
        >
          {word + (index < phrase.split(" ").length - 1 ? " " : "")}
        </span>
      );
    });
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
