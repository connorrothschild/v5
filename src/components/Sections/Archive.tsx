import React, { useState } from "react";

// FIXME: Add Axios, Moksha, freelance work.
const projects = [
  {
    title: "Svelte Charts",
    year: 2023,
    url: "https://www.sveltecharts.com/",
    type: "App, web",
  },
  {
    title: "How China took over the world’s online shopping carts",
    year: 2023,
    url: "https://restofworld.org/2023/china-shopping-shein-temu-global-rise/",
    type: "Chart",
  },
  {
    title: "Causative Labs",
    year: 2023,
    // url: "https://minervadata.xyz/",
    type: "App",
  },
  {
    title: "Roadwise",
    year: 2023,
    url: "https://roadwisedss.com/",
    type: "App, web",
  },
  {
    title: "Minerva",
    year: 2023,
    url: "https://minervadata.xyz/",
    type: "App",
    featured: true,
  },
  {
    title: "Absolute Rest",
    year: 2023,
    type: "App",
  },
  {
    title: "Better Data Visualizations with Svelte",
    year: 2023,
    url: "https://www.newline.co/courses/better-data-visualizations-with-svelte",
    type: "Course",
  },
  {
    title: "A Visual Introduction to Prompt Engineering",
    year: 2023,
    url: "https://www.learnpromptengineering.org/",
    type: "Story",
    featured: true,
  },
  {
    title: "What languages dominate the internet?",
    year: 2023,
    url: "https://restofworld.org/2023/internet-most-used-languages/",
    type: "Chart",
  },
  {
    title: "Vana",
    year: 2022,
    url: "https://vana.com",
    type: "App, web",
  },
  {
    title: "Tech's very bad year, in numbers",
    year: 2023,
    url: "https://restofworld.org/2023/techs-bad-year-global-layoffs-data/",
    type: "Story",
    featured: true,
  },
  {
    title: "babby.xyz",
    year: 2022,
    url: "https://opensea.io/collection/babbys",
    type: "App, web",
  },
  {
    title: "Painting Attention: How Asphalt Art Saves Lives",
    year: 2022,
    url: "https://mokshadata.studio/projects/asphalt-art/",
    type: "Story",
  },
  {
    title: "Get to Know the Houston Budget",
    year: 2022,
    url: "https://houstonbudget.cool/",
    type: "Story",
  },
  {
    title: "Praxis",
    year: 2022,
    url: "https://cityofpraxis.org",
    type: "App, web",
    featured: true,
  },
  {
    title: "Gallery",
    year: 2022,
    url: "https://gallery.so",
    type: "App, web",
  },
  {
    title: "In the Dark",
    year: 2022,
    url: "https://restofworld.org/2022/blackouts/",
    type: "Story",
    featured: true,
  },
  {
    title: "An Interactive History of Impact Investing",
    year: 2022,
    url: "https://impact.collabfund.com/",
    type: "Microsite",
    featured: true,
  },
  {
    title: "COVID vulnerability scores vs. vaccination rates across the U.S.",
    year: 2021,
    url: "https://www.axios.com/2021/06/21/coronavirus-vaccines-vulnerability-states-outbreaks-variants",
    type: "Chart",
  },
  {
    title: "Olympic winners, over time",
    year: 2021,
    url: "https://www.axios.com/2021/07/23/olympic-winners",
    type: "Chart",
    featured: true,
  },
  {
    title: "The U.S. college population, visualized as 100 students",
    year: 2021,
    url: "https://www.axios.com/2021/08/21/hard-truths-deep-dive-higher-education-affirmative-action",
    type: "Chart",
  },
  {
    title: "Olympics medal tracker",
    year: 2021,
    url: "https://www.axios.com/2021/07/27/olympics-medal-count-usa-tokyo",
    type: "Chart",
  },
  {
    title: "Non-white share of population by county",
    year: 2021,
    url: "https://www.axios.com/2021/08/15/diversity-majority-minority-white-american-census",
    type: "Charts",
  },
  {
    title: "Axios Internship",
    year: 2021,
    url: "https://muckrack.com/connor-rothschild-1/portfolio",
    type: "Chart",
  },
  {
    title: "Beat Foundry",
    year: 2021,
    url: "https://fontsinuse.com/uses/47829/beat-foundry-visual-identity",
    type: "App, web",
  },
  {
    title: "Texas School District COVID-19 Monitoring Dashboard",
    year: 2021,
    url: "https://news.rice.edu/2021/05/05/dashboard-developed-at-rice-will-help-texas-schools-open-safely-amid-pandemic/",
    type: "Story",
  },
  {
    title: "Changes in Federal and State Minimum Wages",
    year: 2021,
    url: "https://twitter.com/CL_Rothschild/status/1366879233935564803",
    type: "Chart",
  },
  {
    title: "The Bob Ross Virtual Art Gallery",
    year: 2021,
    url: "https://connorrothschild.github.io/bob-ross-art-gallery/",
    type: "Story",
    featured: true,
  },
  {
    title: "One Line Hacks",
    description:
      "A collection of random utilities that I find myself Googling too often.",
    year: 2021,
    archived: true,
    url: "https://connorrothschild.github.io/one-line-hacks/",
    type: "Story",
  },
  {
    title: "USSOCOM Internship",
    year: 2020,
    // url: "https://twitter.com/CL_Rothschild/status/1328746973952942081",
    type: "App",
  },
  {
    title: "When COVID Peaked",
    year: 2020,
    url: "https://twitter.com/CL_Rothschild/status/1328746973952942081",
    type: "Chart",
  },
  {
    title: "COVID on Campus",
    year: 2020,
    url: "https://twitter.com/CL_Rothschild/status/1315353704388866048",
    type: "Story",
  },
  {
    title: "Mask Wearing in Your County",
    description: "Visualizing COVID-19 mask usage in your county.",
    year: 2020,
    url: "https://observablehq.com/@connorrothschild/mask-wearing-in-your-county",
    type: "Story",
  },
  {
    title: "I Can Guess What You're Doing Right Now",
    description:
      "Using the American Time Use Survey to predict your daily activities.",
    year: 2020,
    archived: true,
    url: "https://connorrothschild.github.io/what-are-you-doing/",
    type: "Story",
  },
  {
    title: "Are You Smarter Than COMPAS?",
    description:
      "A quick game to see if you are more intelligent than an algorithm used to sentence millions of Americans.",
    year: 2020,
    audience: "The world!",
    archived: true,
    url: "https://connorrothschild.github.io/compas/",
    type: "Story",
  },
  {
    title: "How Much Does Kid Cudi Hum?",
    description: "An extensive analysis of music's most famous hum.",
    year: 2020,
    url: "https://connorrothschild.github.io/cudi-hums/",
    type: "Story",
    featured: true,
  },
  {
    title: "How Many People Have Had COVID-19?",
    description: "A novel way to visualize COVID-19 case counts.",
    year: 2020,
    url: "https://connorrothschild.github.io/how-many-people",
    type: "Story",
  },
  {
    title: "Mapping Houston Homicides",
    description: "An exploration of homicides in Houston.",
    year: 2020,
    url: "https://connorrothschild.github.io/datathon-2020/source",
    type: "Story",
  },
  {
    title: "Mapping Police Killings",
    description: "Visualizing officer-involved deaths since 2013.",
    year: 2020,
    url: "https://mokshadata.studio/projects/police-force/",
    type: "Story",
    featured: true,
  },
  {
    title: "Quarantunes",
    description: "Explore your listening history during COVID-19.",
    year: 2020,
    url: "https://quarantune.netlify.app",
    type: "Story",
  },
  {
    title: "How Much Does Your State Spend on Police?",
    year: 2020,
    url: "https://connorrothschild.github.io/state-police-spending/",
    type: "Story",
  },
  {
    title: "Spikes in Firearm Background Checks during COVID-19",
    year: 2020,
    url: "https://twitter.com/CL_Rothschild/status/1283412638618341376",
    type: "Chart",
  },
  {
    title: "Mapping Missing Migrants",
    description:
      "Documenting migrants who have lost their lives while seeking refuge.",
    year: 2019,
    url: "https://connorrothschild.github.io/map-missing-migrants",
    type: "Story",
  },
  {
    title: "The Race for Media Attention",
    description:
      "Visualizing media coverage of 2020 presidential candiyears over time.",
    year: 2019,
    archived: true,
    url: "https://observablehq.com/@connorrothschild/bar-chart-race",
    type: "Story",
  },
].reverse();

