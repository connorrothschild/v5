import { useState, useRef, useEffect } from "react";
import SplitTextHeader from "../Elements/SplitTextHeader";
import CornerPill from "../Elements/CornerPill";

import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from "gsap/dist/InertiaPlugin";
import { AnimatePresence, motion } from "framer-motion";

export default function Projects() {
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin);

    return () => {};
  }, []);

  return (
    <section
      id="projects"
      // className="w-full bg-[var(--background)] min-h-screen py-12 px-4 flex flex-col justify-between gap-8"
      // className="relative w-full bg-[var(--background-invert)] min-h-screen px-4 lg:px-12 py-24 flex flex-col justify-between gap-8"

      className="relative w-full bg-[var(--background-invert)] py-24 px-4 lg:px-12"
      // className="w-full bg-[var(--background)] min-h-screen py-12 px-4 rounded-t-[30px] flex flex-col justify-between gap-8"
      // style={{
      //   boxShadow: "0 0 20px rgba(0,0,0,.1)",
      // }}
      ref={container}
    >
      {/* <CornerPill>Projects</CornerPill> */}

      <div className="flex flex-col justify-between gap-8">
        <h1 className="text-7xl font-serif text-left font-light text-stone-300 mb-2">
          Hi, I&apos;m Connor.
        </h1>

        <div className="invert">
          <SplitTextHeader
            container={container}
            phrase="I am a Houston-based creative developer, working as a partner and engineer at Moksha Data Studio. I have designed and developed websites with a focus on information design for clients like..."
            textAlignment="left"
          />
        </div>

        <div className="h-16" />

        {/* Horizontally scrollable list of projects */}
        {/* <Slider /> */}
        {/* <Grid /> */}
        <TextGrid />
      </div>
    </section>
  );
}

function ProjectCard({ client, image, title, description, color }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col aspect-square overflow-hidden border-4 border-solid border-stone-300 rounded-xl"
      style={{
        borderColor: color,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="image-with-text relative h-full group">
        <img
          className="object-cover absolute w-full h-full filter brightness-50 group-hover:filter-none transition delay-0"
          src={image}
        />
        <h2
          className="text-white font-serif text-center font-light text-2xl border border-solid px-6 py-2 uppercase absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0 rounded w-[max-content] backdrop-blur-xl"
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
      {/* <div className="mt-3 flex flex-col justify-center items-center text-center gap-2 p-4">
     
        <p className="text-stone-300 text-xl font-bold">{title}</p>
        <p className="text-stone-300 text-sm">{description}</p>
      </div> */}
    </div>
  );
}

const projects = [
  {
    client: "Rest of World",
    image: "/images/projects/blackouts.png",
    title: "A decade of internet blackouts",
    description:
      "Visualizing seven years, 60 countries, and 935 government-imposed internet shutdowns.",
    color: "#0DCC6C",
    link: "https://restofworld.org/2022/blackouts/",
  },
  {
    client: "Collaborative Fund",
    image: "/images/projects/impact.png",
    title: "The history of impact investing",
    description:
      "Visualizing 40 years of impact investing, from the first social venture capital firm to the rise of ESG.",
    color: "#7893eb",
    link: "https://impact.collabfund.com/",
  },
  {
    client: "Praxis",
    image: "/images/projects/praxis.png",
    title: "Building a new city",
    description:
      "Web design and development for a new city in the Mediterranean.",
    color: "#348a00",
    link: "https://cityofpraxis.org",
  },
  {
    client: "Absolute Rest",
    image: "/images/projects/absolute-rest.png",
    title: "Democratizing sleep studies",
    description: "Application development for a leading sleep study company.",
    color: "#312e81",
    link: "https://www.absoluterest.com/",
  },
  {
    client: "Gallery",
    image: "/images/projects/gallery.png",
    title: "Building virtual art galleries",
    description:
      "Web design and development for the leading NFT gallery platform.",
    color: "#ffffff",
    link: "https://www.gallery.so/",
  },
  {
    client: "Minerva",
    image: "/images/projects/gallery.png",
    title: "Revolutionizing real estate",
    description:
      "Web design and development for a new real estate management platform.",
    color: "#f03c3c",
    link: "https://www.gallery.so/",
  },
];

const Slider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;
    gsap.registerPlugin(Draggable);
    Draggable.create(sliderRef.current, {
      type: "x",
      bounds: {
        minX: -sliderRef.current.clientWidth + window.innerWidth * 0.88,
        maxX: 0,
      },
      inertia: true,
      throwResistance: 2500,
      minDuration: 0.25,
    });
  }, []);

  return (
    <div
      id="slider"
      className="flex gap-4 flex-nowrap scrollbar-hide"
      style={{
        width: "max-content",
        overflowX: "hidden",
      }}
      ref={sliderRef}
    >
      {projects.map((d) => (
        <ProjectCard
          key={d.client}
          client={d.client}
          image={d.image}
          title={d.title}
          description={d.description}
          color={d.color}
          link={d.link}
        />
      ))}
    </div>
  );
};

const Grid = () => {
  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
      }}
    >
      {projects.map((d) => (
        <ProjectCard
          key={d.client}
          client={d.client}
          image={d.image}
          title={d.title}
          description={d.description}
          color={d.color}
          link={d.link}
        />
      ))}
    </div>
  );
};

