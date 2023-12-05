import { useInView } from "framer-motion";
import React, { useRef } from "react";

export default function EmphasizeOnScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  // text-yellow-600 is the color of the emphasized text
  const emphasisClass = "text-yellow-600";
  return (
    <span
      className={`${
        isInView ? emphasisClass : ""
      } transition-all duration-500 ease-in-out delay-300`}
      ref={ref}
    >
      {children}
    </span>
  );
}
