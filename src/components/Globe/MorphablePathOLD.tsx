// import {
//   interpolate as interpolatePath,
//   separate,
//   combine,
//   interpolateAll,
// } from "flubber";
// import React, { useState, useEffect } from "react";
// import {
//   motion,
//   animate,
//   useMotionValue,
//   useTransform,
//   MotionValue,
// } from "framer-motion";

// export default function MorphablePath({
//   paths,
//   progress,
//   fill,
//   isMissingData,
// }: {
//   paths: [string, string];
//   progress: MotionValue<number>;
//   fill: string;
//   isMissingData: boolean;
// }) {
//   // const [pathIndex, setPathIndex] = useState(0);

//   const maxSegmentLength = 1;

//   const splitPathToArray = (path) =>
//     path
//       .split("M")
//       .filter((d) => d !== "")
//       .map((d) => ["M", d].join(""));

//   function interpolate(t, n) {
//     if (!t || !n) return () => {};
//     const tArr = splitPathToArray(t);
//     const nArr = splitPathToArray(n);
//     if (tArr.length === 1 && nArr.length === 1) {
//       // Use generic interpolator if only one path
//       return interpolatePath(tArr[0], nArr[0], {
//         single: false,
//         maxSegmentLength,
//       });
//     } else if (tArr.length === 1) {
//       // If the target is a single path but the next is multiple, separate the target
//       return separate(tArr[0], nArr, {
//         single: false,
//         maxSegmentLength,
//       });
//     } else if (nArr.length === 1) {
//       // If the next is a single path but the target is multiple, combine the target
//       return combine(tArr, nArr[0], {
//         single: true,
//         maxSegmentLength,
//       });
//     } else {
//       // If both are multiple, interpolate all
//       return interpolateAll(tArr, nArr, { single: true, maxSegmentLength });
//     }
//   }
//   // let interpolator = () => paths[0];
//   // if (paths?.length === 2) interpolator = interpolate(paths[0], paths[1]);

//   // const interpolateTest = interpolator(progress.get());

//   const arrayOfIndex = paths.map((_, i) => i);
//   // console.log(progress, arrayOfIndex, interpolate(paths[0], paths[1]));
//   // const path = useTransform(progress, arrayOfIndex, paths, {
//   //   mixer: (from, to) => {
//   //     console.log(from, to);
//   //     return interpolate(from, to);
//   //     // return interpolatePath(from, to);
//   //   },
//   // });
//   // Use the interpolate function to interpolate between the two paths

//   const interpolator = (p) => interpolate(paths[0], paths[1])(p);
//   const path = useTransform(progress, (p) => interpolator(p));

//   return (
//     <motion.path
//       // d={"path"}
//       // d={path}
//       // fill={fill}
//       d={path}
//       fill="white"
//       stroke="#60a5fa"
//       opacity={isMissingData ? progress : 1}
//       style={{
//         paintOrder: "stroke",
//         willChange: "all",
//       }}
//     />
//   );
// }
