import React, { useState } from "react";

// FIXME: Add Axios, Moksha, freelance work.
const projects = [
  {
    title: "Texas School District COVID-19 Monitoring Dashboard",
    year: 2021,
    url: "http://news.rice.edu/2021/05/05/dashboard-developed-at-rice-will-help-texas-schools-open-safely-amid-pandemic/",
    type: "story",
  },
  {
    title: "Changes in Federal and State Minimum Wages",
    year: 2021,
    url: "https://twitter.com/CL_Rothschild/status/1366879233935564803",
    type: "chart",
  },
  {
    title: "The Bob Ross Virtual Art Gallery",
    year: 2021,
    url: "https://connorrothschild.github.io/bob-ross-art-gallery/",
    type: "story",
  },
  {
    title: "One Line Hacks",
    description:
      "A collection of random utilities that I find myself Googling too often.",
    year: 2021,
    archived: true,
    url: "https://connorrothschild.github.io/one-line-hacks/",
    type: "story",
  },
  {
    title: "When COVID Peaked",
    year: 2020,
    url: "https://twitter.com/CL_Rothschild/status/1328746973952942081",
    type: "chart",
  },
  {
    title: "COVID on Campus",
    year: 2020,
    url: "https://twitter.com/CL_Rothschild/status/1315353704388866048",
    type: "story",
  },
  {
    title: "Mask Wearing in Your County",
    description: "Visualizing COVID-19 mask usage in your county.",
    year: 2020,
    url: "https://observablehq.com/@connorrothschild/mask-wearing-in-your-county",
    type: "story",
  },
  {
    title: "I Can Guess What You're Doing Right Now",
    description:
      "Using the American Time Use Survey to predict your daily activities.",
    year: 2020,
    archived: true,
    url: "https://connorrothschild.github.io/what-are-you-doing/",
    type: "story",
  },
  {
    title: "Are You Smarter Than COMPAS?",
    description:
      "A quick game to see if you are more intelligent than an algorithm used to sentence millions of Americans.",
    year: 2020,
    audience: "The world!",
    archived: true,
    url: "https://connorrothschild.github.io/compas/",
    type: "story",
  },
  {
    title: "How Much Does Kid Cudi Hum?",
    description: "An extensive analysis of music's most famous hum.",
    year: 2020,
    url: "https://connorrothschild.github.io/cudi-hums/",
    type: "story",
  },
  {
    title: "How Many People Have Had COVID-19?",
    description: "A novel way to visualize COVID-19 case counts.",
    year: 2020,
    url: "https://connorrothschild.github.io/how-many-people",
    type: "story",
  },
  {
    title: "Mapping Houston Homicides",
    description: "An exploration of homicides in Houston.",
    year: 2020,
    url: "https://connorrothschild.github.io/datathon-2020/source",
    type: "story",
  },
  {
    title: "Mapping Police Killings",
    description: "Visualizing officer-involved deaths since 2013.",
    year: 2020,
    url: "https://mappingpoliceviolence.org/",
    type: "story",
  },
  {
    title: "Quarantunes",
    description: "Explore your listening history during COVID-19.",
    year: 2020,
    url: "https://quarantune.netlify.app",
    type: "story",
  },
  {
    title: "How Much Does Your State Spend on Police?",
    year: 2020,
    url: "https://connorrothschild.github.io/state-police-spending/",
    type: "story",
  },
  {
    title: "Spikes in Firearm Background Checks during COVID-19",
    year: 2020,
    url: "https://twitter.com/CL_Rothschild/status/1283412638618341376",
    type: "chart",
  },
  {
    title: "Mapping Missing Migrants",
    description:
      "Documenting migrants who have lost their lives while seeking refuge.",
    year: 2019,
    url: "https://connorrothschild.github.io/map-missing-migrants",
    type: "story",
  },
  {
    title: "The Race for Media Attention",
    description:
      "Visualizing media coverage of 2020 presidential candiyears over time.",
    year: 2019,
    archived: true,
    url: "https://observablehq.com/@connorrothschild/bar-chart-race",
    type: "story",
  },
];

const projectsFiltered = projects
  .filter((project) => !project.archived)
  .sort((a, b) => a.year - b.year)
  .map((project, i) => ({
    id: i + 1,
    ...project,
  }));

const prefixNumberWithZeroes = (number: number) => {
  if (number < 10) {
    return `00${number}`;
  } else if (number < 100) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
};

export default function Archive() {
  const DARK_MODE = false;
  return (
    <section
      className="w-full min-h-screen bg-[var(--background-invert)]"
      style={{
        filter: DARK_MODE ? "invert(1)" : "none",
      }}
    >
      <div className="flex flex-col items-start justify-start py-24 w-full min-h-screen text-black px-4 lg:px-12">
        <h1 className="text-7xl font-light font-serif mb-4">Archive</h1>
        <p className="text-lg font-sans uppercase font-light mb-12 text-gray-700">
          A selected collection of my work
        </p>
        <div className="w-full max-w-5xl flex flex-row justify-between items-center gap-2 mb-2">
          <p className="min-w-[34px] text-sm uppercase text-left font-light">
            No.
          </p>
          <p className="w-full text-sm uppercase font-light">Title</p>
          <p className="w-full md:w-[100px] text-sm uppercase font-light">
            Type
          </p>
          <p className="w-full md:w-[100px] text-sm uppercase font-light">
            Year
          </p>
          <p className="w-12"></p>
        </div>
        {projectsFiltered
          .sort((a, b) => b.id - a.id)
          .map((project) => (
            <TableRow
              key={project.id}
              id={project.id}
              title={project.title}
              type={project.type}
              year={project.year}
              url={project.url}
            />
          ))}
      </div>
    </section>
  );
}

function TableRow({
  id,
  title,
  type,
  year,
  url,
}: {
  id: number;
  title: string;
  type: string;
  year: number;
  url?: string;
}) {
  const [isActive, setIsActive] = useState(false);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      key={id}
      className="cursor-pointer group w-full max-w-5xl flex flex-row justify-between items-center gap-2 border-t py-2 border-gray-400"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <p className="min-w-[34px] text-left text-lg font-serif font-light text-gray-700">
        {prefixNumberWithZeroes(id)}.
      </p>
      <div className="w-full text-left text-lg font-serif font-light text-gray-800">
        <TableTitle label={title} isActive={isActive} />
      </div>
      <p className="w-full md:w-[100px] text-left text-xs leading-none font-sans uppercase font-light text-gray-700">
        {type}
      </p>
      <p className="w-full md:w-[100px] text-left text-xs leading-none font-sans uppercase font-light text-gray-700">
        {year}
      </p>

      <p className="w-12 text-right text-sm font-sans uppercase font-light text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500">
        &rarr;
      </p>
    </a>
  );
}

function TableTitle({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <div
      className="relative"
      style={{
        perspective: "100px",
      }}
    >
      <div
        className="overflow-hidden relative flex flex-col group h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 800ms cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <p
          className="transition-all duration-[500ms] ease-in-out pointer-events-none"
          style={{
            opacity: isActive ? 0 : 1,
            transform: isActive ? "translateY(-100%)" : "translateY(0)",
          }}
        >
          {label}
        </p>
        <p
          className="absolute transform transition-all duration-[500ms] ease-in-out pointer-events-none"
          style={{
            transform: isActive ? "none" : "rotateX(-90deg)",
            opacity: isActive ? 1 : 0,
            transformOrigin: "bottom center",
            transitionDelay: isActive ? "100ms" : "0ms",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
