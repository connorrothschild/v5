import { useState, useRef } from "react";
import SplitTextHeader from "./SplitTextHeader";

export default function Projects() {
  const container = useRef(null);
  return (
    <section
      className="w-full bg-[var(--background)] min-h-[calc(100vh-1rem)] sticky top-[1rem] z-[2] py-12 px-4 rounded-t-[30px] flex flex-col justify-between gap-8"
      style={{
        boxShadow: "0 0 20px rgba(0,0,0,.1)",
      }}
      ref={container}
    >
      <SplitTextHeader
        container={container}
        phrase="In my early career, my work has been recognized for the following awards"
      />

      {/* Horizontally scrollable list of projects */}
      <div className="flex gap-4 overflow-x-auto flex-nowrap scrollbar-hide">
        <ProjectCard
          client={"Rest of World"}
          image={"/images/projects/blackouts.png"}
          title={"A decade of internet blackouts"}
          description={
            "Visualizing seven years, 60 countries, and 935 government-imposed internet shutdowns."
          }
          color={"#0DCC6C"}
          link={"https://restofworld.org/2022/blackouts/"}
        />
        <ProjectCard
          client={"Collaborative Fund"}
          image={"/images/projects/impact.png"}
          title={"The history of impact investing"}
          description={
            "Visualizing 40 years of impact investing, from the first social venture capital firm to the rise of ESG."
          }
          color={"#7893eb"}
          link={"https://impact.collabfund.com/"}
        />
        <ProjectCard
          client={"Praxis"}
          image={"/images/projects/praxis.png"}
          title={"Building a new city"}
          description={
            "Web design and development for a new city in the Mediterranean."
          }
          color={"#348a00"}
          link={"https://cityofpraxis.org"}
        />
        <ProjectCard
          client={"Absolute Rest"}
          image={"/images/projects/absolute-rest.png"}
          title={"Democratizing sleep studies"}
          description={
            "Application development for a leading sleep study company."
          }
          color={"#312e81"}
          link={"https://www.absoluterest.com/"}
        />
        <ProjectCard
          client={"Gallery"}
          image={"/images/projects/gallery.png"}
          title={"Building virtual art galleries"}
          description={
            "Web design and development for the leading NFT gallery platform."
          }
          color={"#ffffff"}
          link={"https://www.gallery.so/"}
        />
      </div>
    </section>
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
