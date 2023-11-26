// import React from "react";
// import world from "./world-110m.json";
// import * as topojson from "topojson-client";

// import MorphablePath from "./MorphablePath";
// import { MotionValue } from "framer-motion";

// export default function Country({
//   data,
//   x,
//   y,
//   fill,
//   isMissingData,
//   delay,
//   pathGenerator,
//   progress,
// }: {
//   data: { id: string; country: string };
//   x: number;
//   y: number;
//   fill: string;
//   isMissingData: boolean;
//   delay: number;
//   pathGenerator: any;
//   progress: MotionValue<number>;
// }) {
//   let countries = topojson.feature(world, world.objects.countries).features;

//   const MISSING_DATA_PATH = `M 0 0`;
//   // Middle of the world
//   // const MISSING_DATA_PATH = `M ${width / 2} ${
//   //   height / 2
//   // } a 5,5 0 1, 0 10 0 a 5,5 0 1, 0 -10 0`;

//   const circlePathFromXY = function (x, y) {
//     const r = 8;
//     if (!x || !y) return MISSING_DATA_PATH; //countryPathFromCountryName(data.id)
//     return `M${x - r} ${y} a ${r},${r} 0 1, 0 ${r * 2} 0 a ${r},${r} 0 1, 0 ${
//       -r * 2
//     } 0`;
//   };

//   const countryPathFromCountryName = function (id) {
//     const feature = countries.find((d) => d.id == id);
//     if (feature) {
//       return pathGenerator(feature);
//     } else {
//       return MISSING_DATA_PATH;
//     }
//   };

//   const features: [string, string] = [
//     circlePathFromXY(x, y),
//     countryPathFromCountryName(data.id),
//   ];

//   // if (!features[0] || !features[1]) {
//   //   return null;
//   // }

//   // if (!features[0]?.includes("M") || !features[1]?.includes("M")) {
//   //   return null;
//   // }

//   if (countries.find((d) => d.id == data.id)) {
//     return (
//       // <MorphablePath
//       //   paths={features}
//       //   progress={progress}
//       //   fill={fill}
//       //   isMissingData={isMissingData}
//       // />
//       <path d={features[0]} fill={fill} stroke="white" paintOrder="stroke" />
//     );
//   } else {
//     return null;
//   }
// }