const expansiveList = [
  {
    layout: "client",
    title: "Absolute Rest",
    service: "Web design and development",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: false,
    image: "aclu-square.png",
    img_alt: "Logo for the American Civil Liberties Union of Texas",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
  {
    layout: "client",
    title: "ACLU of Texas",
    service: "Microsite development",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: false,
    image: "aclu-square.png",
    img_alt: "Logo for the American Civil Liberties Union of Texas",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
  {
    layout: "client",
    title: "Axios",
    service: "Data visualization",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: false,
    image: "axios-square.png",
    img_alt: "Logo for Axios",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
  {
    layout: "client",
    title: "Babby",
    service: "Web design and development",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: false,
    image: "babby-square.png",
    img_alt: "Logo for Babby",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
  {
    layout: "client",
    title: "Beat Foundry",
    service: "Web design and development",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: true,
    image: "beat-foundry-square.png",
    img_alt: "Logo for Beat Foundry",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
  {
    layout: "client",
    title: "Collaborative Fund",
    service: "Microsite development",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: false,
    image: "collaborative-fund-square.png",
    img_alt: "Logo for Collaborative Fund",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
  {
    layout: "client",
    title: "Gallery",
    service: "Web design and development",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: false,
    image: "gallery-square.png",
    img_alt: "Logo for Gallery",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
  {
    layout: "client",
    title: "Mapping Police Violence",
    service: "Data visualization",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: true,
    image: "mapping-police-violence-square.png",
    img_alt: "Logo for Mapping Police Violence",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
  {
    layout: "client",
    title: "Minerva",
    service: "Web design and development",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: false,
    image: "mapping-police-violence-square.png",
    img_alt: "Logo for Mapping Police Violence",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
  {
    layout: "client",
    title: "Praxis",
    service: "Data visualization",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: false,
    image: "praxis-square.png",
    img_alt: "Logo for Praxis",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
  {
    layout: "client",
    title: "Rest of World",
    service: "Data visualization",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: false,
    image: "rest-of-world-square.png",
    img_alt: "Logo for Rest of World",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
  {
    layout: "client",
    title: "Texas Policy Lab",
    service: "Web design and development",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: true,
    image: "texas-policy-lab-square.png",
    img_alt: "Logo for Texas Policy Lab",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
  {
    layout: "client",
    title: "US Special Operations Command",
    service: "Web design and development",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: true,
    image: "ussocom-square.png",
    img_alt: "Logo for US Special Operations Command",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
  {
    layout: "client",
    title: "Vana",
    service: "Data visualization",
    description: null,
    date: "",
    audience: null,
    featured: false,
    archived: false,
    image: "vana-square.png",
    img_alt: "Logo for Vana",
    techstack: ["JavaScript"],
    github: null,
    url: "",
  },
].filter((d) => !d.archived);

const convertIndexToTwoDigitZeroPrefix = (number) => {
  const correctedIndex = number + 1;
  const isAlreadyTwoDigits = correctedIndex >= 10;
  return isAlreadyTwoDigits ? correctedIndex : `0${correctedIndex}`;
};

const TextGrid = () => {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="flex flex-row gap-x-2 gap-y-2 flex-wrap max-w-7xl group justify-start">
      {expansiveList.map((d, i) => (
        <h2
          key={d.client}
          //  hover:tracking-tight tracking-normal
          className={`inline-flex items-center gap-6 border-2 border-solid rounded-lg border-transparent hover:border-[${d.color}] transition-all duration-300 delay-[--delay] group-hover:delay-0`}
          style={{
            // borderColor: hovered === d.title ? d.color : "transparent",
            // background: hovered === d.title ? `${d.color}10` : "transparent",
            opacity: hovered && hovered !== d.title ? 0.25 : 1,
            filter: hovered && hovered !== d.title ? "blur(1px)" : "none",
            "--delay": `${i * 50}ms`,
          }}
          onMouseEnter={() => setHovered(d.title)}
          onMouseLeave={() => setHovered(null)}
        >
          <a
            href="#"
            key={d.title}
            className="text-stone-200 font-serif font-light text-7xl relative"
            style={{
              color: d.color,
            }}
          >
            <p className="absolute -top-1 -left-3 text-xs flex items-center gap-1">
              <span>{convertIndexToTwoDigitZeroPrefix(i)}. </span>
              {/* <AnimatePresence>
                {hovered === d.title && (
                  <motion.span
                    className="tracking-normal"
                    initial={{
                      translateY: 5,
                      opacity: 0,
                      // translateX: "-50%",
                    }}
                    animate={{
                      translateY: 0,
                      opacity: 1,
                      // translateX: "-50%",
                    }}
                    exit={{
                      translateY: 0,
                      opacity: 0,
                      // translateX: "-50%",
                    }}
                    style={{
                      textShadow: "-1px -1px 5px var(--background)",
                    }}
                  >
                    {d.service} with
                  </motion.span>
                )}
              </AnimatePresence> */}
            </p>
            {d.title}{" "}
            <span
              className="text-stone-500 px-2"
              style={{
                opacity: i < expansiveList.length - 1 ? 1 : 0,
              }}
            >
              &
            </span>
            <img
              src={`images/projects/${d.image}`}
              className="aspect-square h-full object-cover rounded absolute right-0 top-0"
              style={{
                opacity: hovered === d.title ? 1 : 0,
                transition: "opacity .2s ease-in-out",
              }}
            />
          </a>
        </h2>
      ))}
    </div>
  );
};
