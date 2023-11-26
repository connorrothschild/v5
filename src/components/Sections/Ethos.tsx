import Link from "next/link";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import GridTitle from "../Elements/GridTitle";

export default function Ethos() {
  return (
    <section
      className="relative w-full bg-[var(--background-invert)] py-24 px-4 lg:px-12"
      id="work"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT SIDE */}
        <div className="flex flex-col col-span-1 gap-12">
          <span className="text-gray-700 font-serif italic font-extralight tracking-wide uppercase lg:sticky lg:top-12">
            01. Work
          </span>
        </div>
        {/* RIGHT SIDE */}
        <div className="col-span-2 flex flex-col gap-12 w-full">
          <h1
            className="text-6xl font-serif text-left font-light text-stone-700 mb-2"
            style={{
              textWrap: "balance",
            }}
          >
            I design and develop{" "}
            <span className="text-yellow-600">difference-making websites</span>{" "}
            for{" "}
            <span className="text-yellow-600">difference-making clients</span>.
          </h1>
          <h2
            className="text-1.5xl leading-snug font-sans text-left font-normal text-stone-500 mb-2"
            style={{
              textWrap: "balance",
            }}
          >
            I specialize in information design, data visualization, and
            performant UI. I combine cutting edge technologies with design
            sensibilities to make websites that are engaging, intuitive, and
            durable.
          </h2>

          <div className="flex flex-col gap-2">
            <GridTitle>Select projects</GridTitle>
            <div className="flex flex-row gap-2 group">
              <ProjectCard
                client="Minerva"
                service="App, web development"
                url="#"
                image="#"
              />
              <ProjectCard
                client="Rest of World"
                service="Data visualization"
                url="#"
                image="#"
              />
              <ProjectCard
                client="Praxis"
                service="Web development"
                url="#"
                image="#"
              />
            </div>
            <div className="w-full text-right">
              <Link
                href="/archive"
                className="mt-6 text-gray-500 font-serif flex items-center gap-1 justify-end"
              >
                View all <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  client,
  service,
  url,
  image,
}: {
  client: string;
  service: string;
  url: string;
  image: string;
}) {
  return (
    <Link
      className="w-full flex flex-col items-start gap-1 group-hover:grayscale hover:!grayscale-0 transition-all"
      href={url}
    >
      {/* Image */}
      <div className="w-full h-36 bg-gray-300 rounded-lg" />
      <div className="flex flex-row items-center gap-2 flex-wrap mt-2">
        <h1 className="font-serif text-xl leading-none">{client}</h1>
        <h2 className="font-sans w-max mt-1 bg-yellow-50 tracking-tight border border-double border-yellow-400 px-3 py-1 text-yellow-500 font-semibold text-[9px] rounded-full uppercase">
          {service}
        </h2>
      </div>
    </Link>
  );
}
