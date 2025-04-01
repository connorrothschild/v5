"use client";

import { useIntersectionObserver, useResizeObserver } from "hamo";
import { useTempus } from "tempus/react";
import cn from "clsx";
import modulo from "just-modulo";
import { useRef, useState } from "react";

export default function Marquee({
  children,
  className,
  repeat = 2,
  speed = 1,
  scrollVelocity = false,
  reversed = false,
  pauseOnHover = false,
  itemClassName,
  onMouseEnter,
  onMouseLeave,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  repeat?: number;
  speed?: number;
  scrollVelocity?: boolean;
  reversed?: boolean;
  pauseOnHover?: boolean;
  itemClassName?: string;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  const [setRectRef, getEntry] = useResizeObserver({
    lazy: true,
  });

  const elementsRef = useRef<HTMLDivElement[]>([]);
  const transformRef = useRef(Math.random() * 1000);
  const isHovered = useRef(false);

  const [setIntersectionRef, intersection] = useIntersectionObserver();

  const [velocity, setVelocity] = useState(1);

  useTempus((_, deltaTime) => {
    const entry = getEntry();

    if (!entry || !intersection) return;

    if (!intersection.isIntersecting) return;

    if (!entry?.borderBoxSize[0]?.inlineSize) return;

    let velocityValue = 0;
    velocityValue = 1 + Math.abs(velocityValue / 2);

    // // FOR ABRUPT STOPS
    // if (pauseOnHover && isHovered.current) return;

    // FOR EASED STOPS
    if (pauseOnHover && isHovered.current) {
      setVelocity((prevVelocity) =>
        Math.max(prevVelocity - deltaTime * 0.0015, 0)
      );
    } else {
      setVelocity(velocityValue);
    }

    const offset = deltaTime * (speed * 0.1 * velocity);

    if (reversed) {
      transformRef.current -= offset;
    } else {
      transformRef.current += offset;
    }

    const width = entry.borderBoxSize[0].inlineSize;
    transformRef.current = modulo(transformRef.current, width);

    for (const node of elementsRef.current) {
      node.style.transform = `translate3d(${-transformRef.current}px,0,0)`;
    }
  });

  return (
    <div
      ref={setIntersectionRef}
      className={cn(className, "flex overflow-x-clip w-full")}
      onMouseEnter={(e) => {
        isHovered.current = true;
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        isHovered.current = false;
        onMouseLeave?.(e);
      }}
      {...props}
    >
      {new Array(repeat).fill(children).map((_, i: number) => (
        <div
          key={i}
          className={cn(itemClassName, "flex whitespace-nowrap transform-gpu")}
          aria-hidden={i !== 0 || undefined}
          data-nosnippet={i !== 0 ? "" : undefined}
          ref={(node) => {
            if (!node) return;
            // @ts-ignore
            elementsRef.current[i] = node;

            if (i === 0) setRectRef(node);
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
