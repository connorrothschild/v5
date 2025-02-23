"use client";

import React from "react";
import _ from "lodash";

const ColorViz = () => {
  const colors = [
    "#4A90E2",
    "#4A90E2",
    "#A7C7E7",
    "#4A90E2",
    "#A7C7E7",
    "#A8DADC",
    "#008080",
    "#4CAF50",
    "#4A90E2",
    "#1E3A5F",
    "#4A90E2",
    "#3498db",
    "#A7C7E7",
    "#4CB8B2",
    "#A3C9F1",
    "#4A90E2",
    "#6A8D92",
    "#A8D0E6",
    "#5F9EA0",
    "#4A90E2",
    "#A7C7E7",
    "#3B9E9B",
    "#A7C7E7",
    "#6A8D92",
    "#4A90E2",
    "#6A5ACD",
    "#40E0D0",
    "#1E3A8A",
    "#4CAF50",
    "#A8D0E6",
    "#4A90E2",
    "#4A90E2",
    "#4CAF50",
    "#A9D0F5",
    "#007D7F",
    "#4A90E2",
    "#5D9B9B",
    "#5A9BD5",
    "#4A90E2",
    "#4CAF50",
    "#6A5ACD",
    "#6A89CC",
    "#3498DB",
    "#4A90E2",
    "#4B8B3B",
    "#4CAF50",
    "#4A90E2",
    "#A7C7E7",
    "#4A90E2",
    "#006F6A",
  ];

  // Group colors and create grid items with labels on first instance
  const gridItems = _.chain(colors)
    .groupBy((color) => color)
    .map((group, color) => ({ color, count: group.length }))
    .orderBy(["count", "color"], ["desc", "asc"])
    .flatMap(({ color, count }) => [
      { color, showLabel: true },
      ...Array(count - 1).fill({ color, showLabel: false }),
    ])
    .value();

  return (
    <div className="p-8 bg-gray-100 rounded-lg mt-24">
      <h2 className="text-2xl font-display tracking-[-0.02em] mb-2">
        ChatGPT Color Preferences
      </h2>
      <h3 className="text-lg font-display tracking-[-0.02em] mb-6 text-[rgba(0,0,0,.75)]">
        I asked ChatGPT &ldquo;
        <span className="border-solid border-b border-[#4A90E2] pb-[2px]">
          What is your favorite color? With hex code.
        </span>
        &rdquo; fifty times
      </h3>
      <div className="grid grid-cols-10 grid-rows-5 gap-0.5 h-[500px]">
        {gridItems.map((item, index) => (
          <div key={index} className="relative rounded-sm w-full h-full">
            <div
              className="absolute inset-0 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            {item.showLabel && (
              <div
                className="absolute left-2 top-2 px-1 py-1 text-xs rounded bg-black/30 backdrop-blur-xl text-white font-mono"
                style={{ fontSize: "10px" }}
              >
                {item.color}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorViz;

// "use client";

// import React from "react";
// import _ from "lodash";

// const ColorViz = () => {
//   const colors = [
//     "#4A90E2",
//     "#4A90E2",
//     "#A7C7E7",
//     "#4A90E2",
//     "#A7C7E7",
//     "#A8DADC",
//     "#008080",
//     "#4CAF50",
//     "#4A90E2",
//     "#1E3A5F",
//     "#4A90E2",
//     "#3498db",
//     "#A7C7E7",
//     "#4CB8B2",
//     "#A3C9F1",
//     "#4A90E2",
//     "#6A8D92",
//     "#A8D0E6",
//     "#5F9EA0",
//     "#4A90E2",
//     "#A7C7E7",
//     "#3B9E9B",
//     "#A7C7E7",
//     "#6A8D92",
//     "#4A90E2",
//     "#6A5ACD",
//     "#40E0D0",
//     "#1E3A8A",
//     "#4CAF50",
//     "#A8D0E6",
//     "#4A90E2",
//     "#4A90E2",
//     "#4CAF50",
//     "#A9D0F5",
//     "#007D7F",
//     "#4A90E2",
//     "#5D9B9B",
//     "#5A9BD5",
//     "#4A90E2",
//     "#4CAF50",
//     "#6A5ACD",
//     "#6A89CC",
//     "#3498DB",
//     "#4A90E2",
//     "#4B8B3B",
//     "#4CAF50",
//     "#4A90E2",
//     "#A7C7E7",
//     "#4A90E2",
//     "#006F6A",
//   ];

//   const colorFrequency = _.countBy(colors);

//   // Separate singles into "Other" category
//   const singles = Object.entries(colorFrequency)
//     .filter(([_, count]) => count === 1)
//     .map(([color]) => color);

//   const mainColors = Object.entries(colorFrequency)
//     .filter(([_, count]) => count > 1)
//     .map(([color, count]) => ({ color, count }))
//     .sort((a, b) => b.count - a.count);

//   // Add "Other" category if there are singles
//   if (singles.length > 0) {
//     mainColors.push({
//       color: "other",
//       count: singles.length,
//       colors: singles,
//     });
//   }

//   const BOXES_PER_ROW = 10;
//   const BOX_SIZE = 24;

//   const ColorGroup = ({ color, count, colors }) => {
//     const rows = Math.ceil(count / BOXES_PER_ROW);
//     const lastRowBoxes = count % BOXES_PER_ROW || BOXES_PER_ROW;

//     return (
//       <div className="space-y-2">
//         <span className="font-display">
//           {color === "other" ? "Other" : `${color}`} ({count})
//         </span>
//         <div className="space-y-1">
//           {[...Array(rows)].map((_, rowIndex) => (
//             <div key={rowIndex} className="flex gap-1">
//               {[
//                 ...Array(rowIndex === rows - 1 ? lastRowBoxes : BOXES_PER_ROW),
//               ].map((_, boxIndex) => {
//                 const actualIndex = rowIndex * BOXES_PER_ROW + boxIndex;
//                 const backgroundColor =
//                   color === "other" ? colors[actualIndex] : color;
//                 return (
//                   <div
//                     key={boxIndex}
//                     style={{
//                       backgroundColor,
//                       width: `${BOX_SIZE}px`,
//                       height: `${BOX_SIZE}px`,
//                       flexShrink: 0,
//                     }}
//                     className="rounded shadow-sm"
//                   />
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-8 bg-gray-100 rounded-lg mt-24">
//       <h2 className="text-2xl font-display tracking-[-0.02em] mb-6">
//         ChatGPT Color Preferences
//       </h2>
//       <div className="grid grid-cols-2 gap-8">
//         {mainColors.map((colorData) => (
//           <ColorGroup key={colorData.color} {...colorData} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ColorViz;
