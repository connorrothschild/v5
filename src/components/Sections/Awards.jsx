import { useState, useRef } from "react";
import SplitTextHeader from "../Elements/SplitTextHeader";
import CornerPill from "../Elements/CornerPill";

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
      <CornerPill>Awards</CornerPill>
      <SplitTextHeader
        container={container}
        phrase="In my early career, my work has been recognized for the following awards."
      />

      {/* Horizontally scrollable list of projects */}
      <div className="flex gap-4 overflow-x-auto flex-nowrap scrollbar-hide"></div>
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
