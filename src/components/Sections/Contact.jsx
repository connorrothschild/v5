import { useState, useRef } from "react";
import SplitTextHeader from "../Elements/SplitTextHeader";
import { useScroll, motion, useTransform } from "framer-motion";
import AnimatedButton from "../AnimatedButton";

export default function Contact() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    ref: container,
  });

  // From rounded to not (50%) to rounded
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 1], [1, 1, 0.85]);

  return (
    <AnimatedButton
      classes="mx-auto scale-95 rounded-3xl w-full relative px-4 md:px-8 lg:px-12 py-24"
      expandOnHover={true}
    >
      <motion.section
        className="w-full px-4 md:px-8 lg:px-12 py-24"
        // className="w-full bg-[var(--background)] min-h-[calc(100vh-2rem)] sticky top-[2rem] z-[3] py-12 px-4 rounded-t-[30px] flex flex-col justify-between gap-8"
        // style={{
        //   boxShadow: "0 0 20px rgba(0,0,0,.1)",
        // }}
        ref={container}
        // style={{
        //   borderRadius,
        //   scale,
        //   // translateY,
        // }}
      >
        {/* <CornerPill>Contact</CornerPill> */}

        <div className="flex flex-col justify-between gap-8">
          <SplitTextHeader
            container={container}
            phrase="I am available for freelance work and new collaborations. I keep an intentionally small roster of clients to ensure mutual interest & easy collaboration. There are two main channels I work with clients through:"
            textAlignment="left"
          />

          <div className="h-16" />

          {/* <div className="flex flex-col lg:flex-row justify-stretch gap-2 w-full">
          <AnimatedButton expandOnHover classes="w-full">
            <div className="w-full flex flex-col justify-center gap-12 px-8 py-12">
              <div className="flex flex-col justify-between gap-1">
                <h1 className="text-5xl font-serif text-left font-light text-stone-700 mb-2">
                  1. Design & web development
                </h1>
                <p className="text-stone-700 font-serif text-lg font-light leading-none mb-1">
                  Similar work: Praxis, Vana, Minerva
                </p>
                <p className="text-stone-700 font-serif text-lg font-light leading-none">
                  Best for: Early stage startups
                </p>
              </div>
              <h2 className="text-stone-700 font-sans text-right text-lg font-light">
                Independent contract, get in touch &rarr;
              </h2>
            </div>
          </AnimatedButton>
          <AnimatedButton expandOnHover classes="w-full">
            <div className="w-full flex flex-col justify-center gap-12 px-8 py-12">
              <div className="flex flex-col justify-between gap-1">
                <h1 className="text-5xl font-serif text-left font-light text-stone-700 mb-2">
                  2. Data visualization design
                </h1>
                <p className="text-stone-700 font-serif text-lg font-light leading-none mb-1">
                  Similar work: Rest of World, ACLU of Texas, RTI
                </p>
                <p className="text-stone-700 font-serif text-lg font-light leading-none">
                  Best for: Established media companies, thinktanks
                </p>
              </div>
              <h2 className="text-stone-700 font-sans text-right text-lg font-light">
                Moksha Data Studio, get in touch &rarr;
              </h2>
            </div>
          </AnimatedButton>
        </div> */}

          <div className="flex flex-col lg:flex-row justify-stretch gap-2 w-full">
            <h1 className="pl-4 text-5xl font-serif relative text-left font-light text-stone-700 mb-2">
              <span className="absolute top-0 left-0 text-stone-700 font-serif text-lg font-light leading-none mb-1">
                1.
              </span>{" "}
              Design and web development
            </h1>

            <span className="hidden lg:block text-stone-400 font-serif text-5xl font-light leading-none mb-1">
              &
            </span>

            <h1 className="pl-4 text-5xl font-serif relative text-left font-light text-stone-700 mb-2">
              <span className="absolute top-0 left-0 text-stone-700 font-serif text-lg font-light leading-none mb-1">
                2.
              </span>{" "}
              Data visualization design
            </h1>
          </div>

          <div className="h-16" />

          <h2 className="text-stone-500 font-serif text-left text-xl font-light">
            For either, please email me at{" "}
            <a
              href="mailto:connor@connorrothschild.com"
              className="text-amber-500 font-serif text-right text-lg font-light mix-blend-hard-light"
            >
              connor@connorrothschild.com
            </a>{" "}
            with a brief description of the project, timeline, and budget.
          </h2>

          {/* Basic tabular layout, two rows */}
          {/* <div className="flex flex-col gap-2">
        <div className="w-full flex flex-row justify-between items-start gap-6 px-4 py-6 bg-black rounded-lg">
          <div className="flex flex-col justify-between gap-4">
            <h1 className="text-3xl font-serif text-left font-light text-stone-100 mb-2">
              1. Design & web development
            </h1>
            <div className="flex flex-col justify-between gap-1">
              <p className="text-stone-200 font-sans text-lg font-light leading-none mb-1">
                Similar work: Praxis, Vana, Minerva
              </p>
              <p className="text-stone-200 font-sans text-lg font-extralight leading-none">
                Best for: Early stage startups
              </p>
            </div>
          </div>
          <h2 className="text-stone-300 font-serif italic text-right text-lg font-light">
            Independent contract, get in touch &rarr;
          </h2>
        </div>
        <div className="w-full flex flex-row justify-between items-start gap-6 px-4 py-6 bg-black rounded-lg">
          <div className="flex flex-col justify-between gap-4">
            <h1 className="text-3xl font-serif text-left font-light text-stone-100 mb-2">
              2. Data visualization design
            </h1>
            <div className="flex flex-col justify-between gap-1">
              <p className="text-stone-200 font-sans text-lg font-light leading-none mb-1">
                Similar work: Rest of World, ACLU of Texas, RTI
              </p>
              <p className="text-stone-200 font-sans text-lg font-extralight leading-none">
                Best for: Established media companies, thinktanks
              </p>
            </div>
          </div>
          <h2 className="text-stone-300 font-serif italic text-right text-lg font-light">
            Moksha Data Studio, get in touch &rarr;
          </h2>
        </div>
      </div> */}
        </div>
      </motion.section>
    </AnimatedButton>
  );
}

function ProjectCard({ client, image, title, description, color }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col min-w-[400px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="image-with-text relative rounded-xl overflow-hidden h-[400px] group">
        <img
          className="absolute w-full h-full filter brightness-50 blur-[3px] group-hover:filter-none transition delay-0 group-hover:delay-200"
          src={image}
        />
        <h2
          className="text-white font-serif text-center font-light text-2xl border border-solid px-6 py-2 uppercase absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0 rounded-lg w-[max-content]"
          style={{
            color: color,
            borderColor: color,
            background: `${color}30`,
            transition: "opacity .2s ease-in-out",
          }}
        >
          {client}
        </h2>
      </div>
      <div className="mt-3 flex flex-col justify-center items-center text-center gap-2 p-4">
        {/* <p
          className="text-xs border border-solid rounded-full w-[max-content] px-4 py-1 uppercase"
          style={{
            color: color,
            borderColor: color,
            background: `${color}20`,
          }}
        >
          {client}
        </p> */}
        <p className="text-stone-700 text-xl font-bold">{title}</p>
        <p className="text-stone-700 text-sm">{description}</p>
      </div>
    </div>
  );
}
