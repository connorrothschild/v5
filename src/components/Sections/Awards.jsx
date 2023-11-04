import { useState, useRef } from "react";
import SplitTextHeader from "../Elements/SplitTextHeader";
import CornerPill from "../Elements/CornerPill";

export default function Projects() {
  const container = useRef(null);
  return (
    <section
      className="w-full bg-gray-300 min-h-screen py-24 px-4 lg:px-12 flex flex-col justify-between gap-8"
      // className="w-full bg-[var(--background)] min-h-[calc(100vh-1rem)] sticky top-[1rem] z-[2] py-12 px-4 rounded-t-[30px] flex flex-col justify-between gap-8"
      // style={{
      //   boxShadow: "0 0 20px rgba(0,0,0,.1)",
      // }}
      ref={container}
    >
      <CornerPill>Awards</CornerPill>
      <SplitTextHeader
        container={container}
        phrase="In my early career, my work has been recognized for the following awards."
        textAlignment="left"
      />

      {/* Horizontally scrollable list of projects */}
      {/* Tabular view */}
      <div className="flex flex-col justify-start items-start gap-2 w-full divide divide-y divide-gray-400">
        <Card
          title="Society for News Design"
          year="2020"
          award="Award of Excellence, Data Visualization"
        />
        <Card
          title="Society for News Design"
          year="2020"
          award="Award of Excellence, Data Visualization"
        />
        <Card
          title="Society for News Design"
          year="2020"
          award="Award of Excellence, Data Visualization"
        />
        <Card
          title="Society for News Design"
          year="2020"
          award="Award of Excellence, Data Visualization"
        />
        <Card
          title="Society for News Design"
          year="2020"
          award="Award of Excellence, Data Visualization"
        />
      </div>
    </section>
  );
}

const Card = ({ title, year, award }) => {
  return (
    <div className="w-full flex flex-row justify-between items-end gap-2 py-6">
      <div className="flex flex-col justify-center gap-2">
        <h1 className="text-2xl font-serif text-left font-regular text-stone-700 ">
          {title}
        </h1>
        <p className="text-stone-600 font-serif text-xl font-light leading-none">
          {award}
        </p>
      </div>
      <span className="font-sans font-normal tracking-tight text-stone-500">
        {year}
      </span>
    </div>
  );
};