const projectsFiltered = projects
  .filter((project) => !project.archived)
  // .sort((a, b) => a.year - b.year)
  .map((project, i) => ({
    id: i + 1,
    ...project,
  }))
  .sort((a, b) => a.id - b.id);

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
        <h1 className="text-7xl font-light font-serif mb-4">
          <span className="opacity-20">&&</span>
          Archive
        </h1>
        <p className="text-lg font-sans font-light mb-12 text-gray-700">
          A selected collection of my work—mostly for my own reference.
        </p>
        <div className="w-full max-w-5xl flex flex-row justify-between items-center gap-2 mb-2">
          <p className="min-w-[40px] text-sm uppercase text-left font-light">
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
              featured={project.featured}
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
  featured,
}: {
  id: number;
  title: string;
  type: string;
  year: number;
  url?: string;
  featured?: boolean;
}) {
  const [isActive, setIsActive] = useState(false);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      key={id}
      className="group w-full max-w-5xl flex flex-row justify-between items-center gap-2 border-t py-2 border-gray-400"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={{
        cursor: url ? "pointer" : "default",
      }}
    >
      <p className="min-w-[40px] text-left text-lg font-serif font-light text-gray-700">
        {prefixNumberWithZeroes(id)}.
      </p>
      <div className="w-full text-left text-lg font-serif font-light text-gray-700">
        <TableTitle label={title} isActive={isActive} />
      </div>
      <p className="w-full md:w-[100px] text-left text-xs leading-none font-sans uppercase font-medium text-gray-500">
        {type}
      </p>
      <p className="w-full md:w-[100px] text-left text-xs leading-none font-sans uppercase font-medium text-gray-500">
        {year}
      </p>

      {/* <p
        className={`w-12 text-right text-sm font-sans uppercase font-light text-gray-700 opacity-0 ${
          url && "group-hover:opacity-100"
        } transition-opacity ease-in-out duration-500`}
      >
        &rarr;
      </p> */}

      <p
        className={`w-12 text-right text-sm font-sans uppercase font-light text-gray-700`}
      >
        {featured ? "🔥" : ""}
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
            fontStyle: "italic",
            letterSpacing: ".4px",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
