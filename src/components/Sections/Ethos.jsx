import { useRef, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { useInView } from "framer-motion";

const phrase =
  "Connor Rothschild is a Houston-based creative developer, working as a partner and engineer at Moksha Data Studio. He has designed and developed websites with a focus on information design for clients like...";

// const phrase2 =
//   "I work with clients to create websites and data visualizations that are beautiful, accessible, and easy to use. I also work with clients to create data visualizations that are beautiful, accessible, and easy to use.";

const clients = [
  { name: "ACLU of Texas" },
  { name: "Axios" },
  { name: "Babby" },
  { name: "Beat Foundry" },
  { name: "Collaborative Fund" },
  { name: "Gallery" },
  { name: "Mapping Police Violence" },
  { name: "Praxis" },
  { name: "Rest of World" },
  { name: "Texas Policy Lab" },
  { name: "USSOCOM" },
  { name: "Vana" },
];

export default function Clients() {
  const [color, setColor] = useState("#FF0000");

  let refs = useRef([]);
  const body = useRef(null);
  const container = useRef(null);

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

  const splitWords = (phrase) => {
    let words;
    if (typeof phrase === "string") {
      words = phrase.split(" ");
    } else {
      words = phrase;
    }

    let body = [];
    // phrase.split(" ").forEach((word, i) => {
    //   const letters = splitLetters(word);
    //   console.log(letters);
    //   body.push(<p key={word + "_" + i}>{letters}</p>);
    // });
    words.forEach((client, i) => {
      const letters = splitLetters(client, i === clients.length - 1);
      body.push(
        <p
          key={client + "_" + i}
          className="text-5xl font-serif text-left font-light text-stone-700"
        >
          {letters}
        </p>
      );
    });
    return body;
  };

  const splitLetters = (word, isLast) => {
    let letters = [];
    word.split("").forEach((letter, i) => {
      letters.push(
        <span
          key={letter + "_" + i}
          className="opacity-10"
          ref={(el) => {
            refs.current.push(el);
          }}
        >
          {/* Letter with comma at end */}
          {letter}
          {/* {i === word.length - 1 && !isLast ? "," : ""} */}
        </span>
      );
    });
    return letters;
  };

  return (
    <section className="bg-[var(--background)]" ref={container}>
      <div
        className="max-w-7xl py-24 w-full text-left flex flex-row px-4 items-center flex-wrap gap-2 tracking-tight"
        ref={body}
      >
        {/* {splitWords(clients.map((client) => client.name))} */}
        {splitWords(phrase)}
      </div>
      {/* <div
        className="max-w-7xl py-16 w-full text-left flex flex-row px-4 items-center flex-wrap gap-2 tracking-tight"
        ref={body}
      >
        {splitWords(phrase2)}
      </div> */}
    </section>
  );
}
