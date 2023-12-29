import Link from "next/link";
import React from "react";
import GridTitle from "@/components/Elements/GridTitle";
import SectionSubtitle from "@/components/Elements/SectionSubtitle";
import Dot from "@/components/Elements/Dot";
import SectionTitle from "@/components/Elements/SectionTitle";
import Image from "next/image";

export default function Ethos() {
  return (
    <section className="relative px-[20px] py-6 md:py-48" id="work">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-12 w-full">
          <SectionTitle classes="-right-6">01. Work</SectionTitle>
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
                url="https://realtors.minervadata.xyz/"
                image="/images/mockups/minerva.jpg"
              />
              <ProjectCard
                client="Rest of World"
                service="Data visualization"
                url="https://restofworld.org/2022/blackouts/"
                image="/images/mockups/rest-of-world.jpg"
              />
              <ProjectCard
                client="Praxis"
                service="Web development"
                url="https://www.cityofpraxis.com/"
                image="/images/mockups/praxis.jpg"
              />
            </div>
            <div className="w-full text-right">
              <Link
                href="/archive"
                className="text-gray-500 font-sans text-base flex flex-row items-center gap-1.5 mt-3 justify-end max-w-7xl mx-auto"
              >
                View all <Dot />
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
    <a
      className="w-full flex flex-col items-start gap-1 group-hover:grayscale hover:!grayscale-0 transition-all duration-300"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="w-full rounded-lg relative group/image">
        <Image
          width={1000}
          height={1000}
          src={image}
          alt="Project image"
          className="w-full aspect-square rounded-lg object-cover object-center"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-[var(--background)] rounded-t-lg group-hover/image:opacity-0 transition-all duration-300" />
      </div>
      <div className="flex flex-row items-center gap-1 flex-wrap">
        <h1 className="font-serif font-light text-xl leading-none text-gray-700">
          {client}
        </h1>
        <h2 className="font-sans font-normal ml-1 w-max mt-1 bg-gray-50 group-hover:bg-gray-50 border border-double border-gray-400 group-hover/image:border-gray-800 px-3 py-1 tracking-wide text-gray-500 group-hover/image:text-gray-700 text-[9px] rounded-full uppercase transition-all duration-300">
          {service}
        </h2>
      </div>
    </a>
  );
}
