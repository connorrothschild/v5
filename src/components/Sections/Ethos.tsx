import Link from "next/link";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import GridTitle from "../Elements/GridTitle";
import EmphasizeOnScroll from "../Elements/EmphasizeOnScroll";
import SectionTitle from "../Elements/SectionTitle";
import SectionSubtitle from "../Elements/SectionSubtitle";

export default function Ethos() {
  return (
    <section className="relative px-[20px]" id="work">
      <div className="grid grid-cols-1 gap-12">
        {/* LEFT SIDE */}
        <div className="flex flex-col col-span-1 gap-12">
          <span className="text-gray-700 font-serif italic font-extralight tracking-wide uppercase lg:sticky lg:top-0 pt-12">
            01. Work
          </span>
        </div>
        {/* RIGHT SIDE */}
        <div className="col-span-2 flex flex-col gap-12 w-full">
          {/* <SectionTitle>
            I design and develop{" "}
            <EmphasizeOnScroll>difference-making websites</EmphasizeOnScroll>{" "}
            for <EmphasizeOnScroll>difference-making clients</EmphasizeOnScroll>
            .
          </SectionTitle> */}
          <SectionSubtitle>
            I specialize in information design, data visualization, and
            performant UI. I combine cutting edge technologies with design
            sensibilities to make websites that are engaging, intuitive, and
            durable.
          </SectionSubtitle>

          <div className="flex flex-col gap-2">
            <GridTitle>Select projects</GridTitle>
            <div className="flex flex-col md:flex-row gap-4 md:gap-2 group">
              <ProjectCard
                client="Minerva"
                service="App, web development"
                url="#"
                image="/images/projects/minerva.png"
              />
              <ProjectCard
                client="Rest of World"
                service="Data visualization"
                url="#"
                image="/images/projects/blackouts.png"
              />
              <ProjectCard
                client="Praxis"
                service="Web development"
                url="#"
                image="/images/projects/praxis.png"
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
      className="w-full flex flex-col items-start gap-1 group-hover:grayscale hover:!grayscale-0 transition-all duration-300"
      href={url}
    >
      {/* Image */}
      <div className="w-full bg-gray-300 rounded-t-lg relative">
        <img
          src={image}
          // Origin top left
          className="w-full aspect-square rounded-t-lg object-cover object-left-top"
        />
        {/* style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent, var(--background))",
        }} */}
        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-[var(--background)] rounded-t-lg" />
      </div>
      <div className="flex flex-row items-center gap-1 flex-wrap">
        <h1 className="font-serif text-xl leading-none text-gray-700 italic">
          {client}
        </h1>
        <h2 className="font-sans ml-1 w-max mt-1 bg-gray-50 group-hover:bg-gray-50 tracking-tight border border-double border-gray-400 group-hover:border-yellow-400 px-2 py-1 text-gray-500 group-hover:text-yellow-500 font-semibold text-[9px] rounded-full uppercase transition-all duration-300">
          {service}
        </h2>
        {/* <h1 className="font-serif text-xl leading-none text-gray-700">
          {client}
        </h1>
        <h2 className="font-serif text-sm leading-none text-gray-400 font-normal italic">
          {service}
        </h2> */}
      </div>
    </Link>
  );
}
