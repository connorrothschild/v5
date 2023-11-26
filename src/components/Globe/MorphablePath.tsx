import {
  interpolate as interpolatePath,
  separate,
  combine,
  interpolateAll,
} from "flubber";
import React, { useState, useEffect, useCallback } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  MotionValue,
  useAnimation,
} from "framer-motion";

export default function MorphablePath({
  paths,
  progress,
  fill,
  isMissingData,
}: {
  paths: [string, string];
  progress: MotionValue<number>;
  fill: string;
  isMissingData: boolean;
}) {
  const initialPath = paths[0];
  const finalPath = paths[1];

  // const [pathIndex, setPathIndex] = useState(0);

  const maxSegmentLength = 1;

  const splitPathToArray = (path) =>
    path
      .split("M")
      .filter((d) => d !== "")
      .map((d) => ["M", d].join(""));

  const interpolate = useCallback(
    (t, n) => {
      if (!t || !n) return () => {};
      const tArr = splitPathToArray(t);
      const nArr = splitPathToArray(n);

      if (tArr?.length === 0 || nArr?.length === 0) return () => {};

      if (tArr.length === 1 && nArr.length === 1) {
        // Use generic interpolator if only one path
        return interpolatePath(tArr[0], nArr[0], {
          single: true,
          maxSegmentLength,
        });
      } else if (tArr.length === 1) {
        // If the target is a single path but the next is multiple, separate the target
        return separate(tArr[0], nArr, {
          single: true,
          maxSegmentLength,
        });
      } else if (nArr.length === 1) {
        // If the next is a single path but the target is multiple, combine the target
        return combine(tArr, nArr[0], {
          single: true,
          maxSegmentLength,
        });
      } else {
        // If both are multiple, interpolate all
        return interpolateAll(tArr, nArr, { single: true, maxSegmentLength });
      }
    },
    [maxSegmentLength]
  );

  const interpolator = interpolate(initialPath, finalPath);

  // interpolator now returns a function that takes a number between 0 and 1
  // and returns the path at that point in the interpolation
  // interpolator(0) === initialPath
  // interpolator(1) === finalPath

  // So use it as a mixer
  const path = useTransform(progress, (value) => {
    return interpolator(value);
  });

  return (
    <motion.path d={path} fill={fill} stroke="white" paintOrder="stroke" />
  );
}
