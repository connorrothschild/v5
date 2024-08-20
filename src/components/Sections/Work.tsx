import Link from "next/link";
import React, { useState } from "react";
import GridTitle from "@/components/Elements/GridTitle";
import SectionSubtitle from "@/components/Elements/SectionSubtitle";
import Dot from "@/components/Elements/Dot";
import SectionTitle from "@/components/Elements/SectionTitle";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { easeInOutQuint } from "@/config/eases";

import rainmaker from "../../../public/images/mockups/rainmaker.jpg";
import minerva from "../../../public/images/mockups/minerva.jpg";
import restOfWorld from "../../../public/images/mockups/rest-of-world.jpg";

export default function Work() {
  return (
    <section className="relative px-[20px] py-6 md:py-48" id="work">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-12 w-full">
          <SectionTitle classes="-right-6">01. Work</SectionTitle>
          <SectionSubtitle>
            I design clear, effective websites with a focus on interface and
            information design. My work blends modern technology with
            user-friendly design for intuitive, robust websites.
          </SectionSubtitle>

          <div className="flex flex-col gap-2">
            <GridTitle>Select projects</GridTitle>
            <div className="flex flex-col md:flex-row gap-4 md:gap-2 group">
              <ProjectCard
                client="Rainmaker"
                service="Web development"
                url="https://www.makerain.com/"
                image={rainmaker}
              />
              <ProjectCard
                client="Rest of World"
                service="Data visualization"
                url="https://restofworld.org/2022/blackouts/"
                image={restOfWorld}
              />
              <ProjectCard
                client="Minerva"
                service="App, web development"
                url="https://realtors.minervadata.xyz/"
                image={minerva}
              />
            </div>
            <div className="w-full text-right">
              <Link
                href="/archive"
                className="text-gray-500 font-sans text-base flex flex-row items-center gap-1.5 justify-end max-w-7xl mx-auto"
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
  image: any;
}) {
  const [hover, setHover] = useState(false);
  return (
    <a
      className="w-full flex flex-col items-start gap-2 md:gap-2.5 group-hover:grayscale hover:!grayscale-0 transition-filter duration-500"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => {
        setHover(true);
      }}
      onTouchStart={() => {
        setHover(true);
      }}
      onTouchEnd={() => {
        setHover(false);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className="w-full rounded-lg relative group/image">
        <Image
          width={1400}
          height={1400}
          src={image}
          placeholder="blur"
          // blurDataURL={`/_next/image?url=${image}&w=16&q=1`}
          alt={`Project image for ${client}`}
          className="w-full aspect-square rounded-lg object-cover object-center"
        />
        <div
          className="w-full h-full absolute top-0 left-0 to-[60%] rounded-lg group-hover/image:opacity-0 transition-opacity duration-700"
          style={{
            willChange: "opacity",
            boxShadow: "1px 2px 5px 2px rgba(0,0,0,.15) inset",
          }}
        />
        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.5,
                ease: easeInOutQuint,
              }}
              className="flex flex-row items-center gap-1 absolute top-2 right-2 text-xs text-gray-700 bg-white px-3 py-1 rounded-lg"
            >
              Go to site <Dot />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-row items-center gap-2.5 flex-wrap">
        <h1 className="font-serif font-light text-xl leading-none text-gray-700">
          {client}
        </h1>
        <h2 className="font-sans font-light w-max mt-px bg-gray-50 group-hover:bg-gray-50 border border-gray-400 group-hover/image:border-gray-800 px-3 py-1 text-gray-500 text-xs rounded-full">
          {service}
        </h2>
      </div>
    </a>
  );
}
