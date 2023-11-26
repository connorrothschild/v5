import data from "./data.json";

// Convert id to string

import { extent, max } from "d3-array";
import { scaleLinear } from "d3-scale";
import { geoPath, geoOrthographic, geoEqualEarth } from "d3-geo";
import Country from "./Country";
import { animate, easeIn, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { easeInOutQuint } from "@/config/eases";

export default function Globe({ active }: { active: boolean }) {
  data.forEach((d) => (d.id = d.id.toString()));

  let width = 400;
  let height = 200;

  // Intentionally making left and right margin equal so globe is centered
  const margin = { top: 0, right: 10, bottom: 10, left: 10 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    // .domain(extent(data, (d) => d.lifeSatisfaction))
    .domain([2, 8])
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d.gdpPerCapita))
    .range([innerHeight, 0])
    .nice();

  const colorScale = scaleLinear()
    .domain(extent(data, (d) => d.lifeSatisfaction))
    // .range(["hotpink", "steelblue"]);
    .range(["#eff6ff", "#3B82F6"]);

  const selectedProjection = "orthographic";
  const projection =
    selectedProjection == "orthographic"
      ? geoOrthographic()
          .translate([innerWidth / 1.9, innerHeight / 2])
          .scale(height / 2.5)
      : geoEqualEarth()
          .translate([innerWidth / 2, innerHeight / 2])
          .scale(height / 3);

  const pathGenerator = geoPath().projection(projection);

  const progress = useMotionValue(0);

  // const animation = animate(progress, 1, {
  //   duration: 2,
  //   ease: easeInOutQuint, // "easeInOut",
  //   repeat: Infinity,
  //   repeatType: "reverse",
  //   repeatDelay: 2,
  // });

  // animation.then(() => {
  //   progress.set(0);
  // });

  // FIXME: Not working?
  // useEffect(() => {
  //   // Play animation when active
  //   // Pause animation when inactive
  //   if (active) {
  //     animation.play();
  //   } else {
  //     animation.pause();
  //   }
  // }, [animation, active]);

  return (
    <>
      <button
        onClick={() =>
          animate(progress, progress.get() === 1 ? 0 : 1, {
            duration: 1,
            ease: easeInOutQuint, // "easeInOut",
          })
        }
        className="absolute top-0 right-0"
      >
        Animate
      </button>
      <svg
        width={width}
        height={height}
        style={{
          margin: "auto",
        }}
      >
        {data
          .sort((a, b) => a.lifeSatisfaction - b.lifeSatisfaction)
          .map((d, i) => {
            return (
              <Country
                key={d.id}
                data={d}
                x={xScale(d.lifeSatisfaction)}
                y={yScale(d.gdpPerCapita)}
                // delay={hasStagger ? i * 0.01 * (1 - $progress) : 0}
                //   progress={$progress}
                fill={colorScale(d.lifeSatisfaction)}
                isMissingData={!d.lifeSatisfaction || !d.gdpPerCapita}
                pathGenerator={pathGenerator}
                progress={progress}
                delay={i * 0.01}
              />
            );
          })}
      </svg>
    </>
  );
}
