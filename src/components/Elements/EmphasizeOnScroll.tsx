import { useInView } from "framer-motion";
import React, { useRef } from "react";

export default function EmphasizeOnScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const emphasisClass = "text-yellow-600";
  return (
    <span
      className={`${
        isInView ? emphasisClass : ""
      } transition-color duration-500 ease-in-out delay-300`}
      ref={ref}
    >
      {children}
    </span>
  );
}
