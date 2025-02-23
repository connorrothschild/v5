import React, { useEffect } from "react";
import Marquee from "@/components/Elements/Marquee";
import { projects } from "@/data/projects";
import Image from "next/image";
import { Cursor } from "../Elements/Cursor/Core";

export default function FeaturedProjects() {
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    setHasLoaded(true);
  }, []);

  return (
    <div className="max-w-5xl mx-auto w-full pt-48 pb-24 px-[20px]">
      <h1 className="text-5xl md:text-7xl font-sans font-extralight text-gray-700 mb-4 tracking-[-0.02em]">
        Select Projects
      </h1>
      <p className="text-lg font-sans font-light leading-snug text-gray-700 max-w-[640px] text-wrap-pretty">
        I enjoy working with clients to create projects that are both functional
        and beautiful. Here are some examples:
      </p>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8"
        style={{
          opacity: hasLoaded ? 1 : 0,
          transition: "opacity 300ms ease-in-out 200ms",
        }}
      >
        <ServiceCard
          title="Web development"
          description="Websites that draw eyes and convert visitors."
          priceRange="$8,000-$16,000"
          reversed={false}
          projects={projects
            .filter((project) => project.filterCategory === "web")
            .filter((project) => project.featured)}
        />
        <ServiceCard
          title="Data visualization"
          description="Charts, maps, and visual experiences that tell a story."
          priceRange="$3,000-$10,000"
          reversed={false}
          projects={projects
            .filter((project) => project.filterCategory === "visualization")
            .filter((project) => project.featured)}
        />
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  description,
  priceRange,
  reversed,
  projects,
}: {
  title: string;
  description: string;
  priceRange: string;
  reversed: boolean;
  projects: any[];
}) {
  const [hoveredProject, setHoveredProject] = useState<any>(null);
  const [isHovering, setIsHovering] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const handlePositionChange = (x: number, y: number) => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const isInside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      setIsHovering(isInside);
    }
  };

  return (
    <div className="py-6 rounded-lg border border-solid border-gray-300 bg-gradient-to-br from-gray-50 to-white">
      <h2 className="text-2xl mb-2 px-6 font-light tracking-tight">{title}</h2>
      <p className="mb-6 px-6 text-gray-700">{description}</p>
      <Cursor
        attachToParent
        variants={{
          initial: { scale: 0.3, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.3, opacity: 0 },
        }}
        transition={{
          ease: "easeInOut",
          duration: 0.15,
        }}
        onPositionChange={handlePositionChange}
      >
        <motion.div
          animate={{
            // Make room for arrow icon (16px, plus 4px left padding)
            width: isHovering ? (hoveredProject?.titleWidth ?? 200) + 20 : 16,
            height: isHovering ? 32 : 16,
          }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center rounded-[24px] bg-gray-500/40 backdrop-blur-md"
        >
          <AnimatePresence mode="wait">
            {isHovering ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="inline-flex w-full items-center justify-center"
              >
                <motion.p
                  key={hoveredProject?.title}
                  className="inline-flex items-center text-sm text-white whitespace-nowrap"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.2 },
                  }}
                  exit={{ opacity: 0, scale: 0.85 }}
                >
                  {hoveredProject?.title}
                  <ArrowTopRightIcon className="ml-1 h-4 w-4 text-white" />
                </motion.p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </Cursor>

      <div className="relative mb-8" ref={targetRef}>
        {/* <BlurEdge bgColor="bg-gray-50" classes="left-0" />
      <BlurEdge bgColor="bg-gray-50" classes="right-0 rotate-180" /> */}

        <Marquee repeat={3} speed={0.5} pauseOnHover={true} reversed={reversed}>
          <div className="flex flex-row gap-2 mr-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={`${project.id}-${index}`}
                project={project}
                setHoveredProject={setHoveredProject}
              />
            ))}
          </div>
        </Marquee>
      </div>
      <ContactPopup>
        <button className="bg-black text-white py-2 rounded-md mb-3 !mx-6 !w-[calc(100%-3rem)] cursor-none hover:scale-[1.025] transition-transform duration-300">
          Inquire
        </button>
      </ContactPopup>
      {/* <p className="text-sm text-gray-600 px-6 text-right">
        Work ranges from: {priceRange}
      </p> */}
    </div>
  );
}

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { ContactPopup } from "../Elements/ContactPopup";

function ProjectCard({
  project,
  setHoveredProject,
}: {
  project: any;
  setHoveredProject: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      // key={project.id}
      className="block cursor-none"
      onMouseEnter={() => setHoveredProject(project)}
      // onMouseOut={() => setHoveredProject(null)}
    >
      <div className="aspect-[1.675/1] h-48 outline-solid outline outline-gray-100 hover:outline-gray-200 transition-all duration-300">
        <Image
          src={`/images/screens/${project.image}.jpg`}
          placeholder="blur"
          blurDataURL={`images/blurred-screens/${project.image}.jpg`}
          alt={`Project image for ${project.title}`}
          className="w-full h-full object-cover object-bottom"
          width={400}
          height={400}
          // unoptimized
        />
      </div>
    </a>
  );
}
