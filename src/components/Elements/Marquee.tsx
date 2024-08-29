import {
  useFrame,
  useIntersectionObserver,
  useResizeObserver,
} from "@darkroom.engineering/hamo";
import cn from "clsx";
import modulo from "just-modulo";
import { useLenis } from "@studio-freight/react-lenis";
import { useRef, useState } from "react";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

export default function Marquee({
  children,
  className,
  repeat = 2,
  speed = 1,
  scrollVelocity = true,
  reversed = false,
  pauseOnHover = false,
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
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  const [setRectRef, { contentRect: rect }] = useResizeObserver();
  const elementsRef = useRef([]);
  const transformRef = useRef(Math.random() * 1000);
  const isHovered = useRef(false);
  const [velocity, setVelocity] = useState(1);

  const [setIntersectionRef, intersection] = useIntersectionObserver();

  const lenis = useLenis(); // eslint-disable-line react-hooks/exhaustive-deps

  const isMobile = useIsTouchDevice();

  useFrame((_: any, deltaTime: number) => {
    if (!intersection.isIntersecting) return;
    if (!rect?.width) return;

    let velocityValue = isMobile ? 0 : lenis?.velocity ?? 0;
    if (!scrollVelocity) {
      velocityValue = 0;
    }
    velocityValue = 1 + Math.abs(velocityValue / 5);

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

    transformRef.current = modulo(transformRef.current, rect.width);

    elementsRef.current.forEach((node) => {
      node.style.transform = `translate3d(${-transformRef.current}px,0,0)`;
    });
  });

  return (
    <div
      ref={setIntersectionRef}
      className={cn(className, "flex overflow-x-clip")}
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
      {new Array(repeat).fill(children).map((_, i) => (
        <div
          key={i}
          className={"flex whitespace-nowrap transform-gpu"}
          aria-hidden={i !== 0 ?? undefined}
          data-nosnippet={i !== 0 ? "" : undefined}
          ref={(node) => {
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
