import { useRef } from "react";
import SplitTextHeader from "@/components/Elements/SplitTextHeader";

import Dot from "@/components/Elements/Dot";
import { ContactPopup } from "@/components/Elements/ContactPopup";

export default function Intro() {
  const container = useRef<HTMLDivElement>(null);
  return (
    <section
      className="relative mb-48 px-[20px] overflow-visible"
      ref={container}
    >
      <Gradient />
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col justify-between gap-8">
          <div className="">
            <SplitTextHeader
              container={container}
              phrase="I'm Connor, a designer & developer based in Houston, Texas. Clients call me when they need to make websites that are performant, beautiful, and durable."
            />
          </div>
          <ContactPopup>
            <div className="cursor-pointer text-gray-500 font-sans text-base flex flex-row items-center gap-1.5">
              Booking new projects for 2024
              <Dot />
            </div>
          </ContactPopup>
        </div>
      </div>
    </section>
  );
}

function Gradient() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 800 800"
      className="absolute top-full transform -translate-y-1/2 right-0 w-full z-[-1] opacity-30"
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
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            stdDeviation="61"
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
          rx="215"
          ry="150"
          cx="601.1240490019634"
          cy="552.3812431615061"
          fill="hsl(37, 99%, 67%)"
        ></ellipse>
        <ellipse
          rx="215"
          ry="150"
          cx="333.495442814852"
          cy="522.0717990735438"
          fill="hsl(316, 73%, 52%)"
        ></ellipse>
        <ellipse
          rx="215"
          ry="150"
          cx="550.7388997502352"
          cy="338.5728695854466"
          fill="hsl(185, 100%, 57%)"
        ></ellipse>
      </g>
    </svg>
  );
}
