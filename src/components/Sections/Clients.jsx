import { useRef, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";

const phrase =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.";

const clients = [
  { name: "ACLU of Texas", color: "#1d478c" },
  { name: "Axios", color: "#ff0000" },
  { name: "Babby", color: "#1d8c78" },
  { name: "Beat Foundry", color: "#a83c2c" },
  { name: "Collaborative Fund", color: "#3c2ca8" },
  { name: "Gallery", color: "#9c2ca8" },
  { name: "Mapping Police Violence", color: "#f1b65a" },
  { name: "Praxis", color: "#0f2c96" },
  { name: "Rest of World", color: "#0DCC6C" },
  { name: "Texas Policy Lab", color: "#7c2ca8" },
  { name: "USSOCOM", color: "#cc9900" },
  { name: "Vana", color: "#dbff00" },
];

export default function Clients() {
  const [color, setColor] = useState("#131517");

  let refs = useRef([]);
  const body = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    if (!body.current) return;
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = () => {
    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        // pin: true,
        // end: () => "+=" + container.current.offsetHeight,

        start: "top top",
        end: "+=1000",
        // end: 1000,
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
          className="text-6xl font-serif text-left font-light text-white"
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
          {i === word.length - 1 && !isLast ? "," : ""}
        </span>
      );
    });
    return letters;
  };

  return (
    <section
      //   className="bg-[var(--background)] sticky top-0 z-[1]"
      className="bg-[var(--background)]"
      //   style={{
      //     boxShadow: "0 -10px 20px 5px rgba(0,0,0,0.5)",
      //   }}
      style={{
        background: color,
        transition: "background 250ms ease-in-out",
      }}
      ref={container}
    >
      {/* Color gradient */}
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1422 800"
        className="absolute top-0 left-0 w-[100vw] z-[-1]"
      >
        <defs>
          <radialGradient id="cccircular-grad" r="50%" cx="50%" cy="50%">
            <stop offset="15%" stopColor="#cb839a" stopOpacity="0.5"></stop>
            <stop
              offset="75%"
              stopColor="hsl(341, 100%, 85%)"
              stopOpacity="1"
            ></stop>
            <stop offset="100%" stopColor={color} stopOpacity="1"></stop>
          </radialGradient>
        </defs>
        <g fill="url(#cccircular-grad)">
          <circle r="1504" cx="0" cy="400" opacity="0.05"></circle>
          <circle r="1472" cx="0" cy="400" opacity="0.07"></circle>
          <circle r="1440" cx="0" cy="400" opacity="0.09"></circle>
          <circle r="1408" cx="0" cy="400" opacity="0.11"></circle>
          <circle r="1376" cx="0" cy="400" opacity="0.13"></circle>
          <circle r="1344" cx="0" cy="400" opacity="0.15"></circle>
          <circle r="1312" cx="0" cy="400" opacity="0.17"></circle>
          <circle r="1280" cx="0" cy="400" opacity="0.19"></circle>
          <circle r="1248" cx="0" cy="400" opacity="0.22"></circle>
          <circle r="1216" cx="0" cy="400" opacity="0.24"></circle>
          <circle r="1184" cx="0" cy="400" opacity="0.26"></circle>
          <circle r="1152" cx="0" cy="400" opacity="0.28"></circle>
          <circle r="1120" cx="0" cy="400" opacity="0.30"></circle>
          <circle r="1088" cx="0" cy="400" opacity="0.32"></circle>
          <circle r="1056" cx="0" cy="400" opacity="0.34"></circle>
          <circle r="1024" cx="0" cy="400" opacity="0.36"></circle>
          <circle r="992" cx="0" cy="400" opacity="0.38"></circle>
          <circle r="960" cx="0" cy="400" opacity="0.40"></circle>
          <circle r="928" cx="0" cy="400" opacity="0.42"></circle>
          <circle r="896" cx="0" cy="400" opacity="0.44"></circle>
          <circle r="864" cx="0" cy="400" opacity="0.46"></circle>
          <circle r="832" cx="0" cy="400" opacity="0.48"></circle>
          <circle r="800" cx="0" cy="400" opacity="0.50"></circle>
          <circle r="768" cx="0" cy="400" opacity="0.53"></circle>
          <circle r="736" cx="0" cy="400" opacity="0.55"></circle>
          <circle r="704" cx="0" cy="400" opacity="0.57"></circle>
          <circle r="672" cx="0" cy="400" opacity="0.59"></circle>
          <circle r="640" cx="0" cy="400" opacity="0.61"></circle>
          <circle r="608" cx="0" cy="400" opacity="0.63"></circle>
          <circle r="576" cx="0" cy="400" opacity="0.65"></circle>
          <circle r="544" cx="0" cy="400" opacity="0.67"></circle>
          <circle r="512" cx="0" cy="400" opacity="0.69"></circle>
          <circle r="480" cx="0" cy="400" opacity="0.71"></circle>
          <circle r="448" cx="0" cy="400" opacity="0.73"></circle>
          <circle r="416" cx="0" cy="400" opacity="0.75"></circle>
          <circle r="384" cx="0" cy="400" opacity="0.77"></circle>
          <circle r="352" cx="0" cy="400" opacity="0.79"></circle>
          <circle r="320" cx="0" cy="400" opacity="0.81"></circle>
          <circle r="288" cx="0" cy="400" opacity="0.83"></circle>
          <circle r="256" cx="0" cy="400" opacity="0.86"></circle>
          <circle r="224" cx="0" cy="400" opacity="0.88"></circle>
          <circle r="192" cx="0" cy="400" opacity="0.90"></circle>
          <circle r="160" cx="0" cy="400" opacity="0.92"></circle>
          <circle r="128" cx="0" cy="400" opacity="0.94"></circle>
          <circle r="96" cx="0" cy="400" opacity="0.96"></circle>
          <circle r="64" cx="0" cy="400" opacity="0.98"></circle>
        </g>
      </svg> */}
      <div className="sticky top-0 h-screen" ref={body}>
        <div className="group max-w-7xl py-8 w-full text-left flex flex-row gap-2 px-4 items-start flex-wrap">
          {/* {splitWords(clients.map((client) => client.name))} */}
          {/* {splitWords(phrase)} */}
          {clients.map((client, i) => (
            <div
              key={client.name + "_" + i}
              style={{
                "--background": client.color,
              }}
              onMouseEnter={() => setColor(client.color)}
              onMouseLeave={() => setColor("#131517")}
              className={`hover:opacity-70 transition-all duration-500 ease-in-out`}
            >
              <p
                className="text-6xl font-serif text-left font-light text-white"
                // style={{
                //   mixBlendMode: "overlay",
                // }}
              >
                {client.name}
              </p>
            </div>
          ))}
        </div>
        <h1 className="text-white text-[11vw] text-center font-bold absolute bottom-8 leading-none right-4 tracking-tighter uppercase">
          Clients
        </h1>
      </div>
    </section>
  );
}
