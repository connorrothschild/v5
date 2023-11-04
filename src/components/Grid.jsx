import React from "react";

const NUM_COLS = 12;

export default function Grid() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-50 pointer-events-none grid gap-0"
      style={{
        gridTemplateColumns: `repeat(${NUM_COLS}, 1fr)`,
      }}
    >
      {[...Array(NUM_COLS)].map((_, i) => (
        <div
          key={i}
          className={`h-screen w-px bg-gray-50 mix-blend-difference`}
          style={{
            // Lines get progressively more transparent as they move to the edges
            // Calculate distance from center
            opacity: 1 - Math.abs(i - NUM_COLS / 2) / (NUM_COLS / 2) - 0.25,
          }}
        ></div>
      ))}
    </div>
  );
}
