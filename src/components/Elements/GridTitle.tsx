import React from "react";
import Dot from "./Dot";

export default function GridTitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-gray-500 font-sans text-base flex flex-row gap-1.5 items-center">
      {children}
      <Dot />
    </span>
  );
}
