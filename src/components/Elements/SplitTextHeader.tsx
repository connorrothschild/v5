import { useRef, useEffect, useState, JSX } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { useInView } from "framer-motion";

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
    const windowHeight = window.innerHeight;
    const endPosition =
      container.current?.offsetHeight > windowHeight * 0.8
        ? windowHeight * 0.8
        : container.current?.offsetHeight;

    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        // pin: true,

        start: "top center",
        end: () => "+=" + endPosition,
        // end: "bottom top",

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
          className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-none font-serif font-light text-stone-600"
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
    <div
      className="max-w-6xl w-full flex flex-row items-center flex-wrap gap-2 tracking-tight"
      ref={body}
      style={{
        margin:
          textAlignment === "center"
            ? "0 auto"
            : textAlignment === "left"
            ? "0 auto 0 0"
            : "0 0 0 auto",
        textAlign: textAlignment,
        justifyContent: textAlignment,
      }}
    >
      {/* {splitWords(clients.map((client) => client.name))} */}
      {splitWords(phrase)}
    </div>
  );
}
