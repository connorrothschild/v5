import { useInView } from "framer-motion";
import React, { useRef } from "react";

export default function EmphasizeOnScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const emphasisClass = "gradient-text";
  return (
    <span
      className={`${
        isInView ? emphasisClass : "text-stone-500"
      } font-serif font-normal transition-all delay-200 pr-px`}
      ref={ref}
    >
      {children}
    </span>
  );
}
