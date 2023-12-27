import { useRef, useEffect, useState, JSX } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function SplitTextHeader({
  container,
  phrase,
  textAlignment = "center",
}: {
  container: React.MutableRefObject<HTMLDivElement>;
  phrase: string;
  textAlignment?: "left" | "center" | "right";
}) {
  let refs = useRef<HTMLSpanElement[]>([]);
  const body = useRef<HTMLDivElement>(null);
  // const container = useRef(null);

  // const { scrollYProgress } = useScroll({
  //   target: body,
  //   offset: ["start start", "start end"],
  // });

  // const translateY = useTransform(scrollYProgress, [0, 1], [0, -300]);

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
  }, [
    // refs.current,
    isInView,
    hasInstantiated,
  ]);

  const createAnimation = () => {
    if (!container.current || !container.current?.offsetHeight) return;

    // Use the height of the container to determine the end position
    // But if this height were to exceed 80vh, then just use 80vh
    // const windowHeight = window.innerHeight;
    // 400px
    const endPosition = 400;
    // const endPosition =
    //   container.current?.offsetHeight > windowHeight * 0.8
    //     ? windowHeight * 0.8
    //     : container.current?.offsetHeight;

    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        // pin: true,

        start: "top 80%", // When the top of the container reaches 80% down the viewport
        end: "bottom 20%", // When the bottom of the container reaches 20% down the viewport

        // markers: true, // DEBUG
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
        "houston,",
        "texas.",
        "data",
        "visualization.",
        "websites",
      ].includes(word.toLowerCase());
      bodyText.push(
        <p
          key={word + "_" + i}
          className={`text-4xl md:text-5xl lg:text-5xl xl:text-[3.5rem] leading-[.9] ${
            emphasized
              ? "font-serif font-normal gradient-text"
              : "font-sans font-extralight text-gray-600 mix-blend-multiply"
          }`}
          style={{
            textAlign: textAlignment,
            justifyContent: textAlignment,
          }}
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
          {/* Letter with comma at end */}
          {letter}
          {/* {i === word.length - 1 && !isLast ? "," : ""} */}
        </span>
      );
    });
    return lettersArray;
  };

  return (
    <motion.div
      className="w-full flex flex-row items-center flex-wrap gap-x-3 gap-y-1 tracking-tight"
      ref={body}
      style={
        {
          // translateY,
          // margin:
          //   textAlignment === "center"
          //     ? "0 auto"
          //     : textAlignment === "left"
          //     ? "0 auto 0 0"
          //     : "0 0 0 auto",
          // textAlign: textAlignment,
          // justifyContent: textAlignment,
        }
      }
    >
      {splitWords(phrase)}
    </motion.div>
  );
}
