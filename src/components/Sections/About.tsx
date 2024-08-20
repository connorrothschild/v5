import React, { useEffect, useMemo, useState } from "react";
import Dot from "@/components/Elements/Dot";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/router";
import SectionTitle from "../Elements/SectionTitle";

export default function About() {
  return (
    <section className="w-full min-h-screen relative">
      <div className="z-10 relative flex flex-col items-start justify-start pt-48 pb-24 w-full min-h-screen text-black px-[20px]">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-7xl font-sans font-extralight text-gray-700 mb-2 tracking-[-0.02em]">
            About
          </h1>
          {/* <SectionTitle classes="relative">About</SectionTitle> */}
          <BodyText>
            I live in Houston, Texas and help run Moksha Data Studio. We build
            microsites, interactives, and visualizations for clients working in
            the social impact space.
          </BodyText>
          <BodyText>
            Alongside my role in the studio, I do freelance application and web
            development, most typically with early-to-mid-stage startups. This
            work is not landing page design, but rather building out the core
            functionality of a product{" "}
            <span className="italic">(app.domain.com, not domain.com).</span>
          </BodyText>
          <BodyText>
            A more comprehensive overview of my work experience can be found{" "}
            <a
              href="https://read.cv/connorr"
              className="underline underline-offset-4"
            >
              here.
            </a>
          </BodyText>
          {/* <div className="h-8" />

          <h1 className="text-3xl font-sans font-extralight text-gray-700 mb-2">
            More
          </h1>

          <BodyText>
            I’m originally from Springfield, Missouri. I moved to Houston to
            attend Rice University, where I majored in the quantitative social
            sciences. I taught myself the stuff on this site in my free time.
          </BodyText>
          <BodyText>
            I’m passionate about accessibility and disability advocacy; my
            mother is fully blind (and really cool). I’m also interested in
            public policy (in particular, housing policy).
          </BodyText>
          <BodyText>
            I enjoy Super Smash Bros, lifting weights, and visiting coffee shops
            in Houston. My favorite movie is Eternal Sunshine of the Spotless
            Mind and my favorite artist is Ecco2K.
          </BodyText> */}

          <div className="h-8" />

          <h1 className="text-3xl font-sans font-extralight text-gray-700 mb-2">
            This site
          </h1>

          <BodyText>
            This site (which is my fifth personal website, lol
            <ReferenceNote
              label="1"
              href="https://connorrothschild.github.io/v1/"
            />
            <ReferenceNote
              label="2"
              href="https://connorrothschild.github.io/v2/"
            />
            <ReferenceNote
              label="3"
              href="https://connorrothschild.github.io/v3/"
            />
            <ReferenceNote
              label="4"
              href="https://connorrothschild.github.io/v4/"
              isLast={true}
            />
            ) represents a departure from previous ones in that I advertise work
            beyond data visualization (which has been my primary focus for the
            past few years). The release of this site coincides with a shift in
            my career towards broader web design and development.
          </BodyText>
          <BodyText>
            This website not only showcases my portfolio but also serves as a
            platform for exploring and implementing innovative ideas. It’s built
            with Next.js, TailwindCSS, and Framer Motion. Fonts in use are{" "}
            <a
              href="https://pangrampangram.com/products/neue-montreal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Neue Montreal
            </a>{" "}
            and{" "}
            <a
              href="https://www.tunera.xyz/fonts/nyght-serif/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nyght Serif
            </a>
            .
          </BodyText>
          <BodyText>The site is one of intentional contrast:</BodyText>
          <ul className="list-disc list-inside mt-2 text-lg font-sans font-light leading-snug text-gray-700 max-w-prose mb-4">
            <li className="">
              Simple, muted colors alongside colorful gradients
            </li>
            <li className="">
              Elegant serif fonts alongside a more modern sans-serif
            </li>
          </ul>
          <BodyText>
            As I lean more into work that combines design (complexity,
            creativity) and code (simplicity, logic), I wanted to build a site
            that reflects that. I hope you enjoy it.
          </BodyText>
        </div>
      </div>
      <Gradient />
    </section>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg font-sans font-light leading-snug text-gray-700 max-w-prose mb-2">
      {children}
    </p>
  );
}

function ReferenceNote({
  label,
  href,
  isLast = false,
}: {
  label: string;
  href: string;
  isLast?: boolean;
}) {
  return (
    <sup className="mr-px">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {label}
      </a>
      {isLast ? "" : ","}
    </sup>
  );
}

function Gradient() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 800 800"
      className="absolute bottom-0 right-0 h-full z-0 opacity-50 md:opacity-80"
    >
      <defs>
        <filter
          id="bbblurry-filter"
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feGaussianBlur
            stdDeviation="109"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="SourceGraphic"
            edgeMode="none"
            result="blur"
          ></feGaussianBlur>
        </filter>
      </defs>
      <g filter="url(#bbblurry-filter)">
        <ellipse
          rx="136"
          ry="126"
          cx="603.1727342855243"
          cy="209.2452391779235"
          fill="hsla(195, 100%, 50%, 1.00)"
        ></ellipse>
        <ellipse
          rx="136"
          ry="126"
          cx="339.62729409102997"
          cy="438.19076170596776"
          fill="hsla(161, 99%, 54%, 1.00)"
        ></ellipse>
        <ellipse
          rx="136"
          ry="126"
          cx="556.071533203125"
          cy="601.0756225585938"
          fill="hsla(303, 99%, 54%, 1.00)"
        ></ellipse>
      </g>
    </svg>
  );
}
