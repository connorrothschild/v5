import { useTransform, motion, MotionValue, useScroll } from "framer-motion";
import React from "react";

export default function KaraokeText({
  container,
  phrase,
}: {
  container: React.RefObject<HTMLDivElement>;
  phrase: string;
}) {
  const { scrollYProgress } = useScroll({
    target: container,
  });
  const words = phrase.split(" ");
  return (
    <p className="self-center flex flex-wrap gap-x-[.65em] text-gray-600">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const amount = range[1] - range[0];
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[3.45rem] tracking-[-0.01em]">
      <span className={"absolute opacity-20"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"transition-opacity duration-300"}
      >
        {children}
      </motion.span>
    </span>
  );
};

// const Char = ({
//   children,
//   progress,
//   range,
//   isImage,
// }: {
//   children: string | React.ReactNode[];
//   progress: MotionValue<number>;
//   range: [number, number];
//   isImage?: boolean;
// }) => {
//   const opacity = useTransform(progress, range, [0, 1]);

//   return (
//     <span>
//       <span className={"absolute opacity-20"}>{children}</span>
//       <motion.span
//         style={{ opacity: opacity }}
//         className={isImage ? "transition-opacity duration-300" : ""}
//       >
//         {children}
//       </motion.span>
//     </span>
//   );
// };

// import { motion, useScroll, useTransform } from "framer-motion";
// import React, { useRef } from "react";

// export default function SplitTextHeader({ container, phrase }) {
//   const { scrollYProgress } = useScroll({
//     target: container,
//     // offset: ["start 0.9", "start 0.25"],
//   });
//   const words = phrase.split(" ");
//   return (
//     <p
//       ref={container}
//       className="w-full flex flex-row items-center flex-wrap gap-x-2 md:gap-x-3"
//     >
//       {words.map((word, i) => {
//         const start = i / words.length;
//         const end = start + 1 / words.length;
//         return (
//           <Word key={i} progress={scrollYProgress} range={[start, end]}>
//             {word}
//           </Word>
//         );
//       })}
//     </p>
//   );
// }

// const Word = ({ children, progress, range }) => {
//   const opacity = useTransform(progress, range, [0, 1]);

//   const emphasized = false;
//   // const emphasized = [
//   //   "software",
//   //   "&",
//   //   "data",
//   //   "visualization",
//   //   "engineer",
//   //   "websites",
//   // ].includes(children.toLowerCase());

//   return (
//     <span
//       // className="relative mr-3 mt-3"
//       className={`relative text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[3.45rem] !leading-[1.1375] ${
//         emphasized
//           ? "font-serif font-light gradient-text mb-[.4%]"
//           : "text-gray-700 font-sans font-extralight"
//       }`}
//     >
//       <span className="absolute opacity-20 !text-gray-400">{children}</span>
//       <motion.span style={{ opacity: opacity }}>{children}</motion.span>
//     </span>
//   );
// };
