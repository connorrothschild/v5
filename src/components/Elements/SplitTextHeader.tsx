import { useRef, useEffect, useState, JSX } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { useInView } from "framer-motion";

export default function SplitTextHeader({
  container,
  phrase,
}: {
  container: React.MutableRefObject<HTMLDivElement>;
  phrase: string;
}) {
  let refs = useRef<HTMLSpanElement[]>([]);
  const body = useRef<HTMLDivElement>(null);
  // const container = useRef(null);

  useEffect(() => {
    if (!body.current) return;
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const isInView = useInView(container);

  // Wait to create animation until after refs.current is populated and thing is in view
  useEffect(() => {
    // if (!body.current) return;
    // if (refs.current.length === 0) return;
    if (!isInView) return; // Important to check this last

    createAnimation();
  }, [
    // refs.current,
    isInView,
  ]);

  const createAnimation = () => {
    if (!container.current) return;
    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        // pin: true,

        start: "top center",
        end: () => "+=" + container.current.offsetHeight,

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
    // phrase.split(" ").forEach((word, i) => {
    //   const letters = splitLetters(word);
    //   console.log(letters);
    //   body.push(<p key={word + "_" + i}>{letters}</p>);
    // });
    words.forEach((client, i) => {
      const letters = splitLetters(client, i === words.length - 1);
      bodyText.push(
        <p
          key={client + "_" + i}
          className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-none font-serif text-left font-light text-stone-700"
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
    <div
      className="max-w-7xl w-full text-left flex flex-row px-4 items-center flex-wrap gap-2 tracking-tight"
      ref={body}
    >
      {/* {splitWords(clients.map((client) => client.name))} */}
      {splitWords(phrase)}
    </div>
  );
}
